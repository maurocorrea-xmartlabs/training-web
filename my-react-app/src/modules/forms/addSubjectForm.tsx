import { useState } from "react";
import { SubjectFormSchema } from "../../types/subject/subjectFormSchema";
import { usePopupForm } from "../hooks/usePopupForm";
import { PopupForm } from "../utils/popupForm";
import { useSubjects } from "../../contexts/subjectsContexts";

export function AddSubjectForm() {
  const { addSubject } = useSubjects();
  const { showPopup, open, close, error, setError } = usePopupForm();

  const [subjectName, setSubjectName] = useState("");
  const [subjectCost, setSubjectCost] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    addSubject(subjectName, subjectCost);

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
          className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800"
        >
          + Subject
        </button>
      </>
    );
  }

  return (
    <PopupForm title="New Subject" onClose={close} onSubmit={handleSubmit}>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label>Subject name</label>
        <input
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </div>

      <div>
        <label>Monthly cost</label>
        <input
          type="number"
          value={subjectCost}
          onChange={(e) => setSubjectCost(Number(e.target.value))}
        />
      </div>
    </PopupForm>
  );
}
