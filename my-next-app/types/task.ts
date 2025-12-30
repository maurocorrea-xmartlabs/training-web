import { z } from "zod";

export type NewTask = {
  name: string;
  description: string;
  projectId: number;
};

export const TaskFormSchema = z.object({
  name: z.string().min(1, "Task must have a name"),
  description: z.string().min(1, "Task must have a description"),
});
