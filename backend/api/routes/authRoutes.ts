import express from "express";
import multer from "multer";
import { register, login, logout, forgotPassword } from "../controllers/authController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout); 

export default router;
