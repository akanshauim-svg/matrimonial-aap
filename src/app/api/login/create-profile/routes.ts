import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, contact, age, location, profession, bio, skills, imageUrl } = body;

    if (!name || !email || !password || !age) {
      return NextResponse.json({ message: "Name, Email, Password, and Age are required" }, { status: 400 });
    }

    // Check existing profile
    const existing = await prisma.profile.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Profile already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new profile
    const newProfile = await prisma.profile.create({
      data: {
        name,
        email,
        password: hashedPassword,
        contact: contact || "",
        age: Number(age),
        location: location || "",
        profession: profession || "",
        bio: bio || "",
        skills: skills || "",
        imageUrl: imageUrl || "",
      },
    });

    return NextResponse.json({ message: "Profile created successfully", profile: newProfile }, { status: 201 });
  } catch (err) {
    console.error("Error creating profile:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
