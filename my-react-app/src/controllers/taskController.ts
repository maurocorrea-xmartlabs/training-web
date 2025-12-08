import type { Task } from "../types/task/task";
import type { NewTask } from "../types/task/newTask";
import { API_ENDPOINTS } from "./utils/endpoints";
import { generateRandomId } from "./utils/idGenerator";

export default class TaskController {
  public async getTasksByProjectId(projectId: string) {
    const searchParams = new URLSearchParams(`projectId=${projectId}`);
    const url = API_ENDPOINTS.GET_TASKS_BY_PROJECT(searchParams.toString());
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
      id: String(await generateRandomId()),
      name: task.name,
      description: task.description,
      projectId: task.projectId,
    };
    try {
      const response = await fetch(API_ENDPOINTS.POST_TASK, {
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
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_TASK(taskId), {
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
