"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Flex from "@/components/common/Flex/Flex";
import CircleIconButton from "@/components/game-result/CircleIconButton/CircleIconButton";
import ProblemDetail from "@/components/game-result/ProblemDetail/ProblemDetail";
import ProblemListBar from "@/components/game-result/ProblemListBar/ProblemListBar";
import StatCard from "@/components/game-result/StatCard/StatCard";
import TryCountChart from "@/components/game-result/TryCountChart/TryCountChart";
import { ROUTES } from "@/constants/routes";
import { useGetGameResultReportSuspenseQuery } from "@/hooks/query/useGetGameResultReportQuery";
import * as styles from "./page.css";

interface GameResultContentProps {
  gameSessionId: string;
}

export default function GameResultContent({
  gameSessionId,
}: GameResultContentProps) {
  const router = useRouter();
  const { data } = useGetGameResultReportSuspenseQuery({ gameSessionId });
  const { isGuest, summary, reports } = data;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedReport = reports[selectedIndex];

  const handleRefresh = () => {
    router.replace(ROUTES.GAME);
  };

  const handleClose = () => {
    router.replace(ROUTES.HOME);
  };

  const handleLogin = () => {
    const redirect = encodeURIComponent(
      `${ROUTES.GAME_RESULT}?gameSessionId=${gameSessionId}`,
    );
    router.push(
      `${ROUTES.LOGIN}?redirect=${redirect}&gameSessionId=${gameSessionId}`,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          src="/assets/images/game-result.png"
          alt=""
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>
      <Flex width={"100%"} justify="flexEnd">
        <Flex align="center" gap={1.2}>
          <CircleIconButton variant="refresh" onClick={handleRefresh} />
          <CircleIconButton variant="close" onClick={handleClose} />
        </Flex>
      </Flex>
      <div className={styles.contentWrapper}>
        <ProblemListBar
          reports={reports}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        <div className={styles.rightContent}>
          <div className={styles.problemDetailSection}>
            <ProblemDetail
              report={selectedReport}
              index={selectedIndex + 1}
              onLoginClick={isGuest ? handleLogin : undefined}
            />
          </div>

          <div className={styles.bottomRow}>
            <TryCountChart
              reports={reports}
              onLoginClick={isGuest ? handleLogin : undefined}
            />

            <Flex direction="column" gap={1.6} className={styles.statsColumn}>
              <StatCard
                title="획득한 총 스코어"
                value={summary.score ?? 0}
                isBlurred={isGuest}
              />
              <StatCard
                title="정답률"
                value={`${summary.correctRate ?? 0}%`}
                subtitle={`${summary.correctProblemCount ?? 0} / 20`}
                isBlurred={isGuest}
              />
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}
