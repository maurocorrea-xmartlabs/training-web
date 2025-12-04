import type { Project } from "../../../types/project/project";
import ProjectItem from "./projectItem";

type ProjectListProps = {
  projects: Project[];
  onDeleteProject: (id: string) => void;
};

export default function SubjectList({
  projects,
  onDeleteProject,
}: ProjectListProps) {
  if (projects.length === 0) {
    return <p>No projects yet</p>;
  }

  return (
    <div>
      <strong> Projects </strong>
      <div className="projectListDiv">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={onDeleteProject}
          />
        ))}
      </div>
    </div>
  );
}
