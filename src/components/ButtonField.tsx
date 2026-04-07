"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import FakeCloseButton from "./FakeCloseButton";
import {
  INITIAL_FAKE_BUTTONS,
  BUTTONS_PER_CLICK,
  MAX_FAKE_BUTTONS,
} from "@/lib/constants";

interface ButtonItem {
  id: number;
  x: number;
  y: number;
  variant: number;
}

interface ButtonFieldProps {
  active: boolean;
  onFakeClick: () => void; // 가짜 버튼 클릭 시 콜백
}

export default function ButtonField({ active, onFakeClick }: ButtonFieldProps) {
  const [buttons, setButtons] = useState<ButtonItem[]>([]);
  const counterRef = useRef(0);

  const generateButton = useCallback((): ButtonItem => {
    return {
      id: counterRef.current++,
      x: Math.random() * 80 + 5, // 5% ~ 85%
      y: Math.random() * 75 + 10, // 10% ~ 85%
      variant: Math.floor(Math.random() * 6),
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    // 초기 가짜 버튼 생성
    const initial: ButtonItem[] = [];
    for (let i = 0; i < INITIAL_FAKE_BUTTONS; i++) {
      initial.push(generateButton());
    }
    setButtons(initial);
  }, [active, generateButton]);

  const handleFakeClick = useCallback(() => {
    // 새 버튼 추가 스폰
    setButtons((prev) => {
      if (prev.length >= MAX_FAKE_BUTTONS) {
        // 오래된 거 일부 제거하고 새로 추가
        const trimmed = prev.slice(-MAX_FAKE_BUTTONS + BUTTONS_PER_CLICK);
        const newButtons: ButtonItem[] = [];
        for (let i = 0; i < BUTTONS_PER_CLICK; i++) {
          newButtons.push(generateButton());
        }
        return [...trimmed, ...newButtons];
      }
      const newButtons: ButtonItem[] = [];
      for (let i = 0; i < BUTTONS_PER_CLICK; i++) {
        newButtons.push(generateButton());
      }
      return [...prev, ...newButtons];
    });

    onFakeClick();
  }, [onFakeClick, generateButton]);

  if (!active) return null;

  return (
    <>
      {buttons.map((btn) => (
        <FakeCloseButton
          key={btn.id}
          x={btn.x}
          y={btn.y}
          variant={btn.variant}
          onClick={handleFakeClick}
        />
      ))}
    </>
  );
}
