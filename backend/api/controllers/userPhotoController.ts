import pkg from "@prisma/client";
import type { Request, Response } from "express";
const { PrismaClient } = pkg;
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const prisma = new PrismaClient();
import { saveUploadedFile } from "../utils/uploadFile";
export const uploadUserPhoto = [
  upload.single("image"), 
  async (req: Request, res: Response) => {
    try {
      const userId = Number(req.body.userId);
      const file = req.file;

      if (!userId || !file) {
        return res
          .status(400)
          .json({ message: "User ID and image file are required" });
      }

      const imageUrl = saveUploadedFile(file, userId);

      const updatedUser = await prisma.profile.update({
        where: { id: userId },
        data: { imageUrl },
      });

      return res.status(200).json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        imageUrl: updatedUser.imageUrl,
      });
    } catch (err) {
      console.error("Error uploading user photo:", err);
      return res.status(500).json({
        message: "Failed to upload photo",
        error: err instanceof Error ? err.message : err,
      });
    }
  },
];