import type { ReactNode } from "react";
import { card } from "./DashboardCard.css";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  children,
  className,
}: DashboardCardProps) {
  return (
    <div className={[card, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
