import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from '../../../lib/supabaseClient'


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const value = searchParams.get("value");

    console.log("Filter:", filter, "Value:", value);

    
    let where: Record<string, unknown> = {};


    if (filter && value) {
      if (filter === "age") {
        where = { age: Number(value) };
      } else if (filter === "location") {
        where = { location: { contains: value, mode: "insensitive" } };
      } else if (filter === "interest") {
        where = { skills: { contains: value, mode: "insensitive" } };
      }
    }

    
    const users = await prisma.profile.findMany({
      where,
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
        location: true,
        profession: true,
        bio: true,
        imageUrl: true,
      },
    });

    console.log("Fetched users:", users.length);

    
    return NextResponse.json({ users }, { status: 200 });

  } catch (err) {
    console.error("Error fetching profiles:", err);
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
