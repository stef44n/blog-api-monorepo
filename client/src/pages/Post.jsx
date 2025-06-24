// src/pages/Post.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    getPost,
    deletePost,
    getCommentsForPost,
    addComment,
    updateComment,
    deleteComment,
} from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentBody, setEditCommentBody] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
                const commentData = await getCommentsForPost(id);
                setComments(commentData);
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

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentBody.trim()) return;

        setCommentLoading(true);
        try {
            const newComment = await addComment(commentBody, post.id);
            setCommentBody("");
            setComments([newComment, ...comments]);
        } catch (err) {
            console.error("Failed to add comment:", err);
        } finally {
            setCommentLoading(false);
        }
    };

    const handleUpdateComment = async (e, id) => {
        e.preventDefault();
        if (!editCommentBody.trim()) return;

        try {
            const updated = await updateComment(id, editCommentBody);
            setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
            setEditingCommentId(null);
            setEditCommentBody("");
        } catch (err) {
            console.error("Failed to update comment:", err);
        }
    };

    const handleDeleteComment = async (id) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            await deleteComment(id);
            setComments((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Failed to delete comment:", err);
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
            <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
                {/* Post Header */}
                <div>
                    {isAdmin && !isAuthor && (
                        <p className="text-sm text-blue-600 font-semibold mt-1 text-right bg-blue-100 px-2 py-0.5 rounded mt-2 mr-2 justify-self-end">
                            Admin Access
                        </p>
                    )}
                    <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
                    <div className="text-sm text-gray-500">
                        <span>By {post.author?.username || "Unknown"}</span>{" "}
                        &bull;{" "}
                        <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Post Body */}
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {post.body}
                </p>

                {/* Comments Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-left">
                        Comments
                    </h2>

                    {user && (
                        <form
                            onSubmit={handleAddComment}
                            className="mb-6 space-y-2"
                        >
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="Write a comment..."
                                value={commentBody}
                                onChange={(e) => setCommentBody(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={commentLoading}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                            >
                                {commentLoading ? "Posting..." : "Post Comment"}
                            </button>
                        </form>
                    )}

                    <ul className="space-y-4">
                        {comments.map((comment) => {
                            const isCommentAuthor =
                                user && user.username === comment.author;
                            const isEditing = editingCommentId === comment.id;

                            return (
                                <li
                                    key={comment.id}
                                    className="bg-gray-50 border border-gray-200 rounded p-4 flex flex-col"
                                >
                                    {isEditing ? (
                                        <form
                                            onSubmit={(e) =>
                                                handleUpdateComment(
                                                    e,
                                                    comment.id
                                                )
                                            }
                                            className="space-y-2"
                                        >
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                                rows="3"
                                                value={editCommentBody}
                                                onChange={(e) =>
                                                    setEditCommentBody(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="flex gap-3">
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setEditingCommentId(
                                                            null
                                                        )
                                                    }
                                                    className="text-gray-600 hover:text-gray-800 underline cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <p className="text-gray-800 text-left">
                                                {comment.body}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1 self-start">
                                                By {comment.author} •{" "}
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleString()}
                                            </p>

                                            {(isCommentAuthor || isAdmin) && (
                                                <div className="flex gap-4 mt-2 text-sm justify-end">
                                                    {isCommentAuthor && (
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(
                                                                    comment.id
                                                                );
                                                                setEditCommentBody(
                                                                    comment.body
                                                                );
                                                            }}
                                                            className="text-blue-600 hover:underline cursor-pointer"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                comment.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:underline cursor-pointer"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Edit/Delete and Back Buttons */}
                <div className="flex justify-between items-center pt-6 border-t-3 border-gray-100">
                    {canEditOrDelete ? (
                        <div className="flex space-x-4">
                            {isAuthor && (
                                <Link
                                    to={`/edit/${post.id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                                >
                                    ✏️ Edit
                                </Link>
                            )}
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
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
                        className="text-gray-600 hover:text-gray-800 underline cursor-pointer"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
}
