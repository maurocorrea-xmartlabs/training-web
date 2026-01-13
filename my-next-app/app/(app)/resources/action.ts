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
  deleteResourceMetadata,
  getResourcesBySubject,
  storeResourceMetadata,
} from "@/services/s3Service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function getPresignedUploadUrlAction(input: uploadRequest) {
  const parsed = uploadRequestSchema.safeParse(input);
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!parsed.success) {
    throw new Error("Invalid upload request");
  }

  if (parsed.data.size > MAX_FILE_SIZE) {
    throw new Error("File size must be lower than 5 MB");
  }

  if (!ALLOWED_TYPES.includes(parsed.data.contentType)) {
    throw new Error("File must be an image");
  }

  return await createPresignedUploadUrl(parsed.data, sessionId);
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
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!parsed.success) {
    throw new Error("Invalid delete request");
  }

  return await createPresignedDeleteUrl(parsed.data, sessionId);
}

export async function storeResourceMetadataAction(
  key: string,
  subjectdId: number
) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await storeResourceMetadata(key, subjectdId, sessionId);
  revalidatePath("/resources");
}

export async function deleteResourceMetadataAction(key: string) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  return await deleteResourceMetadata(key, sessionId);
}

export async function getResourcesBySubjectAction(subjectId: number) {
  return await getResourcesBySubject(subjectId);
}
