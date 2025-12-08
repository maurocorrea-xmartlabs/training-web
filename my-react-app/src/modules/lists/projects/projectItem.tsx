import { useEffect, useState } from "react";
import type { Project } from "../../../types/project/project";
import type { Task } from "../../../types/task/task";
import TaskList from "../tasks/taskList";
import AddTaskForm from "../../forms/addTaskForm";
import type { NewTask } from "../../../types/task/newTask";
import TaskController from "../../../controllers/taskController";

type ProjectItemProps = {
  project: Project;
  onDelete: (id: string) => void;
};

export default function ProjectItem({ project, onDelete }: ProjectItemProps) {
  const [tasks, setTasks] = useState<Task[]>();
  const taskController = new TaskController();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  });

  async function loadTasks() {
    try {
      const newTasks = await taskController.getTasksByProjectId(project.id);
      setTasks(newTasks!);
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

  async function deleteProject() {
    try {
      onDelete(project.id);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred");
      }
      return;
    }
    setError("");
  }

  async function handleAddTask(name: string, description: string) {
    const newTask: NewTask = {
      name: name,
      description: description,
      projectId: project.id,
    };

    await taskController.postTask(newTask);
    loadTasks();
  }

  async function handleDeleteTask(id: string) {
    await taskController.deleteTask(id);
    loadTasks();
  }

  return (
    <div className="projectItemDiv">
      <div>
        <div>
          {error && <p className="error">{error}</p>}
          <strong>{project.name}</strong>
          <div>Weight: {project.weight}</div>
          <AddTaskForm onAddTask={handleAddTask} />
          <button className="delete" onClick={() => deleteProject()}>
            Delete
          </button>
        </div>

        <strong> Tasks </strong>
        <TaskList tasks={tasks!} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}
