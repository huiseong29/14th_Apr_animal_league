"use client";

import { useState } from "react";
import { encodeTerrorConfig } from "@/lib/link-codec";

export default function CreateLinkForm() {
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const config = { name: name.trim() || "친구" };
    const encoded = encodeTerrorConfig(config);
    const link = `${window.location.origin}/terror/${encoded}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = generatedLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "📚 시험 족보가 도착했습니다!",
          text: "친구가 중요한 시험 자료를 공유했어요. 지금 확인하세요!",
          url: generatedLink,
        });
      } catch {
        // 공유 취소
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl">
        <h2 className="text-lg font-black text-white mb-4 text-center">
          테러 링크 만들기 💣
        </h2>

        {/* 피해자 이름 입력 */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            피해자 이름 (선택)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 철수"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700
                       focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500
                       placeholder:text-gray-500"
          />
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={handleGenerate}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white
                     rounded-xl font-black text-lg hover:from-pink-600 hover:to-purple-600
                     active:from-pink-700 active:to-purple-700 transition-all
                     shadow-lg hover:shadow-pink-500/25"
        >
          테러 링크 생성 🔥
        </button>

        {/* 생성된 링크 */}
        {generatedLink && (
          <div className="mt-4 space-y-3">
            <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">생성된 링크:</p>
              <p className="text-sm text-green-400 break-all font-mono">
                {generatedLink}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className={`py-3 rounded-xl font-bold transition-colors ${
                  copied
                    ? "bg-green-500 text-black"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {copied ? "복사됨!" : "복사 📋"}
              </button>
              <button
                onClick={handleShare}
                className="py-3 bg-blue-500 text-white rounded-xl font-bold
                           hover:bg-blue-600 active:bg-blue-700 transition-colors"
              >
                공유 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
