import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getIssues,
    createIssue,
    deleteIssue,
    updateIssue,
    updateIssueStatus
} from "../api/issueApi";

const IssueContext =
    createContext();

export function IssueProvider({
    children
}) {

    const [issues, setIssues] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    async function loadIssues() {

        try {

            setLoading(true);

            const data =
                await getIssues();

            setIssues(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        loadIssues();
    }, []);

async function addIssue(issueData) {
    const newIssue = await createIssue(issueData);

    const issue = {
        id: newIssue.id,
        key: newIssue.projectKey,
        title: newIssue.title,
        description: newIssue.description,
        type: newIssue.type,
        status:newIssue.status,
        priority:newIssue.priority,
        assignee:{
            avatar:newIssue.assigneeAvatar,
            name:newIssue.assigneeName
        },
        atatchments:newIssue.attachments
    };

    setIssues(current => [
        ...current,
        issue
    ]);
}

async function editIssue(issueId,issueData) {
    const updatedIssue = await updateIssue(issueId,issueData);

    const issue = {
        id: updatedIssue.id,
        key: updatedIssue.projectKey,
        title: updatedIssue.title,
        description: updatedIssue.description,
        type: updatedIssue.type,
        status:updatedIssue.status,
        priority:updatedIssue.priority,
        assignee:{
            avatar:updatedIssue.assigneeAvatar,
            name:updatedIssue.assigneeName
        },
        atatchments:updatedIssue.attachments
    };

    setIssues(current =>
        current.map(existingIssue =>
            existingIssue.id === issue.id
                ? issue
                : existingIssue
        )
    );
}

async function editIssueStatus(issueId,status) {
    const updatedIssue = await updateIssueStatus(issueId,status);

    const issue = {
        id: updatedIssue.id,
        key: updatedIssue.projectKey,
        title: updatedIssue.title,
        description: updatedIssue.description,
        type: updatedIssue.type,
        status:updatedIssue.status,
        priority:updatedIssue.priority,
        assignee:{
            avatar:updatedIssue.assigneeAvatar,
            name:updatedIssue.assigneeName
        },
        atatchments:updatedIssue.attachments
    };

    setIssues(current =>
        current.map(existingIssue =>
            existingIssue.id === issue.id
                ? issue
                : existingIssue
        )
    );
}

    async function removeIssue(
        id
    ) {

        await deleteIssue(id);

        setIssues(current =>
            current.filter(
                issue =>
                    issue.id !== id
            )
        );
    }

    return (
        <IssueContext.Provider
            value={{
                issues,
                loading,
                error,
                addIssue,
                editIssue,
                editIssueStatus,
                removeIssue,
                reloadIssues:
                    loadIssues
            }}
        >
            {children}
        </IssueContext.Provider>
    );
}

export function useIssues() {
    return useContext(IssueContext);
}