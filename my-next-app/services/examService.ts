import { prisma } from "../prisma/prisma";
import type { Exam } from "@/generated/prisma/client";
import type { NewExam } from "@/types/exam";
import { validateUserSession } from "./authService";
import { ActionResult } from "@/types/actionResult";

export async function getExams(): Promise<Exam[]> {
  try {
    return await prisma.exam.findMany({
      orderBy: {
        date: "asc",
      },
    });
  } catch (error) {
    console.error("Error getting exams:", error);
    throw new Error("Error getting exams, please try again");
  }
}

export async function postExam(
  exam: NewExam,
  sessionId?: string
): Promise<ActionResult<Exam>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const result = await prisma.exam.create({
      data: {
        minScore: exam.minScore,
        maxScore: exam.maxScore,
        date: exam.date,
        subjectId: exam.subjectId,
      },
    });

    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: "Error creating exam, please try again" };
  }
}

export async function deleteExam(
  examId: number,
  sessionId?: string
): Promise<ActionResult<Exam>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const exam = await prisma.exam.delete({
      where: {
        id: examId,
      },
    });

    return { ok: true, data: exam };
  } catch (error) {
    return { ok: false, error: "Error deleting exam, please try again" };
  }
}
