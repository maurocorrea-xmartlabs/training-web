import { z } from "zod";

export const uploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export const deleteRequestSchema = z.object({
  key: z.string(),
});

export const downloadRequestSchema = z.object({
  key: z.string(),
});

export type uploadRequest = z.infer<typeof uploadRequestSchema>;
export type deleteRequest = z.infer<typeof deleteRequestSchema>;
export type downloadRequest = z.infer<typeof downloadRequestSchema>;
