import { apiFetch } from "./apiClient";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const USER_URL =
    `${API_BASE_URL}/users`;

export async function getUsers() {
    const response = await apiFetch("/users");

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    const data = await response.json();

    return data.map(user => ({
        id: user.id,
        name:user.name,
        role:user.role,
        avatar:user.avatar
    }));
}

export async function createUser(
    userData
) {

    const response =
        await apiFetch("/users", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(userData)
        });

    if (!response.ok) {
        throw new Error(
            "Failed to create user"
        );
    }

    return response.json();
}

export async function deleteUser(id) {

    const response =
        await apiFetch(
            `/users/${id}`,
            {
                method: "DELETE"
            }
        );

    if (!response.ok) {
        throw new Error(
            "Failed to delete user"
        );
    }
}

// export async function updateIssue(issueId, issueData) {
//     const response = await fetch(`${ISSUE_URL}/${issueId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(issueData)
//     });

//     if (!response.ok) {
//         throw new Error("Failed to update issue");
//     }

//     return response.json();
// }
