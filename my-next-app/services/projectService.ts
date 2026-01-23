import { prisma } from "../prisma/prisma";
import type { Project } from "@/generated/prisma/client";
import type { NewProject } from "../types/project";
import { validateUserSession } from "./authService";
import { ActionResult } from "@/types/actionResult";

export async function getProjectsBySubjectId(
  subjectId: number,
): Promise<Project[]> {
  try {
    return await prisma.project.findMany({
      where: {
        subjectId: subjectId,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error getting projects:", error);
    throw new Error("Error getting projects, please try again");
  }
}

export async function postProject(
  project: NewProject,
  sessionId?: string,
): Promise<ActionResult<Project>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const result = await prisma.project.create({
      data: {
        name: project.name,
        credits: project.credits,
        subjectId: project.subjectId,
      },
    });

    return { ok: true, data: result };
  } catch (error) {
    console.error("Error creating project:", error);
    return { ok: false, error: "Error creating project, please try again" };
  }
}

export async function deleteProject(
  projectId: number,
  sessionId?: string,
): Promise<ActionResult<Project>> {
  const sessionResult = await validateUserSession(sessionId);
  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return { ok: true, data: project };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { ok: false, error: "Error deleting project, please try again" };
  }
}
