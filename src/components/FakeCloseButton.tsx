"use client";

import { FAKE_BUTTON_LABELS } from "@/lib/constants";

interface FakeCloseButtonProps {
  x: number;
  y: number;
  onClick: () => void;
  variant?: number;
}

const BUTTON_STYLES = [
  // iOS 스타일
  "bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md",
  // Android 스타일
  "bg-white text-black rounded px-3 py-1 text-xs font-medium shadow border border-gray-300",
  // Windows 스타일
  "bg-red-500 text-white rounded-sm px-2 py-0.5 text-xs font-bold hover:bg-red-600",
  // 텍스트 버튼
  "bg-transparent text-white underline text-sm font-medium",
  // 크고 눈에 띄는 버튼
  "bg-white text-red-500 rounded-xl px-4 py-2 text-sm font-black shadow-lg border-2 border-red-500",
  // 작은 X
  "bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs backdrop-blur-sm",
];

export default function FakeCloseButton({
  x,
  y,
  onClick,
  variant = 0,
}: FakeCloseButtonProps) {
  const style = BUTTON_STYLES[variant % BUTTON_STYLES.length];
  const label =
    FAKE_BUTTON_LABELS[Math.floor(Math.random() * FAKE_BUTTON_LABELS.length)];

  return (
    <button
      className={`absolute animate-button-spawn cursor-pointer select-none z-30 ${style}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {label}
    </button>
  );
}
