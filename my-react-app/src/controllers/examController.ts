import z from "zod";
import { ExamSchema, type Exam } from "../types/exam";
import type { NewExam } from "../types/exam";
import { generateRandomId } from "./utils/randomId";
import { API_ENDPOINTS } from "./utils/endpoints";

export async function getExams() {
  try {
    const response = await fetch(API_ENDPOINTS.GET_EXAMS);
    const examsData: Exam[] = await response.json();
    const parsed = z.array(ExamSchema).safeParse(examsData);
    if (!parsed.success) {
      console.error("Invalid exams response", parsed.error);
      throw new Error("Invalid exams response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Error getting exams: " + error);
    throw new Error("Error getting exams, please try again");
  }
}

export async function postExam(exam: NewExam) {
  const examWithId: Exam = {
    id: String(generateRandomId()),
    ...exam,
  };
  try {
    const response = await fetch(API_ENDPOINTS.POST_EXAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examWithId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating exam: " + error);
    throw new Error("Error creating exam, please try again");
  }
}

export async function deleteExam(examId: string) {
  try {
    const response = await fetch(API_ENDPOINTS.DELETE_EXAM(examId), {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete error: " + error);
    throw new Error("Error deleting exam, please try again");
  }
}
