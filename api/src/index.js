import express from "express";
import cors from "cors";
// import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
// const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    // });
}

app.get("/", (req, res) => {
    res.send("Blog API is up!");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port", process.env.PORT || 5000);
});
