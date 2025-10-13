import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, partnerName, storyText, dateOfMatch, imageUrl, userId } = body;

    if (!name || !partnerName || !storyText || !dateOfMatch || !userId) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 });
    }

    const newStory = await prisma.story.create({
      data: {
        userId,
        name,
        partnerName,
        storyText,
        dateOfMatch: new Date(dateOfMatch),
        imageUrl,
      },
    });

    return NextResponse.json({ story: newStory }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { dateOfMatch: "desc" },
    });
    return NextResponse.json({ stories });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
