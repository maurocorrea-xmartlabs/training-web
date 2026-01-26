"use client";

import { useEffect, useState } from "react";
import type { ResourceMetadata } from "@/generated/prisma/client";
import {
  deleteResourceAction,
  getImagePresignedUrlAction,
} from "@/app/(app)/resources/action";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  resource: ResourceMetadata;
};

export function ResourceItem({ resource }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadImage() {
      const presignedUrl = await getImagePresignedUrlAction({
        key: resource.key,
      });

      setImageUrl(presignedUrl);
    }

    loadImage();
  }, [resource.key]);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteResourceAction({ key: resource.key });
      router.refresh();
    } catch (error) {
      alert("Error deleting resource, please try again");
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
          onClick={() => imageUrl && setIsOpen(true)}
        >
          {imageUrl ? (
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

      {isOpen && imageUrl && (
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
