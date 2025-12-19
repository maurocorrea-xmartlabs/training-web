import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  credits: z.number(),
  subjectId: z.string(),
});

export type NewProject = {
  name: string;
  credits: number;
  subjectId: string;
};

export const ProjectFormSchema = z.object({
  name: z.string().min(1, "Project must have a name"),
  credits: z.number().positive("Project must have credits"),
});

export type Project = z.infer<typeof ProjectSchema>;
