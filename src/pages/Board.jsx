import { useIssues } from "../context/IssueContext";
import BoardColumn from "../components/board/BoardColumn";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/mockData";

function Board() {
    const { issues, updateIssue } = useIssues();
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const { projectId } = useParams();

    const project = projects.find(
        project => project.id === Number(projectId)
    );

    const projectIssues = issues.filter(
        issue => issue.projectId === Number(projectId)
    );

    const filteredIssues = projectIssues.filter(issue => {
        const matchesSearch =
            issue.key.toLowerCase().includes(search.toLowerCase()) ||
            issue.title.toLowerCase().includes(search.toLowerCase());

        const matchesPriority =
            priorityFilter === "ALL" ||
            issue.priority === priorityFilter;

        const matchesType =
            typeFilter === "ALL" ||
            issue.type === typeFilter;

        return (
            matchesSearch &&
            matchesPriority &&
            matchesType
        );
    });

    const todoIssues = filteredIssues.filter(
        issue => issue.status === "TODO"
    );

    const inProgressIssues = filteredIssues.filter(
        issue => issue.status === "IN_PROGRESS"
    );

    const doneIssues = filteredIssues.filter(
        issue => issue.status === "DONE"
    );

    function handleDragStart(event, issue) {
        event.dataTransfer.setData(
            "issueId",
            String(issue.id)
        );
    }

    function handleDrop(event, newStatus) {
        const issueId = Number(
            event.dataTransfer.getData("issueId")
        );

        updateIssue(issueId, {
            status: newStatus
        });
    }

    return (
        <div className="board-page">

            <div className="page-header">

                <div>
                    <Link
                        to={`/projects/${projectId}`}
                        className="back-link"
                    >
                        ← Back to Project
                    </Link>

                    <h1>{project?.name} Board</h1>

                    <p>
                        Manage issues across your {project?.name} workflow.
                    </p>
                </div>

            </div>

            <div className="board-filters">

                <input
                    type="text"
                    placeholder="Search issues..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    value={priorityFilter}
                    onChange={(event) => setPriorityFilter(event.target.value)}
                >
                    <option value="ALL">All priorities</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>

                <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
                >
                    <option value="ALL">All types</option>
                    <option value="BUG">Bug</option>
                    <option value="STORY">Story</option>
                    <option value="TASK">Task</option>
                </select>

            </div>

            <div className="board">

                <BoardColumn
                    title="TODO"
                    status="TODO"
                    issues={todoIssues}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />

                <BoardColumn
                    title="IN PROGRESS"
                    status="IN_PROGRESS"
                    issues={inProgressIssues}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />

                <BoardColumn
                    title="DONE"
                    status="DONE"
                    issues={doneIssues}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />

            </div>

        </div>
    );
}

export default Board;