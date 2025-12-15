import { useEffect, useState } from "react";
import type { Project } from "../../../types/project";
import type { Task } from "../../../types/task";
import TaskList from "../tasks/taskList";
import AddTaskForm from "../../forms/addTaskForm";
import type { NewTask } from "../../../types/task";
import TaskController from "../../../controllers/taskController";

type ProjectItemProps = {
  project: Project;
  onDelete: (id: string) => void;
};

export default function ProjectItem({ project, onDelete }: ProjectItemProps) {
  const [tasks, setTasks] = useState<Task[]>();
  const taskController = new TaskController();

  useEffect(() => {
    loadTasks();
  });

  async function loadTasks() {
    const newTasks = await taskController.getTasksByProjectId(project.id);
    setTasks(newTasks!);
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
          <strong>{project.name}</strong>
          <p>Weight: {project.weight}</p>
          <AddTaskForm onAddTask={handleAddTask} />
          <button
            type="button"
            className="delete"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        </div>

        <strong> Tasks </strong>
        <TaskList tasks={tasks!} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}
