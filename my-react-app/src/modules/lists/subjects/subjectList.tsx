import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject/subject";
import {AddSubjectForm} from "../../forms/addSubjectForm";
import {SubjectItem} from "./subjectItem";
import type { NewSubject } from "../../../types/subject/newSubject";
import {SubjectController} from "../../../controllers/subjectController";

export function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const subjectController = new SubjectController();

  async function loadSubjects() {
    const newSubjectList = await subjectController.getSubjects();
    setSubjects(newSubjectList!);
  }

  useEffect(() => {
    loadSubjects();
  });

  async function handleAddSubject(name: string, monthlyCost: number) {
    const newSubject: NewSubject = {
      name: name,
      monthlyCost: monthlyCost,
    };

    await subjectController.postSubject(newSubject);
    loadSubjects();
  }

  async function handleDeleteSubject(id: string) {
    await subjectController.deleteSubject(id);
    loadSubjects();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subjects</h2>
        <AddSubjectForm onAddSubject={handleAddSubject} />
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
