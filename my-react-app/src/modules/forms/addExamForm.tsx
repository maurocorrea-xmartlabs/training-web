import { useState } from "react";
import { NewExamSchema } from "../../types/exam/newExam";
import type { Subject } from "../../types/subject/subject";

type AddExamFormProps = {
  subjects: Subject[];
  onAddExam: (
    minScore: number,
    maxScore: number,
    date: string,
    subjectId: string,
  ) => void;
};

export function AddExamForm({ subjects, onAddExam }: AddExamFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(1);
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = NewExamSchema.safeParse({
      minScore: minScore,
      maxScore: maxScore,
      date: new Date(date),
      subjectId: subjectId,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    onAddExam(minScore, maxScore, date, subjectId);
    setSubjectId("");
    setMinScore(0);
    setMaxScore(1);
    setDate(String(new Date()));
    setShowPopup(false);
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800"
        >
          + Subject
        </button>
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-200"
      onClick={() => setShowPopup(false)}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 transition-all duration-200 scale-95 opacity-0 animate-modal-in"
      >
        <h3 className="text-lg font-semibold">New exam</h3>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm font-medium">Select a subject</label>

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled>
              Select a subject
            </option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Minimum score</label>
          <input
            type="number"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Maximum score</label>
          <input
            type="number"
            value={maxScore}
            onChange={(e) => setMaxScore(Number(e.target.value))}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
