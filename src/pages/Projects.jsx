import ProjectCard from "../components/projects/ProjectCard";
import { useIssues } from "../context/IssueContext";
import { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import Modal from "../components/common/Modal";

function Projects() {
    const { issues } = useIssues();
    const {
        projects,
        createProject
    } = useProjects();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [name, setName] = useState("");
    const [key, setKey] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div className="projects-page">

            <div className="page-header">
                <div>
                    <h1>Projects</h1>
                    <p>Manage your projects and track progress.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowCreateModal(true)}
                >
                    + Create Project
                </button>
            </div>

            <div className="projects-grid">
                {projects.map(project => {
                    const issueCount = issues.filter(
                        issue => issue.projectId === project.id
                    ).length;

                    return (
                        <ProjectCard
                            key={project.id}
                            project={{
                                ...project,
                                issueCount
                            }}
                        />
                    );
                })}
            </div>
            {showCreateModal && (
                <Modal
                    title="Create Project"
                    onClose={() => setShowCreateModal(false)}
                >
                    <form
                        onSubmit={event => {
                            event.preventDefault();

                            createProject({
                                name,
                                key,
                                description,
                            });

                            setName("");
                            setKey("");
                            setDescription("");

                            setShowCreateModal(false);
                        }}
                    >
                        <div className="form-group">
                            <label>Project Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder="e.g. Mobile Banking"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Project Key</label>

                            <input
                                type="text"
                                value={key}
                                onChange={event =>
                                    setKey(event.target.value.toUpperCase())
                                }
                                placeholder="e.g. MOB"
                                maxLength={5}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>

                            <textarea
                                value={description}
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Describe the project..."
                                rows={4}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Create Project
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

        </div>
    );
}

export default Projects;