import type { Exam } from "../types/exam/exam";
import type { NewExam } from "../types/exam/newExam";
import { ExamArraySchema } from "../types/exam/exam";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function generateRandomId() {
  const random = Math.floor(Math.random() * 1_000_000) + 1;
  return random;
}

export async function getExams() {
  const url = `${BASE_URL}/exams`;
  try {
    const response = await fetch(url);
    const examsData: Exam[] = await response.json();
    const parsed = ExamArraySchema.safeParse(examsData);
    if (!parsed.success) {
      console.error("Invalid exams response", parsed.error);
      throw new Error("Invalid exams response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Fetch error:" + error);
  }
}

export async function postExam(exam: NewExam) {
  const examWithId: Exam = {
    id: String(await generateRandomId()),
    minScore: exam.minScore,
    maxScore: exam.maxScore,
    date: exam.date,
    subjectId: exam.subjectId,
  };
  const url = `${BASE_URL}/exams`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examWithId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch POST error: " + error);
  }
}

export async function deleteExam(examId: string) {
  const url = `${BASE_URL}/exams/${examId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch POST error: " + error);
  }
}
