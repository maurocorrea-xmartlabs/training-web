import type { Project } from "@/generated/prisma/client";
import { AddTaskForm } from "@/lib/ui/forms/addTaskForm";
import { TaskList } from "@/lib/ui/lists/taskList";

type Props = {
  project: Project;
};

export function ProjectItem({ project }: Props) {
  return (
    <div>
      <h4 className="font-semibold">{project.name}</h4>
      <p className="text-sm text-gray-500">Credits: {project.credits}</p>

      <AddTaskForm projectId={project.id} />

      <TaskList projectId={project.id} />
    </div>
  );
}
