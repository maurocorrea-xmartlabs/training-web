"use server";

import { postExam, deleteExam } from "@/services/examService";
import { revalidatePath } from "next/cache";
import type { NewExam } from "@/types/exam";
import { cookies } from "next/headers";

export async function createExamAction(data: NewExam) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await postExam(data, sessionId);
  revalidatePath("/exams");
  return true;
}

export async function deleteExamAction(id: number) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await deleteExam(id, sessionId);
  revalidatePath("/exams");
  return true;
}
