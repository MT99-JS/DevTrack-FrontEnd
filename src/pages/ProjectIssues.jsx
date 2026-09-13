import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { projects } from "../data/mockData";
import { useIssues } from "../context/IssueContext";

import IssueCard from "../components/issues/IssueCard";
import IssueForm from "../components/issues/IssueForm";
import Modal from "../components/common/Modal";

function ProjectIssues() {
  const { projectId } = useParams();

  const { issues, createIssue, updateIssue, deleteIssue } = useIssues();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const [showForm, setShowForm] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  const project = projects.find(
    project => project.id === Number(projectId)
  );

  if (!project) {
    return (
      <div>
        <h1>Project Not Found</h1>
        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  }

  const projectIssues = issues.filter(
    issue => issue.projectId === Number(projectId)
  );

  const filteredIssues = projectIssues.filter(issue => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      issue.key.toLowerCase().includes(searchText) ||
      issue.title.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "ALL" ||
      issue.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      issue.priority === priorityFilter;

    const matchesType =
      typeFilter === "ALL" ||
      issue.type === typeFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesType
    );
  });

  function handleCreateIssue(issueData) {
    createIssue(issueData, projectId);

    setShowForm(false);
  }

  function handleUpdateIssue(issueId, updatedData) {
    updateIssue(issueId, updatedData);

    setEditingIssue(null);
    setShowForm(false);
  }

  function handleDeleteIssue(issueId) {
    deleteIssue(issueId);
  }

  function handleEditIssue(issue) {
    setEditingIssue(issue);
    setShowForm(true);
  }

  return (
    <div className="project-issues-page">

      <div className="page-header">

        <div>
          <Link
            to={`/projects/${project.id}`}
            className="back-link"
          >
            ← Back to {project.name}
          </Link>

          <h1>{project.name} Issues</h1>

          <p>
            Manage issues for this project.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingIssue(null);
            setShowForm(true);
          }}
        >
          + Create Issue
        </button>

      </div>

      <div className="issue-filters">

        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="ALL">All statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
        >
          <option value="ALL">All priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(event.target.value)
          }
        >
          <option value="ALL">All types</option>
          <option value="BUG">Bug</option>
          <option value="STORY">Story</option>
          <option value="TASK">Task</option>
        </select>

      </div>

      <div className="project-issues-list">

        {filteredIssues.length === 0 ? (
          <div className="empty-state">
            <h3>No issues found</h3>
            <p>
              Try changing your filters or create a new issue.
            </p>
          </div>
        ) : (
          filteredIssues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onDelete={handleDeleteIssue}
              onEdit={handleEditIssue}
            />
          ))
        )}

      </div>

      {showForm && (
        <Modal
          title={
            editingIssue
              ? `Edit ${editingIssue.key}`
              : `Create Issue in ${project.name}`
          }
          onClose={() => {
            setShowForm(false);
            setEditingIssue(null);
          }}
        >
          <IssueForm
            editingIssue={editingIssue}
            onCreateIssue={handleCreateIssue}
            onUpdateIssue={handleUpdateIssue}
            onCancel={() => {
              setShowForm(false);
              setEditingIssue(null);
            }}
          />
        </Modal>
      )}

    </div>
  );
}

export default ProjectIssues;