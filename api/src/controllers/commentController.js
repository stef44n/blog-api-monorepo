import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create a new comment
export const createComment = async (req, res) => {
    const { body, postId } = req.body;

    if (!body || !postId) {
        return res.status(400).json({ error: "Missing body or postId" });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                body,
                postId: parseInt(postId),
                author: req.user.username,
            },
        });
        res.status(201).json(comment);
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ error: "Failed to create comment" });
    }
};

// Get comments for a post
export const getCommentsForPost = async (req, res) => {
    const postId = parseInt(req.params.postId);

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        });
        res.json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    const commentId = parseInt(req.params.id);
    const { body } = req.body;

    if (!body) {
        return res.status(400).json({ error: "Missing body" });
    }

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.author !== req.user.username) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { body },
        });

        res.json(updatedComment);
    } catch (err) {
        console.error("Error updating comment:", err);
        res.status(500).json({ error: "Failed to update comment" });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.id);

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const isAuthor = comment.author === req.user.username;
        const isAdmin = req.user.isAdmin;

        if (!isAuthor && !isAdmin) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await prisma.comment.delete({
            where: { id: commentId },
        });

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};
