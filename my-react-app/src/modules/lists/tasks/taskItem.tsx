import { useState } from "react";
import type { Task } from "../../../types/task/task";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const [error, setError] = useState<string | null>(null);

  async function deleteTask() {
    try {
      onDelete(task.id);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error occurred");
      }
      return;
    }
    setError("");
  }

  return (
    <div className="taskItemDiv">
      <div>
        {error && <p className="error">{error}</p>}
        <strong>{task.name}</strong>
        <div>description: {task.description}</div>
      </div>

      <button className="delete" onClick={() => deleteTask()}>
        Delete
      </button>
    </div>
  );
}
