import { createContext, useContext, useState } from "react";
import { projects as initialProjects } from "../data/mockData";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);

  function createProject(projectData) {
    const newProject = {
      id: Date.now(),
      key: projectData.key.toUpperCase(),
      name: projectData.name,
      description: projectData.description,
      image: projectData.image || null,
      issueCount: 0,
    };

    setProjects(currentProjects => [
      ...currentProjects,
      newProject
    ]);
  }

  function updateProject(projectId, updatedData) {
    setProjects(currentProjects =>
      currentProjects.map(project =>
        project.id === projectId
          ? { ...project, ...updatedData }
          : project
      )
    );
  }

  function deleteProject(projectId) {
    setProjects(currentProjects =>
      currentProjects.filter(project => project.id !== projectId)
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}