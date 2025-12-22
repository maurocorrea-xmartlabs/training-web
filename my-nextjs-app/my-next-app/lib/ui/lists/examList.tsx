"use client";

import { useState } from "react";
import type { NewExam } from "../../../types/exam";
import type { Exam } from "@/generated/prisma/client";
import type { Subject } from "@/generated/prisma/client";
import { AddExamForm } from "../forms/addExamForm";
import { ExamItem } from "../items/examItem";
import {
  postExam,
  deleteExam,
  getExams,
} from "../../../controllers/examController";
import { withErrorHandling } from "../../../controllers/utils/withErrorHandling";

type ExamListProps = {
  exams: Exam[];
  subjects: Subject[];
};

export function ExamList({ exams: initialExams, subjects }: ExamListProps) {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [error, setError] = useState<string | null>(null);

  async function reloadExams() {
    const updated = await withErrorHandling(() => getExams(), setError);

    if (updated) setExams(updated);
  }

  async function handleAddExam(
    minScore: number,
    maxScore: number,
    date: string,
    subjectId: number
  ) {
    const newExam: NewExam = {
      minScore,
      maxScore,
      date: new Date(date),
      subjectId,
    };

    const success = await withErrorHandling(() => postExam(newExam), setError);

    if (!success) return;

    await reloadExams();
  }

  async function handleDeleteExam(id: number) {
    const success = await withErrorHandling(() => deleteExam(id), setError);

    if (!success) return;

    await reloadExams();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Exams</h2>
        <AddExamForm subjects={subjects} onAddExam={handleAddExam} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-4">
        {exams.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No exams yet</p>
        ) : (
          exams.map((exam) => (
            <ExamItem
              key={exam.id}
              exam={exam}
              subjectName={
                subjects.find((s) => s.id === exam.subjectId)?.name ??
                "Unknown subject"
              }
              onDelete={handleDeleteExam}
            />
          ))
        )}
      </div>
    </div>
  );
}
