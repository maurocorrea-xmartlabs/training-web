import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3/s3Client";
import { v4 as uuidv4 } from "uuid";
import {
  UploadRequest,
  DeleteRequest,
  DownloadRequest,
} from "@/types/uploadRequest";
import { prisma } from "../prisma/prisma";
import { validateUserSession } from "./authService";
import { ActionResult } from "@/types/actionResult";
import { ResourceMetadata } from "@/generated/prisma/client";

export async function createPresignedUploadUrl(
  data: UploadRequest,
  sessionId?: string
): Promise<ActionResult<{ presignedUrl: string; key: string }>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  if (!sessionResult.data.user.isVerified) {
    return {
      ok: false,
      error:
        "You must verify your email before uploading a file, verify it before trying again",
    };
  }

  const bucketName = process.env.AWS_S3_BUCKET_NAME!;

  const key = `${uuidv4()}#${data.filename}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: data.contentType,
    ContentLength: data.size,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  return { ok: true, data: { presignedUrl, key } };
}

export async function createPresignedDeleteUrl(
  data: DeleteRequest,
  sessionId?: string
): Promise<ActionResult<{ presignedUrl: string }>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  if (!sessionResult.data.user.isVerified) {
    return {
      ok: false,
      error: "You must verify your email before deleting a file",
    };
  }

  const bucketName = process.env.AWS_S3_BUCKET_NAME!;

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: data.key,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  return {
    ok: true,
    data: { presignedUrl },
  };
}

export async function createPresignedDownloadUrl(
  data: DownloadRequest,
  sessionId?: string
): Promise<ActionResult<{ presignedUrl: string }>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  const bucketName = process.env.AWS_S3_BUCKET_NAME!;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: data.key,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5,
  });

  return {
    ok: true,
    data: { presignedUrl },
  };
}

export async function storeResourceMetadata(
  key: string,
  subjectId: number,
  sessionId?: string
): Promise<ActionResult<ResourceMetadata>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  const result = await prisma.resourceMetadata.create({
    data: {
      key,
      subjectId,
    },
  });

  return { ok: true, data: result };
}

export async function deleteResourceMetadata(
  key: string,
  sessionId?: string
): Promise<ActionResult<ResourceMetadata>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    const result = await prisma.resourceMetadata.delete({
      where: { key },
    });

    return { ok: true, data: result };
  } catch (error) {
    console.error("Error deleting resource metadata:", error);
    return {
      ok: false,
      error: "Error deleting resource metadata, please try again",
    };
  }
}

export async function getResourcesBySubject(
  subjectId: number
): Promise<ActionResult<ResourceMetadata[]>> {
  try {
    const resources = await prisma.resourceMetadata.findMany({
      where: {
        subjectId,
      },
    });

    return { ok: true, data: resources };
  } catch (error) {
    console.error("Error fetching resources by subject:", error);
    return {
      ok: false,
      error: "Error loading resources, please try again",
    };
  }
}
