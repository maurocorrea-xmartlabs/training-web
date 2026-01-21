"use server";

import { revalidatePath } from "next/cache";
import { postSubject, deleteSubject } from "@/services/subjectService";
import type { NewSubject } from "@/types/subject";
import { NewProject } from "@/types/project";
import { deleteProject, postProject } from "@/services/projectService";
import { deleteTask, postTask } from "@/services/taskService";
import { NewTask } from "@/types/task";
import { getSessionId } from "@/lib/auth/getSessionId";

export async function createSubjectAction(data: NewSubject) {
  const sessionId = await getSessionId();
  await postSubject(data, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function createProjectAction(data: NewProject) {
  const sessionId = await getSessionId();
  await postProject(data, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function createTaskAction(data: NewTask) {
  const sessionId = await getSessionId();
  await postTask(data, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function deleteSubjectAction(subjectId: number) {
  const sessionId = await getSessionId();
  await deleteSubject(subjectId, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function deleteProjectAction(projectId: number) {
  const sessionId = await getSessionId();
  await deleteProject(projectId, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function deleteTaskAction(taskId: number) {
  const sessionId = await getSessionId();
  await deleteTask(taskId, sessionId);
  revalidatePath("/todo");
  return true;
}
