"use client";

import { useEffect, useRef } from "react";

import * as styles from "./GameEndOverlay.css";

export type GameEndType = "perfect" | "clear" | "timeout";

const FALLBACK_DURATION = 3000;

const END_VIDEO: Record<GameEndType, string> = {
  perfect: "/assets/videos/perfectclear.webm",
  clear: "/assets/videos/gameclear.webm",
  timeout: "/assets/videos/timeout.webm",
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
    }, FALLBACK_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.overlay}>
      <video
        className={styles.video}
        src={END_VIDEO[type]}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={() => onCompleteRef.current()}
      />
    </div>
  );
};

export default GameEndOverlay;
