import { prisma } from "../prisma/prisma";
import type { NewTask } from "@/types/task";
import type { Task } from "@/generated/prisma/client";
import { validateUserSession } from "./authService";

export async function getTasksByProjectId(projectId: number): Promise<Task[]> {
  try {
    return await prisma.task.findMany({
      where: { projectId },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error getting tasks by project id:", error);
    throw new Error("Error getting tasks, please try again");
  }
}

export async function postTask(
  task: NewTask,
  sessionId?: string
): Promise<Task> {
  await validateUserSession(sessionId);
  try {
    return await prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        projectId: task.projectId,
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Error creating task, please try again");
  }
}

export async function deleteTask(
  taskId: number,
  sessionId?: string
): Promise<Task> {
  await validateUserSession(sessionId);
  try {
    return await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Error deleting task, please try again");
  }
}
