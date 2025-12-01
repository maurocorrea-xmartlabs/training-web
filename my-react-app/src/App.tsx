import "./App.css";
import SubjectList from "./modules/lists/subjects/subjectList";

export default function App() {
  // internal 'database' because we won't use an ORM now
  return (
    <>
      <h1>University To-do List</h1>
      <div className="contentDiv">
        <div className="subjectsListDiv"></div>
        <SubjectList />
      </div>
    </>
  );
}
