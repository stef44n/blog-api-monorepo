import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        // where: { published: true },
        include: { author: true, comments: true },
    });
    res.json(posts);
};

export const getPostById = async (req, res) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(req.params.id) },
        include: { author: true, comments: true },
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
};

export const createPost = async (req, res) => {
    const { title, body, published } = req.body;
    const userId = req.user.id;
    const post = await prisma.post.create({
        data: { title, body, published, authorId: userId },
    });
    res.status(201).json(post);
};

export const updatePost = async (req, res) => {
    const { title, body, published } = req.body;
    const post = await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: { title, body, published },
    });
    res.json(post);
};

export const deletePost = async (req, res) => {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Post deleted" });
};
