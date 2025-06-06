import express from "express";
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/postController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;
