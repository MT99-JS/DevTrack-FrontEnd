import { apiFetch } from "./apiClient";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const ISSUE_URL =
    `${API_BASE_URL}/issues`;

export async function getIssues() {
    const response = await apiFetch("/issues");

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    const data = await response.json();
    console.log(data);

    return data.map(issue => ({
        id: issue.id,
        projectId:issue.projectId,
        key: issue.projectKey,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status:issue.status,
        priority:issue.priority,
        labels:issue.labels,
        attachments:issue.attachments,
        assignee:{
            id:issue.assigneeId,
            name:issue.assigneeName,
            avatar:issue.assigneeAvatar
        },
        reporter:{
            id:issue.reporterId,
            name:issue.reporterName,
            avatar:issue.reporterAvatar
        },
    }));
}

export async function createIssue(
    issueData
) {

    const response =
        await apiFetch("/issues", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(issueData)
        });

    if (!response.ok) {
        throw new Error(
            "Failed to create project"
        );
    }

    return response.json();
}

export async function deleteIssue(id) {

    const response =
        await apiFetch(
            `/issues/${id}`,
            {
                method: "DELETE"
            }
        );

    if (!response.ok) {
        throw new Error(
            "Failed to delete project"
        );
    }
}

export async function updateIssue(issueId, issueData) {
    const response = await apiFetch(`/issues/${issueId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(issueData)
    });

    if (!response.ok) {
        throw new Error("Failed to update issue");
    }

    return response.json();
}


export async function updateIssueStatus(issueId, status) {
    console.debug(issueId);
    console.debug(status);
    const response = await apiFetch(`/issues/${issueId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(status)
    });

    if (!response.ok) {
        throw new Error("Failed to update issue");
    }

    return response.json();
}