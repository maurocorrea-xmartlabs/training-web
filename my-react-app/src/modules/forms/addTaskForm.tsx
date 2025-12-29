import { useState } from "react";
import { usePopupForm } from "../hooks/usePopupForm";
import { PopupForm } from "../utils/popupForm";
import { TaskFormSchema } from "../../types/task";
import { withErrorHandling } from "../../controllers/utils/withErrorHandling";
import styles from "../utils/formAnimations.module.css";

type AddTaskFormProps = {
  onAddTask: (name: string, description: string) => void;
};

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const { showPopup, open, close, error, setError } = usePopupForm();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isHidingButton, setIsHidingButton] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = TaskFormSchema.safeParse({
      name: taskName,
      description: taskDescription,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const success = await withErrorHandling(
      () => onAddTask(taskName, taskDescription),
      setError,
    );

    if (!success) return;

    setTaskName("");
    setTaskDescription("");
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
          + Task
        </button>
      </>
    );
  } else {
    return (
      <PopupForm
        title="New Task"
        onRequestClose={close}
        onSubmit={handleSubmit}
      >
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm font-medium">Task name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="
            w-full rounded-md border px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-black
          "
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="
            w-full rounded-md border px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-black
          "
          />
        </div>
      </PopupForm>
    );
  }
}
