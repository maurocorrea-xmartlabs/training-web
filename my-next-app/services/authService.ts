import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../prisma/prisma";
import type { UserLogIn, UserSignUp } from "@/types/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendLogInEmail, sendSignUpEmail } from "./utils/mailer";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

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
    console.error("Error getting exams: ", error);
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
  try {
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

    const sessionId = await createUserSession(user.id);

    sendLogInEmail(data.email);

    return sessionId;
  } catch (error) {
    console.error("Error logging in:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Error logging in, please try again");
  }
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
