import { useState } from "react";

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

    if (!taskName.trim() || !taskDescription) {
      setError("Must specify a task name and description");
      return;
    }

    try {
      onAddTask(taskName, taskDescription);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred");
      }
      return;
    }

    setError("");
    setTaskName("");
    setTaskDescription("");
    setShowPopup(false);
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      {!showPopup && <button onClick={() => setShowPopup(true)}>+</button>}
      {showPopup && (
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
      )}
    </>
  );
}
