import type { Project } from "@/generated/prisma/client";
import ProjectItem from "../items/projectItem";

type ProjectListProps = {
  projects: Project[];
  onDelete: (id: number) => void;
};

export function ProjectList({ projects, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="text-sm text-gray-500 italic">No projects yet</p>;
  }

  return (
    <div className="space-y-3">
      <p className="text-md font-semibold">Projects</p>

      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
