import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Task must have a name"),
  description: z.string().min(1, "Task must have a description"),
  projectId: z.string(),
});

export type NewTask = {
  name: string;
  description: string;
  projectId: string;
};

export const TaskFormSchema = z.object({
  name: z.string().min(1, "Task must have a name"),
  description: z.string().min(1, "Task must have a description"),
});

export type Task = z.infer<typeof TaskSchema>;
