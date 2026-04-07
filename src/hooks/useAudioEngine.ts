"use client";

import { useRef, useCallback, useState } from "react";
import { INITIAL_GAIN, GAIN_INCREMENT, MAX_GAIN } from "@/lib/constants";

export function useAudioEngine() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [currentGain, setCurrentGain] = useState(INITIAL_GAIN);
  const [isPlaying, setIsPlaying] = useState(false);

  const unlock = useCallback(async () => {
    // 오디오 시도하되, 실패해도 반드시 resolve
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioCtx) {
        setIsPlaying(true);
        return;
      }

      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = INITIAL_GAIN;
      gainNodeRef.current = gainNode;

      const audio = new Audio("/audio/terror-loop.mp3");
      audio.loop = true;
      audioElementRef.current = audio;

      const source = audioContext.createMediaElementSource(audio);
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // 타임아웃 포함 play 시도
      const playPromise = audio.play();
      const timeoutPromise = new Promise<void>((resolve) =>
        setTimeout(resolve, 2000)
      );

      await Promise.race([playPromise, timeoutPromise]);
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
    // 오디오 성공/실패 관계없이 비주얼 카오스 시작
    setIsPlaying(true);
  }, []);

  const increaseVolume = useCallback(() => {
    if (gainNodeRef.current) {
      const newGain = Math.min(
        gainNodeRef.current.gain.value + GAIN_INCREMENT,
        MAX_GAIN
      );
      gainNodeRef.current.gain.value = newGain;
      setCurrentGain(newGain);
    }
    // gainNode 없어도 시각적으로 볼륨 증가 표시
    setCurrentGain((prev) => Math.min(prev + GAIN_INCREMENT, MAX_GAIN));
  }, []);

  const stop = useCallback(() => {
    try {
      if (gainNodeRef.current && audioContextRef.current) {
        const now = audioContextRef.current.currentTime;
        gainNodeRef.current.gain.setValueAtTime(
          gainNodeRef.current.gain.value,
          now
        );
        gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 0.5);

        setTimeout(() => {
          audioElementRef.current?.pause();
          audioContextRef.current?.close();
        }, 500);
      }
    } catch (e) {
      console.warn("Audio stop failed:", e);
    }
    setIsPlaying(false);
  }, []);

  const volumePercent = Math.round((currentGain / MAX_GAIN) * 100);

  return { unlock, increaseVolume, stop, isPlaying, volumePercent, currentGain };
}
