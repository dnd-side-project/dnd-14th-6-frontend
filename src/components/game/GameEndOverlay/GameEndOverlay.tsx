"use client";

import { useEffect, useRef } from "react";

import * as styles from "./GameEndOverlay.css";

export type GameEndType = "perfect" | "clear" | "timeout";

const END_DISPLAY_DURATION = 3000;

const END_TEXT: Record<GameEndType, string> = {
  perfect: "PERFECT CLEAR!",
  clear: "GAME CLEAR!",
  timeout: "TIME OUT!",
};

interface GameEndOverlayProps {
  type: GameEndType;
  onComplete: () => void;
}

const GameEndOverlay = ({ type, onComplete }: GameEndOverlayProps) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, END_DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.overlay}>
      <p className={styles.resultText}>{END_TEXT[type]}</p>
    </div>
  );
};

export default GameEndOverlay;
