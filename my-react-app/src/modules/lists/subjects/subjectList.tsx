import { AddSubjectForm } from "../../forms/addSubjectForm";
import { SubjectItem } from "./subjectItem";
import { useSubjects } from "../../../contexts/subjectsContexts";

export function SubjectList() {
  const { subjects, deleteSubject } = useSubjects();

  async function handleDeleteSubject(id: string) {
    await deleteSubject(id);
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
