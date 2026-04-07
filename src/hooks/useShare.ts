"use client";

import { useCallback, useState } from "react";

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export function useShare() {
  const [hasShared, setHasShared] = useState(false);

  const canNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  const share = useCallback(
    async (options: ShareOptions): Promise<boolean> => {
      try {
        if (navigator.share) {
          await navigator.share(options);
          setHasShared(true);
          return true;
        } else {
          // 폴백: 클립보드에 복사
          await navigator.clipboard.writeText(options.url);
          setHasShared(true);
          return true;
        }
      } catch (e) {
        // 사용자가 공유 취소해도 성공으로 처리 (프랭크니까)
        if ((e as Error).name === "AbortError") {
          setHasShared(true);
          return true;
        }
        // 클립보드 폴백
        try {
          await navigator.clipboard.writeText(options.url);
          setHasShared(true);
          return true;
        } catch {
          setHasShared(true);
          return true;
        }
      }
    },
    []
  );

  return { share, hasShared, canNativeShare };
}
