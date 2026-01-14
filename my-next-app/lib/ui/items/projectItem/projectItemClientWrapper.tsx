"use client";

import { useState } from "react";
import styles from "../itemAnimations.module.css";
import { deleteProjectAction } from "@/app/(app)/todo/actions";

type Props = {
  projectId: number;
  children: React.ReactNode;
};

export function ProjectItemClientWrapper({ projectId, children }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);

    setTimeout(async () => {
      try {
        await deleteProjectAction(projectId);
      } catch (error) {
        setIsDeleting(false);
      }
    }, 150);
  }

  return (
    <div
      className={`
        relative
        bg-white rounded-xl shadow-sm border p-5
        w-full
        ${isDeleting ? styles.animateItemOut : ""}
      `}
    >
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="
          absolute top-3 right-3
          text-sm text-red-600 border border-red-200 rounded-md
          px-3 py-1 hover:bg-red-50 active:scale-95 transition
        "
      >
        Delete
      </button>

      {children}
    </div>
  );
}
