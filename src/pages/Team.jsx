import { useIssues } from "../context/IssueContext";
import Avatar from "../components/common/Avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTeam } from "../context/TeamContext";
import Modal from "../components/common/Modal";
import { useAuth } from "../context/AuthContext";

function Team() {
    const { user } = useAuth();
    const { issues } = useIssues();
    const navigate = useNavigate();
    const {
        teamMembers,
        createTeamMember,
        removeUser
    } = useTeam();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [name, setName] = useState("");
    const [role, setRole] = useState("Developer");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const isAdmin = user?.role === "ADMIN";

    function isCurrentUser(member) {
        return member.id === user?.userId;
    }

    console.log("Current user:", user);
console.log("Team members:", teamMembers);

    function handleDeleteUser(member) {
        // Never allow an admin to delete themselves.
        if (isCurrentUser(member)) {
            return;
        }

        setSelectedMember(member);
        setShowDeleteModal(true);
    }

    function confirmDeleteUser() {
        if (!selectedMember) return;

        // Extra safety check.
        if (isCurrentUser(selectedMember)) {
            setSelectedMember(null);
            setShowDeleteModal(false);
            return;
        }

        removeUser(selectedMember.id);

        setSelectedMember(null);
        setShowDeleteModal(false);
    }

    function cancelDeleteUser() {
        setSelectedMember(null);
        setShowDeleteModal(false);
    }

    function openCreateModal() {
        setName("");
        setRole("Developer");
        setShowCreateModal(true);
    }

    function closeCreateModal() {
        setName("");
        setRole("Developer");
        setShowCreateModal(false);
    }

    function handleCreateMember(event) {
        event.preventDefault();

        createTeamMember({
            name: name.trim(),
            role,
        });

        closeCreateModal();
    }

    return (
        <div className="team-page">

            {/* =========================
                Page Header
            ========================= */}

            <div className="page-header">

                <div>
                    <h1>Team</h1>

                    <p>
                        Manage your project team and members.
                    </p>
                </div>

                {/* {isAdmin && (
                    <button
                        className="primary-button"
                        onClick={openCreateModal}
                    >
                        + Add Member
                    </button>
                )} */}

            </div>

            {/* =========================
                Team Summary
            ========================= */}

            <div className="team-summary">

                <div className="team-summary-item">
                    <span>Total Members</span>
                    <strong>{teamMembers.length}</strong>
                </div>

                <div className="team-summary-item">
                    <span>Active Members</span>
                    <strong>{teamMembers.length}</strong>
                </div>

                <div className="team-summary-item">
                    <span>Your Role</span>
                    <strong>
                        {user?.role || "Member"}
                    </strong>
                </div>

            </div>

            {/* =========================
                Team Members
            ========================= */}

            <div className="team-grid">

                {teamMembers.map(member => {

                    const memberIssues = issues.filter(
                        issue => issue.assignee?.id === member.id
                    );

                    const completedIssues = memberIssues.filter(
                        issue => issue.status === "DONE"
                    );

                    const isYou = isCurrentUser(member);

                    return (
                        <div
                            className={`team-card ${isYou ? "current-user-card" : ""}`}
                            key={member.id}
                        >

                            {/* Card Header */}

                            <div className="team-card-header">

                                <Avatar
                                    src={member.avatar}
                                    name={member.name}
                                    size="large"
                                />

                                <div className="team-member-info">

                                    <div className="team-member-name">

                                        <h3>{member.name}</h3>

                                        {isYou && (
                                            <span className="you-badge">
                                                You
                                            </span>
                                        )}

                                    </div>

                                    <p>{member.role}</p>

                                </div>

                            </div>

                            {/* Member Details */}

                            <div className="team-card-details">

                                <div className="team-stat">
                                    <span>Assigned Issues</span>

                                    <strong>
                                        {memberIssues.length}
                                    </strong>
                                </div>

                                <div className="team-stat">
                                    <span>Completed</span>

                                    <strong>
                                        {completedIssues.length}
                                    </strong>
                                </div>

                                <div className="team-stat">
                                    <span>Status</span>

                                    <strong className="member-active">
                                        <span className="status-dot"></span>
                                        Active
                                    </strong>
                                </div>

                            </div>

                            {/* Actions */}

                            <div className="team-card-actions">

                                <button
                                    className="secondary-button"
                                    onClick={() =>
                                        navigate(
                                            `/issues?assignee=${member.id}`
                                        )
                                    }
                                >
                                    View Issues
                                </button>

                                {isAdmin && !isYou && (
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDeleteUser(member)
                                        }
                                    >
                                        Delete
                                    </button>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* =========================
                Add Member Modal
            ========================= */}

            {showCreateModal && (
                <Modal
                    title="Add Team Member"
                    onClose={closeCreateModal}
                >
                    <form onSubmit={handleCreateMember}>

                        <div className="form-group">

                            <label htmlFor="member-name">
                                Name
                            </label>

                            <input
                                id="member-name"
                                type="text"
                                value={name}
                                onChange={event =>
                                    setName(event.target.value)
                                }
                                placeholder="Enter member name"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="member-role">
                                Role
                            </label>

                            <select
                                id="member-role"
                                value={role}
                                onChange={event =>
                                    setRole(event.target.value)
                                }
                            >
                                <option value="Developer">
                                    Developer
                                </option>

                                <option value="Project Manager">
                                    Project Manager
                                </option>

                                <option value="QA Engineer">
                                    QA Engineer
                                </option>

                                <option value="Designer">
                                    Designer
                                </option>
                            </select>

                        </div>

                        <div className="form-actions">

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={closeCreateModal}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Add Member
                            </button>

                        </div>

                    </form>
                </Modal>
            )}

            {/* =========================
                Delete Confirmation
            ========================= */}

            {showDeleteModal && selectedMember && (
                <Modal
                    title="Delete Team Member"
                    onClose={cancelDeleteUser}
                >
                    <div className="delete-confirmation">

                        <div className="delete-icon">
                            ⚠️
                        </div>

                        <p>
                            Are you sure you want to remove{" "}
                            <strong>
                                {selectedMember.name}
                            </strong>{" "}
                            from the team?
                        </p>

                        <p className="warning-text">
                            This action cannot be undone. Their
                            team membership will be removed.
                        </p>

                        <div className="form-actions">

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={cancelDeleteUser}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="delete-button"
                                onClick={confirmDeleteUser}
                            >
                                Delete Member
                            </button>

                        </div>

                    </div>
                </Modal>
            )}

        </div>
    );
}

export default Team;
