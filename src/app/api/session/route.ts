import { NextResponse } from "next/server";
import { createSession } from "@/lib/session-store";

// POST /api/session - 새 세션 생성
export async function POST() {
  const session = createSession();
  return NextResponse.json({ sessionId: session.id });
}
