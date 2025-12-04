import { useState } from "react";
import { TaskFormSchema } from "../../types/task/taskFormSchema";

type AddTaskFormProps = {
  onAddTask: (name: string, description: string) => void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!taskName.trim()) {
      setError("Task must have a name");
      return;
    }

    if (!taskDescription.trim()) {
      setError("Task must have a description");
    }
    const result = TaskFormSchema.safeParse({
      name: taskName,
      description: taskDescription,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    onAddTask(taskName, taskDescription);
    setTaskName("");
    setTaskDescription("");
    setShowPopup(false);
  }

  if (!showPopup) {
    return (
      <>
        {error && <p className="error">{error}</p>}
        <button onClick={() => setShowPopup(true)}>+</button>
      </>
    );
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <div className="formFieldDiv">
            <label htmlFor="taskName">Task Name</label>
            <input
              id="taskName"
              type="text"
              placeholder="Obligatorio 1"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="formFieldDiv">
            <label htmlFor="taskDescription">Description</label>
            <input
              id="taskDescription"
              type="text"
              placeholder="I should finish this before the next week!"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></input>
          </div>
          <button type="submit">Add Task</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </form>
      </div>
    </>
  );
}
