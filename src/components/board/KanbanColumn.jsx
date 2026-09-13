import { Link } from "react-router-dom";

function KanbanColumn({
    title,
    status,
    issues,
    onDrop,
    onDragOver,
    onDragStart
}) {
    return (
        <div
            className="kanban-column"
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, status)}
        >
            <div className="kanban-column-header">
                <div>
                    <h2>{title}</h2>
                    <span>{issues.length}</span>
                </div>
            </div>

            <div className="kanban-column-content">

                {issues.map(issue => (
                    <div
                        key={issue.id}
                        className="kanban-card"
                        draggable
                        onDragStart={(event) =>
                            onDragStart(event, issue)
                        }
                    >
                        <div className="kanban-card-top">
                            <span className="issue-key">
                                {issue.key}
                            </span>

                            <span
                                className={`priority ${issue.priority.toLowerCase()}`}
                            >
                                {issue.priority}
                            </span>
                        </div>

                        <Link
                            to={`/issues/${issue.key}`}
                            className="kanban-card-title"
                        >
                            {issue.title}
                        </Link>

                        <div className="kanban-card-bottom">
                            <span>
                                {issue.type}
                            </span>

                            <span>
                                {issue.assignee?.name || "Unassigned"}
                            </span>
                        </div>
                    </div>
                ))}

                {issues.length === 0 && (
                    <div className="kanban-empty">
                        Drop issues here
                    </div>
                )}

            </div>
        </div>
    );
}

export default KanbanColumn;