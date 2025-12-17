import type { Exam } from "../types/exam/exam";
import type { NewExam } from "../types/exam/newExam";
import { ExamArraySchema } from "../types/exam/exam";

export class ExamController {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000";
  }

  public generateRandomId() {
    const random = Math.floor(Math.random() * 1_000_000) + 1;
    return random;
  }

  public async getExams() {
    const url = `${this.baseUrl}/exams`;
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

  public async postExam(exam: NewExam) {
    const examWithId: Exam = {
      id: String(this.generateRandomId()),
      ...exam,
    };
    const url = `${this.baseUrl}/exams`;
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

  public async deleteExam(examId: string) {
    const url = `${this.baseUrl}/exams/${examId}`;
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
}
