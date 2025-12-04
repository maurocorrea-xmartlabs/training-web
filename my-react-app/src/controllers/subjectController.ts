import type { Subject } from "../types/subject/subject";
import type { NewSubject } from "../types/subject/newSubject";

export default class SubjectController {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000";
  }

  public async generateRandomId() {
    const random = Math.floor(Math.random() * 1_000_000) + 1;
    return random;
  }

  public async getSubjects() {
    const url = `${this.baseUrl}/subjects`;
    try {
      const response = await fetch(url);
      const subjectsData: Subject[] = await response.json();
      return subjectsData;
    } catch (error) {
      console.error("Fetch error:" + error);
    }
  }

  public async postSubject(subject: NewSubject) {
    const subjectWithId: Subject = {
      id: String(await this.generateRandomId()),
      name: subject.name,
      monthlyCost: subject.monthlyCost,
    };
    const url = `${this.baseUrl}/subjects`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjectWithId),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch POST error: " + error);
    }
  }

  public async deleteSubject(subjectId: string) {
    const url = `${this.baseUrl}/subjects/${subjectId}`;
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
