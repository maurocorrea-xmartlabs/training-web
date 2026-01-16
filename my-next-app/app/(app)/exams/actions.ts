"use server";

import { postExam, deleteExam } from "@/services/examService";
import { revalidatePath } from "next/cache";
import { NewExamSchema } from "@/types/exam";
import { getSessionId } from "@/lib/auth/getSessionId";
import { ActionResult } from "@/types/actionResult";
import { Exam } from "@/generated/prisma/client";

export async function createExamAction(
  rawData: unknown
): Promise<ActionResult<Exam>> {
  const parsed = NewExamSchema.safeParse(rawData);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const sessionId = await getSessionId();
  const result = await postExam(parsed.data, sessionId);

  if (!result.ok) {
    return result;
  }

  revalidatePath("/exams");
  return result;
}

export async function deleteExamAction(
  id: number
): Promise<ActionResult<Exam>> {
  const sessionId = await getSessionId();
  const result = await deleteExam(id, sessionId);

  if (!result.ok) {
    return result;
  }
  revalidatePath("/exams");
  return result;
}
