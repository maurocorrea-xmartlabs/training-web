import z from "zod";
import { ProjectSchema, type Project } from "../types/project";
import type { NewProject } from "../types/project";
import { API_ENDPOINTS } from "./utils/endpoints";
import { generateRandomId } from "./utils/randomId";

export async function getProjectsBySubjectId(subjectId: string) {
  const searchParams = new URLSearchParams(`subjectId=${subjectId}`);
  const url = API_ENDPOINTS.GET_PROJECT_BY_SUBJECT(searchParams.toString());
  try {
    const response = await fetch(url);
    const projectsData: Project[] = await response.json();
    const parsed = z.array(ProjectSchema).safeParse(projectsData);
    if (!parsed.success) {
      console.error("Invalid projects response", parsed.error);
      throw new Error("Invalid projects response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Error getting projects: " + error);
    throw new Error("Error getting projects, please try again");
  }
}

export async function postProject(project: NewProject) {
  const projectWithId: Project = {
    id: String(await generateRandomId()),
    ...project,
  };
  try {
    const response = await fetch(API_ENDPOINTS.POST_PROJECT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectWithId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating project: " + error);
    throw new Error("Error creating project, please try again");
  }
}

export async function deleteProject(projectId: string) {
  try {
    const response = await fetch(API_ENDPOINTS.DELETE_PROJECT(projectId), {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete error: " + error);
    throw new Error("Error deleting project, please try again");
  }
}
