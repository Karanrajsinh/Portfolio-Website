import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json({ error: "Server configuration error: Password not set" }, { status: 500 });
    }

    if (password === expected) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
