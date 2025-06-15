import { useEffect, useState } from "react";
import { getAllPosts } from "../api";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then((data) => {
                console.log("Fetched posts:", data);
                setPosts(data);
            })
            .catch((err) => {
                console.error("Failed to load posts:", err);
            });
    }, []);

    return (
        <div>
            <h1>All Posts</h1>
            {posts.length === 0 && <p>No posts yet.</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <p>{post.body.slice(0, 100)}...</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
