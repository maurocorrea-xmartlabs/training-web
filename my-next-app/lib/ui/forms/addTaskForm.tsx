"use client";

import { useState } from "react";
import { usePopupForm } from "../../../hooks/usePopupForm";
import { PopupForm } from "./popupForm";
import { TaskFormSchema } from "../../../types/task";
import styles from "./formAnimations.module.css";
import { createTaskAction } from "@/app/(app)/todo/actions";

type AddTaskFormProps = {
  projectId: number;
};

export function AddTaskForm({ projectId }: AddTaskFormProps) {
  const { showPopup, open, close, error, setError } = usePopupForm();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isHidingButton, setIsHidingButton] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = TaskFormSchema.safeParse({
      name: taskName,
      description: taskDescription,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const result = await createTaskAction({
      name: taskName,
      description: taskDescription,
      projectId,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

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
          transition mt-2
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
