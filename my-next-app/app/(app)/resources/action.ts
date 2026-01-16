"use server";

import {
  DeleteRequest,
  DownloadRequest,
  UploadRequest,
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

export async function getPresignedUploadUrlAction(input: UploadRequest) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  return await createPresignedUploadUrl(input, sessionId);
}

export async function getImagePresignedUrlAction(input: DownloadRequest) {
  return createPresignedDownloadUrl(input);
}

export async function getPresignedDeleteUrlAction(input: DeleteRequest) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  return await createPresignedDeleteUrl(input, sessionId);
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
