import { getTasksByProjectId } from "@/services/taskService";
import { TaskItemClientWrapper } from "../items/taskItem/taskItemClientWrapper";
import { TaskItem } from "../items/taskItem/taskItem";

type Props = {
  projectId: number;
};

export async function TaskList({ projectId }: Props) {
  const tasks = await getTasksByProjectId(projectId);

  if (tasks.length === 0) {
    return <p className="text-md text-gray-500 italic">No tasks yet</p>;
  }

  return (
    <div className="space-y-2 mt-3">
      {tasks.map((task) => (
        <TaskItemClientWrapper key={task.id} taskId={task.id}>
          <TaskItem task={task} />
        </TaskItemClientWrapper>
      ))}
    </div>
  );
}
