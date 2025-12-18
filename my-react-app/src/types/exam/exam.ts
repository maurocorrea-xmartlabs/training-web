import { z } from "zod";

export const ExamSchema = z.object({
  id: z.string(),

  minScore: z.number().nonnegative("Minimum score must be a positive number"),

  maxScore: z.number().nonnegative("Maximum score must be a positive number"),

  date: z.preprocess((value) => {
    const date = new Date(value as string);
    return isNaN(date.getTime()) ? undefined : date;
  }, z.date()),

  subjectId: z.string(),
});

export type Exam = z.infer<typeof ExamSchema>;
export const ExamArraySchema = z.array(ExamSchema);
