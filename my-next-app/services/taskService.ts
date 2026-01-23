import { prisma } from "../prisma/prisma";
import type { NewTask } from "@/types/task";
import type { Task } from "@/generated/prisma/client";
import { validateUserSession } from "./authService";
import { ActionResult } from "@/types/actionResult";

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
  sessionId?: string,
): Promise<ActionResult<Task>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const result = await prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        projectId: task.projectId,
      },
    });

    return { ok: true, data: result };
  } catch (error) {
    console.error("Error creating task:", error);
    return { ok: false, error: "Error creating task, please try again" };
  }
}

export async function deleteTask(
  taskId: number,
  sessionId?: string,
): Promise<ActionResult<Task>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });

    return { ok: true, data: task };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { ok: false, error: "Error deleting task, please try again" };
  }
}
