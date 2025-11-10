import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { saveUploadedFile } from "../utils/uploadFile";
const prisma = new PrismaClient();

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Invalid ID parameter. Must be a number." });
    }

    const user = await prisma.profile.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsersHandler = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.profile.findMany({ orderBy: { id: "asc" } });

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const existingUser = await prisma.profile.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      name,
      email,
      password,
      contact,
      age,
      location,
      profession,
      bio,
      skills,
    } = req.body;

    let imageUrl = existingUser.imageUrl || "";
    const file = req.file;
    if (file) {
      imageUrl = saveUploadedFile(file, id);
    }

    // Handle skills field (array or comma string)
    let skillsArray: string[] = [];
    if (skills) {
      if (Array.isArray(skills)) {
        skillsArray = skills;
      } else if (typeof skills === "string") {
        skillsArray = skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    // Prepare update data
    const updateData: any = {
      name: name ?? existingUser.name,
      email: email ?? existingUser.email,
      contact: contact ?? existingUser.contact,
      age: age ? Number(age) : existingUser.age,
      location: location ?? existingUser.location,
      profession: profession ?? existingUser.profession,
      bio: bio ?? existingUser.bio,
      skills: skillsArray.length > 0 ? skillsArray : existingUser.skills,
      imageUrl,
    };

    // Update in database
    const updatedUser = await prisma.profile.update({
      where: { id },
      data: updateData,
    });

    const { password: _, ...safeUser } = updatedUser;
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: safeUser });
  } catch (error: unknown) {
    console.error("Update Profile Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Server error", error: message });
  }
};
