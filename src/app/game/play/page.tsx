"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CategoryType } from "@/components/game/Category/Category";
import CorrectAnswerEffect from "@/components/game/CorrectAnswerEffect/CorrectAnswerEffect";
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
import { COUNTDOWN_WARNING_THRESHOLD } from "@/constants/audio";
import { ROUTES } from "@/constants/routes";
import { useSaveGameSessionMutation } from "@/hooks/mutation/useSaveGameSessionMutation";
import { useGamePlayAudio } from "@/hooks/useGamePlayAudio";
import { useGameStream } from "@/hooks/useGameStream";
import { useTimedMap } from "@/hooks/useTimedMap";
import type { ClientAnswer, GameSession, PlayPhase } from "@/types/game";
import { GAME_SESSION_KEY } from "@/types/game";
import * as styles from "./page.css";

const TOTAL_TIME = 120;
const FALL_DURATION = 17;

const DEFAULT_SCORES: Record<ScoreLevelType, number> = {
  hard: 50,
  normal: 30,
  easy: 10,
};

const VALID_CATEGORIES = new Set(["git", "linux", "docker"]);
const VALID_LEVELS = new Set(["easy", "normal", "hard", "random"]);

const BACK_GUARD_STATE = { gamePlayGuard: true };
const IGNORED_KEYS = new Set(["Shift", "Control", "Alt", "Meta"]);

type DifficultyMode = "Easy" | "Normal" | "Hard" | "Random";

