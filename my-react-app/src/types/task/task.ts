import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Task must have a name"),
  description: z.string().min(1, "Task must have a description"),
  projectId: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
export const TaskArraySchema = z.array(TaskSchema);
