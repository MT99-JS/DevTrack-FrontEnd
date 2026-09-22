import { useState, useEffect } from "react";
import IssueCard from "../components/issues/IssueCard";
import IssueForm from "../components/issues/IssueForm";
import Modal from "../components/common/Modal";
import { useIssues } from "../context/IssueContext";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Issues() {
    const { user } = useAuth();
    const {
      issues, addIssue, removeIssue, editIssue
    } = useIssues();
    const [showForm, setShowForm] = useState(false);
    const [editingIssue, setEditingIssue] = useState(null);
    const [searchParams] = useSearchParams();
    const assigneeId = searchParams.get("assignee");
    const filteredIssues = assigneeId
        ? issues.filter(
            issue => issue.assignee?.id === Number(assigneeId)
        )
        : issues;

    function handleCreateIssue(issueData) {
        addIssue(issueData);
        setShowForm(false);
    }

    function handleDeleteIssue(issueId) {
        removeIssue(issueId);
    }

    function handleEditIssue(issue) {
        setEditingIssue(issue);
        setShowForm(true);
    }

    function handleUpdateIssue(issueId, updatedData) {
        editIssue(issueId, updatedData);
        setEditingIssue(null);
        setShowForm(false);
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setShowForm(false);
                setEditingIssue(null);
            }
        }

        if (showForm) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showForm]);

    return (
        <div className="issues-page">

            <div className="page-header">
                <div>
                    <h1>Issues</h1>
                    <p>Track ,manage and work with your project issues.</p>
                </div>

                {assigneeId && (
                    <p className="issues-filter-info">
                        Showing issues assigned to selected team member
                    </p>
                )}

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

            {showForm && (
                <Modal
                    title={editingIssue ? "Edit Issue" : "Create Issue"}
                    onClose={() => {
                        setShowForm(false);
                        setEditingIssue(null);
                    }}
                >
                    <IssueForm
                        onCreateIssue={handleCreateIssue}
                        onUpdateIssue={handleUpdateIssue}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingIssue(null);
                        }}
                        editingIssue={editingIssue}
                    />
                </Modal>
            )}

            <div className="issues-list">
                {filteredIssues.map(issue => (
                    <IssueCard
                        key={issue.id}
                        issue={issue}
                        onDelete={handleDeleteIssue}
                        onEdit={handleEditIssue}
                    />
                ))}
            </div>

        </div>
    );
}

export default Issues;