"use server";

import { revalidatePath } from "next/cache";
import { postSubject, deleteSubject } from "@/services/subjectService";
import type { NewSubject } from "@/types/subject";
import { NewProject } from "@/types/project";
import { deleteProject, postProject } from "@/services/projectService";
import { deleteTask, postTask } from "@/services/taskService";
import { NewTask } from "@/types/task";
import { cookies } from "next/headers";

export async function createSubjectAction(data: NewSubject) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await postSubject(data, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function createProjectAction(data: NewProject) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await postProject(data, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function createTaskAction(data: NewTask) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await postTask(data, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function deleteSubjectAction(subjectId: number) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await deleteSubject(subjectId, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function deleteProjectAction(projectId: number) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await deleteProject(projectId, sessionId);
  revalidatePath("/todo");
  return true;
}

export async function deleteTaskAction(taskId: number) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  await deleteTask(taskId, sessionId);
  revalidatePath("/todo");
  return true;
}
