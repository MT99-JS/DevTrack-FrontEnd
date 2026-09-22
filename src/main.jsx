import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProjectProvider } from "./context/ProjectContext.jsx";

import App from "./App.jsx";

import "./index.css";
import "./App.css";
import { IssueProvider } from "./context/IssueContext.jsx";
import { TeamProvider } from "./context/TeamContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectProvider>
      <IssueProvider>
        <TeamProvider>
      <App />
      </TeamProvider>
      </IssueProvider>
    </ProjectProvider>
  </StrictMode>
);