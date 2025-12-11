import type { Project } from "../types/project/project";
import type { NewProject } from "../types/project/newProject";
import { API_ENDPOINTS } from "./utils/endpoints";
import { generateRandomId } from "./utils/idGenerator";

export default class ProjectController {
  public async getProjectsBySubjectId(subjectId: string) {
    const searchParams = new URLSearchParams(`subjectId=${subjectId}`);
    const url = API_ENDPOINTS.GET_PROJECT_BY_SUBJECT(searchParams.toString());
    try {
      const response = await fetch(url);
      const projectsData: Project[] = await response.json();
      return projectsData;
    } catch (error) {
      console.error("Error getting projects: " + error);
      throw new Error("Error getting projects, please try again");
    }
  }

  public async postProject(project: NewProject) {
    const projectWithId: Project = {
      id: String(await generateRandomId()),
      name: project.name,
      weight: project.weight,
      subjectId: project.subjectId,
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

  public async deleteProject(projectId: string) {
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
}
