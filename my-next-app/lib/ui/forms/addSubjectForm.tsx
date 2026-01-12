"use client";

import { useState } from "react";
import { SubjectFormSchema } from "../../../types/subject";
import { usePopupForm } from "../../../hooks/usePopupForm";
import { PopupForm } from "./popupForm";
import styles from "./formAnimations.module.css";
import { createSubjectAction } from "@/app/(app)/todo/actions";
import { withErrorHandling } from "@/services/utils/withErrorHandling";

export function AddSubjectForm() {
  const { showPopup, open, close, error, setError } = usePopupForm();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCost, setSubjectCost] = useState(0);
  const [isHidingButton, setIsHidingButton] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = SubjectFormSchema.safeParse({
      name: subjectName,
      monthlyCost: subjectCost,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const success = await withErrorHandling(
      () => createSubjectAction(parsed.data),
      setError
    );
    if (!success) return;

    setSubjectName("");
    setSubjectCost(0);
    close();
  }

  function handleShowForm() {
    setIsHidingButton(true);
    setTimeout(() => {
      open();
      setIsHidingButton(false);
    }, 150);
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="button"
          onClick={handleShowForm}
          className={`
            text-sm bg-black text-white rounded-md
            px-3 py-1.5 hover:bg-gray-800 transition
            ${isHidingButton ? styles.animateButtonOut : ""}
          `}
        >
          + Subject
        </button>
      </>
    );
  }

  return (
    <PopupForm
      title="New Subject"
      onRequestClose={close}
      onSubmit={handleSubmit}
    >
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-1">
        <label className="text-sm font-medium">Subject name</label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="
          w-full rounded-md border px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-black
        "
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Monthly cost</label>
        <input
          type="number"
          value={subjectCost}
          onChange={(e) => setSubjectCost(Number(e.target.value))}
          className="
          w-full rounded-md border px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-black
        "
        />
      </div>
    </PopupForm>
  );
}
