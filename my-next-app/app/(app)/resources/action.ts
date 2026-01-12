"use server";

import {
  deleteRequest,
  deleteRequestSchema,
  downloadRequest,
  downloadRequestSchema,
  uploadRequest,
  uploadRequestSchema,
} from "@/types/uploadRequest";
import {
  createPresignedDeleteUrl,
  createPresignedDownloadUrl,
  createPresignedUploadUrl,
  deleteFileMetadata,
  storeFileMetadata,
} from "@/services/s3Service";

export async function getPresignedUploadUrlAction(input: uploadRequest) {
  const parsed = uploadRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid upload request");
  }

  return await createPresignedUploadUrl(parsed.data);
}

export async function getImagePresignedUrlAction(input: downloadRequest) {
  const parsed = downloadRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid download request");
  }
  return createPresignedDownloadUrl(parsed.data);
}

export async function getPresignedDeleteUrlAction(input: deleteRequest) {
  const parsed = deleteRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid delete request");
  }

  return await createPresignedDeleteUrl(parsed.data);
}

export async function storeFileMetadataAction(key: string, subjectdId: number) {
  return await storeFileMetadata(key, subjectdId);
}

export async function deleteFileMetadataAction(key: string) {
  return await deleteFileMetadata(key);
}
