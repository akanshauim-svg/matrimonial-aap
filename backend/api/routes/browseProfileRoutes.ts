import { Router } from "express";
import { getProfiles } from "../controllers/browseProfileController";

const router = Router();

router.get("/", getProfiles);

export default router;