function toDifficultyMode(level: LevelType): DifficultyMode {
  return (level.charAt(0).toUpperCase() + level.slice(1)) as DifficultyMode;
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
  const [isMuted, setIsMuted] = useState(false);
  const countdownWarningFiredRef = useRef(false);

  const solvingCards = useTimedMap(3000);
  const expiringCards = useTimedMap(800);
  const shakingCards = useTimedMap(500);

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

  // 오디오
  const {
    preloadAll,
    playBgm,
    fadeBgmOut,
    playSfx,
    stopAllSfx,
    cleanup: cleanupAudio,
  } = useGamePlayAudio({ muted: isMuted });

  // prefers-reduced-motion 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsMuted(true);
    }

    const handler = (e: MediaQueryListEvent) => {
      setIsMuted(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // tutorial 단계에서 오디오 프리로드
  useEffect(() => {
    if (params && phase === "tutorial") {
      preloadAll();
    }
  }, [params, phase, preloadAll]);

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
          cleanupAudio();
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
  }, [router, closeStream, cleanupAudio]);

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
    updatePhase("playing");
    playBgm();
  }, [updatePhase, playBgm]);

  useEffect(() => {
    if (phase !== "tutorial") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (IGNORED_KEYS.has(e.key)) return;
      startGame();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, startGame]);

  // 산성비: 카드 만료 체크 (300ms 간격)
  useEffect(() => {
    if (phase !== "playing") return;
    const interval = setInterval(() => {
      const now = Date.now();
      const newlyExpired: string[] = [];
      for (let i = 0; i < gameState.problems.length; i++) {
        const ca = gameState.clientAnswers[i];
        if (ca?.solved || ca?.expired) continue;
        if (ca?.activatedAt == null) continue;
        const elapsed = (now - ca.activatedAt) / 1000;
        if (elapsed >= FALL_DURATION) {
          newlyExpired.push(gameState.problems[i].problemId);
          dispatch({ type: "PROBLEM_EXPIRED", index: i });
        }
      }
      if (newlyExpired.length > 0) {
        expiringCards.addAll(newlyExpired);
      }
      // 큐에서 활성화 (간격 체크는 리듀서에서 처리)
      dispatch({ type: "ACTIVATE_QUEUED_TICK" });
    }, 300);
    return () => clearInterval(interval);
  }, [
    phase,
    gameState.problems,
    gameState.clientAnswers,
    dispatch,
    expiringCards.addAll,
  ]);

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
        .map((ca, i) =>
          ca.activatedAt !== null && !ca.solved && !ca.expired ? i : -1,
        )
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

  // 카운트다운 경고 (1회)
  useEffect(() => {
    if (
      phase === "playing" &&
      !countdownWarningFiredRef.current &&
      gameState.remainingSeconds <= COUNTDOWN_WARNING_THRESHOLD &&
      gameState.remainingSeconds > 0
    ) {
      countdownWarningFiredRef.current = true;
      playSfx("SFX_COUNTDOWN_WARNING");
    }
  }, [phase, gameState.remainingSeconds, playSfx]);

  // 게임 종료 시 BGM 페이드아웃 + 기존 SFX 모두 정지 + 종료 SFX
  // biome-ignore lint/correctness/useExhaustiveDependencies: phase === "end" 전환 시 1회만 실행해야 함 — stopAllSfx, fadeBgmOut, playSfx는 useCallback([], [])로 안정 참조이고, gameState.clientAnswers를 의존성에 넣으면 매 답안 제출마다 effect가 재실행되어 종료 SFX가 중복 재생됨
  useEffect(() => {
    if (phase !== "end") return;

    stopAllSfx();
    fadeBgmOut(800);

    const endType = getGameEndType(gameState.clientAnswers);
    if (endType === "perfect" || endType === "clear") {
      playSfx("SFX_PERFECT_CLEAR");
    } else {
      playSfx("SFX_TIMEOUT");
    }
  }, [phase]);

  if (!params) {
    return null;
  }

  const { category, categoryId, level } = params;
  const currentProblem = gameState.problems[gameState.currentProblemIndex];

  const getCardEffect = (
    isSolving: boolean,
    isExpiring: boolean,
    isShaking: boolean,
  ) => {
    if (isSolving) return styles.solvingCard;
    if (isExpiring) return styles.expiringCard;
    if (isShaking) return styles.shakingCard;
    return undefined;
  };

  const getCardVariant = (
    index: number,
    isSolving: boolean,
    isExpiring: boolean,
    isShaking: boolean,
  ): "default" | "selected" | "error" => {
    if (isSolving) return "default";
    if (isExpiring || isShaking) return "error";
    if (index === gameState.currentProblemIndex) return "selected";
    return "default";
  };

  const handleSubmit = () => {
    if (phase === "end") return;
    if (!gameState.answer.trim()) return;
    const result = submitAnswer(gameState.answer);
    if (result?.isCorrect) {
      solvingCards.add(result.problemId);
      playSfx("SFX_CORRECT");
    } else if (result) {
      shakingCards.add(result.problemId);
      playSfx("SFX_WRONG");
    }
  };

  const goToResult = async () => {
    cleanupAudio();
    const savePayload = {
      categoryId,
      difficultyMode: toDifficultyMode(level),
      score: gameState.score,
      clientAnswers: gameState.clientAnswers.map((ca) => ({
        problemId: ca.problemId,
        inputs: ca.inputs,
        solved: ca.solved,
      })),
    };

    try {
      const response = await saveGameMutation.mutateAsync(savePayload);
      const gameSessionId = response.data?.gameSessionId;
      if (!gameSessionId) {
        router.replace(ROUTES.GAME);
        return;
      }
      router.replace(`${ROUTES.GAME_RESULT}?gameSessionId=${gameSessionId}`);
    } catch (error) {
      console.error("[Save] 저장 실패:", error);
      router.replace(ROUTES.GAME);
    }
  };

  if (phase === "tutorial") {
    return <GameTutorial level={level} onStart={startGame} />;
  }

  return (
    <div className={styles.playingWrapper}>
      <Image
        className={styles.backgroundVideo}
        src="/assets/images/game-tutorials.png"
        alt=""
        fill
        priority
        aria-hidden="true"
      />

      <GameHeader
        category={category}
        level={level}
        score={gameState.score}
        scores={level === "random" ? DEFAULT_SCORES : undefined}
        currentTime={gameState.remainingSeconds}
        totalTime={TOTAL_TIME}
      />

      <div className={styles.gameArea} />

      {phase !== "end" && (
        <div className={styles.fallingCardContainer}>
          {gameState.problems.map((problem, index) => {
            const ca = gameState.clientAnswers[index];
            if (ca?.expired && !expiringCards.map.has(problem.problemId))
              return null;
            if (ca?.solved && !solvingCards.map.has(problem.problemId))
              return null;
            if (ca?.activatedAt == null || ca?.lane == null) return null;

            const isSolving = solvingCards.map.has(problem.problemId);
            const isExpiring = expiringCards.map.has(problem.problemId);
            const isShaking = shakingCards.map.has(problem.problemId);

            return (
              <div
                key={problem.problemId}
                className={styles.fallingCardLane[ca.lane as 0 | 1 | 2]}
                style={isSolving ? { animationPlayState: "paused" } : undefined}
              >
                <div
                  className={getCardEffect(isSolving, isExpiring, isShaking)}
                >
                  <ProblemCard
                    category={problem.subCategory}
                    text={problem.title}
                    level={
                      level === "random"
                        ? (problem.difficulty.toLowerCase() as ProblemCardLevel)
                        : undefined
                    }
                    variant={getCardVariant(
                      index,
                      isSolving,
                      isExpiring,
                      isShaking,
                    )}
                    onClick={
                      isSolving || isExpiring
                        ? undefined
                        : () =>
                            dispatch({
                              type: "SELECT_PROBLEM",
                              index,
                            })
                    }
                  />
                </div>
                {isSolving && (
                  <CorrectAnswerEffect
                    onComplete={() => solvingCards.remove(problem.problemId)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.foulLineArea}>
        <FoulLine variant={expiringCards.map.size > 0 ? "error" : "default"} />
      </div>

      <div className={styles.bottomArea}>
        {phase !== "end" && (
          <p className={styles.problemText}>
            {currentProblem?.text ?? "문제를 불러오는 중..."}
          </p>
        )}
        <ProblemInput
          ref={inputRef}
          value={gameState.answer}
          disabled={phase === "end"}
          onChange={(e) => {
            playSfx("SFX_TYPING");
            dispatch({
              type: "UPDATE_ANSWER",
              answer: e.target.value,
            });
          }}
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
