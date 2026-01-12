"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getPresignedUploadUrlAction } from "@/app/(app)/resources/action";

type UploadingFile = {
  file: File;
  progress: number;
  uploading: boolean;
  error?: boolean;
};

export function SimpleDropzone() {
  const [files, setFiles] = useState<UploadingFile[]>([]);

  async function uploadFile(file: File) {
    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    try {
      const { presignedUrl } = await getPresignedUploadUrlAction({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

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
          xhr.status === 200 || xhr.status === 204 ? resolve() : reject();

        xhr.onerror = reject;

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, uploading: false, progress: 100 } : f
        )
      );
    } catch {
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, uploading: false, error: true } : f
        )
      );
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mapped = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      uploading: false,
    }));

    setFiles((prev) => [...prev, ...mapped]);
    acceptedFiles.forEach(uploadFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
          ${isDragActive ? "border-black bg-gray-100" : "border-gray-300"}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">
          Drag & drop files here, or click to select
        </p>
      </div>

      <ul className="space-y-2">
        {files.map(({ file, progress, uploading, error }) => (
          <li key={file.name} className="text-sm">
            <div className="flex justify-between">
              <span className="truncate">{file.name}</span>
              <span>{error ? "❌" : uploading ? `${progress}%` : "✅"}</span>
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
