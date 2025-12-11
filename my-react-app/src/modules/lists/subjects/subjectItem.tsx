import { useEffect, useState } from "react";
import type { Subject } from "../../../types/subject/subject";
import type { Project } from "../../../types/project/project";
import { ProjectList } from "../projects/projectList";
import { AddProjectForm } from "../../forms/addProjectForm";
import {
  getProjectsBySubjectId,
  postProject,
  deleteProject,
} from "../../../controllers/projectController";
import type { NewProject } from "../../../types/project/newProject";

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: string) => void;
};

export function SubjectItem({ subject, onDelete }: SubjectItemProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  async function loadProjects() {
    const newProjectList = await getProjectsBySubjectId(subject.id);
    setProjects(newProjectList!);
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

    await postProject(newProject);
    loadProjects();
  }

  async function handleDeleteProject(id: string) {
    await deleteProject(id);
    loadProjects();
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{subject.name}</h3>
          <p className="text-sm text-gray-500">
            Monthly cost: ${subject.monthlyCost}
          </p>
        </div>

        <button
          onClick={() => onDelete(subject.id)}
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
