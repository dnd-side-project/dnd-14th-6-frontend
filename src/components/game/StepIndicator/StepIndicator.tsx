import * as styles from "./StepIndicator.css";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={
            step === currentStep ? styles.activeStep : styles.inactiveStep
          }
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
