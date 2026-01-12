import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3/s3Client";
import { v4 as uuidv4 } from "uuid";
import { uploadRequest, deleteRequest } from "@/types/uploadRequest";

export async function createPresignedUploadUrl(data: uploadRequest) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;
  const region = process.env.AWS_S3_REGION!;

  const key = `${uuidv4()}-${data.filename}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: data.contentType,
    ContentLength: data.size,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(
    key
  )}`;

  return {
    presignedUrl,
    key,
    publicUrl,
  };
}

export async function createPresignedDeleteUrl(data: deleteRequest) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;
  const region = process.env.AWS_S3_REGION!;

  const key = `${uuidv4()}-${data.filename}`;

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(
    key
  )}`;

  return {
    presignedUrl,
    key,
    publicUrl,
  };
}
