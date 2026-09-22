const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(
    endpoint,
    options = {}
) {

    const token =
        localStorage.getItem("devtrack_token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    return fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );
}