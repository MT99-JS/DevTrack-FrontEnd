import { useState } from "react";
import BoardIssue from "./BoardIssue";

function BoardColumn({
  title,
  status,
  issues,
  onDragStart,
  onDrop
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(event) {
    event.preventDefault();

    setIsDragOver(false);

    onDrop(event, status);
  }

  return (
    <section
      className={`board-column ${
        isDragOver ? "board-column-drag-over" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="board-column-header">
        <h2>{title}</h2>
        <span>{issues.length}</span>
      </div>

      <div className="board-column-content">
        {issues.map(issue => (
          <BoardIssue
            key={issue.id}
            issue={issue}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </section>
  );
}

export default BoardColumn;