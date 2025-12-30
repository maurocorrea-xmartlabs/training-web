import type { Subject } from "@/generated/prisma/client";
import { AddSubjectForm } from "../forms/addSubjectForm";
import { SubjectItemClientWrapper } from "../items/subjectItem/subjectItemClientWrapper";
import { SubjectItem } from "../items/subjectItem/subjectItem";

type SubjectListProps = {
  subjects: Subject[];
};

export function SubjectList({ subjects }: SubjectListProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subjects</h2>
        <AddSubjectForm />
      </div>

      <div className="space-y-4 flex flex-col items-center">
        {subjects.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No subjects yet</p>
        ) : (
          subjects.map((subject) => (
            <SubjectItemClientWrapper key={subject.id} subjectId={subject.id}>
              <SubjectItem subject={subject} />
            </SubjectItemClientWrapper>
          ))
        )}
      </div>
    </div>
  );
}
