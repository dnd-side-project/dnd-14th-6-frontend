# CLAUDE.md (Orvit Frontend)

> Claude Code가 이 프로젝트에서 코드를 생성/수정/리뷰할 때 따라야 할 **전역 규칙(Agent)** 입니다.
> 우선순위: **(1) 폴더별 규칙 문서가 있으면 그것** → **(2) 이 CLAUDE.md** → (3) 기타 문서/노트
> 마지막 업데이트: 2026-02-05

---

## 1) 프로젝트 컨텍스트 (WHY / WHAT)

### 서비스 개요

- **서비스명**: Orvit
- **정의**: 실전 시나리오 + 게임화 요소를 결합한 **명령어 타이핑 학습 서비스**
- **메인 타깃**: 명령어 미숙으로 업무 흐름이 끊기는 **주니어 개발자(0~3년 차)**

### 문제/가설 요약

- 실무 맥락의 시나리오 기반 학습 → 실전 대응력 상승
- 타임어택 기반 긴장감 → 전이 효과 상승
- 티어/랭킹/업적 → 지속 학습 동기 강화

---

## 2) 기술 스택 (HOW)

- Language: **TypeScript / JavaScript**
- Framework: **Next.js (App Router)**
  - 현재 버전: `next@16.1.4`, `react@19`
- Server state: **TanStack Query**
- Styling: **vanilla-extract**
- Package manager: **pnpm**
- Formatter/Linter: **Biome**

> 전역 상태(Zustand 등)는 **추후 필요 시 논의**합니다.

---

## 3) 필수 스크립트 / 품질 게이트

### 기본 명령어 (package.json 기준)

- Dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Check: `pnpm check`

### 규칙

- 코드 생성/수정 후 **반드시** `pnpm check`를 통과해야 합니다.
- Push 직전에는 **반드시** 아래를 통과해야 합니다.
  - `pnpm check`
  - `pnpm build`

---

## 4) 폴더 구조 규칙 (현재 기준, 변경 가능)

> `app/` 라우트 구조는 변경 가능성이 있으므로, 신규 라우트/폴더 추가 시 현재 구조와 일관되게 정리합니다.

```text
dnd-14th-6-frontend/
└── src/
    ├── app/                      # Next.js App Router
    │   ├── (auth)/               # 로그인 그룹 (Header만)
    │   │   └── login/
    │   ├── (main)/               # 메인 그룹 (Header + Footer)
    │   │   └── report/
    │   │       └── ranking/
    │   └── game/
    │       └── result/
    │
    ├── components/
    │   ├── common/                   # 완전 재사용 컴포넌트
    │   ├── game/                 # 게임 관련 feature 컴포넌트
    │   ├── report/               # 리포트/랭킹 관련 feature 컴포넌트
    │   └── login/                 # 로그인/인증 관련 feature 컴포넌트
    │
    ├── assets/
    │   └── icons/
    │       ├── colored/
    │       └── mono/
    ├── constants/              # 상수 정의
    ├── errors/                 # 에러 처리
    ├── hooks/                  # 커스텀 훅
    ├── server/                 # 서버 관련 로직
    ├── styles/
    │   └── tokens/             # 디자인 토큰 (vanilla-extract)
    ├── types/                  # TypeScript 타입 정의
    └── utils/                  # 유틸리티 함수
```

---

## 5) 컴포넌트 분리 원칙

### 5-1. "하나의 파일에 하나의 컴포넌트"

- 각 `.tsx` 파일에는 **하나의 React 컴포넌트만 export**합니다.
- 서브 컴포넌트는 별도 파일로 분리합니다.
- 예외:
  - `src/components/common/**` (라이브러리 패턴 가능)
  - 아이콘 자동 생성 결과물 (`src/assets/icons/**`)

### 5-2. components 하위 역할

- `components/common/**`
  - 도메인에 종속되지 않은 **순수 UI 컴포넌트**
  - Button, Text, Flex 등
  - 어디서든 재사용 가능해야 합니다.

