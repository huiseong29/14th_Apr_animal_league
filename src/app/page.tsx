"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import SplashGate from "@/components/SplashGate";
import TerrorPlayer from "@/components/TerrorPlayer";

function MainContent() {
  const searchParams = useSearchParams();
  const refId = searchParams.get("ref"); // 누군가에게서 공유받은 링크인 경우

  const [phase, setPhase] = useState<"splash" | "terror">("splash");
  const [sessionId, setSessionId] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");
  const audioEngine = useAudioEngine();

  useEffect(() => {
    // base URL 설정
    setBaseUrl(window.location.origin);

    // ref가 있으면 → 원래 사람 해방시키기
    if (refId) {
      fetch("/api/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refId }),
      }).catch(() => {});
    }

    // 새 세션 생성
    fetch("/api/session", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setSessionId(data.sessionId);
      })
      .catch(() => {});
  }, [refId]);

  const handleUnlock = useCallback(async () => {
    await audioEngine.unlock();
    setPhase("terror");
  }, [audioEngine]);

  if (phase === "splash") {
    return <SplashGate onUnlock={handleUnlock} />;
  }

  if (!sessionId) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="text-white">로딩 중...</p>
      </div>
    );
  }

  return (
    <TerrorPlayer
      sessionId={sessionId}
      baseUrl={baseUrl}
      audioEngine={audioEngine}
    />
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-white flex items-center justify-center">
          <p className="text-gray-400">로딩 중...</p>
        </div>
      }
    >
      <MainContent />
    </Suspense>
  );
}
