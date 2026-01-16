"use server";

import {
  DeleteRequest,
  deleteRequestSchema,
  DownloadRequest,
  downloadRequestSchema,
  UploadRequest,
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
import { ActionResult } from "@/types/actionResult";
import { ResourceMetadata } from "@/generated/prisma/client";

export async function getPresignedUploadUrlAction(
  input: UploadRequest
): Promise<ActionResult<{ presignedUrl: string; key: string }>> {
  const parsed = uploadRequestSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid upload request",
    };
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  const result = await createPresignedUploadUrl(parsed.data, sessionId);

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
    };
  }

  return result;
}

export async function getImagePresignedUrlAction(
  input: DownloadRequest
): Promise<ActionResult<{ presignedUrl: string }>> {
  const parsed = downloadRequestSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid download request",
    };
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  return createPresignedDownloadUrl(parsed.data, sessionId);
}

export async function getPresignedDeleteUrlAction(
  input: DeleteRequest
): Promise<ActionResult<{ presignedUrl: string }>> {
  const parsed = deleteRequestSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid delete request",
    };
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  return createPresignedDeleteUrl(parsed.data, sessionId);
}

export async function storeResourceMetadataAction(
  key: string,
  subjectId: number
): Promise<ActionResult<ResourceMetadata>> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  const result = await storeResourceMetadata(key, subjectId, sessionId);

  if (!result.ok) {
    return result;
  }

  revalidatePath("/resources");

  return result;
}

export async function deleteResourceMetadataAction(
  key: string
): Promise<ActionResult<ResourceMetadata>> {
  const parsed = deleteRequestSchema.safeParse({ key: key });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message,
    };
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  return await deleteResourceMetadata(parsed.data.key, sessionId);
}

export async function getResourcesBySubjectAction(subjectId: number) {
  return await getResourcesBySubject(subjectId);
}
