"use server";

import { postExam, deleteExam } from "@/services/examService";
import { revalidatePath } from "next/cache";
import type { NewExam } from "@/types/exam";
import { getSessionId } from "@/lib/auth/getSessionId";

export async function createExamAction(data: NewExam) {
  const sessionId = await getSessionId();
  await postExam(data, sessionId);
  revalidatePath("/exams");
  return true;
}

export async function deleteExamAction(id: number) {
  const sessionId = await getSessionId();
  await deleteExam(id, sessionId);
  revalidatePath("/exams");
  return true;
}
