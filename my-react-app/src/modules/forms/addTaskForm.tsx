import { useState } from "react";
import { TaskFormSchema } from "../../types/task/taskFormSchema";
import { usePopupForm } from "../hooks/usePopupForm";
import { PopupForm } from "../utils/popupForm";

type AddTaskFormProps = {
  onAddTask: (name: string, description: string) => void;
};

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const { showPopup, open, close, error, setError } = usePopupForm();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = TaskFormSchema.safeParse({
      name: taskName,
      description: taskDescription,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    onAddTask(taskName, taskDescription);
    setTaskName("");
    setTaskDescription("");
    close();
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="button"
          onClick={open}
          className="
            text-sm
            bg-black text-white
            rounded-md
            px-3 py-1.5
            hover:bg-gray-800
            transition
          "
        >
          + Task
        </button>
      </>
    );
  }

  return (
    <PopupForm title="New Task" onClose={close} onSubmit={handleSubmit}>
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
