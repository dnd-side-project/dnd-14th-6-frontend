"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { CategoryType } from "@/components/game/Category/Category";
import FoulLine from "@/components/game/FoulLine/FoulLine";
import type { GameEndType } from "@/components/game/GameEndOverlay/GameEndOverlay";
import GameEndOverlay from "@/components/game/GameEndOverlay/GameEndOverlay";
import GameHeader from "@/components/game/GameHeader/GameHeader";
import GameTutorial from "@/components/game/GameTutorial/GameTutorial";
import type { LevelType } from "@/components/game/Level/Level";
import type { ProblemCardLevel } from "@/components/game/ProblemCard/ProblemCard";
import ProblemCard from "@/components/game/ProblemCard/ProblemCard";
import ProblemInput from "@/components/game/ProblemInput/ProblemInput";
import type { ScoreLevelType } from "@/components/game/ScoreTable/ScoreTable";
import { ROUTES } from "@/constants/routes";
import { useSaveGameSessionMutation } from "@/hooks/mutation/useSaveGameSessionMutation";
import { useGameStream } from "@/hooks/useGameStream";
import type {
  ClientAnswer,
  GameResult,
  GameSession,
  PlayPhase,
} from "@/types/game";
import { GAME_RESULT_KEY, GAME_SESSION_KEY } from "@/types/game";
import * as styles from "./page.css";

const TOTAL_TIME = 60;
const FALL_DURATION = 10;
const NEAR_DEADLINE_RATIO = 0.8;

const DEFAULT_SCORES: Record<ScoreLevelType, number> = {
  hard: 50,
  normal: 30,
  easy: 10,
};

const VALID_CATEGORIES = new Set(["git", "linux", "docker"]);
const VALID_LEVELS = new Set(["easy", "normal", "hard", "random"]);

const BACK_GUARD_STATE = { gamePlayGuard: true };

function toDifficultyMode(level: LevelType): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function getGameEndType(clientAnswers: ClientAnswer[]): GameEndType {
  const allSolved =
    clientAnswers.length > 0 && clientAnswers.every((a) => a.solved);
  if (!allSolved) return "timeout";
  const isPerfect = clientAnswers.every(
    (a) => a.inputs.length === 1 && a.inputs[0].isCorrect,
  );
  return isPerfect ? "perfect" : "clear";
}

function parseSession(
  raw: string,
): { category: CategoryType; categoryId: number; level: LevelType } | null {
  try {
    const parsed: GameSession = JSON.parse(raw);
    if (
      !parsed.category ||
      !parsed.categoryId ||
      !parsed.level ||
      !VALID_CATEGORIES.has(parsed.category) ||
      !VALID_LEVELS.has(parsed.level)
    ) {
      return null;
    }
    return {
      category: parsed.category as CategoryType,
      categoryId: parsed.categoryId,
      level: parsed.level as LevelType,
    };
  } catch {
    return null;
  }
}

