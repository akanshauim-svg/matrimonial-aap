import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


export async function GET() {
  try {
    const stories = await prisma.story.findMany();
    

    
    const formatted = stories.map((s) => ({
      id: s.id,
      name: s.name,
      partnerName: s.partnerName,
      story: s.storyText,
      dateMet: s.dateOfMatch,
      image: s.imageUrl || undefined,
    }));
    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const partnerName = formData.get("partnerName") as string;
    const storyText = formData.get("storyText") as string;
    const dateOfMatch = formData.get("dateOfMatch") as string;
    const userId = Number(formData.get("userId"));
    const image = formData.get("image") as File | null;

    let imageUrl = "";
    if (image && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const newStory = await prisma.story.create({
      data: {
        name,
        partnerName,
        storyText,
        dateOfMatch,
        userId,
        imageUrl,
      },
    });

    return NextResponse.json({ message: "Story shared!", story: newStory }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: (err as Error).message }, { status: 500 });
  }
}

