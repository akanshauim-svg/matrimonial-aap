import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) { 
  try {
    const users = await prisma.profile.findMany({
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

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error("Error fetching profiles:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
