import pkg from "@prisma/client";
import type { Request, Response } from "express";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const updateUserPhoto = async (req: Request, res: Response) => {
  try {
    const { userId, imageUrl } = req.body;

    if (!userId || !imageUrl) {
      return res
        .status(400)
        .json({ message: "User ID and image are required" });
    }

    const updatedUser = await prisma.profile.update({
      where: { id: Number(userId) },
      data: { imageUrl },
    });

    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl || "",
    });
  } catch (err) {
    console.error("POST /api/user-photo error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};
