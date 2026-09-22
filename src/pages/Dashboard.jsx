import StatCard from "../components/common/StatCard";
import ProjectCard from "../components/projects/ProjectCard";

import { useProjects } from "../context/ProjectContext";
import { useIssues } from "../context/IssueContext";

function Dashboard() {
  const {projects} = useProjects();
  const { issues } = useIssues();
  const totalProjects = projects.length;

  const totalIssues = issues.length;

  const inProgressIssues = issues.filter(
    issue => issue.status === "IN_PROGRESS"
  ).length;

  const completedIssues = issues.filter(
    issue => issue.status === "DONE"
  ).length;

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's what's happening
          with your projects.
        </p>
      </div>

      <section className="stats-grid">

        <StatCard
          title="Projects"
          value={totalProjects}
          icon="📁"
        />

        <StatCard
          title="Total Issues"
          value={totalIssues}
          icon="🐛"
        />

        <StatCard
          title="In Progress"
          value={inProgressIssues}
          icon="⏳"
        />

        <StatCard
          title="Completed"
          value={completedIssues}
          icon="✅"
        />

      </section>

      <section className="dashboard-section">

        <div className="section-header">
          <h2>Recent Projects</h2>
        </div>

        <div className="projects-grid">

          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;