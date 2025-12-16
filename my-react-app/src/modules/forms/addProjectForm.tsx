import { useState } from "react";
import styles from "./formAnimations.module.css";
import { ProjectFormSchema } from "../../types/project";

type AddProjectFormProps = {
  onAddProject: (name: string, monthlyCost: number) => void;
};

export function AddProjectForm({ onAddProject }: AddProjectFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectCredits, setProjectCredits] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = ProjectFormSchema.safeParse({
      name: projectName,
      credits: projectCredits,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    onAddProject(projectName, projectCredits);
    setProjectName("");
    setProjectCredits(0);
    setShowPopup(false);
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          className="
            text-sm
            bg-black text-white
            rounded-md
            px-3 py-1.5
            hover:bg-gray-800
            transition
          "
        >
          + Project
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
        className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 transition-all duration-200 scale-95 opacity-0 ${styles.animateModalIn}`}
      >
        <h3 className="text-lg font-semibold">New project</h3>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm font-medium">Project name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="
              w-full rounded-md border px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-black
            "
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Credits</label>
          <input
            type="number"
            value={projectCredits}
            onChange={(e) => setProjectCredits(Number(e.target.value))}
            className="
              w-full rounded-md border px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-black
            "
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
