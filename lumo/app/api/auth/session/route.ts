import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_URL = process.env.BACKEND_API_URL || "http://localhost:4001";
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ isAuthenticated: false, user: null }, { status: 200 });
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ isAuthenticated: false, user: null }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json({
      isAuthenticated: true,
      user: data.user,
    });
  } catch (error) {
    return NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 200 }
    );
  }
}
