import { useEffect, useState } from "react";
import { useTeam } from "../../context/TeamContext";
import { useProjects } from "../../context/ProjectContext";

function IssueForm({ onCreateIssue, onCancel, onUpdateIssue, editingIssue }) {

    const { teamMembers } = useTeam();
    const { projects } = useProjects();
    const [title, setTitle] = useState(
        editingIssue?.title || ""
    );

    const [projectId, setProjectId] = useState(
        editingIssue?.projectId || ""
    );

    const [description, setDescription] = useState(
        editingIssue?.description || ""
    );

    const [type, setType] = useState(
        editingIssue?.type || "TASK"
    );

    const [priority, setPriority] = useState(
        editingIssue?.priority || "MEDIUM"
    );

    const [assigneeId, setAssigneeId] = useState(
        editingIssue?.assignee?.id || ""
    );

    const [labels, setLabels] = useState(
        editingIssue?.labels || []
    );

    const [labelInput, setLabelInput] = useState("");
    const [attachments, setAttachments] = useState(
        editingIssue?.attachments || []
    );

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Labels before submit:", labels);

        const selectedAssignee = teamMembers.find(
            member => member.id === Number(assigneeId)
        );

        const issueData = {
            title,
            description,
            type,
            priority,
            assignee: selectedAssignee || null,
            labels,
            attachments,
            projectId: Number(projectId),
        };

        console.log("Issue data from form:", issueData);

        if (editingIssue) {
            onUpdateIssue(editingIssue.id, issueData);
        } else {
            onCreateIssue(issueData);
        }

        // ...
    }

    useEffect(() => {
        setTitle(editingIssue?.title || "");
        setDescription(editingIssue?.description || "");
        setType(editingIssue?.type || "TASK");
        setPriority(editingIssue?.priority || "MEDIUM");

        setAssigneeId(
            editingIssue?.assignee?.id || ""
        );
        setLabels(editingIssue?.labels || []);
        setLabelInput("");
        setAttachments(editingIssue?.attachments || []);
        setProjectId(editingIssue?.projectId || "");
    }, [editingIssue]);

    function handleAddLabel() {
        console.log("Add Label clicked");
        console.log("Current input:", labelInput);

        const label = labelInput.trim();

        if (!label) {
            console.log("Label is empty");
            return;
        }

        setLabels(prevLabels => {
            const updatedLabels = [...prevLabels, label];

            console.log("Updated labels:", updatedLabels);

            return updatedLabels;
        });

        setLabelInput("");
    }


    function handleRemoveLabel(labelToRemove) {
        setLabels(
            labels.filter(
                label => label !== labelToRemove
            )
        );
    }

    function handleAddAttachment(event) {
        const files = Array.from(event.target.files);

        const newAttachments = files.map(file => ({
            id: `${Date.now()}-${file.name}`,
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file)
        }));

        setAttachments([...attachments, ...newAttachments]);

        event.target.value = "";
    }

    function handleRemoveAttachment(attachmentId) {
        const attachment = attachments.find(
            attachment => attachment.id === attachmentId
        );

        if (attachment) {
            URL.revokeObjectURL(attachment.url);
        }

        setAttachments(
            attachments.filter(
                attachment => attachment.id !== attachmentId
            )
        );
    }
    return (
        <form className="issue-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Project</label>

                <select
                    value={projectId}
                    onChange={(event) => setProjectId(event.target.value)}
                    required
                >
                    <option value="">Select Project</option>

                    {projects.map(project => (
                        <option
                            key={project.id}
                            value={project.id}
                        >
                            {project.key} - {project.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Title</label>

                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter issue title"
                />
            </div>

            <div className="form-group">
                <label>Description</label>

                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe the issue"
                    rows="5"
                />
            </div>

            <div className="form-row">

                <div className="form-group">
                    <label>Type</label>

                    <select
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                        <option value="TASK">Task</option>
                        <option value="BUG">Bug</option>
                        <option value="STORY">Story</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Priority</label>

                    <select
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Labels</label>

                    <div className="label-input-row">

                        <input
                            type="text"
                            value={labelInput}
                            onChange={(event) =>
                                setLabelInput(event.target.value)
                            }
                            placeholder="e.g. frontend"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleAddLabel();
                                }
                            }}
                        />

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={handleAddLabel}
                        >
                            Add
                        </button>

                    </div>

                    <div className="form-labels">

                        {labels.map(label => (
                            <span
                                className="form-label"
                                key={label}
                            >
                                {label}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveLabel(label)
                                    }
                                >
                                    ×
                                </button>
                            </span>
                        ))}

                    </div>
                </div>

                <div className="form-group">
                    <label>Assignee</label>

                    <select
                        value={assigneeId}
                        onChange={(event) =>
                            setAssigneeId(event.target.value)
                        }
                    >
                        <option value="">
                            Unassigned
                        </option>

                        {teamMembers.map(member => (
                            <option
                                key={member.id}
                                value={member.id}
                            >
                                {member.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Attachments</label>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAddAttachment}
                    />

                    {attachments.length > 0 && (
                        <div className="attachment-previews">
                            {attachments.map(attachment => (
                                <div
                                    className="attachment-preview"
                                    key={attachment.id}
                                >
                                    <img
                                        src={attachment.url}
                                        alt={attachment.name}
                                    />

                                    <div className="attachment-info">
                                        <span>{attachment.name}</span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveAttachment(attachment.id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="primary-button"
                >
                    {editingIssue ? "Update Issue" : "Create Issue"}
                </button>
            </div>

        </form>
    );
}

export default IssueForm;