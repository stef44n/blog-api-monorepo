import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addComment = async (req, res) => {
    const { postId, author, body } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: { body, author, postId: Number(postId) },
        });
        res.status(201).json(comment);
    } catch {
        res.status(400).json({ error: "Error adding comment" });
    }
};
