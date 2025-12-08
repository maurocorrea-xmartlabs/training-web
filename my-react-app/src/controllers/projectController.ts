import type { Project } from "../types/project/project";
import type { NewProject } from "../types/project/newProject";

export default class ProjectController {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000";
  }

  public async generateRandomId() {
    const random = Math.floor(Math.random() * 1_000_000) + 1;
    return random;
  }

  public async getProjectsBySubjectId(subjectId: string) {
    const searchParams = new URLSearchParams(`subjectId=${subjectId}`);
    const url = `${this.baseUrl}/projects/?${searchParams.toString()}`;
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
      id: String(await this.generateRandomId()),
      name: project.name,
      weight: project.weight,
      subjectId: project.subjectId,
    };
    const url = `${this.baseUrl}/projects`;
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
      console.error("Error creating project: " + error);
      throw new Error("Error creating project, please try again");
    }
  }

  public async deleteProject(projectId: string) {
    const url = `${this.baseUrl}/projects/${projectId}`;
    try {
      const response = await fetch(url, {
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
