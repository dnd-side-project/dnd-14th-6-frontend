import { fill, track, wrapper } from "./ProgressBar.css";

interface ProgressBarProps {
  percent: number;
  level: 1 | 2 | 3;
}

export default function ProgressBar({ percent, level }: ProgressBarProps) {
  return (
    <div className={wrapper}>
      <div className={track} />
      <div className={fill({ level })} style={{ width: `${percent}%` }} />
    </div>
  );
}
