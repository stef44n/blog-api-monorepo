const API_URL = import.meta.env.VITE_API_URL;

const headersWithAuth = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const register = async (username, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
};

export const loginAPI = async (username, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
};

export async function getAllPosts() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");

    return res.json();
}

export async function getPost(id) {
    const res = await fetch(`${API_URL}/posts/${id}`);
    return res.json();
}

export async function createPost(title, body) {
    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: headersWithAuth(),
        body: JSON.stringify({ title, body }),
    });
    return res.json();
}

export async function updatePost(id, title, body) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: headersWithAuth(),
        body: JSON.stringify({ title, body }),
    });
    return res.json();
}

export async function deletePost(id) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: headersWithAuth(),
    });
    return res.json();
}
