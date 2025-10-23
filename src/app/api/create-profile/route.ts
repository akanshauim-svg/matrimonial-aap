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

    if (!name || !email || !age) {
      return NextResponse.json(
        { message: "Name, Email, and Age are required" },
        { status: 400 }
      );
    }

    const skillsStr = Array.isArray(skills) ? skills.join(", ") : skills || "";

    let profile;

    if (id) {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {
        name,
        email,
        contact: contact || "",
        age: Number(age),
        location: location || "",
        profession: profession || "",
        bio: bio || "",
        skills: skillsStr,
        imageUrl: imageUrl || "",
      };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      profile = await prisma.profile.update({
        where: { id },
        data: updateData,
      });
    } else {
      // Check if email exists
      const existing = await prisma.profile.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { message: "Profile already exists" },
          { status: 400 }
        );
      }

      // Create new profile
      profile = await prisma.profile.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10),
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

    // Return full profile except password
    const safeUser = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      contact: profile.contact,
      age: profile.age,
      location: profile.location,
      profession: profile.profession,
      bio: profile.bio,
      skills: profile.skills,
      imageUrl: profile.imageUrl || "",
    };

    return NextResponse.json({ message: "Profile saved successfully", profile: safeUser }, { status: 200 });
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
