"use client";

import { useEffect, useState } from "react";
import {
  getProjectsBySubjectId,
  postProject,
  deleteProject,
} from "../../../controllers/projectController";
import type { Subject } from "@/generated/prisma/client";
import type { Project } from "@/generated/prisma/client";
import type { NewProject } from "../../../types/project";
import { ProjectList } from "../../ui/lists/projectList";
import { AddProjectForm } from "../forms/addProjectForm";
import { withErrorHandling } from "../../../controllers/utils/withErrorHandling";
import styles from "./itemAnimations.module.css";

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: number) => void;
};

export function SubjectItem({ subject, onDelete }: SubjectItemProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadProjects() {
    const newProjectList = await withErrorHandling(
      () => getProjectsBySubjectId(subject.id),
      setError
    );

    setProjects(newProjectList || []);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleAddProject(name: string, credits: number) {
    const newProject: NewProject = {
      name: name,
      credits: credits,
      subjectId: subject.id,
    };

    const success = await withErrorHandling(
      () => postProject(newProject),
      setError
    );

    if (!success) return;
    loadProjects();
  }

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(subject.id);
    }, 150);
  }

  async function handleDeleteProject(id: number) {
    const success = await withErrorHandling(() => deleteProject(id), setError);
    if (!success) return;
    loadProjects();
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-5 space-y-4 ${
        isDeleting ? styles.animateItemOut : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
          <h3 className="text-lg font-semibold">{subject.name}</h3>
          <p className="text-sm text-gray-500">
            Monthly cost: ${subject.monthlyCost}
          </p>
        </div>

        <button
          onClick={() => handleDelete()}
          type="button"
          disabled={isDeleting}
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
        <ProjectList projects={projects} onDelete={handleDeleteProject} />
      </div>
    </div>
  );
}
