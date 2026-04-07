"use client";

import { useState, useEffect, useRef } from "react";
import { getRandomLyric } from "@/lib/lyrics";
import {
  NEON_COLORS,
  INITIAL_LYRIC_INTERVAL,
  MIN_LYRIC_INTERVAL,
  LYRIC_SPEED_MULTIPLIER,
} from "@/lib/constants";

interface LyricItem {
  id: number;
  text: string;
  x: number; // %
  y: number; // %
  size: number; // rem
  color: string;
  rotation: number; // deg
}

interface LyricsRainProps {
  intensity: number; // 0부터 시작, 가짜 버튼 클릭할수록 증가
  active: boolean;
}

export default function LyricsRain({ intensity, active }: LyricsRainProps) {
  const [lyrics, setLyrics] = useState<LyricItem[]>([]);
  const counterRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;

    const currentInterval = Math.max(
      INITIAL_LYRIC_INTERVAL * Math.pow(LYRIC_SPEED_MULTIPLIER, intensity),
      MIN_LYRIC_INTERVAL
    );

    // 이전 인터벌 클리어
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const newLyric: LyricItem = {
        id: counterRef.current++,
        text: getRandomLyric(),
        x: Math.random() * 80 + 5, // 5% ~ 85%
        y: Math.random() * 80 + 5,
        size: 1.5 + Math.random() * (2.5 + intensity * 0.5), // intensity에 따라 더 큰 글자
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
        rotation: (Math.random() - 0.5) * 60, // -30 ~ 30deg
      };

      setLyrics((prev) => {
        const updated = [...prev, newLyric];
        // 최대 40개 유지 (메모리 관리)
        if (updated.length > 40) {
          return updated.slice(-40);
        }
        return updated;
      });

      // 3초 후 제거
      setTimeout(() => {
        setLyrics((prev) => prev.filter((l) => l.id !== newLyric.id));
      }, 3000);
    }, currentInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intensity, active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {lyrics.map((lyric) => (
        <div
          key={lyric.id}
          className="absolute animate-lyric-pop font-black whitespace-nowrap"
          style={{
            left: `${lyric.x}%`,
            top: `${lyric.y}%`,
            fontSize: `${lyric.size}rem`,
            color: lyric.color,
            transform: `rotate(${lyric.rotation}deg)`,
            textShadow: `0 0 10px ${lyric.color}, 0 0 20px ${lyric.color}`,
          }}
        >
          {lyric.text}
        </div>
      ))}
    </div>
  );
}
