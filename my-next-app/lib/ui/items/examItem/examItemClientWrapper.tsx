"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../itemAnimations.module.css";
import { deleteExamAction } from "@/app/(app)/exams/actions";

type Props = {
  examId: number;
  children: React.ReactNode;
};

export function ExamItemClientWrapper({ examId, children }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);

    setTimeout(async () => {
      try {
        await deleteExamAction(examId);
      } catch (error) {
        setIsDeleting(false);
      }
    }, 150);
  }

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border p-5 space-y-4
        ${isDeleting ? styles.animateItemOut : ""}
      `}
    >
      <div className="flex items-start justify-between">
        {children}

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            text-sm
            text-red-600
            border border-red-200
            rounded-md
            px-3 py-1.5
            hover:bg-red-50 hover:border-red-300
            active:scale-95
            transition
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
