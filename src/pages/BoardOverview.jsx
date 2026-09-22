import { useState } from "react";
import { useIssues } from "../context/IssueContext";
import KanbanColumn from "../components/board/KanbanColumn";

function BoardOverview() {

    const {
        issues,
        editIssue,
        editIssueStatus
    } = useIssues();

    const [draggedIssue, setDraggedIssue] = useState(null);

    const todoIssues = issues.filter(
        issue => issue.status === "TODO"
    );

    const inProgressIssues = issues.filter(
        issue => issue.status === "IN_PROGRESS"
    );

    const doneIssues = issues.filter(
        issue => issue.status === "DONE"
    );

    function handleDragStart(event, issue) {
        setDraggedIssue(issue);
        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function handleDrop(event, newStatus) {
        event.preventDefault();

        if (!draggedIssue) {
            return;
        }

        if (draggedIssue.status !== newStatus) {
            editIssueStatus(draggedIssue.id, {
                status: newStatus
            });
        }

        setDraggedIssue(null);
    }

    return (
        <div className="board-page">

            <div className="page-header">
                <div>
                    <h1>Board</h1>
                    <p>
                        Track and manage work across your projects.
                    </p>
                </div>
            </div>

            <div className="kanban-board">

                <KanbanColumn
                    title="To Do"
                    status="TODO"
                    issues={todoIssues}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />

                <KanbanColumn
                    title="In Progress"
                    status="IN_PROGRESS"
                    issues={inProgressIssues}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />

                <KanbanColumn
                    title="Done"
                    status="DONE"
                    issues={doneIssues}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />

            </div>

        </div>
    );
}

export default BoardOverview;