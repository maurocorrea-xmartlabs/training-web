import { z } from "zod";

export const SubjectFormSchema = z.object({
  name: z.string().min(1, "Subject must have a name"),
  monthlyCost: z.number().positive("Subject must have a positive monthly cost"),
});
