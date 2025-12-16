import z from "zod";
import type { Project } from "../types/project";
import type { NewProject } from "../types/project";
import { ProjectSchema } from "../types/project";

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
    const url = `${this.baseUrl}/projects/?subjectId=${subjectId}`;
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
      console.error("Fetch error:" + error);
    }
  }

  public async postProject(project: NewProject) {
    const projectWithId: Project = {
      id: String(await this.generateRandomId()),
      name: project.name,
      credits: project.credits,
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
      console.error("Fetch POST error: " + error);
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
      console.error("Fetch POST error: " + error);
    }
  }
}
