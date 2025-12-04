import { z } from "zod";

export const ProjectFormSchema = z.object({
  name: z.string().min(1, "Project must have a name"),
  weight: z.number().positive("Project must have a weight"),
});
