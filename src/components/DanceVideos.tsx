"use client";

import { useState, useEffect, useRef } from "react";
import {
  MIN_VIDEO_SIZE,
  MAX_VIDEO_SIZE,
} from "@/lib/constants";

interface DanceVideoItem {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  delay: number;
  duration: number;
}

interface DanceVideosProps {
  count: number;
  active: boolean;
}

const DANCE_EMOJIS = ["💃", "🕺", "🪩", "🎵", "🔥", "💀", "📚", "😱"];

export default function DanceVideos({ count, active }: DanceVideosProps) {
  const [videos, setVideos] = useState<DanceVideoItem[]>([]);
  const counterRef = useRef(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (count <= prevCountRef.current) return;

    const newItems: DanceVideoItem[] = [];
    for (let i = prevCountRef.current; i < count; i++) {
      newItems.push({
        id: counterRef.current++,
        x: Math.random() * 70 + 5,
        y: Math.random() * 70 + 5,
        size: MIN_VIDEO_SIZE + Math.random() * (MAX_VIDEO_SIZE - MIN_VIDEO_SIZE),
        emoji: DANCE_EMOJIS[Math.floor(Math.random() * DANCE_EMOJIS.length)],
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
      });
    }
    prevCountRef.current = count;
    setVideos((prev) => [...prev, ...newItems]);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {videos.map((video) => (
        <div
          key={video.id}
          className="absolute animate-float"
          style={{
            left: `${video.x}%`,
            top: `${video.y}%`,
            width: `${video.size}px`,
            height: `${video.size}px`,
            animationDelay: `${video.delay}s`,
            animationDuration: `${video.duration}s`,
          }}
        >
          {/* 영상 파일이 있으면 video 태그 사용, 없으면 이모지 폴백 */}
          <div className="w-full h-full rounded-full border-4 border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <span
              className="animate-bounce"
              style={{ fontSize: `${video.size * 0.5}px` }}
            >
              {video.emoji}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
