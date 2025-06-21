import { useEffect, useState } from "react";
import { getAllPosts } from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("published"); // 'all' | 'published' | 'unpublished'
    const { user } = useAuth();

    useEffect(() => {
        getAllPosts()
            .then((data) => setPosts(data))
            .catch((err) => console.error("Failed to load posts:", err));
    }, []);

    const filteredPosts = posts.filter((post) => {
        if (!user) return post.published;

        if (user.isAdmin) {
            // Admins see all posts
            if (filter === "published") return post.published;
            if (filter === "unpublished") return !post.published;
            return true; // all posts
        }

        // Regular users
        if (filter === "published") return post.published;
        if (filter === "unpublished")
            return !post.published && post.authorId === user.id;

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
                </div>
            )}

            {sortedPosts.length === 0 ? (
                <p className="text-gray-600 text-center">
                    No posts to display.
                </p>
            ) : (
                ""
            )}

            <ul className="space-y-4">
                {sortedPosts.map((post) => {
                    const isOwnPost = user?.id === post.authorId;
                    const isAdminAuthor = post.author?.isAdmin;
                    const isAdminViewer = user?.isAdmin;

                    let postClass =
                        "p-4 rounded shadow hover:shadow-md transition";

                    if (isOwnPost) {
                        postClass += " bg-green-50 border border-green-100";
                    } else if (isAdminViewer && isAdminAuthor) {
                        postClass += " bg-blue-50 border border-blue-100";
                    } else {
                        postClass += " bg-white";
                    }

                    return (
                        <li key={post.id} className={postClass}>
                            <Link to={`/post/${post.id}`}>
                                <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="text-gray-700 mt-2">
                                {post.body.slice(0, 100)}...
                            </p>

                            {isAdminViewer && isAdminAuthor && (
                                <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded mt-2 mr-2">
                                    Admin Author
                                </span>
                            )}

                            {isOwnPost && (
                                <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded mt-2">
                                    Your Post
                                </span>
                            )}

                            {/* <div className="mt-2 text-sm font-medium">
                                <span
                                    className={`${
                                        post.published
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    }`}
                                >
                                    {post.published
                                        ? "Published"
                                        : "Unpublished"}
                                </span>
                            </div> */}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
