import { prisma } from "../prisma/prisma";
import type { Exam } from "@/generated/prisma/client";
import type { NewExam } from "@/types/exam";
import { validateUserSession } from "./authService";

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

export async function postExam(exam: NewExam, sessionId?: string) {
  await validateUserSession(sessionId);
  try {
    return await prisma.exam.create({
      data: {
        minScore: exam.minScore,
        maxScore: exam.maxScore,
        date: exam.date,
        subjectId: exam.subjectId,
      },
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    throw new Error("Error creating exam, please try again");
  }
}

export async function deleteExam(examId: number, sessionId?: string) {
  await validateUserSession(sessionId);
  try {
    return await prisma.exam.delete({
      where: {
        id: examId,
      },
    });
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Error deleting exam, please try again");
  }
}
