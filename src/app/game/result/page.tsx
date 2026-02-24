"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { ROUTES } from "@/constants/routes";
import type { GameResult } from "@/types/game";
import { GAME_RESULT_KEY } from "@/types/game";
import * as styles from "./page.css";

interface ProblemItem {
  id: number;
  category: string;
  isCorrect: boolean;
  attempts: number;
  question: string;
  myAnswers: string[];
  correctAnswer: string;
  explanation: string;
}

const MOCK_ATTEMPTS = [1, 2, 1, 3, 1, 2, 2, 1, 4, 5, 3, 2, 13, 2, 1, 2, 3, 1, 2, 1];
// true = 오답 반복 후 최종 정답 (wrong × (attempts-1) + correct × 1)
// false = 끝까지 오답
const MOCK_EVENTUALLY_CORRECT = [
  false, true,  false, false, false,
  true,  false, false, true,  false,
  false, true,  false, true,  false,
  false, true,  false, false, false,
];

interface ProblemTemplate {
  q: string;
  correct: string;
  wrong: string[];
  exp: string;
}

const GIT_PROBLEMS: ProblemTemplate[] = [
  {
    q: "현재 `main` 브랜치에서 작업 중이다. 새로운 기능 개발을 위해 `feature/login` 브랜치를 생성하고, 해당 브랜치로 이동하라.\n(브랜치가 이미 존재하는 경우 에러 없이 이동해야 한다)",
    correct: "git checkout -b feature/login",
    wrong: ["git branch feature/login", "git switch feature/login", "git checkout feature/login", "git switch -c feature/login", "git branch -b feature/login"],
    exp: "`git checkout -b` 은 브랜치가 존재하지 않으면 새로 생성한 뒤 해당 브랜치로 이동하고, 이미 존재하는 경우에도 에러 없이 해당 브랜치로 전환한다.",
  },
  {
    q: "원격 저장소 `origin`의 변경사항을 현재 브랜치에 가져와 병합하라.",
    correct: "git pull origin main",
    wrong: ["git fetch origin", "git pull", "git merge origin/main", "git fetch origin main", "git pull --rebase origin main"],
    exp: "`git pull` 은 `git fetch` 와 `git merge` 를 합친 명령으로, 원격 저장소의 변경사항을 가져와 현재 브랜치에 병합한다.",
  },
  {
    q: "현재 디렉토리의 모든 변경된 파일을 스테이징 영역에 추가하라.",
    correct: "git add .",
    wrong: ["git add -A", "git add --all", "git stage .", "git commit -a"],
    exp: "`git add .` 은 현재 디렉토리 기준으로 새 파일과 수정된 파일을 스테이징 영역에 추가한다.",
  },
  {
    q: "스테이징된 변경사항을 `feat: add login feature` 메시지로 커밋하라.",
    correct: 'git commit -m "feat: add login feature"',
    wrong: ['git commit "feat: add login feature"', 'git commit -a -m "feat: add login feature"', 'git save -m "feat: add login feature"', 'git push -m "feat: add login feature"'],
    exp: "`git commit -m` 은 커밋 메시지를 인라인으로 지정하여 스테이징된 변경사항을 커밋한다.",
  },
  {
    q: "현재 로컬 및 원격 브랜치 목록을 모두 확인하라.",
    correct: "git branch -a",
    wrong: ["git branch", "git branch -r", "git branch --list", "git show-branch"],
    exp: "`git branch -a` 는 로컬 브랜치와 원격 브랜치(`remotes/`)를 모두 출력한다.",
  },
  {
    q: "`HEAD` 를 3커밋 이전 상태로 되돌리되, 작업 디렉토리의 변경사항은 유지하라.",
    correct: "git reset HEAD~3",
    wrong: ["git reset --hard HEAD~3", "git revert HEAD~3", "git checkout HEAD~3", "git reset --soft HEAD~3", "git undo HEAD~3"],
    exp: "`git reset HEAD~3` 은 기본값인 `--mixed` 모드로 커밋은 되돌리지만 작업 디렉토리의 변경사항은 유지한다.",
  },
  {
    q: "`feature/nav` 브랜치를 현재 브랜치에 병합하라.",
    correct: "git merge feature/nav",
    wrong: ["git merge --squash feature/nav", "git rebase feature/nav", "git pull feature/nav", "git combine feature/nav"],
    exp: "`git merge feature/nav` 는 지정한 브랜치의 변경사항을 현재 브랜치에 병합한다.",
  },
  {
    q: "현재 작업 중인 변경사항을 임시로 저장하고 깨끗한 작업 디렉토리를 만들어라.",
    correct: "git stash",
    wrong: ["git stash push", "git save", "git temp", "git stash --all"],
    exp: "`git stash` 는 현재 작업 중인 변경사항을 스택에 임시 저장하고 `HEAD` 상태로 작업 디렉토리를 되돌린다.",
  },
  {
    q: "현재 브랜치를 원격 저장소 `origin` 의 `main` 브랜치에 강제 푸시하라.",
    correct: "git push origin main --force",
    wrong: ["git push origin main", "git push --force", "git push origin --force-with-lease", "git force-push origin main", "git push -f main", "git push origin main -f --no-verify"],
    exp: "`--force` 플래그는 원격 브랜치를 로컬 상태로 덮어쓴다. 협업 시 주의가 필요하며 `--force-with-lease` 사용이 권장된다.",
  },
  {
    q: "커밋 히스토리를 한 줄 요약과 그래프 형태로 확인하라.",
    correct: "git log --oneline --graph",
    wrong: ["git log --oneline", "git log --graph", "git log --all --oneline --graph", "git history", "git log -1", "git log --pretty=oneline --graph --decorate --all"],
    exp: "`--oneline` 은 커밋을 한 줄로 요약하고, `--graph` 는 브랜치 분기 구조를 ASCII 그래프로 시각화한다.",
  },
  {
    q: "스테이징된 파일과 마지막 커밋 사이의 변경사항을 확인하라.",
    correct: "git diff --staged",
    wrong: ["git diff", "git diff HEAD", "git diff --cached", "git status --diff", "git show --staged"],
    exp: "`git diff --staged` (`--cached` 와 동일)는 스테이징 영역과 마지막 커밋 사이의 차이를 보여준다.",
  },
  {
    q: "현재 브랜치를 `main` 브랜치 위에 리베이스하라.",
    correct: "git rebase main",
    wrong: ["git rebase origin/main", "git merge --rebase main", "git pull --rebase main", "git rebase -i main"],
    exp: "`git rebase main` 은 현재 브랜치의 커밋들을 `main` 브랜치 끝에 순차적으로 재적용하여 히스토리를 선형화한다.",
  },
  {
    q: "현재 커밋에 `v1.0.0` 태그를 생성하고 태그 메시지로 `Release v1.0.0` 을 지정하라.",
    correct: 'git tag -a v1.0.0 -m "Release v1.0.0"',
    wrong: ['git tag v1.0.0', 'git tag -m "Release v1.0.0" v1.0.0', 'git tag v1.0.0 -m "Release v1.0.0"', 'git create-tag v1.0.0', 'git tag --annotate v1.0.0 "Release v1.0.0"', 'git tag -a "Release v1.0.0" v1.0.0', 'git tag -a v1.0.0 --message "Release v1.0.0"', 'git annotate v1.0.0 -m "Release v1.0.0"', 'git tag v1.0.0 --annotate -m "Release v1.0.0"', 'git release v1.0.0 -m "Release v1.0.0"', 'git tag v1.0.0 HEAD -m "Release v1.0.0"', 'git label v1.0.0 -m "Release v1.0.0"', 'git tag -a v1.0.0 HEAD'],
    exp: "`git tag -a` 는 주석이 달린(annotated) 태그를 생성한다. `-m` 으로 태그 메시지를 지정한다.",
  },
  {
    q: "스테이징 영역에서 `src/index.ts` 파일만 제거하라. (작업 디렉토리 파일은 유지)",
    correct: "git restore --staged src/index.ts",
    wrong: ["git reset HEAD src/index.ts", "git unstage src/index.ts", "git rm --cached src/index.ts", "git checkout src/index.ts"],
    exp: "`git restore --staged` 는 스테이징 영역에서 파일을 제거하지만 작업 디렉토리의 변경사항은 그대로 유지한다.",
  },
  {
    q: "원격 저장소의 `feature/old` 브랜치를 삭제하라.",
    correct: "git push origin --delete feature/old",
    wrong: ["git branch -d feature/old", "git push origin :feature/old", "git remote remove feature/old", "git delete origin feature/old"],
    exp: "`git push origin --delete` 는 원격 저장소의 브랜치를 삭제한다. `:feature/old` 형식도 동일하게 동작한다.",
  },
  {
    q: "`git log` 결과를 커밋 해시(7자리)와 메시지만 표시하라.",
    correct: "git log --oneline",
    wrong: ["git log --short", "git log -1", "git log --pretty=short", "git log --format='%h %s'", "git log --abbrev"],
    exp: "`git log --oneline` 은 각 커밋을 단축 해시와 첫 번째 줄 메시지만으로 한 줄에 표시한다.",
  },
  {
    q: "커밋 `a1b2c3d` 를 현재 브랜치에 단독으로 적용하라.",
    correct: "git cherry-pick a1b2c3d",
    wrong: ["git apply a1b2c3d", "git merge a1b2c3d", "git rebase a1b2c3d", "git pick a1b2c3d", "git cherry-pick --no-commit a1b2c3d"],
    exp: "`git cherry-pick` 은 특정 커밋의 변경사항만 선택하여 현재 브랜치에 새 커밋으로 적용한다.",
  },
  {
    q: "현재 로컬 브랜치 이름을 `feat/auth` 로 변경하라.",
    correct: "git branch -m feat/auth",
    wrong: ["git rename feat/auth", "git branch --rename feat/auth", "git branch -r feat/auth", "git mv branch feat/auth"],
    exp: "`git branch -m` 은 현재 체크아웃된 브랜치의 이름을 변경한다. 다른 브랜치를 변경하려면 `git branch -m old new` 로 사용한다.",
  },
  {
    q: "병합 충돌을 해결한 뒤 병합을 완료하라.",
    correct: "git merge --continue",
    wrong: ["git commit", "git merge --finish", "git rebase --continue", "git add . && git commit"],
    exp: "충돌 해결 후 `git add` 로 파일을 스테이징하고, `git merge --continue` 또는 `git commit` 으로 병합 커밋을 완성한다.",
  },
  {
    q: "GitHub의 `https://github.com/example/repo.git` 저장소를 로컬에 클론하라.",
    correct: "git clone https://github.com/example/repo.git",
    wrong: ["git pull https://github.com/example/repo.git", "git fetch https://github.com/example/repo.git", "git init https://github.com/example/repo.git"],
    exp: "`git clone` 은 원격 저장소의 전체 히스토리를 포함한 복사본을 로컬에 생성하고 자동으로 `origin` 리모트를 설정한다.",
  },
];

