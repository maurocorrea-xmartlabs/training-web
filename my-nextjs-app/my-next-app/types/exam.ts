import { z } from "zod";

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
  subjectId: z.int(),
});

export type NewExam = z.infer<typeof NewExamSchema>;
