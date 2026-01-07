import { prisma } from "../prisma/prisma";
import type { NewSubject } from "@/types/subject";
import type { Subject } from "@/generated/prisma/client";

export async function getSubjects(): Promise<Subject[]> {
  try {
    return await prisma.subject.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error getting subjects:", error);
    throw new Error("Error getting subjects, please try again");
  }
}

export async function postSubject(subject: NewSubject): Promise<Subject> {
  try {
    return await prisma.subject.create({
      data: {
        name: subject.name,
        monthlyCost: subject.monthlyCost,
      },
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    throw new Error("Error creating subject, please try again");
  }
}

export async function deleteSubject(subjectId: number): Promise<Subject> {
  try {
    return await prisma.subject.delete({
      where: { id: subjectId },
    });
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw new Error("Error deleting subject, please try again");
  }
}
