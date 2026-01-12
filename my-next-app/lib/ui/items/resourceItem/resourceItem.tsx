"use client";

import { useEffect, useState } from "react";
import type { ResourceMetadata } from "@/generated/prisma/client";
import { getImagePresignedUrlAction } from "@/app/(app)/resources/action";
import Image from "next/image";

type Props = {
  resource: ResourceMetadata;
};

export function ResourceItem({ resource }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      const presignedUrl = await getImagePresignedUrlAction({
        key: resource.key,
      });

      setImageUrl(presignedUrl);
    }

    loadImage();
  }, [resource.key]);

  return (
    <div className="space-y-2">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Resource"
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <div className="w-full aspect-square rounded-md border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
          Loading…
        </div>
      )}

      <p className="text-xs text-gray-500 truncate">
        {resource.key.split("-").slice(1).join("-")}
      </p>
    </div>
  );
}
