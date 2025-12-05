import type { Task } from "../../../types/task/task";
import {TaskItem} from "./taskItem";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
};

export function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-md text-gray-500 italic">No tasks yet</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDeleteTask} />
      ))}
    </div>
  );
}
