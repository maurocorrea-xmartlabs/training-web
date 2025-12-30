import type { Task } from "../../../types/task";
import { TaskItem } from "../items/taskItem";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

export function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-md text-gray-500 italic">No tasks yet</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
