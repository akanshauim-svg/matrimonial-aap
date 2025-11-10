import express from "express";
import {
  getUserByIdHandler,
  getAllUsersHandler,
  updateProfile,
} from "../controllers/userController";
import { uploadUserPhoto } from "../controllers/userPhotoController";
const router = express.Router();

router.get("/all-users", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);
router.put("/update/:id", updateProfile);
router.post("/upload-photo/:id", uploadUserPhoto);

export default router;
