import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, password } = req.body;
    console.log("Incoming register request body:", req.body);

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, password: hashed },
        });
        res.status(201).json({
            message: "User registered",
            user: { id: user.id, username: user.username },
        });
    } catch (err) {
        res.status(400).json({ error: "Username might already exist" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, isAdmin: user.isAdmin },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

export const becomeAdmin = async (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ message: "Invalid password" });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { isAdmin: true },
        });

        res.json({
            id: updatedUser.id,
            username: updatedUser.username,
            isAdmin: updatedUser.isAdmin,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
