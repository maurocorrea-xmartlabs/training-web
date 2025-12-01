import { useState } from "react";

type AddSubjectFormProps = {
  onAddSubject: (name: string, monthlyCost: number) => void;
};

export default function AddSubjectForm({ onAddSubject }: AddSubjectFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCost, setSubjectCost] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!subjectName.trim()) return;

    onAddSubject(subjectName, subjectCost);
    setSubjectName("");
    setSubjectCost(0);
    setShowPopup(false);
  }

  return (
    <>
      {!showPopup && <button onClick={() => setShowPopup(true)}>+</button>}
      {showPopup && (
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
      )}
    </>
  );
}
