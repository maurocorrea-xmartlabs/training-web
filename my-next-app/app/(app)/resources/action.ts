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
  createPresignedDownloadUrl,
  createPresignedUploadUrl,
  deleteResource,
  getResourcesBySubject,
  storeResourceMetadata,
} from "@/services/s3Service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getPresignedUploadUrlAction(input: UploadRequest) {
  const parsed = uploadRequestSchema.safeParse(input);
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  return await createPresignedUploadUrl(parsed.data, sessionId);
}

export async function getImagePresignedUrlAction(input: DownloadRequest) {
  const parsed = downloadRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }
  return createPresignedDownloadUrl(parsed.data);
}

export async function storeResourceMetadataAction(
  key: string,
  subjectdId: number,
) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  await storeResourceMetadata(key, subjectdId, sessionId);
  revalidatePath("/resources");
}

export async function deleteResourceAction(input: DeleteRequest) {
  const parsed = deleteRequestSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  return await deleteResource(parsed.data.key, sessionId);
}

export async function getResourcesBySubjectAction(subjectId: number) {
  return await getResourcesBySubject(subjectId);
}