const LINUX_PROBLEMS: ProblemTemplate[] = GIT_PROBLEMS.map((p) => ({ ...p }));
const DOCKER_PROBLEMS: ProblemTemplate[] = GIT_PROBLEMS.map((p) => ({ ...p }));

const CAT_DATA: Record<string, { label: string; problems: ProblemTemplate[] }> = {
  git: { label: "Branch", problems: GIT_PROBLEMS },
  linux: { label: "Linux", problems: LINUX_PROBLEMS },
  docker: { label: "Docker", problems: DOCKER_PROBLEMS },
};

function generateMockProblems(category: string): ProblemItem[] {
  const data = CAT_DATA[category] ?? CAT_DATA.git;
  return Array.from({ length: 20 }, (_, i) => {
    const tpl = data.problems[i] ?? data.problems[0];
    const attempts = MOCK_ATTEMPTS[i];
    const firstTry = attempts === 1;
    const eventuallyCorrect = !firstTry && MOCK_EVENTUALLY_CORRECT[i];
    const isCorrect = firstTry || eventuallyCorrect;

    let myAnswers: string[];
    if (firstTry) {
      myAnswers = [tpl.correct];
    } else if (eventuallyCorrect) {
      // 오답 (attempts-1)개 + 정답 1개
      const wrongCount = Math.min(attempts - 1, tpl.wrong.length);
      myAnswers = [...tpl.wrong.slice(0, wrongCount), tpl.correct];
    } else {
      // 끝까지 오답
      myAnswers = tpl.wrong.slice(0, Math.min(attempts, tpl.wrong.length));
    }

    return {
      id: i + 1,
      category: data.label,
      isCorrect,
      attempts,
      question: tpl.q,
      myAnswers,
      correctAnswer: tpl.correct,
      explanation: tpl.exp,
    };
  });
}

