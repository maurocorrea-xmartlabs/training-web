import type { Task } from "../../../types/task";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <div
      className="
        flex items-start justify-between
        rounded-md
        border border-gray-200
        bg-white
        px-4 py-3
      "
    >
      <div>
        <p className="font-medium">{task.name}</p>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
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
