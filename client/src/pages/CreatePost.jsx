// src/pages/CreatePost.jsx
import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [form, setForm] = useState({ title: "", body: "", published: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost(form.title, form.body, form.published);
        if (res.id) navigate(`/post/${res.id}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="body"
                    >
                        Body
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                        placeholder="Write your post..."
                        rows={10}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6 flex items-center">
                    <input
                        id="published"
                        name="published"
                        type="checkbox"
                        checked={form.published}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="published" className="text-gray-700">
                        Publish this post
                    </label>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
