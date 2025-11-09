import express from "express";
import {
  getUserByIdHandler,
  getAllUsersHandler,
} from "../controllers/userController";

const router = express.Router();

router.get("/all-users", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);

export default router;
