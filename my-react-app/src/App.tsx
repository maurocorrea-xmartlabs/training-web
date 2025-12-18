import "./App.css";
import { Route, Routes } from "react-router-dom";
import { TodoPage } from "./pages/TodoPage";
import { ExamsPage } from "./pages/ExamsPage";
import { Link } from "react-router-dom";

export function App() {
  return (
    <>
<<<<<<< HEAD
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="React app for managing subjects, projects, tasks and exams"
      />
      <meta name="author" content="Mauro Correa" />
=======
>>>>>>> main
      <nav className="bg-black px-4 py-2 flex items-center gap-6">
        <img
          className="ml-2"
          src="logo.png"
          alt="Uni-Do"
          width="60"
          height="60"
        ></img>
        <Link to="/" className="text-white text-2xl hover:underline">
          To-Do
        </Link>

        <Link to="/exams" className="text-white text-2xl hover:underline">
          Exams
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoPage />}></Route>
        <Route path="/exams" element={<ExamsPage />}></Route>
      </Routes>
    </>
  );
}
