import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  weight: z.number(),
  subjectId: z.string(),
});

export type NewProject = {
  name: string;
  weight: number;
  subjectId: string;
};

export const ProjectFormSchema = z.object({
  name: z.string().min(1, "Project must have a name"),
  weight: z.number().positive("Project must have a weight"),
});

export type Project = z.infer<typeof ProjectSchema>;
