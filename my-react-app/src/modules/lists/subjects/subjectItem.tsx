import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject/subject";
import type { Project } from "../../../types/project/project";
import ProjectList from "../projects/projectList";
import AddProjectForm from "../../forms/addProjectForm";
import ProjectController from "../../../controllers/projectController";
import type { NewProject } from "../../../types/project/newProject";

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: string) => void;
};

export default function SubjectItem({ subject, onDelete }: SubjectItemProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const projectController = new ProjectController();

  async function loadProjects() {
    try {
      const newProjectList = await projectController.getProjectsBySubjectId(
        subject.id,
      );
      setProjects(newProjectList!);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error occurred");
      }
      return;
    }
    setError("");
  }

  useEffect(() => {
    loadProjects();
  });

  async function deleteSubject() {
    try {
      onDelete(subject.id);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error occurred");
      }
      return;
    }
    setError("");
  }

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
          {error && <p className="error">{error}</p>}
          <strong>{subject.name}</strong>
          <div>Monthly cost: {subject.monthlyCost}</div>
          <AddProjectForm onAddProject={handleAddProject} />
          <button className="delete" onClick={() => deleteSubject()}>
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
