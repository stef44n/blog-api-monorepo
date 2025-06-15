// src/pages/CreatePost.jsx
import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [form, setForm] = useState({ title: "", body: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost(form.title, form.body);
        if (res.id) navigate(`/post/${res.id}`);
    };

    return (
        <div>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="body"
                    value={form.body}
                    onChange={handleChange}
                    placeholder="Content"
                    rows={10}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
