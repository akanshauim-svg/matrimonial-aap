import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { supabase } from "../../../../lib/supabaseClient";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    const user = await prisma.profile.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in GET /api/user/[id]:", err);
    return NextResponse.json(
      { error: "Server error", details: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
