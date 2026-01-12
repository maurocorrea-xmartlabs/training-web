"use server";

import {
  deleteRequest,
  deleteRequestSchema,
  uploadRequest,
  uploadRequestSchema,
} from "@/types/uploadRequest";
import {
  createPresignedDeleteUrl,
  createPresignedUploadUrl,
} from "@/services/s3Service";

export async function getPresignedUploadUrlAction(input: uploadRequest) {
  const parsed = uploadRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid request body");
  }

  return await createPresignedUploadUrl(parsed.data);
}

export async function getPresignedDeleteUrlAction(input: deleteRequest) {
  const parsed = deleteRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid request body");
  }

  return await createPresignedDeleteUrl(parsed.data);
}
