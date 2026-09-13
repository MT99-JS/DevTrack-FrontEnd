import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="project-card"
    >

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

      <div className="project-info">

        <h3>{project.name}</h3>

        <p>{project.description}</p>

        <span>
          {project.issueCount} issues
        </span>

      </div>

    </Link>
  );
}

export default ProjectCard;