import { useEffect, useState } from "react";
import {
  getTasksByProjectId,
  postTask,
  deleteTask,
} from "../../../controllers/taskController";
import type { Project } from "../../../types/project";
import type { Task, NewTask } from "../../../types/task";
import { AddTaskForm } from "../../forms/addTaskForm";
import { TaskList } from "../tasks/taskList";
import { withErrorHandling } from "../../../controllers/utils/withErrorHandling";

type ProjectItemProps = {
  project: Project;
  onDelete: (id: string) => void;
};

export default function ProjectItem({ project, onDelete }: ProjectItemProps) {
  const [tasks, setTasks] = useState<Task[]>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const newTasks = await withErrorHandling(
      () => getTasksByProjectId(project.id),
      setError,
    );
    setTasks(newTasks || []);
  }

  async function handleAddTask(name: string, description: string) {
    const newTask: NewTask = {
      name: name,
      description: description,
      projectId: project.id,
    };

    await postTask(newTask);
    loadTasks();
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div className="rounded-lg border bg-gray-50 p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
          <h4 className="font-semibold">{project.name}</h4>
          <p className="text-sm text-gray-500">Credits: {project.credits}</p>
        </div>

        <button
          onClick={() => onDelete(project.id)}
          type="button"
          className="
            text-sm text-red-600
            border border-red-200
            rounded-md
            px-3 py-1
            hover:bg-red-50
            active:scale-95
            transition
          "
        >
          Delete
        </button>
      </div>

      <AddTaskForm onAddTask={handleAddTask} />

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Tasks</p>
        <TaskList tasks={tasks!} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}
