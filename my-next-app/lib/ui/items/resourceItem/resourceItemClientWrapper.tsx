"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../itemAnimations.module.css";
import {
  getPresignedDeleteUrlAction,
  deleteResourceMetadataAction,
  getImagePresignedUrlAction,
} from "@/app/(app)/resources/action";

type Props = {
  resourceKey: string;
  children: React.ReactNode;
};

export function ResourceItemClientWrapper({ resourceKey, children }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const { presignedUrl } = await getPresignedDeleteUrlAction({
        key: resourceKey,
      });

      const s3Response = await fetch(presignedUrl, {
        method: "DELETE",
      });

      if (!s3Response.ok) {
        throw new Error("Failed to delete S3 resource");
      }

      await deleteResourceMetadataAction(resourceKey);
    } catch (error) {
      setIsDeleting(false);

      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        router.push("/logIn");
        return;
      }

      console.error(error);
      alert("Failed to delete resource");
    }
  }

  useEffect(() => {
    async function loadImage() {
      const presignedUrl = await getImagePresignedUrlAction({
        key: resourceKey,
      });
      setImageUrl(presignedUrl);
    }

    loadImage();
  }, [resourceKey]);

  return (
    <div
      className={`
        relative
        rounded-md border border-gray-200 bg-white
        p-3
        ${isDeleting ? styles.animateItemOut : ""}
      `}
    >
      <div>{children}</div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="
          absolute top-2 right-2
          text-xs text-red-600 border border-red-200 rounded
          px-2 py-0.5 hover:bg-red-50 active:scale-95 transition
        "
      >
        Delete
      </button>
    </div>
  );
}
