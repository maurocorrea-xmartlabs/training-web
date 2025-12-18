import { StrictMode } from "react";
import "./index.css";
import { App } from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SubjectsProvider } from "./contexts/subjectsContexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SubjectsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SubjectsProvider>
  </StrictMode>,
);
