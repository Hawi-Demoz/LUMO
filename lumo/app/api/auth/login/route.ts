import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:4001";

  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const responseText = await res.text();
      return NextResponse.json(
        {
          message: "Authentication backend returned an invalid response.",
          upstreamStatus: res.status,
          upstreamBody: responseText.slice(0, 200),
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
