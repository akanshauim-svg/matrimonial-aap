import express from "express";
import multer from "multer";
import path from "path";
import { getStories, createStory } from "../controllers/storyController";

const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), "public/uploads"));
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getStories);
router.post("/", upload.single("image"), createStory);

export default router;
