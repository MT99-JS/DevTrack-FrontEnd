import { createContext, useContext, useState } from "react";
import { issues as initialIssues } from "../data/mockData";
import { useProjects } from "./ProjectContext";

const IssueContext = createContext();

export function IssueProvider({ children }) {
  const [issues, setIssues] = useState(initialIssues);
  const { projects } = useProjects();

function createIssue(issueData) {
    console.log("Issue data received by Context:", issueData);
    console.log("Labels received:", issueData.labels);
    const project = projects.find(
        project => project.id === Number(issueData.projectId)
    );

    const projectIssues = issues.filter(
        issue => issue.projectId === Number(issueData.projectId)
    );

  const newIssue = {
    id: Date.now(),

    projectId: Number(issueData.projectId),

    key: `${project.key}-${100 + projectIssues.length + 1}`,

    title: issueData.title,
    description: issueData.description,
    type: issueData.type,
    status: "TODO",
    priority: issueData.priority,

    assignee: issueData.assignee || null,

    reporter: {
      id: 1,
      name: "John Doe",
      avatar: null,
    },

    labels: issueData.labels || [],
    attachments: issueData.attachments || [],

  };

  setIssues(currentIssues => [
    ...currentIssues,
    newIssue
  ]);
}

  function updateIssue(issueId, updatedData) {
    setIssues(currentIssues =>
      currentIssues.map(issue =>
        issue.id === issueId
          ? {
              ...issue,
              ...updatedData,
            }
          : issue
      )
    );
  }

  function deleteIssue(issueId) {
    setIssues(currentIssues =>
      currentIssues.filter(
        issue => issue.id !== issueId
      )
    );
  }

  return (
    <IssueContext.Provider
      value={{
        issues,
        createIssue,
        updateIssue,
        deleteIssue,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  return useContext(IssueContext);
}