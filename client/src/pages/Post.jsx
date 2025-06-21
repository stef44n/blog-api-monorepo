// src/pages/Post.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch (err) {
                console.error("Error fetching post:", err);
                setPost(null); // Explicitly set to null
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await deletePost(id, token);
            navigate("/");
        } catch (err) {
            console.error("Failed to delete post:", err);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading post...</div>;

    if (!post)
        return (
            <div className="p-6 max-w-xl mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">
                    404 - Post Not Found
                </h1>
                <p className="mb-6">
                    The post you're looking for doesn't exist or has been
                    deleted.
                </p>
                <Link to="/" className="text-blue-500 hover:underline">
                    ← Go back to homepage
                </Link>
            </div>
        );

    const isAuthor = user && user.id === post.authorId;
    const isAdmin = user && user.isAdmin;
    const canEditOrDelete = isAuthor || isAdmin;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <p className="text-gray-800 leading-relaxed mb-4">
                    {post.body}
                </p>
                {isAdmin && !isAuthor && (
                    <p className="text-sm text-blue-600 font-semibold mb-2">
                        Admin Access
                    </p>
                )}
                <p className="text-sm text-gray-500 mb-4">
                    By {post.author?.username || "Unknown"} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-between items-center mt-4">
                    {canEditOrDelete ? (
                        <div className="flex space-x-4">
                            {isAuthor && (
                                <Link
                                    to={`/edit/${post.id}`}
                                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                                >
                                    ✏️ Edit
                                </Link>
                            )}
                            <button
                                onClick={handleDelete}
                                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    ) : (
                        <div />
                    )}

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-gray-800 underline"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