- `components/{feature}/**`
  - 특정 도메인(feature) 단위의 UI 컴포넌트 묶음
  - 예: `game`, `report`, `login`
  - 페이지 전용 UI와 복합 컴포넌트는 이 위치에 둡니다.
  - feature 간 직접 참조는 지양합니다.
  - 다른 feature에서도 재사용이 시작되면 `components/common`로 이동합니다.

---

## 6) 사용하지 않는 코드 제거 (엄격)

- 계획이 변경되어 불필요해진 코드/파일은 **즉시 삭제**합니다.
- 미사용 import/변수/함수 남기지 않습니다.
- backwards-compat re-export, `_unused` 변수 금지

---

## 7) 네이밍 컨벤션

### Folder & File

- **케밥 케이스(kebab-case)** 사용
  - 예: `edit-profile`, `game-result`
- 통용되는 단어/관용 표현 등 특이 케이스는 예외 가능(예: `mypage`)
  다만 신규 생성 시에는 케밥 케이스를 기본값으로 합니다.

### Variables / Functions

- **카멜 케이스(camelCase)**
  - `getAge`, `profileImageView`

### Components

- **파스칼 케이스(PascalCase)**
  - `DeleteButton.tsx`

### Custom Hooks

- `use`로 시작 + **camelCase**
  - `useOnlineStatus.ts`

### Constants

- 하드코딩 값의 별칭 상수는 **대문자 + 밑줄**
  - `COLOR_WHITE = "#ffffff"`

### 약어 금지

- 축약어 지양: `btn` → `button`, `cfg` → `config`

---

## 8) import 방향 규칙 (의존성 단순화)

권장 방향(예시):

- `app/**` → 어디든 import 가능 (최상단)
- `components/{feature}/**`
  → `components/common`, `hooks`, `utils`, `types`, `server`
- `components/common/**`
  → (가능하면) 순수 UI만 유지, feature 의존 금지
- `hooks/**`
  → `utils`, `types`, `server` 의존 가능

지양:

- `components/common` → `components/{feature}` 의존
- feature 간 직접 import
- `utils/server` 계층이 React 컴포넌트에 의존

---

## 9) 스타일링 규칙 (vanilla-extract)

- UI 스타일은 vanilla-extract 기반으로 작성합니다.
- 토큰은 `src/styles/tokens/**`에서 관리합니다.
- 전역 스타일: `src/styles/global.css.ts`
- 스타일 파일 위치: 컴포넌트와 동일 폴더에 `.css.ts` 파일
- 공통 스타일/토큰 변경 시 영향 범위를 고려해 커밋 단위를 명확히 나눕니다.

---

## 10) 아이콘(SVGR) 생성 규칙

- 아이콘 생성 명령은 아래 스크립트만 사용합니다.
  - `pnpm icon:mono`
  - `pnpm icon:colored`
  - `pnpm icon`
- 생성 후 `biome check --fix`가 자동 실행되며, 결과물을 그대로 커밋합니다.

---

## 11) Claude Skills 사용 규칙

- React Best Practices
  - 이 프로젝트는 `.claude/skills/vercel-react-best-practices`를 적용합니다.
  - 규칙 충돌 시 이 문서(CLAUDE.md)가 우선입니다.
  - 단, best practice가 더 낫다고 판단되면 **자동으로 구조를 뒤엎지 말고 "제안"으로 설명**합니다.
    - 왜 더 나은지
    - 현재 구조에서의 장단점
    - 적용 시 변경 범위
- `ui-publish`: UI 구현 품질 기준

자세한 내용은 각 스킬 문서 참조.

---

## 12) 작업 시 기본 태도 (중요)

- 새 폴더/새 규칙을 만들기 전에, 기존 구조로 해결 가능한지 먼저 검토합니다.
- 구조/규칙이 바뀌면, 이 문서(CLAUDE.md) 또는 관련 문서를 함께 업데이트합니다.
- 애매한 경우 기본값:
  - “페이지 전용이면 app 하위”
  - “2곳 이상 쓰이면 공통으로 추출”
  - "공통인지 애매하면 일단 페이지 전용으로 두고, 사용처가 늘면 추출"
