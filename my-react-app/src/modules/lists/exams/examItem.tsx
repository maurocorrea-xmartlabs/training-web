import type { Exam } from "../../../types/exam/exam";

type ExamItemProps = {
  exam: Exam;
  subjectName: string;
  onDelete: (id: string) => void;
};

export function ExamItem({ exam, subjectName, onDelete }: ExamItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Exam for subject: {subjectName}
          </h3>
          <p className="text-sm text-gray-500">
            Minimum score: {exam.minScore}
          </p>
          <p className="text-sm text-gray-500">
            Maximum score: {exam.maxScore}
          </p>
          <p className="text-sm text-gray-500">
            Date: {String(exam.date.toLocaleDateString())}
          </p>
        </div>

        <button
          onClick={() => onDelete(exam.id)}
          type="button"
          className="
    text-sm
    text-red-600
    border border-red-200
    rounded-md
    px-3 py-1.5
    hover:bg-red-50 hover:border-red-300
    active:scale-95
    transition
  "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
