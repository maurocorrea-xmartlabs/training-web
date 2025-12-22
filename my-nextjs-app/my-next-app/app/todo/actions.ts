"use server";

import { revalidatePath } from "next/cache";
import { postSubject, deleteSubject } from "@/controllers/subjectController";
import type { NewSubject } from "@/types/subject";
import { NewProject } from "@/types/project";
import { deleteProject, postProject } from "@/controllers/projectController";
import { deleteTask, postTask } from "@/controllers/taskController";
import { NewTask } from "@/types/task";

export async function createSubjectAction(data: NewSubject) {
  await postSubject(data);
  revalidatePath("/todo");
  return true;
}

export async function createProjectAction(data: NewProject) {
  await postProject(data);
  revalidatePath("/todo");
  return true;
}

export async function createTaskAction(data: NewTask) {
  await postTask(data);
  revalidatePath("/todo");
  return true;
}

export async function deleteSubjectAction(subjectId: number) {
  await deleteSubject(subjectId);
  revalidatePath("/todo");
  return true;
}

export async function deleteProjectAction(projectId: number) {
  await deleteProject(projectId);
  revalidatePath("/todo");
  return true;
}

export async function deleteTaskAction(taskId: number) {
  await deleteTask(taskId);
  revalidatePath("/todo");
  return true;
}
