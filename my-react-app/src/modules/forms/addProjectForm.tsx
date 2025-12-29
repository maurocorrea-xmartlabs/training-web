import { useState } from "react";
import { usePopupForm } from "../hooks/usePopupForm";
import { PopupForm } from "../utils/popupForm";
import { ProjectFormSchema } from "../../types/project";
import { withErrorHandling } from "../../controllers/utils/withErrorHandling";
import styles from "../utils/formAnimations.module.css";

type AddProjectFormProps = {
  onAddProject: (name: string, monthlyCost: number) => void;
};

export function AddProjectForm({ onAddProject }: AddProjectFormProps) {
  const { showPopup, open, close, error, setError } = usePopupForm();
  const [projectName, setProjectName] = useState("");
  const [projectCredits, setProjectCredits] = useState(0);
  const [isHidingButton, setIsHidingButton] = useState(false);

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

    const success = withErrorHandling(
      () => onAddProject(projectName, projectCredits),
      setError,
    );

    if (!success) return;

    setError(null);
    setProjectName("");
    setProjectCredits(0);
    close();
  }

  function handleShowForm() {
    setIsHidingButton(true);
    setTimeout(() => {
      open();
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
          + Project
        </button>
      </>
    );
  }

  return (
    <PopupForm
      title="New project"
      onRequestClose={close}
      onSubmit={handleSubmit}
    >
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
    </PopupForm>
  );
}
