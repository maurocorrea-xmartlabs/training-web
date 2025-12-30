import type { Task } from "@/generated/prisma/client";

type Props = {
  task: Task;
};

export function TaskItem({ task }: Props) {
  return (
    <div>
      <p className="font-medium">{task.name}</p>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
}
