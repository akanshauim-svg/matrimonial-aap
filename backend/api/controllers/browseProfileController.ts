import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const { filter, value } = req.query as { filter?: string; value?: string };

    let where: any = {};
    if (filter && value) {
      where[filter] = { contains: value, mode: "insensitive" };
    }

    const users = await prisma.profile.findMany({
      where,
      select: {
        id: true,
        name: true,
        age: true,
        location: true,
        profession: true,
        bio: true,
        imageUrl: true,
        skills: true,
      },
    });

    res.json({ users });
  } catch (err) {
    console.error("Browse profiles error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
