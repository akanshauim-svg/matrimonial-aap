import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { supabase } from '../../../lib/supabaseClient'


export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    
    console.log(`Password reset requested for: ${email}`);

    return NextResponse.json({
      message: "Password reset link has been sent to your email.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
