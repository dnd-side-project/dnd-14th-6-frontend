"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ROUTES } from "@/constants/routes";
import type { GameResult } from "@/types/game";
import { GAME_RESULT_KEY } from "@/types/game";
import * as styles from "./page.css";

export default function GameResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<GameResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(GAME_RESULT_KEY);
    if (!stored) {
      router.replace(ROUTES.GAME);
      return;
    }
    try {
      setResult(JSON.parse(stored));
    } catch {
      sessionStorage.removeItem(GAME_RESULT_KEY);
      router.replace(ROUTES.GAME);
    }
  }, [router]);

  if (!result) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임 결과</h1>
      <p className={styles.description}>
        {result.category.toUpperCase()} ·{" "}
        {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
      </p>
      <p className={styles.scoreText}>최종 점수: {result.score}점</p>
      <nav className={styles.nav}>
        <Link href={ROUTES.GAME} className={styles.link}>
          다시 플레이
        </Link>
        <Link href={ROUTES.REPORT} className={styles.linkOutline}>
          리포트
        </Link>
        <Link href={ROUTES.HOME} className={styles.linkOutline}>
          홈으로
        </Link>
      </nav>
    </div>
  );
}
