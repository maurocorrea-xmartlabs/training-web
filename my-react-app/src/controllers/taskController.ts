import z from "zod";
import { TaskSchema, type Task } from "../types/task";
import type { NewTask } from "../types/task";

export class TaskController {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000";
  }

  public async generateRandomId() {
    const random = Math.floor(Math.random() * 1_000_000) + 1;
    return random;
  }

  public async getTasksByProjectId(projectId: string) {
    const url = `${this.baseUrl}/tasks/?projectId=${projectId}`;
    try {
      const response = await fetch(url);
      const tasksData: Task[] = await response.json();
      const parsed = z.array(TaskSchema).safeParse(tasksData);
      if (!parsed.success) {
        console.error("Invalid tasks response", parsed.error);
        throw new Error("Invalid tasks response");
      }
      return parsed.data;
    } catch (error) {
      console.error("Fetch error:" + error);
    }
  }

  public async postTask(task: NewTask) {
    const taskWithId: Task = {
      id: String(await this.generateRandomId()),
      name: task.name,
      description: task.description,
      projectId: task.projectId,
    };
    const url = `${this.baseUrl}/tasks`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskWithId),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch POST error: " + error);
    }
  }

  public async deleteTask(taskId: string) {
    const url = `${this.baseUrl}/tasks/${taskId}`;
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
