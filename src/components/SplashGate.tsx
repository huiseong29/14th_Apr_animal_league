"use client";

import { useState, useEffect } from "react";

interface SplashGateProps {
  onUnlock: () => void;
}

export default function SplashGate({ onUnlock }: SplashGateProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // 1.5초 후 "열기" 버튼 표시 (로딩 느낌)
    const timer = setTimeout(() => setShowButton(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* 구글드라이브 상단바 */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4">
        <div className="flex items-center gap-2">
          {/* 구글 드라이브 로고 */}
          <svg width="24" height="24" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-20.4 35.3c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
            <path d="m73.4 26.5-10.1-17.5c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 23.8h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
          </svg>
          <span className="text-lg text-gray-700 font-medium">Drive</span>
        </div>
      </div>

      {/* 파일 프리뷰 */}
      <div className="w-full max-w-md px-6">
        {/* PDF 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-24 bg-white border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#EA4335"/>
              <path d="M14 2V8H20" fill="#FFBA00" opacity="0.5"/>
              <text x="12" y="17" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PDF</text>
            </svg>
          </div>
        </div>

        <h1 className="text-center text-xl font-medium text-gray-900 mb-2">
          중간고사 족보 모음.pdf
        </h1>

        <p className="text-center text-sm text-gray-500 mb-1">
          Google Drive · 공유 문서
        </p>

        <p className="text-center text-xs text-gray-400 mb-8">
          2.3 MB · 최종 수정: 2026. 4. 5.
        </p>

        {!showButton ? (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span className="text-sm">문서 로딩 중...</span>
            </div>
          </div>
        ) : (
          <button
            onClick={onUnlock}
            className="w-full py-3.5 bg-[#1a73e8] text-white rounded-lg font-medium text-base
                       hover:bg-[#1557b0] active:bg-[#174ea6] transition-colors
                       shadow-sm hover:shadow-md"
          >
            Google Drive에서 열기
          </button>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          이 파일은 다른 사용자가 공유한 문서입니다
        </p>
      </div>

      {/* 하단 구글 브랜딩 */}
      <div className="absolute bottom-4 text-center">
        <p className="text-xs text-gray-400">
          Google Drive © 2026
        </p>
      </div>
    </div>
  );
}
