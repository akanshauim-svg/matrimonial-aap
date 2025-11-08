import express from "express";
import multer from "multer";
import {
  register,
  login,
  forgotPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

export default router;
