import { NextRequest, NextResponse } from "next/server";
import { freeSession } from "@/lib/session-store";

// POST /api/free - ref 세션을 freed 처리 (친구가 링크 클릭 시)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { refId } = body;

  if (!refId) {
    return NextResponse.json({ error: "refId required" }, { status: 400 });
  }

  const success = freeSession(refId);

  return NextResponse.json({ success });
}
