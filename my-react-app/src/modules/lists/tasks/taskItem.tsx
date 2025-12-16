import type { Task } from "../../../types/task";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <div className="taskItemDiv">
      <div>
        <strong>{task.name}</strong>
        <div>description: {task.description}</div>
      </div>

      <button className="delete" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}
