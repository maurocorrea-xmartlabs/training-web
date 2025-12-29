import { z } from "zod";

export const SubjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject must have a name"),
  monthlyCost: z.number().nonnegative("Monthly cost must be 0 or greater"),
});

export type NewSubject = {
  name: string;
  monthlyCost: number;
};

export const SubjectFormSchema = z.object({
  name: z.string().min(1, "Subject must have a name"),
  monthlyCost: z.number().positive("Subject must have a positive monthly cost"),
});

export type Subject = z.infer<typeof SubjectSchema>;
