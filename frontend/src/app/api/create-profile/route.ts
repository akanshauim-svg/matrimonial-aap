import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { supabase } from '../../../lib/supabaseClient'


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const contact = formData.get("contact") as string;
    const age = formData.get("age") as string;
    const location = formData.get("location") as string;
    const profession = formData.get("profession") as string;
    const bio = formData.get("bio") as string;
    const skills = formData.get("skills") as string;
    const file = formData.get("image") as File | null;



    if (!name || !email || !age) {
      return NextResponse.json(
        { message: "Name, Email, and Age are required" },
        { status: 400 }
      );
    }

    // 📸 Save uploaded file to /public/uploads
    let imageUrl = "";
    if (file) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const skillsStr = skills || "";

    let profile;

    if (id) {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {
        name,
        email,
        contact,
        age: Number(age),
        location,
        profession,
        bio,
        skills: skillsStr,
      };

      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      profile = await prisma.profile.update({
        where: { id: Number(id) },
        data: updateData,
      });
    } else {
      // check if email already exists
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
          password: await bcrypt.hash(password, 10),
          contact,
          age: Number(age),
          location,
          profession,
          bio,
          skills: skillsStr,
          imageUrl,
        },
      });
    }

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

    return NextResponse.json(
      { message: "Profile saved successfully", profile: safeUser },
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
