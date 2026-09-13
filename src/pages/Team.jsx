import { useIssues } from "../context/IssueContext";
import Avatar from "../components/common/Avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTeam } from "../context/TeamContext";
import Modal from "../components/common/Modal";

function Team() {

    const { issues } = useIssues();
    const navigate = useNavigate();
    const { teamMembers, createTeamMember } = useTeam();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [name, setName] = useState("");
    const [role, setRole] = useState("Developer");

    return (
        <div className="team-page">

            <div className="page-header">
                <div>
                    <h1>Team</h1>
                    <p>Manage your project team and members.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowCreateModal(true)}
                >
                    + Add Member
                </button>
            </div>

            <div className="team-grid">

                {teamMembers.map(member => {

                    const memberIssues = issues.filter(
                        issue =>
                            issue.assignee?.id === member.id
                    );

                    const completedIssues = memberIssues.filter(
                        issue => issue.status === "DONE"
                    );

                    return (
                        <div
                            className="team-card"
                            key={member.id}
                        >

                            <div className="team-card-header">

                                <Avatar
                                    src={member.avatar}
                                    name={member.name}
                                    size="large"
                                />

                                <div>
                                    <h3>{member.name}</h3>
                                    <p>{member.role}</p>
                                </div>

                            </div>

                            <div className="team-card-details">

                                <div>
                                    <span>Assigned Issues</span>
                                    <strong>
                                        {memberIssues.length}
                                    </strong>
                                </div>

                                <div>
                                    <span>Completed</span>
                                    <strong>
                                        {completedIssues.length}
                                    </strong>
                                </div>

                                <div>
                                    <span>Status</span>
                                    <strong className="member-active">
                                        Active
                                    </strong>
                                </div>

                            </div>

                            <button
                                className="secondary-button"
                                onClick={() => navigate(`/issues?assignee=${member.id}`)}
                            >
                                View Issues
                            </button>

                            {showCreateModal && (
                                <Modal
                                    title="Add Team Member"
                                    onClose={() => setShowCreateModal(false)}
                                >
                                    <form
                                        onSubmit={event => {
                                            event.preventDefault();

                                            createTeamMember({
                                                name,
                                                role,
                                            });

                                            setName("");
                                            setRole("Developer");
                                            setShowCreateModal(false);
                                        }}
                                    >
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={event => setName(event.target.value)}
                                                placeholder="Enter member name"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Role</label>

                                            <select
                                                value={role}
                                                onChange={event => setRole(event.target.value)}
                                            >
                                                <option value="Developer">Developer</option>
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
                                                onClick={() => setShowCreateModal(false)}
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

                        </div>


                    );
                })}

            </div>

        </div>
    );
}

export default Team;