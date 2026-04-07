import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/session-store";

// POST /api/update - 세션 통계 업데이트
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sessionId, clickCount, volumePercent } = body;

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  updateSession(sessionId, { clickCount, volumePercent });

  return NextResponse.json({ success: true });
}
