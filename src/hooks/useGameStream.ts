import { useCallback, useEffect, useReducer, useRef } from "react";
import type {
  ClientAnswer,
  GamePlayState,
  StreamProblem,
  StreamTimer,
} from "@/types/game";

const INITIAL_STATE: GamePlayState = {
  problems: [],
  currentProblemIndex: 0,
  remainingSeconds: 60,
  score: 0,
  clientAnswers: [],
  answer: "",
  isStreamOpen: false,
  error: null,
};

type GameAction =
  | { type: "STREAM_OPENED" }
  | { type: "PROBLEM_RECEIVED"; problem: StreamProblem }
  | { type: "TIMER_TICK"; remainingSeconds: number }
  | {
      type: "ANSWER_SUBMITTED";
      input: string;
      isCorrect: boolean;
      point: number;
    }
  | { type: "SELECT_PROBLEM"; index: number }
  | { type: "UPDATE_ANSWER"; answer: string }
  | { type: "PROBLEM_EXPIRED"; index: number }
  | { type: "ACTIVATE_QUEUED_TICK" }
  | { type: "GAME_ENDED" }
  | { type: "STREAM_ERROR"; error: string };

const MAX_VISIBLE = 3;
const LANE_COUNT = 3;
const MIN_ACTIVATION_GAP_MS = 5500;

function isActive(a: ClientAnswer): boolean {
  return a.activatedAt !== null && !a.solved && !a.expired;
}

function countActiveVisible(answers: ClientAnswer[]): number {
  return answers.filter(isActive).length;
}

/** 현재 사용 중이지 않은 레인 목록 반환 */
function getAvailableLanes(answers: ClientAnswer[]): number[] {
  const usedLanes = new Set<number>();
  for (const a of answers) {
    if (isActive(a) && a.lane !== null) {
      usedLanes.add(a.lane);
    }
  }
  return Array.from({ length: LANE_COUNT }, (_, i) => i).filter(
    (l) => !usedLanes.has(l),
  );
}

/** 슬롯이 비면 큐에서 1개 활성화 (간격 체크 포함) */
function activateQueued(answers: ClientAnswer[]): ClientAnswer[] {
  if (countActiveVisible(answers) >= MAX_VISIBLE) return answers;
  const now = Date.now();
  const lastActivatedAt = answers.reduce(
    (max, a) =>
      a.activatedAt !== null && a.activatedAt > max ? a.activatedAt : max,
    0,
  );
  if (lastActivatedAt > 0 && now - lastActivatedAt < MIN_ACTIVATION_GAP_MS)
    return answers;
  const availableLanes = getAvailableLanes(answers);
  if (availableLanes.length === 0) return answers;
  let activated = false;
  return answers.map((a) => {
    if (activated || a.activatedAt !== null) return a;
    activated = true;
    return { ...a, activatedAt: now, lane: availableLanes[0] };
  });
}

function findNextActive(answers: ClientAnswer[], fromIndex: number): number {
  for (let i = fromIndex + 1; i < answers.length; i++) {
    if (isActive(answers[i])) return i;
  }
  for (let i = 0; i < fromIndex; i++) {
    if (isActive(answers[i])) return i;
  }
  return fromIndex;
}

function gameReducer(state: GamePlayState, action: GameAction): GamePlayState {
  switch (action.type) {
    case "STREAM_OPENED":
      return { ...state, isStreamOpen: true };

    case "PROBLEM_RECEIVED": {
      const newAnswer: ClientAnswer = {
        problemId: action.problem.problemId,
        inputs: [],
        solved: false,
        expired: false,
        activatedAt: null,
        lane: null,
      };
      return {
        ...state,
        problems: [
          ...state.problems,
          { ...action.problem, arrivedAt: Date.now() },
        ],
        clientAnswers: activateQueued([...state.clientAnswers, newAnswer]),
      };
    }

    case "TIMER_TICK":
      return { ...state, remainingSeconds: action.remainingSeconds };

    case "ANSWER_SUBMITTED": {
      let updatedAnswers = state.clientAnswers.map(
        (clientAnswer, index): ClientAnswer =>
          index === state.currentProblemIndex
            ? {
                ...clientAnswer,
                inputs: [
                  ...clientAnswer.inputs,
                  { input: action.input, isCorrect: action.isCorrect },
                ],
                solved: clientAnswer.solved || action.isCorrect,
              }
            : clientAnswer,
      );

      let nextIndex = state.currentProblemIndex;
      if (action.isCorrect) {
        updatedAnswers = activateQueued(updatedAnswers);
        nextIndex = findNextActive(updatedAnswers, state.currentProblemIndex);
      }

      return {
        ...state,
        score: action.isCorrect ? state.score + action.point : state.score,
        clientAnswers: updatedAnswers,
        currentProblemIndex: nextIndex,
        answer: "",
      };
    }

    case "PROBLEM_EXPIRED": {
      const ca = state.clientAnswers[action.index];
      if (!ca || ca.expired || ca.solved) return state;

      let updatedAnswers = state.clientAnswers.map(
        (answer, i): ClientAnswer =>
          i === action.index ? { ...answer, expired: true } : answer,
      );

      updatedAnswers = activateQueued(updatedAnswers);

      let nextIndex = state.currentProblemIndex;
      if (action.index === state.currentProblemIndex) {
        nextIndex = findNextActive(updatedAnswers, state.currentProblemIndex);
      }

      return {
        ...state,
        clientAnswers: updatedAnswers,
        currentProblemIndex: nextIndex,
        answer: nextIndex !== state.currentProblemIndex ? "" : state.answer,
      };
    }

    case "SELECT_PROBLEM": {
      const target = state.clientAnswers[action.index];
      if (!target || !isActive(target)) {
        return state;
      }
      return { ...state, currentProblemIndex: action.index, answer: "" };
    }

    case "ACTIVATE_QUEUED_TICK": {
      const updatedAnswers = activateQueued(state.clientAnswers);
      if (updatedAnswers === state.clientAnswers) return state;

      let nextIndex = state.currentProblemIndex;
      const currentCa = state.clientAnswers[state.currentProblemIndex];
      if (!currentCa || !isActive(currentCa)) {
        nextIndex = findNextActive(updatedAnswers, state.currentProblemIndex);
      }
      return {
        ...state,
        clientAnswers: updatedAnswers,
        currentProblemIndex: nextIndex,
      };
    }

    case "UPDATE_ANSWER":
      return { ...state, answer: action.answer };

    case "GAME_ENDED":
      return { ...state, isStreamOpen: false };

    case "STREAM_ERROR":
      return { ...state, isStreamOpen: false, error: action.error };

    default:
      return state;
  }
}

