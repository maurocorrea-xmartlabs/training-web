import z from "zod";
import { TaskSchema, type Task, type NewTask } from "../types/task";
import { generateRandomId } from "./utils/randomId";
import { API_ENDPOINTS } from "./utils/endpoints";

export async function getTasksByProjectId(projectId: string) {
  const searchParams = new URLSearchParams(`projectId=${projectId}`);
  const url = API_ENDPOINTS.GET_TASKS_BY_PROJECT(searchParams.toString());
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
    console.error("Error getting tasks by project Id:" + error);
    throw new Error("Error getting tasks, please try again");
  }
}

export async function postTask(task: NewTask) {
  const taskWithId: Task = {
    id: String(generateRandomId()),
    ...task,
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

export async function deleteTask(taskId: string) {
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
