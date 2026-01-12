import type { Exam } from "@/generated/prisma/client";

type Props = {
  exam: Exam;
  subjectName: string;
};

export function ExamItem({ exam, subjectName }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Exam for subject: {subjectName}</h3>

      <p className="text-sm text-gray-500">Minimum score: {exam.minScore}</p>
      <p className="text-sm text-gray-500">Maximum score: {exam.maxScore}</p>
      <p className="text-sm text-gray-500">
        Date: {new Date(exam.date).toLocaleDateString()}
      </p>
    </div>
  );
}
