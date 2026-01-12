"use client";

import { useState } from "react";
import styles from "../itemAnimations.module.css";
import { deleteTaskAction } from "@/app/(app)/todo/actions";

type Props = {
  taskId: number;
  children: React.ReactNode;
};

export function TaskItemClientWrapper({ taskId, children }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTaskAction(taskId);
    }, 150);
  }

  return (
    <div
      className={`
        flex items-start
        rounded-md border border-gray-200 bg-white
        px-4 py-3
        ${isDeleting ? styles.animateItemOut : ""}
      `}
    >
      <div className="flex-1 min-w-0">{children}</div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="
          text-sm text-red-600 border border-red-200 rounded-md
          px-3 py-1 hover:bg-red-50 active:scale-95 transition
        "
      >
        Delete
      </button>
    </div>
  );
}
