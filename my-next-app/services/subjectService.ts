import { prisma } from "../prisma/prisma";
import type { NewSubject } from "@/types/subject";
import type { Subject } from "@/generated/prisma/client";
import { validateUserSession } from "./authService";
import { ActionResult } from "@/types/actionResult";

export async function getSubjects(): Promise<Subject[]> {
  try {
    return await prisma.subject.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error getting subjects:", error);
    throw new Error("Error getting subjects, please try again");
  }
}

export async function postSubject(
  subject: NewSubject,
  sessionId?: string
): Promise<ActionResult<Subject>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const result = await prisma.subject.create({
      data: {
        name: subject.name,
        monthlyCost: subject.monthlyCost,
      },
    });

    return { ok: true, data: result };
  } catch (error) {
    return {
      ok: false,
      error: "Error creating subject, please try again",
    };
  }
}

export async function deleteSubject(
  subjectId: number,
  sessionId?: string
): Promise<ActionResult<Subject>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const subject = await prisma.subject.delete({
      where: { id: subjectId },
    });

    return { ok: true, data: subject };
  } catch (error) {
    return { ok: false, error: "Error deleting subject, please try again" };
  }
}
