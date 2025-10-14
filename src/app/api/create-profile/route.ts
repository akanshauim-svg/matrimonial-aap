import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
      imageUrl,
    } = body;

    // Required fields validation
    if (!name || !email || !password || !age) {
      return NextResponse.json(
        { message: "Name, Email, Password, and Age are required" },
        { status: 400 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const skillsStr = Array.isArray(skills) ? skills.join(", ") : skills || "";

    let profile;

    if (id) {
      
      profile = await prisma.profile.update({
        where: { id },
        data: {
          name,
          email,
          password: hashedPassword,
          contact: contact || "",
          age: Number(age),
          location: location || "",
          profession: profession || "",
          bio: bio || "",
          skills: skillsStr,
          imageUrl: imageUrl || "",
        },
      });
    } else {
     
      const existing = await prisma.profile.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { message: "Profile already exists" },
          { status: 400 }
        );
      }

      profile = await prisma.profile.create({
        data: {
          name,
          email,
          password: hashedPassword,
          contact: contact || "",
          age: Number(age),
          location: location || "",
          profession: profession || "",
          bio: bio || "",
          skills: skillsStr,
          imageUrl: imageUrl || "",
        },
      });
    }

    return NextResponse.json(
      { message: "Profile saved successfully", profile },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