interface UseGameStreamParams {
  categoryId: number;
  difficultyMode: string;
  enabled: boolean;
  onGameEnd?: () => void;
}

export function useGameStream({
  categoryId,
  difficultyMode,
  enabled,
  onGameEnd,
}: UseGameStreamParams) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const eventSourceRef = useRef<EventSource | null>(null);
  const onGameEndRef = useRef(onGameEnd);
  onGameEndRef.current = onGameEnd;

  const closeStream = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/games/stream?categoryId=${categoryId}&difficultyMode=${encodeURIComponent(difficultyMode)}`;

    let lastEventTime = 0;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("open", () => {
      lastEventTime = Date.now();
      console.log("[SSE] 연결 성공:", url, "at", lastEventTime);
      dispatch({ type: "STREAM_OPENED" });
    });

    eventSource.addEventListener("timer", ((event: MessageEvent) => {
      const { data: parsed }: { data: StreamTimer } = JSON.parse(event.data);
      const now = Date.now();
      const gap = lastEventTime ? now - lastEventTime : 0;
      lastEventTime = now;
      console.log(
        `[SSE:timer] ${parsed.remainingSeconds}초 | arrived=${now} gap=${gap}ms`,
      );
      dispatch({
        type: "TIMER_TICK",
        remainingSeconds: parsed.remainingSeconds,
      });
    }) as EventListener);

    eventSource.addEventListener("problem", ((event: MessageEvent) => {
      const { data: parsed }: { data: StreamProblem } = JSON.parse(event.data);
      const now = Date.now();
      const gap = lastEventTime ? now - lastEventTime : 0;
      lastEventTime = now;
      console.log(
        `[SSE:problem] #${parsed.problemId} "${parsed.title}" | arrived=${now} gap=${gap}ms`,
      );
      dispatch({ type: "PROBLEM_RECEIVED", problem: parsed });
    }) as EventListener);

    eventSource.addEventListener("end", (() => {
      console.log("[SSE:end] 게임 종료 | arrived=", Date.now());
      eventSource.close();
      eventSourceRef.current = null;
      dispatch({ type: "GAME_ENDED" });
      onGameEndRef.current?.();
    }) as EventListener);

    eventSource.addEventListener("error", () => {
      console.error("[SSE:error] 스트림 연결 에러 발생");
      eventSource.close();
      eventSourceRef.current = null;
      dispatch({
        type: "STREAM_ERROR",
        error: "스트림 연결에 실패했습니다.",
      });
    });

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [enabled, categoryId, difficultyMode]);

  const submitAnswer = useCallback(
    (input: string): { isCorrect: boolean; problemId: string } | null => {
      const currentProblem = state.problems[state.currentProblemIndex];
      const currentAnswer = state.clientAnswers[state.currentProblemIndex];
      if (!currentProblem || !currentAnswer) return null;
      if (!isActive(currentAnswer)) return null;

      let decoded: string;
      try {
        decoded = new TextDecoder().decode(
          Uint8Array.from(atob(currentProblem.answer), (c) => c.charCodeAt(0)),
        );
      } catch {
        decoded = "";
      }

      const isCorrect = input.trim() === decoded.trim();

      console.log("[Game] 답안 제출:", {
        problemId: currentProblem.problemId,
        input,
        decoded,
        isCorrect,
        point: isCorrect ? currentProblem.point : 0,
      });

      dispatch({
        type: "ANSWER_SUBMITTED",
        input,
        isCorrect,
        point: currentProblem.point,
      });

      return { isCorrect, problemId: currentProblem.problemId };
    },
    [state.problems, state.currentProblemIndex, state.clientAnswers],
  );

  return {
    state,
    dispatch,
    submitAnswer,
    closeStream,
  };
}

export type { GameAction };
