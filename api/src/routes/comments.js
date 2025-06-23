import express from "express";
import {
    createComment,
    getCommentsForPost,
    updateComment,
    deleteComment,
} from "../controllers/commentController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// POST /api/comments - create a new comment (auth required)
router.post("/", authenticate, createComment);

// GET /api/comments/post/:postId - fetch all comments for a specific post
router.get("/post/:postId", getCommentsForPost);
router.put("/:id", authenticate, updateComment);
router.delete("/:id", authenticate, deleteComment);

export default router;
