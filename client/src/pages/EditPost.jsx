// src/pages/EditPost.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../api";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", body: "" });

    useEffect(() => {
        getPost(id).then((post) => {
            setForm({ title: post.title, body: post.body });
        });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePost(id, form.title, form.body);
        navigate(`/post/${id}`);
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="body"
                    value={form.body}
                    onChange={handleChange}
                    rows={10}
                    required
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
