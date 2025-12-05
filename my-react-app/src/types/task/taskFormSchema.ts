import { z } from "zod";

export const TaskFormSchema = z.object({
  name: z.string().min(1, "Task must have a name"),
  description: z.string().min(1, "Task must have a description"),
});
