import { useState } from "react";
import { ProjectFormSchema } from "../../types/project/projectFormSchema";

type AddProjectFormProps = {
  onAddProject: (name: string, monthlyCost: number) => void;
};

export default function AddProjectForm({ onAddProject }: AddProjectFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectWeight, setProjectWeight] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = ProjectFormSchema.safeParse({
      name: projectName,
      weight: projectWeight,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    onAddProject(projectName, projectWeight);
    setProjectName("");
    setProjectWeight(0);
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
            <label htmlFor="projectName">Project Name</label>
            <input
              id="projectName"
              type="text"
              placeholder="Obligatorio 1"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="formFieldDiv">
            <label htmlFor="projectWeight">Weight</label>
            <input
              id="projectWeight"
              type="number"
              placeholder="200"
              value={projectWeight}
              onChange={(e) => setProjectWeight(Number(e.target.value))}
            ></input>
          </div>
          <button type="submit">Add Project</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </form>
      </div>
    </>
  );
}
