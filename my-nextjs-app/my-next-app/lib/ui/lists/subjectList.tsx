"use client";

import { useState } from "react";
import { AddSubjectForm } from "../forms/addSubjectForm";
import { SubjectItem } from "../items/subjectItem";
import { useSubjects } from "../../../providers/subjectsProvider";
import { withErrorHandling } from "../../../controllers/utils/withErrorHandling";

export function SubjectList() {
  const { subjects, deleteSubject } = useSubjects();
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteSubject(id: number) {
    const success = await withErrorHandling(() => deleteSubject(id), setError);

    if (!success) return;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subjects</h2>
        <AddSubjectForm />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-4">
        {subjects.map((subject) => (
          <SubjectItem
            key={subject.id}
            subject={subject}
            onDelete={handleDeleteSubject}
          />
        ))}
      </div>
    </div>
  );
}
