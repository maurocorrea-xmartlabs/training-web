import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../prisma/prisma";
import type { UserLogIn, UserSignUp } from "@/types/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendSignUpEmail } from "./utils/mail/templates/signUpEmail";
import { sendResetPasswordEmail } from "./utils/mail/templates/resetPasswordEmail";
import { sendLogInEmail } from "./utils/mail/templates/logInEmail";
import { sendEmailVerificationEmail } from "./utils/mail/templates/emailVerificationEmail";
import { ActionResult } from "@/types/actionResult";
import { Prisma } from "@/generated/prisma/client";

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: { user: true };
}>;

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const RESET_TOKEN_EXPIRATION_SECONDS = 1000 * 60 * 60;

export async function signUp(user: UserSignUp): Promise<ActionResult> {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await sendSignUpEmail(user.email);

    return { ok: true, data: null };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false,
        error: "Email already in use",
      };
    }

    return {
      ok: false,
      error: "Error signing up, please try again",
    };
  }
}

export async function logIn(data: UserLogIn): Promise<ActionResult<string>> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    return { ok: false, error: "Invalid email or password" } as const;
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    return { ok: false, error: "Invalid email or password" } as const;
  }

  const sessionId = await createUserSession(user.id);

  await sendLogInEmail(data.email);

  return { ok: true, data: sessionId } as const;
}

export async function logOut(sessionId: string): Promise<ActionResult> {
  try {
    await prisma.session.delete({
      where: { id: sessionId },
    });

    return { ok: true, data: null } as const;
  } catch {
    return {
      ok: false,
      error: "Unexpected error when logging out",
    } as const;
  }
}

export async function forgotPassword(email: string): Promise<ActionResult> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // We should not reveal if the user exists or not
  if (!user) {
    return { ok: true, data: null } as const;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expirationDate = new Date(Date.now() + RESET_TOKEN_EXPIRATION_SECONDS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: token,
      tokenExpirationDate: expirationDate,
    },
  });

  await sendResetPasswordEmail(user.email, token);

  return { ok: true, data: null } as const;
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ActionResult> {
  const user = await prisma.user.findUnique({
    where: {
      passwordResetToken: token,
    },
  });

  if (
    !user ||
    !user.TokenExpirationDate ||
    new Date() > user.TokenExpirationDate
  ) {
    return {
      ok: false,
      error:
        "This password reset link is invalid or has expired, please request a new one.",
    } as const;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      tokenExpirationDate: null,
    },
  });

  return { ok: true, data: null } as const;
}

export async function createEmailVerificationRequest(
  email: string
): Promise<ActionResult> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.isVerified) {
    return { ok: true, data: null } as const;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expirationDate = new Date(Date.now() + RESET_TOKEN_EXPIRATION_SECONDS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerificationToken: token,
      verificationTokenExpirationDate: expirationDate,
    },
  });

  await sendEmailVerificationEmail(user.email, token);

  return { ok: true, data: null } as const;
}

export async function verifyEmail(token: string): Promise<ActionResult> {
  const user = await prisma.user.findUnique({
    where: {
      emailVerificationToken: token,
    },
  });

  if (
    !user ||
    !user.verificationTokenExpirationDate ||
    new Date() > user.verificationTokenExpirationDate ||
    user.isVerified
  ) {
    return {
      ok: false,
      error:
        "This email validation link is invalid or has expired. Please request a new one.",
    } as const;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      emailVerificationToken: null,
      verificationTokenExpirationDate: null,
    },
  });

  return { ok: true, data: null } as const;
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

export async function validateUserSession(
  sessionId?: string,
): Promise<ActionResult<SessionWithUser>> {
  if (!sessionId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const session = await getSessionById(sessionId);

  if (!session || new Date() > session.expiresAt) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  return { ok: true, data: session };
}

export async function getSessionById(sessionId: string) {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
}
