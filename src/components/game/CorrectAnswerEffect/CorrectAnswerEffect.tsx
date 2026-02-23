import Lottie from "lottie-react";

import confettiAnimation from "@/assets/lottie/confetti.json";

import * as styles from "./CorrectAnswerEffect.css";

interface CorrectAnswerEffectProps {
  onComplete: () => void;
}

const CorrectAnswerEffect = ({ onComplete }: CorrectAnswerEffectProps) => {
  return (
    <div className={styles.container}>
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay
        onComplete={onComplete}
        className={styles.lottie}
      />
    </div>
  );
};

export default CorrectAnswerEffect;
