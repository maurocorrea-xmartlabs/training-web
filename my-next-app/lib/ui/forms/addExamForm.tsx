"use client";

import { useState } from "react";
import { NewExamSchema } from "../../../types/exam";
import type { Subject } from "../../../types/subject";
import { usePopupForm } from "../../../hooks/usePopupForm";
import { PopupForm } from "./popupForm";
import { withErrorHandling } from "../../../controllers/utils/withErrorHandling";
import styles from "./formAnimations.module.css";

type AddExamFormProps = {
  subjects: Subject[];
  onAddExam: (
    minScore: number,
    maxScore: number,
    date: string,
    subjectId: string
  ) => void;
};

export function AddExamForm({ subjects, onAddExam }: AddExamFormProps) {
  const { showPopup, open, close, error, setError } = usePopupForm();
  const [subjectId, setSubjectId] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(1);
  const [date, setDate] = useState("");
  const [isHidingButton, setIsHidingButton] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!subjectId) {
      setError("Please select a subject");
      return;
    }

    const result = NewExamSchema.safeParse({
      minScore: minScore,
      maxScore: maxScore,
      date: new Date(date),
      subjectId: subjectId,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const success = await withErrorHandling(
      () => onAddExam(minScore, maxScore, date, subjectId),
      setError
    );

    if (!success) return;

    setError(null);

    setSubjectId("");
    setMinScore(0);
    setMaxScore(1);
    setDate("");

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
          text-sm
          bg-black text-white
          rounded-md
          px-3 py-1.5
          hover:bg-gray-800
          transition
          ${isHidingButton ? styles.animateButtonOut : ""}
        `}
        >
          + Exam
        </button>
      </>
    );
  }

  return (
    <PopupForm title="New exam" onRequestClose={close} onSubmit={handleSubmit}>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-1">
        <label className="text-sm font-medium">Select a subject</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="" disabled>
            Select a subject
          </option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Minimum score</label>
        <input
          type="number"
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Maximum score</label>
        <input
          type="number"
          value={maxScore}
          onChange={(e) => setMaxScore(Number(e.target.value))}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </PopupForm>
  );
}
