import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject";
import type { Project } from "../../../types/project";
import ProjectList from "../projects/projectList";
import AddProjectForm from "../../forms/addProjectForm";
import ProjectController from "../../../controllers/projectController";
import type { NewProject } from "../../../types/project";

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: string) => void;
};

export default function SubjectItem({ subject, onDelete }: SubjectItemProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const projectController = new ProjectController();

  async function loadProjects() {
    const newProjectList = await projectController.getProjectsBySubjectId(
      subject.id,
    );
    setProjects(newProjectList!);
  }

  useEffect(() => {
    loadProjects();
  });

  async function handleAddProject(name: string, weight: number) {
    const newProject: NewProject = {
      name: name,
      weight: weight,
      subjectId: subject.id,
    };

    await projectController.postProject(newProject);
    loadProjects();
  }

  async function handleDeleteProject(id: string) {
    await projectController.deleteProject(id);
    loadProjects();
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
