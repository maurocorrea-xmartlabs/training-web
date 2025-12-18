import { useState } from "react";
import { SubjectFormSchema } from "../../types/subject";
import { usePopupForm } from "../hooks/usePopupForm";
import { PopupForm } from "../utils/popupForm";
import { useSubjects } from "../../contexts/subjectsContexts";
import { withErrorHandlingVoid } from "../../controllers/utils/withErrorHandlingVoid";

export function AddSubjectForm() {
  const { addSubject } = useSubjects();
  const { showPopup, open, close, error, setError } = usePopupForm();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCost, setSubjectCost] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = SubjectFormSchema.safeParse({
      name: subjectName,
      monthlyCost: subjectCost,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const success = await withErrorHandlingVoid(
      () => addSubject(subjectName, subjectCost),
      setError,
    );

    if (!success) return;

    setError(null);
    setSubjectName("");
    setSubjectCost(0);
    close();
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <button
          type="button"
          onClick={open}
          className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800 transition"
        >
          + Subject
        </button>
      </>
    );
  }

  return (
    <PopupForm title="New Subject" onClose={close} onSubmit={handleSubmit}>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-1">
        <label className="text-sm font-medium">Subject name</label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="
          w-full rounded-md border px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-black
        "
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Monthly cost</label>
        <input
          type="number"
          value={subjectCost}
          onChange={(e) => setSubjectCost(Number(e.target.value))}
          className="
          w-full rounded-md border px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-black
        "
        />
      </div>
    </PopupForm>
  );
}
