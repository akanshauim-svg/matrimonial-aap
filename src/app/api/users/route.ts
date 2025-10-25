import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { supabase } from '../../../lib/supabaseClient'

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.profile.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
        age: true,
        location: true,
        profession: true,
        bio: true,
        skills: true,
        imageUrl: true,
      },
    });

    
    const formattedUsers = users.map((u) => ({
      ...u,
      skills: u.skills
        ? u.skills.split(",").map((s) => s.trim())
        : [], 
    }));

    return NextResponse.json(formattedUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
