import type { Task } from "../../../types/task/task";
import TaskItem from "./taskItem";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
};

export default function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDeleteTask} />
      ))}
    </div>
  );
}
