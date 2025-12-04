import { useState } from "react";
import type { Project } from "../../../types/project/project";
import type { Task } from "../../../types/task/task";
import TaskList from "../tasks/taskList";
import AddTaskForm from "../../forms/addTaskForm";

type ProjectItemProps = {
  project: Project;
  onDelete: (id: number) => void;
};

export default function ProjectItem({ project, onDelete }: ProjectItemProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(name: string, description: string) {
    const nextId = tasks.length;
    const newTask: Task = {
      id: nextId,
      name: name,
      description: description,
      projectId: project.id,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleDeleteTask(id: number) {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="projectItemDiv">
      <div>
        <div>
          <strong>{project.name}</strong>
          <div>Weight: {project.weight}</div>
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
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}
