import type { Project } from "../types/project/project";
import type { NewProject } from "../types/project/newProject";
import { ProjectsArraySchema } from "../types/project/project";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function generateRandomId() {
  const random = Math.floor(Math.random() * 1_000_000) + 1;
  return random;
}

export async function getProjectsBySubjectId(subjectId: string) {
  const url = `${BASE_URL}/projects/?subjectId=${subjectId}`;
  try {
    const response = await fetch(url);
    const projectsData: Project[] = await response.json();
    const parsed = ProjectsArraySchema.safeParse(projectsData);
    if (!parsed.success) {
      console.error("Invalid projects response", parsed.error);
      throw new Error("Invalid projects response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Fetch error:" + error);
  }
}

export async function postProject(project: NewProject) {
  const projectWithId: Project = {
    id: String(await generateRandomId()),
    name: project.name,
    credits: project.credits,
    subjectId: project.subjectId,
  };
  const url = `${BASE_URL}/projects`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectWithId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch POST error: " + error);
  }
}

export async function deleteProject(projectId: string) {
  const url = `${BASE_URL}/projects/${projectId}`;
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
