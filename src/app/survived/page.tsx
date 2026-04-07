"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SurvivedContent() {
  const searchParams = useSearchParams();
  const clicks = searchParams.get("clicks") || "0";
  const volume = searchParams.get("volume") || "0";
  // const name = searchParams.get("name") || "용사";

  useEffect(() => {
    // canvas-confetti 동적 import
    import("canvas-confetti").then((confetti) => {
      const fire = confetti.default;

      // 연속 폭죽
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        fire({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff006e", "#fb5607", "#ffbe0b", "#3a86ff", "#8338ec"],
        });
        fire({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff006e", "#fb5607", "#ffbe0b", "#3a86ff", "#8338ec"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        {/* 축하 헤더 */}
        <div className="text-6xl mb-6">
          <span className="inline-block animate-bounce">
            🎉
          </span>
        </div>

        <h1 className="text-3xl font-black text-white mb-3">
          시험 테러에서 살아남았다!
        </h1>

        <p className="text-gray-400 mb-8">
          기나긴 고통 끝에 탈출에 성공했습니다
        </p>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <p className="text-3xl font-black text-pink-400">{clicks}</p>
            <p className="text-xs text-gray-500 mt-1">가짜 버튼 클릭</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <p className="text-3xl font-black text-purple-400">{volume}%</p>
            <p className="text-xs text-gray-500 mt-1">최종 볼륨</p>
          </div>
        </div>

        {/* 메시지 */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
          <p className="text-white font-bold mb-2">
            근데... 공유했으니까
          </p>
          <p className="text-pink-400 text-sm">
            지금 누군가는 너 때문에 카오스 속에 있다는 거 알지? ㅋㅋ
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500
                     text-white rounded-xl font-black text-lg
                     hover:from-pink-600 hover:to-purple-600 transition-all
                     shadow-lg hover:shadow-pink-500/25"
        >
          나도 테러 링크 만들기 💣
        </Link>

        <p className="text-gray-600 text-xs mt-6">
          다같이 망하면 안 떨어진다 | Animal League 4월 리그
        </p>
      </div>
    </main>
  );
}

export default function SurvivedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <p className="text-white">탈출 중...</p>
        </div>
      }
    >
      <SurvivedContent />
    </Suspense>
  );
}
