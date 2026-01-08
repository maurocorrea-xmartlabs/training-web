import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../prisma/prisma";
import type { UserLogIn, UserSignUp } from "@/types/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendSignUpEmail } from "./utils/mail/templates/signUpEmail";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const RESET_TOKEN_EXPIRATION_SECONDS = 1000 * 60 * 60;

export async function signUp(user: UserSignUp) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    sendSignUpEmail(user.email);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code == "P2002"
    ) {
      throw new Error("Email already in use");
    }

    throw new Error("Error signing up, please try again");
  }
}

export async function logIn(data: UserLogIn) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  return createUserSession(user.id);
}

export async function logOut(sessionId: string) {
  await prisma.session.deleteMany({
    where: { id: sessionId },
  });
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // We should not reveal if the user exists or not
  if (!user) {
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expirationDate = new Date(Date.now() + RESET_TOKEN_EXPIRATION_SECONDS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: token,
      TokenExpirationDate: expirationDate,
    },
  });

  //falta mandar maillll
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  if (!user.TokenExpirationDate || new Date() > user.TokenExpirationDate) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      TokenExpirationDate: null,
    },
  });
}

async function createUserSession(userId: number) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_SECONDS);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: userId,
      expiresAt: expiresAt,
    },
  });

  return sessionId;
}

export async function validateUserSession(sessionId?: string) {
  if (!sessionId) {
    throw new Error("UNAUTHORIZED");
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session || new Date() > session.expiresAt) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
