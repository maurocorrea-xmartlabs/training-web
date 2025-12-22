import { z } from "zod";

export type NewProject = {
  name: string;
  credits: number;
  subjectId: number;
};

export const ProjectFormSchema = z.object({
  name: z.string().min(1, "Project must have a name"),
  credits: z.number().positive("Project must have credits"),
});
