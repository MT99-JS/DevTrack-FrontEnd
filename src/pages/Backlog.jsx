import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { projects } from "../data/mockData";
import { useIssues } from "../context/IssueContext";

import Avatar from "../components/common/Avatar";
import IssueForm from "../components/issues/IssueForm";
import Modal from "../components/common/Modal";

function Backlog() {
  const { projectId } = useParams();

  const { issues, createIssue } = useIssues();

  const [showForm, setShowForm] = useState(false);

  const [sortBy, setSortBy] = useState("NEWEST");

  const project = projects.find(
    project => project.id === Number(projectId)
  );

  if (!project) {
    return (
      <div>
        <h1>Project Not Found</h1>

        <Link to="/projects">
          Back to Projects
        </Link>
      </div>
    );
  }

  const projectIssues = issues.filter(
    issue => issue.projectId === Number(projectId)
  );

  const sortedIssues = [...projectIssues].sort((a, b) => {
    if (sortBy === "NEWEST") {
      return b.id - a.id;
    }

    if (sortBy === "OLDEST") {
      return a.id - b.id;
    }

    if (sortBy === "PRIORITY") {
      const priorityOrder = {
        HIGH: 1,
        MEDIUM: 2,
        LOW: 3,
      };

      return (
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
      );
    }

    return 0;
  });

  function handleCreateIssue(issueData) {
    createIssue(issueData, projectId);
    setShowForm(false);
  }

  return (
    <div className="backlog-page">

      {/* Header */}

      <div className="page-header">

        <div>
          <Link
            to={`/projects/${project.id}`}
            className="back-link"
          >
            ← Back to {project.name}
          </Link>

          <h1>{project.name} Backlog</h1>

          <p>
            Plan and manage upcoming work.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Create Issue
        </button>

      </div>

      {/* Toolbar */}

      <div className="backlog-toolbar">

        <div>
          <strong>
            {sortedIssues.length}
          </strong>{" "}
          issues
        </div>

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value)
          }
        >
          <option value="NEWEST">
            Newest
          </option>

          <option value="OLDEST">
            Oldest
          </option>

          <option value="PRIORITY">
            Priority
          </option>
        </select>

      </div>

      {/* Issues */}

      <section className="backlog-list">

        {sortedIssues.length === 0 ? (
          <div className="empty-state">

            <h3>Backlog is empty</h3>

            <p>
              Create your first issue for this project.
            </p>

          </div>
        ) : (
          sortedIssues.map(issue => (
            <Link
              key={issue.id}
              to={`/issues/${issue.key}`}
              className="backlog-item"
            >

              <div className="backlog-item-main">

                <span className="issue-key">
                  {issue.key}
                </span>

                <h3>
                  {issue.title}
                </h3>

                <span className="issue-type">
                  {issue.type}
                </span>

              </div>

              <div className="backlog-item-meta">

                <span
                  className={`priority ${issue.priority.toLowerCase()}`}
                >
                  {issue.priority}
                </span>

                <span className="issue-status">
                  {issue.status}
                </span>

                {issue.assignee && (
                  <Avatar
                    src={issue.assignee.avatar}
                    name={issue.assignee.name}
                    size="small"
                  />
                )}

              </div>

            </Link>
          ))
        )}

      </section>

      {/* Create Issue Modal */}

      {showForm && (
        <Modal
          title={`Create Issue in ${project.name}`}
          onClose={() => setShowForm(false)}
        >
          <IssueForm
            onCreateIssue={handleCreateIssue}
            onUpdateIssue={() => {}}
            onCancel={() => setShowForm(false)}
            editingIssue={null}
          />
        </Modal>
      )}

    </div>
  );
}

export default Backlog;