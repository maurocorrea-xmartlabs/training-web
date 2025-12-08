import type { Subject } from "../types/subject/subject";
import type { NewSubject } from "../types/subject/newSubject";
import { API_BASE, API_ENDPOINTS } from "./utils/endpoints";
import { generateRandomId } from "./utils/idGenerator";

export default class SubjectController {
  public async getSubjects() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_SUBJECTS);
      const subjectsData: Subject[] = await response.json();
      return subjectsData;
    } catch (error) {
      console.error("Error getting subjects: " + error);
      throw new Error("Error getting subjects, please try again");
    }
  }

  public async postSubject(subject: NewSubject) {
    const subjectWithId: Subject = {
      id: String(await generateRandomId()),
      name: subject.name,
      monthlyCost: subject.monthlyCost,
    };
    try {
      const response = await fetch(API_ENDPOINTS.POST_SUBJECT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjectWithId),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting subject: " + error);
      throw new Error("Error posting subject, please try again");
    }
  }

  public async deleteSubject(subjectId: string) {
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_SUBJECT(subjectId), {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting subject " + error);
      throw new Error("Error deleting subject, please try again");
    }
  }
}
