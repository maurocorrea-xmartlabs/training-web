import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export const uploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.enum(ALLOWED_TYPES, {
    message: "File must be a PNG, JPEG or WEBP image",
  }),
  size: z.number().max(MAX_FILE_SIZE, "File size must be lower than 5 MB"),
});

export const deleteRequestSchema = z.object({
  key: z.string(),
});

export const downloadRequestSchema = z.object({
  key: z.string(),
});

export type UploadRequest = z.infer<typeof uploadRequestSchema>;
export type DeleteRequest = z.infer<typeof deleteRequestSchema>;
export type DownloadRequest = z.infer<typeof downloadRequestSchema>;
