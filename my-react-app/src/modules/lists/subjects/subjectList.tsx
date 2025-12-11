import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject/subject";
import { AddSubjectForm } from "../../forms/addSubjectForm";
import { SubjectItem } from "./subjectItem";
import {
  getSubjects,
  deleteSubject,
} from "../../../controllers/subjectController";

export function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  async function loadSubjects() {
    const newSubjectList = await getSubjects();
    setSubjects(newSubjectList!);
  }

  useEffect(() => {
    loadSubjects();
  });

  async function handleDeleteSubject(id: string) {
    await deleteSubject(id);
    loadSubjects();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subjects</h2>
        <AddSubjectForm />
      </div>

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
