import type { Subject } from "../types/subject/subject";
import type { NewSubject } from "../types/subject/newSubject";
import { SubjectArraySchema } from "../types/subject/subject";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function generateRandomId() {
  const random = Math.floor(Math.random() * 1_000_000) + 1;
  return random;
}

export async function getSubjects() {
  const url = `${BASE_URL}/subjects`;
  try {
    const response = await fetch(url);
    const subjectsData: Subject[] = await response.json();
    const parsed = SubjectArraySchema.safeParse(subjectsData);
    if (!parsed.success) {
      console.error("Invalid subjects response", parsed.error);
      throw new Error("Invalid subjects response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Fetch error:" + error);
  }
}

export async function postSubject(subject: NewSubject) {
  const subjectWithId: Subject = {
    id: String(await generateRandomId()),
    name: subject.name,
    monthlyCost: subject.monthlyCost,
  };
  const url = `${BASE_URL}/subjects`;
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

export async function deleteSubject(subjectId: string) {
  const url = `${BASE_URL}/subjects/${subjectId}`;
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
