import { useState } from "react";
import { SubjectFormSchema } from "../../types/subject";

type AddSubjectFormProps = {
  onAddSubject: (name: string, monthlyCost: number) => void;
};

export default function AddSubjectForm({ onAddSubject }: AddSubjectFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCost, setSubjectCost] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!subjectName.trim()) {
      setError("Subject must have a name");
    }

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

  if (!showPopup) {
    return (
      <>
        {error && <p className="error">{error}</p>}
        <button onClick={() => setShowPopup(true)}>+</button>
      </>
    );
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <div className="formFieldDiv">
            <label htmlFor="subjectName"> Subject Name </label>
            <input
              id="subjectName"
              type="text"
              placeholder="Algorithms 2"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div className="formFieldDiv">
            <label htmlFor="subjectCost"> Monthly Cost </label>
            <input
              id="subjectCost"
              type="number"
              placeholder="Monthly "
              value={subjectCost}
              onChange={(e) => setSubjectCost(Number(e.target.value))}
            ></input>
          </div>
          <button type="submit">Add Subject</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </form>
      </div>
    </>
  );
}
