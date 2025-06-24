import express from "express";
import { register, login, becomeAdmin } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/become-admin", authenticate, becomeAdmin);

export default router;
