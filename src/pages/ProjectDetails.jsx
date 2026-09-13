import { Link, useParams } from "react-router-dom";
import { projects } from "../data/mockData";
import { useIssues } from "../context/IssueContext";

function ProjectDetails() {
  const { projectId } = useParams();

  const { issues } = useIssues();

  const project = projects.find(
    project => project.id === Number(projectId)
  );

  if (!project) {
    return (
      <div>
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
      </div>
    );
  }

  const projectIssues = issues.filter(
    issue => issue.projectId === Number(projectId)
  );

  const totalIssues = projectIssues.length;

  const todoIssues = projectIssues.filter(
    issue => issue.status === "TODO"
  ).length;

  const inProgressIssues = projectIssues.filter(
    issue => issue.status === "IN_PROGRESS"
  ).length;

  const completedIssues = projectIssues.filter(
    issue => issue.status === "DONE"
  ).length;

  const recentIssues = [...projectIssues]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="project-details">

      {/* Project Header */}

      <div className="project-header">

        <div className="project-image">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
            />
          ) : (
            project.name.charAt(0)
          )}
        </div>

        <div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>

      </div>

      {/* Project Navigation */}

      <div className="project-tabs">

        <Link
          to={`/projects/${project.id}`}
          className="project-tab active"
        >
          Overview
        </Link>

        <Link
          to={`/projects/${project.id}/board`}
          className="project-tab"
        >
          Board
        </Link>

        <Link
          to={`/projects/${project.id}/issues`}
          className="project-tab"
        >
          Issues
        </Link>

        <Link
          to={`/projects/${project.id}/backlog`}
          className="project-tab"
        >
          Backlog
        </Link>

      </div>

      {/* Statistics */}

      <section className="project-stats">

        <div className="project-stat-card">
          <span>Total Issues</span>
          <strong>{totalIssues}</strong>
        </div>

        <div className="project-stat-card">
          <span>To Do</span>
          <strong>{todoIssues}</strong>
        </div>

        <div className="project-stat-card">
          <span>In Progress</span>
          <strong>{inProgressIssues}</strong>
        </div>

        <div className="project-stat-card">
          <span>Completed</span>
          <strong>{completedIssues}</strong>
        </div>

      </section>

      {/* Recent Issues */}

      <section className="recent-issues">

        <div className="section-header">
          <div>
            <h2>Recent Issues</h2>
            <p>Latest issues in this project.</p>
          </div>

          <Link
            to={`/projects/${project.id}/issues`}
            className="view-all-link"
          >
            View all →
          </Link>
        </div>

        <div className="recent-issue-list">

          {recentIssues.length === 0 ? (
            <p className="muted">
              No issues in this project yet.
            </p>
          ) : (
            recentIssues.map(issue => (
              <Link
                key={issue.id}
                to={`/issues/${issue.key}`}
                className="recent-issue"
              >

                <div>
                  <span className="issue-key">
                    {issue.key}
                  </span>

                  <h3>{issue.title}</h3>
                </div>

                <div className="recent-issue-meta">

                  <span
                    className={`priority ${issue.priority.toLowerCase()}`}
                  >
                    {issue.priority}
                  </span>

                  <span className="issue-status">
                    {issue.status}
                  </span>

                </div>

              </Link>
            ))
          )}

        </div>

      </section>

    </div>
  );
}

export default ProjectDetails;