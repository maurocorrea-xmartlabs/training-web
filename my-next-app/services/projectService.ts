import { prisma } from "../prisma/prisma";
import type { Project } from "@/generated/prisma/client";
import type { NewProject } from "../types/project";

export async function getProjectsBySubjectId(
  subjectId: number
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

export async function postProject(project: NewProject): Promise<Project> {
  try {
    return await prisma.project.create({
      data: {
        name: project.name,
        credits: project.credits,
        subjectId: project.subjectId,
      },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Error creating project, please try again");
  }
}

export async function deleteProject(projectId: number) {
  try {
    return await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Error deleting project, please try again");
  }
}
