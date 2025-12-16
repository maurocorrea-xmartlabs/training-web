import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject";
import AddSubjectForm from "../../forms/addSubjectForm";
import SubjectItem from "./subjectItem";
import type { NewSubject } from "../../../types/subject";
import SubjectController from "../../../controllers/subjectController";

export default function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const subjectController = new SubjectController();

  async function loadSubjects() {
    const newSubjectList = await subjectController.getSubjects();
    setSubjects(newSubjectList || []);
  }

  useEffect(() => {
    loadSubjects();
  }, []);

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
