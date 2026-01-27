"use server";

import {
  deleteRequestSchema,
  DownloadRequest,
  downloadRequestSchema,
  UploadRequest,
  uploadRequestSchema,
} from "@/types/uploadRequest";
import {
  createPresignedDownloadUrl,
  createPresignedUploadUrl,
  deleteResource,
  getResourcesBySubject,
  storeResourceMetadata,
} from "@/services/s3Service";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/actionResult";
import { ResourceMetadata } from "@/generated/prisma/client";
import { getSessionId } from "@/lib/auth/getSessionId";

export async function getPresignedUploadUrlAction(
  input: UploadRequest,
): Promise<ActionResult<{ presignedUrl: string; key: string }>> {
  const parsed = uploadRequestSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid upload request",
    };
  }

  const sessionId = await getSessionId();

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
  input: DownloadRequest,
): Promise<ActionResult<{ presignedUrl: string }>> {
  const parsed = downloadRequestSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid download request",
    };
  }

  const sessionId = await getSessionId();

  return createPresignedDownloadUrl(parsed.data, sessionId);
}

export async function storeResourceMetadataAction(
  key: string,
  subjectId: number,
): Promise<ActionResult<ResourceMetadata>> {
  const sessionId = await getSessionId();

  const result = await storeResourceMetadata(key, subjectId, sessionId);

  if (!result.ok) {
    return result;
  }

  revalidatePath("/resources");

  return result;
}

export async function deleteResourceAction(
  key: string,
): Promise<ActionResult<ResourceMetadata>> {
  const parsed = deleteRequestSchema.safeParse({ key: key });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message,
    };
  }

  const sessionId = await getSessionId();
  return await deleteResource(parsed.data.key, sessionId);
}

export async function getResourcesBySubjectAction(subjectId: number) {
  return await getResourcesBySubject(subjectId);
}
