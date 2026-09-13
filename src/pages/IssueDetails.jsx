import {
    Link,
    useParams,
    useNavigate
} from "react-router-dom";
import { useIssues } from "../context/IssueContext";
import Avatar from "../components/common/Avatar";
import { useState } from "react";
import IssueForm from "../components/issues/IssueForm";
import Modal from "../components/common/Modal";
import { projects } from "../data/mockData";

function IssueDetails() {
    const { issueKey } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAttachment, setSelectedAttachment] = useState(null);

    const {
        issues,
        updateIssue,
        deleteIssue
    } = useIssues();

    const [showEditModal, setShowEditModal] = useState(false);

    const issue = issues.find(
        issue => issue.key === issueKey
    );
    console.log("Current issue:", issue);
    console.log("Current labels:", issue?.labels);

    const project = projects.find(
        project => project.id === issue?.projectId
    );

    if (!issue) {
        return (
            <div>
                <h1>Issue Not Found</h1>
                <p>The issue you're looking for doesn't exist.</p>
                <Link to="/issues">Back to Issues</Link>
            </div>
        );
    }

    function handleUpdateIssue(issueId, updatedData) {
        updateIssue(issueId, updatedData);
        setShowEditModal(false);
    }

    function handleDeleteIssue() {
        deleteIssue(issue.id);
        navigate("/issues");
    }

    return (
        <div className="issue-details">

            <div className="issue-details-header">
                <div>
                    <span className="issue-details-key">
                        {issue.key}
                    </span>

                    <h1>{issue.title}</h1>
                </div>

                <div className="issue-actions">
                    <button
                        className="secondary-button"
                        onClick={() => setShowEditModal(true)}
                    >
                        Edit
                    </button>

                    <button
                        className="danger-button"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="issue-details-layout">

                <main className="issue-main">

                    <section className="issue-section">
                        <h2>Description</h2>

                        <p>
                            {issue.description}
                        </p>
                    </section>

                    <section className="issue-section">
                        <h2>Labels</h2>

                        <div className="labels">
                            {issue.labels.map(label => (
                                <span
                                    className="label"
                                    key={label}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="issue-section">
                        <h2>Attachments</h2>

                        {issue.attachments.length === 0 ? (
                            <p className="muted">No attachments.</p>
                        ) : (
                            <div className="issue-attachments">
                                {issue.attachments.map(attachment => (
                                    <div
                                        className="issue-attachment"
                                        key={attachment.id}
                                    >
                                        <img
                                            src={attachment.url}
                                            alt={attachment.name}
                                            onClick={() => setSelectedAttachment(attachment)}
                                        />

                                        <div className="issue-attachment-info">
                                            <span>{attachment.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                </main>

                <aside className="issue-sidebar">

                    <div className="detail-row">
                        <span>Project</span>

                        <Link to={`/projects/${project?.id}`}>
                            {project?.key} - {project?.name}
                        </Link>
                    </div>

                    <div className="detail-row">
                        <span>Status</span>
                        <strong>
                            {issue.status}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>Priority</span>

                        <span
                            className={`priority ${issue.priority.toLowerCase()}`}
                        >
                            {issue.priority}
                        </span>
                    </div>

                    <div className="detail-row">
                        <span>Type</span>
                        <strong>
                            {issue.type}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>Assignee</span>

                        {issue.assignee ? (
                            <div className="person">
                                <Avatar
                                    src={issue.assignee.avatar}
                                    name={issue.assignee.name}
                                    size="small"
                                />

                                <span>
                                    {issue.assignee.name}
                                </span>
                            </div>
                        ) : (
                            <span className="muted">
                                Unassigned
                            </span>
                        )}
                    </div>

                    <div className="detail-row">
                        <span>Reporter</span>

                        <div className="person">
                            <Avatar
                                src={issue?.reporter?.avatar}
                                name={issue?.reporter?.name}
                                size="small"
                            />
                            <span>{issue?.reporter?.name}</span>
                        </div>
                    </div>

                </aside>

            </div>

            {showEditModal && (
                <Modal
                    title={`Edit ${issue.key}`}
                    onClose={() => setShowEditModal(false)}
                >
                    <IssueForm
                        editingIssue={issue}
                        onUpdateIssue={handleUpdateIssue}
                        onCancel={() => setShowEditModal(false)}
                    />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal
                    title="Delete Issue"
                    onClose={() => setShowDeleteModal(false)}
                >
                    <div className="delete-confirmation">

                        <div className="delete-icon">
                            🗑️
                        </div>

                        <h3>Delete this issue?</h3>

                        <p>
                            Are you sure you want to delete
                            <strong> {issue.key}</strong>?
                        </p>

                        <p className="delete-warning">
                            This action cannot be undone.
                        </p>

                        <div className="delete-actions">

                            <button
                                className="secondary-button"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="danger-button"
                                onClick={handleDeleteIssue}
                            >
                                Delete Issue
                            </button>

                        </div>

                    </div>
                </Modal>
            )}

            {selectedAttachment && (
                <Modal
                    title={selectedAttachment.name}
                    onClose={() => setSelectedAttachment(null)}
                >
                    <div className="attachment-viewer">
                        <img
                            src={selectedAttachment.url}
                            alt={selectedAttachment.name}
                        />
                    </div>
                </Modal>
            )}

        </div>
    );
}

export default IssueDetails;