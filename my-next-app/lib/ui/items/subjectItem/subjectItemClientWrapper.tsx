"use client";

import { useState } from "react";
import styles from "../itemAnimations.module.css";
import { deleteSubjectAction } from "@/app/(app)/todo/actions";

type Props = {
  subjectId: number;
  children: React.ReactNode;
};

export function SubjectItemClientWrapper({ subjectId, children }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      deleteSubjectAction(subjectId);
    }, 150);
  }

  return (
    <div
      className={`
        relative
        bg-white rounded-xl shadow-sm border p-6
        w-full
        ${isDeleting ? styles.animateItemOut : ""}
      `}
    >
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="
          absolute top-4 right-4
          text-sm text-red-600 border border-red-200 rounded-md
          px-3 py-1.5 hover:bg-red-50 hover:border-red-300
          active:scale-95 transition
        "
      >
        Delete
      </button>

      {children}
    </div>
  );
}