export default function GamePlayPage() {
  const router = useRouter();
  const phaseRef = useRef<PlayPhase>("tutorial");
  const initializedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [params, setParams] = useState<{
    category: CategoryType;
    categoryId: number;
    level: LevelType;
  } | null>(null);
  const [phase, setPhase] = useState<PlayPhase>("tutorial");

  const updatePhase = useCallback((next: PlayPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const {
    state: gameState,
    dispatch,
    submitAnswer,
    closeStream,
  } = useGameStream({
    categoryId: params?.categoryId ?? 0,
    difficultyMode: params ? toDifficultyMode(params.level) : "",
    enabled: phase === "playing" && !!params,
    onGameEnd: () => updatePhase("end"),
  });

  const saveGameMutation = useSaveGameSessionMutation();

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
          closeStream();
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
  }, [router, closeStream]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (phaseRef.current === "playing") {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const startGame = useCallback(() => {
    phaseRef.current = "playing";
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "tutorial") return;
    const timer = setTimeout(startGame, 3000);
    const IGNORED_KEYS = new Set(["Shift", "Control", "Alt", "Meta"]);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (IGNORED_KEYS.has(e.key)) return;
      clearTimeout(timer);
      startGame();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, startGame]);

  // 산성비: 카드 만료 체크 (1초 간격)
  useEffect(() => {
    if (phase !== "playing") return;
    const interval = setInterval(() => {
      const now = Date.now();
      for (let i = 0; i < gameState.problems.length; i++) {
        const ca = gameState.clientAnswers[i];
        if (ca?.solved || ca?.expired) continue;
        const elapsed = (now - gameState.problems[i].arrivedAt) / 1000;
        if (elapsed >= FALL_DURATION) {
          dispatch({ type: "PROBLEM_EXPIRED", index: i });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, gameState.problems, gameState.clientAnswers, dispatch]);

  // Tab/Shift+Tab: 활성 카드만 순회, Alt+Tab: 입력창 포커스
  useEffect(() => {
    if (phase !== "playing") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      e.preventDefault();

      if (e.altKey) {
        inputRef.current?.focus();
        return;
      }

      const activeIndexes = gameState.clientAnswers
        .map((ca, i) => (!ca.solved && !ca.expired ? i : -1))
        .filter((i) => i >= 0);
      if (activeIndexes.length === 0) return;

      const currentPos = activeIndexes.indexOf(gameState.currentProblemIndex);
      const nextPos = e.shiftKey
        ? (currentPos - 1 + activeIndexes.length) % activeIndexes.length
        : (currentPos + 1) % activeIndexes.length;
      dispatch({
        type: "SELECT_PROBLEM",
        index: activeIndexes[nextPos],
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, gameState.currentProblemIndex, gameState.clientAnswers, dispatch]);

  useEffect(() => {
    if (phase === "playing" && gameState.remainingSeconds === 0) {
      closeStream();
      updatePhase("end");
    }
  }, [phase, gameState.remainingSeconds, closeStream, updatePhase]);

  if (!params) {
    return null;
  }

  const { category, categoryId, level } = params;
  const currentProblem = gameState.problems[gameState.currentProblemIndex];

  const getCardVariant = (index: number): "default" | "selected" | "error" => {
    if (index === gameState.currentProblemIndex) return "selected";
    const elapsed = (Date.now() - gameState.problems[index].arrivedAt) / 1000;
    if (elapsed >= FALL_DURATION * NEAR_DEADLINE_RATIO) return "error";
    return "default";
  };

  const handleSubmit = () => {
    if (!gameState.answer.trim()) return;
    submitAnswer(gameState.answer);
  };

  const goToResult = async () => {
    const savePayload = {
      categoryId,
      difficultyMode: toDifficultyMode(level) as
        | "Easy"
        | "Normal"
        | "Hard"
        | "Random",
      score: gameState.score,
      clientAnswers: gameState.clientAnswers,
    };
    console.log("[Save] 게임 결과 저장 요청:", savePayload);

    try {
      const response = await saveGameMutation.mutateAsync(savePayload);
      console.log("[Save] 저장 성공:", response.data);

      const result: GameResult = {
        category,
        level,
        score: gameState.score,
        totalTime: TOTAL_TIME,
        playedAt: new Date().toISOString(),
        gameSessionId: response.data.gameSessionId,
      };
      sessionStorage.setItem(GAME_RESULT_KEY, JSON.stringify(result));
    } catch (error) {
      console.error("[Save] 저장 실패:", error);
      const result: GameResult = {
        category,
        level,
        score: gameState.score,
        totalTime: TOTAL_TIME,
        playedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(GAME_RESULT_KEY, JSON.stringify(result));
    }
    router.replace(ROUTES.GAME_RESULT);
  };

  if (phase === "tutorial") {
    return <GameTutorial level={level} onStart={startGame} />;
  }

  return (
    <div className={styles.playingWrapper}>
      <GameHeader
        category={category}
        level={level}
        score={gameState.score}
        scores={level === "random" ? DEFAULT_SCORES : undefined}
        currentTime={gameState.remainingSeconds}
        totalTime={TOTAL_TIME}
      />

      <div className={styles.gameArea} />

      <div className={styles.fallingCardContainer}>
        {gameState.problems.map((problem, index) => {
          const ca = gameState.clientAnswers[index];
          if (ca?.solved || ca?.expired) return null;
          const lane = index % 3;
          return (
            <div
              key={problem.problemId}
              className={styles.fallingCardLane[lane as 0 | 1 | 2]}
            >
              <ProblemCard
                category={problem.subCategory}
                text={problem.title}
                level={problem.difficulty.toLowerCase() as ProblemCardLevel}
                variant={getCardVariant(index)}
                onClick={() =>
                  dispatch({
                    type: "SELECT_PROBLEM",
                    index,
                  })
                }
              />
            </div>
          );
        })}
      </div>

      <div className={styles.foulLineArea}>
        <FoulLine
          variant={
            gameState.problems.some((p, i) => {
              const ca = gameState.clientAnswers[i];
              if (ca?.solved || ca?.expired) return false;
              return (
                (Date.now() - p.arrivedAt) / 1000 >=
                FALL_DURATION * NEAR_DEADLINE_RATIO
              );
            })
              ? "error"
              : "default"
          }
        />
      </div>

      <div className={styles.bottomArea}>
        <p className={styles.problemText}>
          {currentProblem?.text ?? "문제를 불러오는 중..."}
        </p>
        <ProblemInput
          ref={inputRef}
          value={gameState.answer}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ANSWER",
              answer: e.target.value,
            })
          }
          onSubmit={handleSubmit}
        />
      </div>

      {phase === "end" && (
        <GameEndOverlay
          type={getGameEndType(gameState.clientAnswers)}
          onComplete={goToResult}
        />
      )}
    </div>
  );
}
