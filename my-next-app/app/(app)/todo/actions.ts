"use server";

import { revalidatePath } from "next/cache";
import { postSubject, deleteSubject } from "@/services/subjectService";
import { SubjectFormSchema } from "@/types/subject";
import { ProjectFormSchema } from "@/types/project";
import { deleteProject, postProject } from "@/services/projectService";
import { deleteTask, postTask } from "@/services/taskService";
import { TaskFormSchema } from "@/types/task";
import { getSessionId } from "@/lib/auth/getSessionId";
import { ActionResult } from "@/types/actionResult";
import { Project, Subject, Task } from "@/generated/prisma/client";

export async function createSubjectAction(
  rawData: unknown
): Promise<ActionResult<Subject>> {
  const parsed = SubjectFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message,
    };
  }

  const sessionId = await getSessionId();
  const result = await postSubject(parsed.data, sessionId);

  if (!result.ok) {
    return result;
  }

  revalidatePath("/todo");

  return result;
}

export async function createProjectAction(
  rawData: unknown
): Promise<ActionResult<Project>> {
  const parsed = ProjectFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message,
    };
  }

  const sessionId = await getSessionId();
  const result = await postProject(parsed.data, sessionId);

  if (!result.ok) {
    return result;
  }

  revalidatePath("/todo");

  return result;
}

export async function createTaskAction(
  rawData: unknown
): Promise<ActionResult<Task>> {
  const parsed = TaskFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const sessionId = await getSessionId();
  const result = await postTask(parsed.data, sessionId);

  if (!result.ok) {
    return result;
  }

  revalidatePath("/todo");
  return result;
}

export async function deleteSubjectAction(
  subjectId: number
): Promise<ActionResult<Subject>> {
  const sessionId = await getSessionId();
  const result = await deleteSubject(subjectId, sessionId);

  if (!result.ok) {
    return result;
  }
  revalidatePath("/todo");
  return result;
}

export async function deleteProjectAction(
  projectId: number
): Promise<ActionResult<Project>> {
  const sessionId = await getSessionId();
  const result = await deleteProject(projectId, sessionId);

  if (!result.ok) {
    return result;
  }
  revalidatePath("/todo");
  return result;
}

export async function deleteTaskAction(taskId: number) {
  const sessionId = await getSessionId();
  const result = await deleteTask(taskId, sessionId);

  if (!result.ok) {
    return result;
  }
  revalidatePath("/todo");
  return result;
}
