import { z } from "zod";

export const SubjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject must have a name"),
  monthlyCost: z.number().nonnegative("Monthly cost must be 0 or greater"),
});

export type Subject = z.infer<typeof SubjectSchema>;
export const SubjectArraySchema = z.array(SubjectSchema);
