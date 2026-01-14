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
import { env } from "@/config/env";

export async function createPresignedUploadUrl(
  data: UploadRequest,
  sessionId?: string,
) {
  const session = await validateUserSession(sessionId);
  if (!session.user.isVerified) {
    throw new Error(
      "You must verify your email before uploading a file, verify it before trying again",
    );
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

  return {
    presignedUrl,
    key,
  };
}

export async function createPresignedDownloadUrl(data: DownloadRequest) {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: data.key,
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5,
  });
}

export async function storeResourceMetadata(
  key: string,
  subjectId: number,
  sessionId?: string,
) {
  await validateUserSession(sessionId);
  return await prisma.resourceMetadata.create({
    data: {
      key: key,
      subjectId: subjectId,
    },
  });
}

export async function deleteResource(key: string, sessionId?: string) {
  await validateUserSession(sessionId);

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
    }),
  );

  return await prisma.resourceMetadata.delete({
    where: {
      key: key,
    },
  });
}

export async function getResourcesBySubject(subjectId: number) {
  return await prisma.resourceMetadata.findMany({
    where: {
      subjectId: subjectId,
    },
  });
}
