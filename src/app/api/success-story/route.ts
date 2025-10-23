import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure upload folder exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function GET() {
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

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const partnerName = formData.get("partnerName") as string | null;
    const storyText = formData.get("storyText") as string | null;
    const dateOfMatchStr = formData.get("dateOfMatch") as string | null;
    const userIdRaw = formData.get("userId");
    const userId = userIdRaw ? Number(userIdRaw) : NaN;
    const image = formData.get("image") as File | null;

    if (!name?.trim() || !partnerName?.trim() || !storyText?.trim() || !dateOfMatchStr || isNaN(userId)) {
      return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
    }

    const dateOfMatch = new Date(dateOfMatchStr);
    if (isNaN(dateOfMatch.getTime())) {
      return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
    }

    let imageUrl = "";
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const safeName = image.name.replace(/\s+/g, "-");
      const fileName = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const newStory = await prisma.story.create({
      data: { name, partnerName, storyText, dateOfMatch, userId, imageUrl },
    });

    return NextResponse.json({ message: "Story shared!", story: newStory }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ message: "Server error", error: (err as Error).message }, { status: 500 });
  }
}
