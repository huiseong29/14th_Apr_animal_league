"use client";

import { useState, useEffect, useCallback } from "react";

interface ShareModalProps {
  sessionId: string;
  baseUrl: string;
  onFreed: () => void;
}

type ShareStep = "share" | "waiting";

export default function ShareModal({
  sessionId,
  baseUrl,
  onFreed,
}: ShareModalProps) {
  const [step, setStep] = useState<ShareStep>("share");
  const [copied, setCopied] = useState(false);

  // 공유할 링크 (ref 파라미터 포함)
  const shareUrl = `${baseUrl}?ref=${sessionId}`;
  const shareText = "야 이거 족보 찐이다 빨리 봐";

  // 친구 방문 여부 폴링
  useEffect(() => {
    if (step !== "waiting") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check?session=${sessionId}`);
        const data = await res.json();
        if (data.freed) {
          clearInterval(interval);
          onFreed();
        }
      } catch {
        // 네트워크 에러 무시
      }
    }, 2000); // 2초마다 폴링

    return () => clearInterval(interval);
  }, [step, sessionId, onFreed]);

  const handleKakaoShare = useCallback(() => {
    // 카카오톡 공유 (URL scheme)
    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

    // 모바일에서는 카카오톡 앱으로 보내기 시도
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      const kakaoAppUrl = `kakaotalk://msg/text/${encodeURIComponent(shareText + "\n" + shareUrl)}`;
      window.location.href = kakaoAppUrl;
      // 앱이 안 열리면 웹 폴백
      setTimeout(() => {
        window.open(kakaoUrl, "_blank");
      }, 1000);
    } else {
      window.open(kakaoUrl, "_blank");
    }

    setStep("waiting");
  }, [shareUrl, shareText]);

  const handleSMSShare = useCallback(() => {
    const smsBody = encodeURIComponent(`${shareText}\n${shareUrl}`);
    // iOS vs Android SMS URL scheme
    const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
    const smsUrl = isIOS
      ? `sms:&body=${smsBody}`
      : `sms:?body=${smsBody}`;
    window.location.href = smsUrl;
    setStep("waiting");
  }, [shareUrl, shareText]);

  const handleNativeShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "중간고사 족보 모음.pdf",
          text: shareText,
          url: shareUrl,
        });
      }
    } catch {
      // 취소해도 OK
    }
    setStep("waiting");
  }, [shareUrl, shareText]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setStep("waiting");
  }, [shareUrl]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full border border-green-500/50 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
        {step === "share" ? (
          <>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🔗</div>
              <h2 className="text-xl font-black text-white mb-2">
                탈출하고 싶어?
              </h2>
              <p className="text-green-400 text-sm font-bold mb-1">
                친구한테 이 링크를 보내!
              </p>
              <p className="text-gray-500 text-xs">
                친구가 링크를 열어야 탈출할 수 있어 ㅋㅋ
              </p>
            </div>

            <div className="space-y-3">
              {/* 카카오톡 공유 */}
              <button
                onClick={handleKakaoShare}
                className="w-full py-4 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-bold text-base
                           hover:bg-[#F5DC00] active:bg-[#EBD300] transition-colors
                           flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#3C1E1E">
                  <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.8 1.86 5.26 4.66 6.65-.15.56-.96 3.6-.99 3.83 0 0-.02.17.09.23.11.07.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.56.08 1.14.13 1.72.13 5.52 0 10-3.58 10-7.99C22 6.58 17.52 3 12 3z"/>
                </svg>
                카카오톡으로 보내기
              </button>

              {/* 문자 공유 */}
              <button
                onClick={handleSMSShare}
                className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-base
                           hover:bg-green-400 active:bg-green-600 transition-colors
                           flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
                문자로 보내기
              </button>

              {/* 기타 공유 */}
              {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-4 bg-gray-700 text-white rounded-xl font-bold text-base
                             hover:bg-gray-600 transition-colors
                             flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                  </svg>
                  다른 앱으로 공유
                </button>
              )}

              {/* 링크 복사 */}
              <button
                onClick={handleCopyLink}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                  copied
                    ? "bg-green-500 text-black"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {copied ? "복사 완료!" : "링크 복사하기"}
              </button>
            </div>
          </>
        ) : (
          /* 대기 화면 */
          <div className="text-center py-4">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
            </div>
            <h2 className="text-xl font-black text-white mb-2">
              친구를 기다리는 중...
            </h2>
            <p className="text-green-400 text-sm font-bold mb-4">
              친구가 링크를 열면 탈출할 수 있어!
            </p>
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 mb-1">공유된 링크:</p>
              <p className="text-xs text-green-400 break-all font-mono">
                {shareUrl}
              </p>
            </div>
            <p className="text-gray-600 text-xs animate-pulse">
              2초마다 확인 중...
            </p>

            {/* 다시 공유하기 */}
            <button
              onClick={() => setStep("share")}
              className="mt-4 text-sm text-gray-500 underline hover:text-gray-400"
            >
              다시 공유하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
