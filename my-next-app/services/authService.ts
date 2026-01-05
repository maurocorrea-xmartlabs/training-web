import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../prisma/prisma";
import type { UserSignUp } from "@/types/user";
import bcrypt from "bcryptjs";
import { sendSignUpEmail } from "./utils/mailer";

export async function signUp(user: UserSignUp) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const ret = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    sendSignUpEmail(user.email);

    return ret;
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