function renderWithCaptions(
  text: string,
  captionClass: string,
): React.ReactNode[] {
  const parts = text.split(/`([^`]+)`/).map((part, idx) => ({
    part,
    key: `part-${idx}`,
    isCode: idx % 2 === 1,
  }));
  return parts.map(({ part, key, isCode }) =>
    isCode ? (
      <span key={key} className={captionClass}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const PARTICLES = [
  { id: "p0",  top: "8%",  left: "5%",  size: 3, opacity: 0.7 },
  { id: "p1",  top: "15%", left: "12%", size: 2, opacity: 0.5 },
  { id: "p2",  top: "5%",  left: "30%", size: 4, opacity: 0.4 },
  { id: "p3",  top: "20%", left: "50%", size: 2, opacity: 0.6 },
  { id: "p4",  top: "3%",  left: "70%", size: 3, opacity: 0.5 },
  { id: "p5",  top: "10%", left: "85%", size: 2, opacity: 0.7 },
  { id: "p6",  top: "25%", left: "92%", size: 4, opacity: 0.4 },
  { id: "p7",  top: "40%", left: "2%",  size: 2, opacity: 0.6 },
  { id: "p8",  top: "55%", left: "8%",  size: 3, opacity: 0.5 },
  { id: "p9",  top: "70%", left: "3%",  size: 2, opacity: 0.7 },
  { id: "p10", top: "85%", left: "15%", size: 4, opacity: 0.4 },
  { id: "p11", top: "90%", left: "35%", size: 2, opacity: 0.6 },
  { id: "p12", top: "88%", left: "60%", size: 3, opacity: 0.5 },
  { id: "p13", top: "92%", left: "80%", size: 2, opacity: 0.7 },
  { id: "p14", top: "75%", left: "95%", size: 4, opacity: 0.4 },
  { id: "p15", top: "60%", left: "88%", size: 2, opacity: 0.6 },
  { id: "p16", top: "45%", left: "98%", size: 3, opacity: 0.5 },
  { id: "p17", top: "30%", left: "45%", size: 2, opacity: 0.3 },
  { id: "p18", top: "50%", left: "60%", size: 3, opacity: 0.3 },
  { id: "p19", top: "65%", left: "75%", size: 2, opacity: 0.4 },
];

interface HoveredPoint {
  index: number;
  x: number;
  y: number;
}

export default function GameResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<GameResult | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<HoveredPoint | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(GAME_RESULT_KEY);
    if (!stored) {
      router.replace(ROUTES.GAME);
      return;
    }
    try {
      setResult(JSON.parse(stored));
    } catch {
      sessionStorage.removeItem(GAME_RESULT_KEY);
      router.replace(ROUTES.GAME);
    }
  }, [router]);

  if (!result) {
    return null;
  }

  // const isLoggedIn = !!getClientSideTokens().accessToken;
  const isLoggedIn = true;

  const problems = generateMockProblems(result.category);
  const selected = problems[selectedIndex];

  const correctCount = problems.filter((p) => p.isCorrect).length;
  const accuracyPct = Math.round((correctCount / problems.length) * 100);

  // SVG chart constants (fixed viewBox space — uniform scaling via width="100%")
  const SVG_W = 800;
  const SVG_H = 183;
  const LEFT_PAD = 24; // y-axis label width
  const RIGHT_PAD = 8;
  const PLOT_W = SVG_W - LEFT_PAD - RIGHT_PAD;
  const PLOT_H = 126; // plot area height (y: 0 → 126)
  const X_AXIS_TOP = 156; // y position of x-axis labels

  const yRawMax = Math.max(...problems.map((p) => p.attempts));
  const Y_MAX = Math.ceil(yRawMax / 5) * 5 || 5;
  const yGridLabels = Array.from(
    { length: Y_MAX / 5 + 1 },
    (_, k) => Y_MAX - k * 5,
  );

  const getPointX = (i: number) => LEFT_PAD + (i * PLOT_W) / 19;
  const getPointY = (val: number) => PLOT_H * (1 - val / Y_MAX);

  const chartPoints = problems.map((p, i) => ({
    x: getPointX(i),
    y: getPointY(p.attempts),
  }));

  const chartPathD = chartPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <div className={styles.pageWrapper}>
      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => router.push(ROUTES.GAME)}
          title="게임 재시작"
        >
          <Image src="/assets/icons/colored/ic_refresh.svg" alt="재시작" width={36} height={36} />
        </button>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => router.push(ROUTES.HOME)}
          title="홈으로"
        >
          <Image src="/assets/icons/colored/ic_close.svg" alt="닫기" width={36} height={36} />
        </button>
      </div>

      <div className={styles.contentWrapper}>
        {/* Left Panel — Problem List (full height) */}
        <div className={styles.leftPanel}>
          {problems.map((p, i) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={p.id}
                type="button"
                className={[
                  styles.problemItem,
                  isSelected ? styles.problemItemSelected : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedIndex(i)}
              >
                <span
                  className={
                    isSelected
                      ? styles.problemNumberSelected
                      : styles.problemNumber
                  }
                >
                  {p.id}
                </span>
                <span
                  className={
                    isSelected
                      ? styles.problemCategorySelected
                      : styles.problemCategory
                  }
                >
                  {p.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Content — Center Panel + Bottom Row */}
        <div className={styles.rightContent}>
          {/* Center Panel — Problem Detail */}
          <div className={styles.centerPanel}>
            {/* Title — always visible */}
            <div className={styles.panelTitle}>문제 해설</div>

            {/* Body Area — blurred when not logged in */}
            <div className={styles.panelBodyArea}>
              <div className={[styles.panelBodyContent, !isLoggedIn ? styles.lockedOverlay : ""].filter(Boolean).join(" ")}>
                {/* Question */}
                <div className={styles.problemText}>
                  <ol style={{ margin: 0, paddingLeft: 24 }}>
                    <li style={{ whiteSpace: "pre-wrap" }}>
                      {renderWithCaptions(selected.question, styles.inlineCaption)}
                    </li>
                  </ol>
                </div>

                {/* Answer Area */}
                <div className={styles.answerArea}>
                  {/* 나의 답 */}
                  <div className={styles.sectionRow}>
                    <span className={styles.sectionLabelSide}>나의 답</span>
                    <div className={styles.codeBlockMyAnswer}>
                      {selected.myAnswers.map((ans, idx) => ({ ans, key: `ans-${idx}` })).map(({ ans, key }) => (
                        <span
                          key={key}
                          className={
                            ans === selected.correctAnswer
                              ? styles.answerLineCorrect
                              : styles.answerLineWrong
                          }
                        >
                          {ans}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 정답 */}
                  <div className={styles.sectionRow}>
                    <span className={styles.sectionLabelSide}>정답</span>
                    <div className={styles.codeBlockCorrectAnswer}>
                      {selected.correctAnswer}
                    </div>
                  </div>

                  {/* 해설 */}
                  <div className={styles.sectionRow}>
                    <span className={styles.sectionLabelSide}>해설</span>
                    <div className={styles.explanationBlock}>
                      {renderWithCaptions(selected.explanation, styles.inlineCaption)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lock Overlay — above blurred content, below title */}
              {!isLoggedIn && (
                <button
                  type="button"
                  className={styles.lockedPanelOverlay}
                  onClick={() => router.push(ROUTES.LOGIN)}
                >
                  <Image src="/assets/icons/colored/ic_lock.svg" alt="" width={64} height={64} />
                  <span className={styles.lockedOverlayText}>
                    로그인하면 전체 내용을 확인할 수 있어요!
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row */}
        <div className={styles.bottomRow}>
          {/* Chart Card */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>문제별 시도 횟수</div>
            <div className={styles.chartBodyArea}>
            <div className={[styles.chartContainer, !isLoggedIn ? styles.lockedOverlay : ""].filter(Boolean).join(" ")}>
              <svg
                ref={chartRef}
                width="100%"
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                style={{ display: "block", overflow: "visible" }}
              >
                {/* Y-axis grid lines + labels */}
                {yGridLabels.map((val) => {
                  const y = getPointY(val);
                  return (
                    <g key={val}>
                      <line
                        x1={LEFT_PAD}
                        y1={y}
                        x2={SVG_W - RIGHT_PAD}
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth={0.8}
                      />
                      <text
                        x={LEFT_PAD - 4}
                        y={y + 5}
                        textAnchor="end"
                        fill="#9ea4aa"
                        fontSize={14}
                        letterSpacing="-0.5"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis labels */}
                {chartPoints.map((p, i) => (
                  <text
                    key={problems[i].id}
                    x={p.x}
                    y={X_AXIS_TOP}
                    textAnchor="middle"
                    fill={hoveredPoint?.index === i ? "#62ebfe" : "#9ea4aa"}
                    fontSize={14}
                    letterSpacing="-0.5"
                  >
                    {i + 1}
                  </text>
                ))}

                {/* Hover vertical dashed line */}
                {hoveredPoint !== null && (
                  <line
                    x1={chartPoints[hoveredPoint.index].x}
                    y1={chartPoints[hoveredPoint.index].y}
                    x2={chartPoints[hoveredPoint.index].x}
                    y2={PLOT_H}
                    stroke="#62ebfe"
                    strokeWidth={1}
                    strokeDasharray="4 3"
                    strokeOpacity={0.7}
                  />
                )}

                {/* Line chart */}
                <path
                  d={chartPathD}
                  fill="none"
                  stroke="#62ebfe"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {chartPoints.map((p, i) => (
                  <g key={problems[i].id}>
                    {hoveredPoint?.index === i ? (
                      <>
                        <circle cx={p.x} cy={p.y} r={20} fill="rgba(98,235,254,0.07)" />
                        <circle cx={p.x} cy={p.y} r={12} fill="rgba(98,235,254,0.14)" />
                        <circle cx={p.x} cy={p.y} r={5} fill="#62ebfe" />
                      </>
                    ) : (
                      <circle cx={p.x} cy={p.y} r={3} fill="#62ebfe" />
                    )}
                    {/* Hover hit area */}
                    {/* biome-ignore lint/a11y/noStaticElementInteractions: SVG hover-only tooltip, no keyboard equivalent needed */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={14}
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredPoint({ index: i, x: p.x, y: p.y })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* Hover Popover — convert SVG viewBox coords to rendered pixel coords */}
              {hoveredPoint !== null && (() => {
                const prob = problems[hoveredPoint.index];
                const popoverW = 140;
                const svgEl = chartRef.current;
                const scale = svgEl ? svgEl.getBoundingClientRect().width / SVG_W : 1;
                const renderedX = hoveredPoint.x * scale;
                const renderedY = hoveredPoint.y * scale;
                const containerW = svgEl ? svgEl.getBoundingClientRect().width : SVG_W;
                return (
                  <div
                    className={styles.hoverPopover}
                    style={{
                      left: Math.max(0, Math.min(renderedX - popoverW / 2, containerW - popoverW)),
                      top: Math.max(0, renderedY - 88 * scale),
                    }}
                  >
                    <div className={styles.popoverTitle}>
                      {hoveredPoint.index + 1}번
                    </div>
                    <div className={styles.popoverRow}>
                      <span className={styles.popoverLabel}>{prob.category}</span>
                      <span className={styles.popoverValue}>{prob.attempts}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Lock Overlay — inside chartBodyArea, above blurred chart */}
            {!isLoggedIn && (
              <button
                type="button"
                className={styles.lockedPanelOverlay}
                onClick={() => router.push(ROUTES.LOGIN)}
              >
                <Image src="/assets/icons/colored/ic_lock.svg" alt="" width={64} height={64} />
                <span className={styles.lockedOverlayText}>
                  로그인하면 전체 내용을 확인할 수 있어요!
                </span>
              </button>
            )}
            </div>
          </div>

          {/* Stats Column */}
          <div className={styles.statsColumn}>
            {/* Score Card */}
            <div className={styles.statsCard}>
              <div className={styles.statsCardTitle}>획득한 총 스코어</div>
              <div className={isLoggedIn ? "" : styles.lockedOverlay}>
                <div className={styles.statsCardValue}>{result.score}</div>
              </div>
            </div>

            {/* Accuracy Card */}
            <div className={styles.statsCard}>
              <div className={styles.statsCardTitle}>정답률</div>
              <div className={isLoggedIn ? "" : styles.lockedOverlay}>
                <div className={styles.accuracyRow}>
                  <div className={styles.statsCardValue}>{accuracyPct}%</div>
                  <div className={styles.statsCardSubValue}>
                    {correctCount} / {problems.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
