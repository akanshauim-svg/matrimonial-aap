import { Request, Response } from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure upload folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//  GET all stories
export const getStories = async (_req: Request, res: Response) => {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { id: "desc" },
    });

    const formatted = stories.map((s) => ({
      id: s.id,
      name: s.name,
      partnerName: s.partnerName,
      storyText: s.storyText,
      dateOfMatch: s.dateOfMatch.toISOString(),
      imageUrl: s.imageUrl || undefined,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

// POST new story
export const createStory = async (req: Request, res: Response) => {
  try {
    const { name, partnerName, storyText, dateOfMatch, userId } = req.body;

    if (
      !name?.trim() ||
      !partnerName?.trim() ||
      !storyText?.trim() ||
      !dateOfMatch ||
      !userId
    ) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const date = new Date(dateOfMatch);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newStory = await prisma.story.create({
      data: {
        name,
        partnerName,
        storyText,
        dateOfMatch: date,
        userId: Number(userId),
        imageUrl,
      },
    });

    res.status(201).json({ message: "Story shared!", story: newStory });
  } catch (err) {
    console.error("POST error:", err);
    res
      .status(500)
      .json({ message: "Server error", error: (err as Error).message });
  }
};
