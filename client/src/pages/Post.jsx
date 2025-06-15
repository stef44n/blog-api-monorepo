// src/pages/Post.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getPost(id).then(setPost);
    }, [id]);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this post?")) {
            await deletePost(id);
            navigate("/");
        }
    };

    if (!post) return <p>Loading...</p>;

    const isAuthor = user && user.id === post.authorId;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            {isAuthor && (
                <div>
                    <Link to={`/edit/${post.id}`}>Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}
