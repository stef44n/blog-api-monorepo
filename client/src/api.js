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

export async function becomeAdmin(password) {
    const res = await fetch(`${API_URL}/auth/become-admin`, {
        method: "POST",
        headers: headersWithAuth(),
        body: JSON.stringify({ password }),
    });

    if (!res.ok) throw new Error("Failed to become admin");

    return await res.json(); // updated user object
}

export async function getAllPosts() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");

    return res.json();
}

export async function getPost(id) {
    const res = await fetch(`${API_URL}/posts/${id}`);
    return res.json();
}

export async function createPost(title, body, published = false) {
    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: headersWithAuth(),
        body: JSON.stringify({ title, body, published }),
    });
    return res.json();
}

export async function updatePost(id, title, body, published) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: headersWithAuth(),
        body: JSON.stringify({ title, body, published }),
    });

    if (!res.ok) {
        throw new Error("Failed to update post");
    }

    return res.json();
}

export async function deletePost(id) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: headersWithAuth(),
    });
    return res.json();
}

// Get all comments for a specific post
export async function getCommentsForPost(postId) {
    const res = await fetch(`${API_URL}/comments/post/${postId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch comments");
    }
    return res.json();
}

// Add a new comment to a post
export async function addComment(body, postId) {
    const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: headersWithAuth(),
        body: JSON.stringify({ body, postId }),
    });

    if (!res.ok) {
        throw new Error("Failed to post comment");
    }

    return res.json();
}

export const updateComment = async (id, body) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "PUT",
        headers: headersWithAuth(),
        body: JSON.stringify({ body }),
    });
    if (!res.ok) throw new Error("Failed to update comment");
    return res.json();
};

export const deleteComment = async (id) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "DELETE",
        headers: headersWithAuth(),
    });
    if (!res.ok) throw new Error("Failed to delete comment");
    return res.json();
};
