import { apiFetch } from "./apiClient";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const PROJECT_URL =
    `${API_BASE_URL}/projects`;

export async function getProjects() {
    const response =
        await apiFetch("/projects");

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    const data = await response.json();

    return data.map(project => ({
        id: project.id,
        key: project.projectKey,
        name: project.name,
        description: project.description,
        image: project.image
    }));
}

export async function createProject(
    projectData
) {

    const response =
        await apiFetch("/projects", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(projectData)
        });

    if (!response.ok) {
        throw new Error(
            "Failed to create project"
        );
    }

    return response.json();
}

export async function deleteProject(id) {

    const response =
        await fetch(
            `/projects/${id}`,
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