import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session-store";

// GET /api/check?session=XXX - 세션이 freed 되었는지 확인
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session");

  if (!sessionId) {
    return NextResponse.json({ error: "session required" }, { status: 400 });
  }

  const session = getSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 404 });
  }

  return NextResponse.json({
    freed: session.freed,
    clickCount: session.clickCount,
    volumePercent: session.volumePercent,
  });
}
