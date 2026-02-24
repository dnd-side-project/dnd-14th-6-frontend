import type { LogLineItemProps } from "@/components/home/LogLineSection/LogLineItem";

export interface LogLine extends LogLineItemProps {
  id: string;
  gap?: "header";
}

export const LOG_LINES: LogLine[] = [
  {
    id: "header-1",
    variant: "header",
    text: "# Orbit에 오신 것을 환영합니다!",
  },
  {
    id: "header-2",
    variant: "header",
    text: "# 나만의 학습 궤도를 만들어 보세요.",
  },
  {
    id: "intro",
    displayNumber: 1,
    variant: "label",
    label: "INTRO",
    text: ": CLI skill level undefined",
    gap: "header",
  },
  {
    id: "intro-desc",
    displayNumber: 2,
    variant: "description",
    text: "타이핑으로 배우는 실전 커맨드 훈련",
    indented: true,
  },
  {
    id: "error",
    displayNumber: 3,
    variant: "label",
    label: "ERROR",
    text: ": Commands known, execution incorrect.",
  },
  {
    id: "error-desc",
    displayNumber: 4,
    variant: "description",
    text: "# 아는 것 같은데 실제로 쓰면 자꾸 틀림",
    indented: true,
  },
  {
    id: "warning",
    displayNumber: 5,
    variant: "label",
    label: "WARNING",
    text: ": CLI reliance on external references",
  },
  {
    id: "warning-desc",
    displayNumber: 6,
    variant: "description",
    text: "# 터미널 앞에서 매번 AI와 구글링에 의존함",
    indented: true,
  },
  {
    id: "notice",
    displayNumber: 7,
    variant: "label",
    label: "NOTICE",
    text: ": CLI skill level undefined",
  },
  {
    id: "notice-desc",
    displayNumber: 8,
    variant: "description",
    text: "# CLI를 제대로 익히고 현재 실력을 명확히 확인받고 싶음",
    indented: true,
  },
  { id: "empty-9", displayNumber: 9, variant: "empty" },
  {
    id: "comment-1",
    displayNumber: 10,
    variant: "description",
    text: "# 알긴 아는데\u2026 맨날 다시 찾는 그 명령어.",
    indented: true,
  },
  {
    id: "comment-2",
    displayNumber: 11,
    variant: "description",
    text: "# CLI를 '아는 사람'에서 '쓰는 사람'으로.",
    indented: true,
  },
  { id: "empty-12", displayNumber: 12, variant: "empty" },
  {
    id: "status",
    displayNumber: 13,
    variant: "label",
    label: "STATUS",
    text: ": Learning session initializing\u2026",
    indented: true,
  },
  { id: "empty-14", displayNumber: 14, variant: "empty" },
  {
    id: "system-ready",
    displayNumber: 15,
    variant: "bold",
    text: "SYSTEM READY",
  },
  {
    id: "system-desc",
    displayNumber: 16,
    variant: "description",
    text: "# 실무 기반 시나리오 타이핑 훈련을 시작합니다.",
    indented: true,
    descriptionColor: "coolgrey_55",
  },
  {
    id: "training",
    displayNumber: 17,
    variant: "bold",
    text: "Training Flow",
  },
  {
    id: "flow-1",
    displayNumber: 18,
    variant: "description",
    text: "1. 실무 시나리오가 순차적으로 내려옵니다.",
    indented: true,
  },
  {
    id: "flow-2",
    displayNumber: 19,
    variant: "description",
    text: "2. 시나리오에 해당하는 명령어를 입력하세요.",
    indented: true,
  },
  {
    id: "flow-3",
    displayNumber: 20,
    variant: "description",
    text: "3. 맞춤형 분석 리포트로 게임 결과를 받아 보세요.",
    indented: true,
  },
];
