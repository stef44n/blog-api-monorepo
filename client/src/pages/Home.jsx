import { useEffect, useState } from "react";
import { getAllPosts } from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("all"); // 'all' | 'published' | 'unpublished'
    const { user } = useAuth();

    useEffect(() => {
        getAllPosts()
            .then((data) => setPosts(data))
            .catch((err) => console.error("Failed to load posts:", err));
    }, []);

    const filteredPosts = posts.filter((post) => {
        // If not logged in, show only published posts
        if (!user) return post.published;

        // If logged in, allow filtering:
        if (filter === "published") return post.published;
        if (filter === "unpublished")
            return !post.published && post.authorId === user.id;
        // Show all: published + own unpublished
        return post.published || post.authorId === user.id;
    });

    const sortedPosts = [...filteredPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">All Posts</h1>

                {user && (
                    <Link
                        to="/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create Post
                    </Link>
                )}
            </div>

            {/* Show filter buttons only if user is logged in */}
            {user && (
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-1 rounded ${
                            filter === "all"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("published")}
                        className={`px-3 py-1 rounded ${
                            filter === "published"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => setFilter("unpublished")}
                        className={`px-3 py-1 rounded ${
                            filter === "unpublished"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        Unpublished
                    </button>
                </div>
            )}

            {sortedPosts.length === 0 ? (
                <p className="text-gray-600 text-center">
                    No posts to display.
                </p>
            ) : (
                <ul className="space-y-4">
                    {sortedPosts.map((post) => (
                        <li
                            key={post.id}
                            className="p-4 bg-white rounded shadow hover:shadow-md transition"
                        >
                            <Link to={`/post/${post.id}`}>
                                <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="text-gray-700 mt-2">
                                {post.body.slice(0, 100)}...
                            </p>
                            {user && (
                                <span
                                    className={`mt-2 inline-block text-sm font-medium ${
                                        post.published
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    }`}
                                >
                                    {post.published
                                        ? "Published"
                                        : "Unpublished"}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
