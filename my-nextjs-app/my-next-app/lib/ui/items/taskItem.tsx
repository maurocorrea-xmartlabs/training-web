import { useState } from "react";
import type { Task } from "../../../types/task";
import styles from "../listsAnimations.module.css";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 150);
  }

  return (
    <div
      className={`
        flex items-start justify-between
        rounded-md
        border border-gray-200
        bg-white
        px-4 py-3 ${isDeleting ? styles.animateItemOut : ""}
      `}
    >
      <div>
        <p className="font-medium">{task.name}</p>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="
          text-sm text-red-600
          border border-red-200
          rounded-md
          px-3 py-1
          hover:bg-red-50
          active:scale-95
          transition
        "
      >
        Delete
      </button>
    </div>
  );
}
