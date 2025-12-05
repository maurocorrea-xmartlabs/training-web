import "./App.css";
import { SubjectList } from "./modules/lists/subjects/subjectList";

export function App() {
  return (
    <>
      <div className="bg-black p-2">
        <img
          className="ml-2"
          src="public/logo.png"
          alt="Uni-Do"
          width="60"
          height="60"
        ></img>
      </div>
      <SubjectList />
    </>
  );
}
