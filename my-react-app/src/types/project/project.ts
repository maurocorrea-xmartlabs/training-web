import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  credits: z.number(),
  subjectId: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export const ProjectsArraySchema = z.array(ProjectSchema);
