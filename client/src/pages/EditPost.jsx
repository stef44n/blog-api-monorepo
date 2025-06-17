import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", body: "", published: false });
    const { user } = useAuth();

    useEffect(() => {
        getPost(id).then((post) => {
            setForm({
                title: post.title,
                body: post.body,
                published: post.published,
                authorId: post.authorId,
            });
        });
    }, [id]);

    if (!user || user.id !== form.authorId) {
        return (
            <div className="max-w-2xl mx-auto mt-10 text-center text-red-500">
                <p>You are not authorized to edit this post.</p>
            </div>
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePost(id, form.title, form.body, form.published);
        navigate(`/post/${id}`);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Body
                    </label>
                    <textarea
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                        rows={10}
                        required
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="published"
                        checked={form.published}
                        onChange={() =>
                            setForm({ ...form, published: !form.published })
                        }
                        className="rounded"
                    />
                    <label
                        htmlFor="published"
                        className="text-sm text-gray-700"
                    >
                        Published
                    </label>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-gray-800 underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
