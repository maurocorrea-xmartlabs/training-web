import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3/s3Client";
import { v4 as uuidv4 } from "uuid";
import { UploadRequest, DownloadRequest } from "@/types/uploadRequest";
import { prisma } from "../prisma/prisma";
import { validateUserSession } from "./authService";
import { ActionResult } from "@/types/actionResult";
import { ResourceMetadata } from "@/generated/prisma/client";
import { env } from "@/config/env";

export async function createPresignedUploadUrl(
  data: UploadRequest,
  sessionId?: string,
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

  const key = `${uuidv4()}#${data.filename}`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType: data.contentType,
    ContentLength: data.size,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  return { ok: true, data: { presignedUrl, key } };
}

export async function createPresignedDownloadUrl(
  data: DownloadRequest,
  sessionId?: string,
): Promise<ActionResult<{ presignedUrl: string }>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
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
  sessionId?: string,
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

export async function deleteResource(
  key: string,
  sessionId?: string,
): Promise<ActionResult<ResourceMetadata>> {
  const sessionResult = await validateUserSession(sessionId);

  if (!sessionResult.ok) {
    return sessionResult;
  }

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: key,
      }),
    );

    const result = await prisma.resourceMetadata.delete({
      where: { key },
    });

    return { ok: true, data: result };
  } catch (error) {
    console.error("Error deleting resource:", error);
    return {
      ok: false,
      error: "Error deleting resource, please try again",
    };
  }
}

export async function getResourcesBySubject(
  subjectId: number,
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
