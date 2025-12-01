import type { Task } from "../../../types/task/task";

type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <div>
      <div>
        <div>
          <strong>{task.name}</strong>
          <div>description: {task.description}</div>
        </div>

        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
