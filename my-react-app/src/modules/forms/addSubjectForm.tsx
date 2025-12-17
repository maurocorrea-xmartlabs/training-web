import { useState } from "react";
import styles from "./formAnimations.module.css";
import { SubjectFormSchema } from "../../types/subject";

type AddSubjectFormProps = {
  onAddSubject: (name: string, monthlyCost: number) => void;
};

export function AddSubjectForm({ onAddSubject }: AddSubjectFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCost, setSubjectCost] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isHidingButton, setIsHidingButton] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = SubjectFormSchema.safeParse({
      name: subjectName,
      monthlyCost: subjectCost,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    onAddSubject(subjectName, subjectCost);
    setSubjectName("");
    setSubjectCost(0);
    setShowPopup(false);
  }

  function handleShowForm() {
    setIsHidingButton(true);
    setTimeout(() => {
      setShowPopup(true);
      setIsHidingButton(false);
    }, 150);
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="button"
          onClick={handleShowForm}
          className={`
          text-sm
          bg-black text-white
          rounded-md
          px-3 py-1.5
          hover:bg-gray-800
          transition
          ${isHidingButton ? styles.animateButtonOut : ""}
        `}
        >
          + Subject
        </button>
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-200 m-0"
      onClick={() => setShowPopup(false)}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 transition-all duration-200 scale-95 opacity-0 ${styles.animateModalIn}`}
      >
        <h3 className="text-lg font-semibold">New subject</h3>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm font-medium">Subject name</label>
          <input
            type="text"
            placeholder="Algorithms 2"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Monthly cost</label>
          <input
            type="number"
            value={subjectCost}
            onChange={(e) => setSubjectCost(Number(e.target.value))}
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
