import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      id,
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
    const file = req.file; 

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Password are required" });
    }

    // Handle image upload
    let imageUrl = "";
    if (file) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    let skillsArray = [];
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

    let profile;

    if (id) {
      const updateData: any = {
        name,
        email,
        contact,
        age: age ? Number(age) : null,
        location,
        profession,
        bio,
        skills: skillsArray,
      };

      if (password) updateData.password = await bcrypt.hash(password, 10);
      if (imageUrl) updateData.imageUrl = imageUrl;

      profile = await prisma.profile.update({
        where: { id: Number(id) },
        data: updateData,
      });
    } else {
      const existing = await prisma.profile.findUnique({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create new profile
      profile = await prisma.profile.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10),
          contact,
          age: age ? Number(age) : null,
          location,
          profession,
          bio,
          skills: skillsArray,
          imageUrl,
        },
      });
    }

    const { password: _, ...safeUser } = profile;
    res
      .status(200)
      .json({ message: "User saved successfully", user: safeUser });
  } catch (error: unknown) {
    console.error("Register error:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await prisma.profile.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...safeUser } = user;
    res
      .status(200)
      .json({ message: "Login successful", user: safeUser, token });
  } catch (error: unknown) {
    console.error("Login error:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await prisma.profile.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(`Password reset requested for ${email}`);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Server error", error: message });
  }
};
