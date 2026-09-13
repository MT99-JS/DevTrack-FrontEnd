import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";

function BoardIssue({ issue, onDragStart }) {
  return (
    <article
      className="board-issue"
      draggable
      onDragStart={(event) => onDragStart(event, issue)}
    >
      <div className="board-issue-header">
        <Link
          to={`/issues/${issue.key}`}
          className="issue-key"
          onClick={(event) => event.stopPropagation()}
        >
          {issue.key}
        </Link>

        <span className={`priority ${issue.priority.toLowerCase()}`}>
          {issue.priority}
        </span>
      </div>

      <h3>{issue.title}</h3>

      <div className="board-issue-footer">
        <span className="issue-type">
          {issue.type}
        </span>

        {issue.assignee && (
          <Avatar
            src={issue.assignee.avatar}
            name={issue.assignee.name}
            size="small"
          />
        )}
      </div>
    </article>
  );
}

export default BoardIssue;