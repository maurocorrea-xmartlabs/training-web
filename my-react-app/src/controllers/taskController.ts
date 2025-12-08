import type { Task } from "../types/task/task";
import type { NewTask } from "../types/task/newTask";

export default class TaskController {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000";
  }

  public async generateRandomId() {
    const random = Math.floor(Math.random() * 1_000_000) + 1;
    return random;
  }

  public async getTasksByProjectId(projectId: string) {
    const searchParams = new URLSearchParams(`projectId=${projectId}`);
    const url = `${this.baseUrl}/tasks/?${searchParams.toString()}`;
    try {
      const response = await fetch(url);
      const tasksData: Task[] = await response.json();
      return tasksData;
    } catch (error) {
      console.error("Error getting tasks by project Id:" + error);
      throw new Error("Error getting tasks, please try again");
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
      console.error("Error creating task: " + error);
      throw new Error("Error creating task, please try again");
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
      console.error("Error deleting task: " + error);
      throw new Error("Error deleting task, please try again");
    }
  }
}
