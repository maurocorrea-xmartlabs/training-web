import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject";
import type { Project } from "../../../types/project";
import { ProjectList } from "../projects/projectList";
import { AddProjectForm } from "../../forms/addProjectForm";
import { ProjectController } from "../../../controllers/projectController";
import type { NewProject } from "../../../types/project";
import styles from "../listsAnimations.module.css";

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: string) => void;
};

export function SubjectItem({ subject, onDelete }: SubjectItemProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const projectController = new ProjectController();
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadProjects() {
    const newProjectList = await projectController.getProjectsBySubjectId(
      subject.id,
    );
    setProjects(newProjectList || []);
  }

  useEffect(() => {
    loadProjects();
  });

  async function handleAddProject(name: string, credits: number) {
    const newProject: NewProject = {
      name: name,
      credits: credits,
      subjectId: subject.id,
    };

    await projectController.postProject(newProject);
    loadProjects();
  }

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(subject.id);
    }, 150);
  }

  async function handleDeleteProject(id: string) {
    await projectController.deleteProject(id);
    loadProjects();
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-5 space-y-4 ${isDeleting ? styles.animateItemOut : ""}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{subject.name}</h3>
          <p className="text-sm text-gray-500">
            Monthly cost: ${subject.monthlyCost}
          </p>
        </div>

        <button
          onClick={() => handleDelete()}
          type="button"
          className="
    text-sm
    text-red-600
    border border-red-200
    rounded-md
    px-3 py-1.5
    hover:bg-red-50 hover:border-red-300
    active:scale-95
    transition
  "
        >
          Delete
        </button>
      </div>

      <AddProjectForm onAddProject={handleAddProject} />

      <div>
        <ProjectList
          projects={projects}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </div>
  );
}
