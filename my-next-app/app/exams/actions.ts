"use server";

import { postExam, deleteExam } from "@/services/examService";
import { revalidatePath } from "next/cache";
import type { NewExam } from "@/types/exam";

export async function createExamAction(data: NewExam) {
  await postExam(data);
  revalidatePath("/exams");
  return true;
}

export async function deleteExamAction(id: number) {
  await deleteExam(id);
  revalidatePath("/exams");
  return true;
}
