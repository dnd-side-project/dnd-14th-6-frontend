import type { ReactNode } from "react";
import { card } from "./ResultCard.css";

interface ResultCardProps {
  children: ReactNode;
  className?: string;
}

export default function ResultCard({ children, className }: ResultCardProps) {
  return (
    <div className={[card, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
