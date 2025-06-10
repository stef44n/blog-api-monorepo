import express from "express";
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/postController.js";
import { authenticate, requireAdmin } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, requireAdmin, updatePost);
router.delete("/:id", authenticate, requireAdmin, deletePost);

export default router;
