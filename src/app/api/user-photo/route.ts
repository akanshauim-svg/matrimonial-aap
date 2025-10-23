import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, imageUrl } = body;

    if (!userId || !imageUrl) {
      return NextResponse.json({ message: "User ID and image are required" }, { status: 400 });
    }

    const updatedUser = await prisma.profile.update({
      where: { id: userId },
      data: { imageUrl },
    });

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl || "",
    });
  } catch (err) {
    console.error("POST /api/user-photo error:", err);
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
