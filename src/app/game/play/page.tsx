"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CategoryType } from "@/components/game/Category/Category";
import FoulLine from "@/components/game/FoulLine/FoulLine";
import GameHeader from "@/components/game/GameHeader/GameHeader";
import type { LevelType } from "@/components/game/Level/Level";
import ProblemInput from "@/components/game/ProblemInput/ProblemInput";
import type { ScoreLevelType } from "@/components/game/ScoreTable/ScoreTable";
import { ROUTES } from "@/constants/routes";
import type { GameResult, GameSession, PlayPhase } from "@/types/game";
import { GAME_RESULT_KEY, GAME_SESSION_KEY } from "@/types/game";
import * as styles from "./page.css";

const TOTAL_TIME = 60;

const DEFAULT_SCORES: Record<ScoreLevelType, number> = {
  hard: 50,
  normal: 30,
  easy: 10,
};

const VALID_CATEGORIES = new Set(["git", "linux", "docker"]);
const VALID_LEVELS = new Set(["easy", "normal", "hard", "random"]);

const BACK_GUARD_STATE = { gamePlayGuard: true };

function parseSession(
  raw: string,
): { category: CategoryType; level: LevelType } | null {
  try {
    const parsed: GameSession = JSON.parse(raw);
    if (
      !parsed.category ||
      !parsed.level ||
      !VALID_CATEGORIES.has(parsed.category) ||
      !VALID_LEVELS.has(parsed.level)
    ) {
      return null;
    }
    return {
      category: parsed.category as CategoryType,
      level: parsed.level as LevelType,
    };
  } catch {
    return null;
  }
}

export default function GamePlayPage() {
  const router = useRouter();
  const phaseRef = useRef<PlayPhase>("playing");
  const initializedRef = useRef(false);

  const [params, setParams] = useState<{
    category: CategoryType;
    level: LevelType;
  } | null>(null);
  const [phase, setPhase] = useState<PlayPhase>("playing");
  const [score, setScore] = useState(0);
  const [currentTime] = useState(TOTAL_TIME);
  const [answer, setAnswer] = useState("");

  const updatePhase = (next: PlayPhase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: 마운트 1회만 실행 — 세션 토큰은 소비 후 재실행 불가 (Strict Mode는 initializedRef로 방어)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const raw = sessionStorage.getItem(GAME_SESSION_KEY);
    if (!raw) {
      router.replace(ROUTES.GAME);
      return;
    }

    const session = parseSession(raw);
    if (!session) {
      sessionStorage.removeItem(GAME_SESSION_KEY);
      router.replace(ROUTES.GAME);
      return;
    }

    sessionStorage.removeItem(GAME_SESSION_KEY);
    setParams(session);
    window.history.pushState(BACK_GUARD_STATE, "");
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (phaseRef.current === "playing") {
        const leave = window.confirm("게임이 종료됩니다. 정말 나가시겠습니까?");
        if (leave) {
          router.replace(ROUTES.GAME);
        } else {
          window.history.pushState(BACK_GUARD_STATE, "");
        }
      } else {
        router.replace(ROUTES.GAME);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (phaseRef.current === "playing") {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (!params) {
    return null;
  }

  const { category, level } = params;

  const handleSubmit = () => {
    if (!answer.trim()) return;
    // TODO: 정답 판정 로직
    setScore((prev) => prev + 10);
    setAnswer("");
  };

  const goToResult = () => {
    const result: GameResult = {
      category,
      level,
      score,
      totalTime: TOTAL_TIME,
      playedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(GAME_RESULT_KEY, JSON.stringify(result));
    // TODO: 로그인 사용자인 경우 서버에 결과 POST
    router.replace(ROUTES.GAME_RESULT);
  };

  const handleEndNext = () => {
    const hasBadge = false; // TODO: 실제 뱃지 획득 조건으로 교체
    if (hasBadge) {
      updatePhase("badge");
    } else {
      goToResult();
    }
  };

  if (phase === "playing") {
    return (
      <div className={styles.playingWrapper}>
        <GameHeader
          category={category}
          level={level}
          score={score}
          scores={DEFAULT_SCORES}
          currentTime={currentTime}
          totalTime={TOTAL_TIME}
        />

        <div className={styles.gameArea}>
          {/* TODO: ProblemCard 애니메이션 영역 */}
        </div>

        <div className={styles.foulLineArea}>
          <FoulLine />
        </div>

        <div className={styles.bottomArea}>
          <p className={styles.problemText}>
            현재 main 브랜치에서 작업 중이다. 새로운 기능 개발을 위해
            feature/login 브랜치를 생성하고, 해당 브랜치로 이동하라. (브랜치가
            이미 존재하는 경우 에러 없이 이동해야 한다)
          </p>
          <ProblemInput
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>

        {/* TODO: 타이머 종료 시 updatePhase("end") 호출 */}
      </div>
    );
  }

  if (phase === "end") {
    return (
      <div className={styles.phaseWrapper}>
        <h1 className={styles.phaseTitle}>게임 종료</h1>
        <p className={styles.phaseDescription}>최종 점수: {score}점</p>
        <button type="button" className={styles.btn} onClick={handleEndNext}>
          다음
        </button>
      </div>
    );
  }

  return (
    <div className={styles.phaseWrapper}>
      <h1 className={styles.phaseTitle}>뱃지 획득!</h1>
      <p className={styles.phaseDescription}>새로운 뱃지를 획득했습니다.</p>
      <button type="button" className={styles.btn} onClick={goToResult}>
        결과 보기
      </button>
    </div>
  );
}
