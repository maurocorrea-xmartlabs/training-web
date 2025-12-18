import z from "zod";
import { SubjectSchema, type Subject } from "../types/subject";
import type { NewSubject } from "../types/subject";
import { generateRandomId } from "./utils/randomId";
import { API_ENDPOINTS } from "./utils/endpoints";

export async function getSubjects() {
  try {
    const response = await fetch(API_ENDPOINTS.GET_SUBJECTS);
    console.log(API_ENDPOINTS.GET_SUBJECTS);
    const subjectsData: Subject[] = await response.json();
    const parsed = z.array(SubjectSchema).safeParse(subjectsData);
    if (!parsed.success) {
      console.error("Invalid subjects response", parsed.error);
      throw new Error("Invalid subjects response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Error getting subjects: " + error);
    throw new Error("Error getting subjects, please try again");
  }
}

export async function postSubject(subject: NewSubject) {
  const subjectWithId: Subject = {
    id: String(generateRandomId()),
    ...subject,
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

export async function deleteSubject(subjectId: string) {
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
