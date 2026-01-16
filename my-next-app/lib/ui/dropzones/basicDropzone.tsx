"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  getPresignedUploadUrlAction,
  storeResourceMetadataAction,
} from "@/app/(app)/resources/action";
import { Subject } from "@/generated/prisma/browser";
import { uploadRequestSchema } from "@/types/uploadRequest";

type UploadingFile = {
  file: File;
  progress: number;
  uploading: boolean;
  error?: string;
};

type Props = {
  subjects: Subject[];
};

export function SimpleDropzone({ subjects }: Props) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [subjectId, setSubjectId] = useState<number | null>(null);

  async function uploadFile(file: File) {
    if (!subjectId) return;

    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    const parsed = uploadRequestSchema.safeParse({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });

    if (!parsed.success) {
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? {
                ...f,
                uploading: false,
                error:
                  parsed.error.issues[0]?.message ?? "Invalid upload request",
              }
            : f
        )
      );
      return;
    }

    const presignedResult = await getPresignedUploadUrlAction(parsed.data);

    if (!presignedResult.ok) {
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? {
                ...f,
                uploading: false,
                error: presignedResult.error,
              }
            : f
        )
      );
      return;
    }

    const { presignedUrl, key } = presignedResult.data;

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setFiles((prev) =>
              prev.map((f) => (f.file === file ? { ...f, progress } : f))
            );
          }
        };

        xhr.onload = () =>
          xhr.status === 200 || xhr.status === 204
            ? resolve()
            : reject(new Error("Upload failed"));

        xhr.onerror = () => reject(new Error("Network error during upload"));

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      const metadataResult = await storeResourceMetadataAction(key, subjectId);

      if (!metadataResult.ok) {
        setFiles((prev) =>
          prev.map((f) =>
            f.file === file
              ? {
                  ...f,
                  uploading: false,
                  error: metadataResult.error,
                }
              : f
          )
        );
        return;
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, uploading: false, progress: 100 } : f
        )
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? {
                ...f,
                uploading: false,
                error:
                  error instanceof Error
                    ? error.message
                    : "Unexpected error occurred",
              }
            : f
        )
      );
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!subjectId) return;

      const mapped = acceptedFiles.map((file) => ({
        file,
        progress: 0,
        uploading: false,
      }));

      setFiles((prev) => [...prev, ...mapped]);
      acceptedFiles.forEach(uploadFile);
    },
    [subjectId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !subjectId,
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="subject">
          Subject
        </label>
        <select
          value={subjectId ?? ""}
          onChange={(e) => setSubjectId(Number(e.target.value))}
          id="subject"
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select a subject
          </option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
          ${isDragActive ? "border-black bg-gray-100" : "border-gray-300"}
          ${!subjectId ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">
          {subjectId
            ? "Drag & drop files here, or click to select"
            : "Select a subject to upload files"}
        </p>
      </div>

      <ul className="space-y-2">
        {files.map(({ file, progress, uploading, error }) => (
          <li key={file.name} className="text-sm">
            <div className="flex justify-between">
              <span className="truncate">{file.name}</span>
              <span className={error ? "text-red-600" : ""}>
                {error ? `✗ ${error}` : uploading ? `${progress}%` : "✔"}
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded">
              <div
                className="h-1 bg-black rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
