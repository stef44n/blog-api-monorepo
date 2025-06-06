import express from "express";
import { addComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment); // optional: require auth

export default router;
