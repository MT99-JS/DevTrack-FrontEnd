import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";

function IssueCard({ issue, onDelete, onEdit }) {
    const { user } = useAuth();
    return (
        <article className="issue-card">

            <div className="issue-card-top">

                <Link
                    to={`/issues/${issue.key}`}
                    className="issue-key"
                >
                    {issue.key}
                </Link>

                <span className={`priority ${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                </span>

            </div>

            <h3>{issue.title}</h3>

            <div className="issue-card-bottom">

                <span className="issue-type">
                    {issue.type}
                </span>

                <div className="assignee">

                    {issue.assignee ? (
                        <>
                            <Avatar
                                src={issue.assignee.avatar}
                                name={issue.assignee.name}
                                size="small"
                            />

                            <span>
                                {issue.assignee.name}
                            </span>
                        </>
                    ) : (
                        <span className="unassigned">
                            Unassigned
                        </span>
                    )}

                </div>

                <div className="issue-actions">
                    <button
                        className="edit-button"
                        onClick={() => onEdit(issue)}
                    >
                        Edit
                    </button>

                    {(user?.role === "QA" || user?.role === "ADMIN") &&
                        <button
                            className="delete-button"
                            onClick={() => onDelete(issue.id)}
                        >
                            Delete
                        </button>

                    }
                </div>


            </div>

        </article>
    );
}

export default IssueCard;