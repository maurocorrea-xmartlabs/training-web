"use client";

// I'm adding these comments because I think these warnings are false positives, I've tried to solve them but I couldn't
/* eslint-disable
  react-you-might-not-need-an-effect/no-pass-data-to-parent,
  react-you-might-not-need-an-effect/no-derived-state
*/

import { useEffect, useState } from "react";
import type { ResourceMetadata } from "@/generated/prisma/client";
import {
  deleteResourceMetadataAction,
  getImagePresignedUrlAction,
  getPresignedDeleteUrlAction,
} from "@/app/(app)/resources/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import {
  deleteRequestSchema,
  downloadRequestSchema,
} from "@/types/uploadRequest";

type Props = {
  resource: ResourceMetadata;
};

export function ResourceItem({ resource }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      const parsed = downloadRequestSchema.safeParse({ key: resource.key });

      if (!parsed.success) {
        setImageError("Invalid download request");
        return;
      }

      const result = await getImagePresignedUrlAction(parsed.data);

      if (!result.ok) {
        setImageError(result.error);

        showToast.error(result.error, {
          duration: 5000,
          position: "bottom-right",
        });
        return;
      }

      setImageUrl(result.data.presignedUrl);
    }

    loadImage();
  }, [resource.key]);

  async function handleDelete() {
    if (isDeleting) return;

    setIsDeleting(true);

    const parsed = deleteRequestSchema.safeParse({ key: resource.key });

    if (!parsed.success) {
      showToast.error("Invalid delete request");
      setIsDeleting(false);
      return;
    }

    const presignedResult = await getPresignedDeleteUrlAction(parsed.data);

    if (!presignedResult.ok) {
      showToast.error(presignedResult.error, {
        duration: 5000,
        position: "bottom-right",
      });
      setIsDeleting(false);
      return;
    }

    try {
      await fetch(presignedResult.data.presignedUrl, {
        method: "DELETE",
      });

      const metadataResult = await deleteResourceMetadataAction(resource.key);

      if (!metadataResult.ok) {
        showToast.error(metadataResult.error, {
          duration: 5000,
          position: "bottom-right",
        });
        setIsDeleting(false);
        return;
      }

      router.refresh();
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? error.message
          : "Unexpected error deleting resource",
        {
          duration: 5000,
          position: "bottom-right",
        },
      );
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div
        className={`
          relative space-y-2 w-40
          rounded-md border border-gray-200 bg-white p-2
          ${isDeleting ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <button
          type="button"
          onClick={handleDelete}
          className="
            absolute top-2 right-2 z-10
            text-xs text-red-600 bg-white border border-red-200
            rounded px-2 py-0.5
            hover:bg-red-50 active:scale-95 transition
          "
        >
          Delete
        </button>

        <div
          className="rounded-md overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => imageUrl && !imageError && setIsOpen(true)}
        >
          {imageError ? (
            <div className="h-40 flex items-center justify-center text-xs text-gray-400">
              Image unavailable
            </div>
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt="Resource"
              width={160}
              height={160}
              className="object-cover w-full h-auto"
              unoptimized
            />
          ) : (
            <div className="h-40 flex items-center justify-center text-xs text-gray-400">
              Loading…
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 truncate">
          {resource.key.split("#")[1]}
        </p>
      </div>

      {isOpen && imageUrl && !imageError && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt="Resource preview"
              width={1200}
              height={1200}
              className="object-contain rounded"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
