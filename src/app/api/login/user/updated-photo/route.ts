import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, imageUrl} = await req.json();

    if (!userId || !imageUrl) {
      return NextResponse.json({ error: "Missing userId or profilePic" }, { status: 400 });
    }

    const updatedUser = await prisma.profile.update({
      where: { id: userId },
      data: { imageUrl },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
