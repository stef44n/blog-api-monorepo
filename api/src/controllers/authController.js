import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, password } = req.body;
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
            { userId: user.id, username: user.username, isAdmin: user.isAdmin },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};
