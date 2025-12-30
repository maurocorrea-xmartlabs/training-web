import type { Exam, Subject } from "@/generated/prisma/client";
import { ExamItemClientWrapper } from "../items/examItem/examItemClientWrapper";
import { ExamItem } from "../items/examItem/examItem";
import { AddExamForm } from "../forms/addExamForm";

type ExamListProps = {
  exams: Exam[];
  subjects: Subject[];
};

export function ExamList({ exams, subjects }: ExamListProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Exams</h2>
        <AddExamForm subjects={subjects} />
      </div>

      <div className="space-y-4">
        {exams.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No exams yet</p>
        ) : (
          exams.map((exam) => {
            const subjectName =
              subjects.find((s) => s.id === exam.subjectId)?.name ??
              "Unknown subject";

            return (
              <ExamItemClientWrapper key={exam.id} examId={exam.id}>
                <ExamItem exam={exam} subjectName={subjectName} />
              </ExamItemClientWrapper>
            );
          })
        )}
      </div>
    </div>
  );
}
