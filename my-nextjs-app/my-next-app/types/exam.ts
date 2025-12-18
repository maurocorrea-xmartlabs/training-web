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

export const NewExamSchema = z.object({
  minScore: z.number().positive("Minimum score must be a positive number"),
  maxScore: z.number().positive("Maximum score must be a positive number"),
  date: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date >= today;
    },
    { message: "Date must be today or later" }
  ),
  subjectId: z.string(),
});

export type NewExam = z.infer<typeof NewExamSchema>;
export type Exam = z.infer<typeof ExamSchema>;
