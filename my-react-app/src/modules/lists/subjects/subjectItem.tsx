import { useState } from "react";
import type { Subject } from "../../../types/subject/subject";
import type { Project } from "../../../types/project/project";
import ProjectList from "../projects/projectList";
import AddProjectForm from "../../forms/addProjectForm";

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: number) => void;
};

export default function SubjectItem({ subject, onDelete }: SubjectItemProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  function handleAddProject(name: string, weight: number) {
    const nextId = projects.length;
    const newProject: Project = {
      id: nextId,
      name: name,
      weight: weight,
      subjectId: subject.id,
    };
    setProjects((projects) => [...projects, newProject]);
  }

  function handleDeleteProject(id: number) {
    setProjects(projects.filter((p) => p.id !== id));
  }

  return (
    <div className="subjectItemDiv">
      <div>
        <div>
          <strong>{subject.name}</strong>
          <div>Monthly cost: {subject.monthlyCost}</div>
          <AddProjectForm onAddProject={handleAddProject} />
          <button className="delete" onClick={() => onDelete(subject.id)}>
            Delete
          </button>
        </div>

        <ProjectList
          projects={projects}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </div>
  );
}
