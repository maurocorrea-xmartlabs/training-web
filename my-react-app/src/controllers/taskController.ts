import type { Task } from "../types/task/task";
import type { NewTask } from "../types/task/newTask";
import { TaskArraySchema } from "../types/task/task";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function generateRandomId() {
  const random = Math.floor(Math.random() * 1_000_000) + 1;
  return random;
}

export async function getTasksByProjectId(projectId: string) {
  const url = `${BASE_URL}/tasks/?projectId=${projectId}`;
  try {
    const response = await fetch(url);
    const tasksData: Task[] = await response.json();
    const parsed = TaskArraySchema.safeParse(tasksData);
    if (!parsed.success) {
      console.error("Invalid tasks response", parsed.error);
      throw new Error("Invalid tasks response");
    }
    return parsed.data;
  } catch (error) {
    console.error("Fetch error:" + error);
  }
}

export async function postTask(task: NewTask) {
  const taskWithId: Task = {
    id: String(await generateRandomId()),
    name: task.name,
    description: task.description,
    projectId: task.projectId,
  };
  const url = `${BASE_URL}/tasks`;
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

export async function deleteTask(taskId: string) {
  const url = `${BASE_URL}/tasks/${taskId}`;
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
