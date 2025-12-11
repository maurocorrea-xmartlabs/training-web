import { useState } from "react";
import type { Subject } from "../../../types/subject/subject";
import AddSubjectForm from "../../forms/addSubjectForm";
import SubjectItem from "./subjectItem";

export default function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  function handleAddSubject(name: string, monthlyCost: number) {
    const nextId = subjects.length + 1;
    const newSubject: Subject = {
      id: nextId,
      name: name,
      monthlyCost: monthlyCost,
    };
    setSubjects([...subjects, newSubject]);
  }

  function handleDeleteSubject(id: number) {
    setSubjects(subjects.filter((s) => s.id !== id));
  }

  return (
    <div>
      <h2>Subjects</h2>
      <AddSubjectForm onAddSubject={handleAddSubject} />
      {subjects.map((subject) => (
        <SubjectItem
          key={subject.id}
          subject={subject}
          onDelete={handleDeleteSubject}
        />
      ))}
    </div>
  );
}
