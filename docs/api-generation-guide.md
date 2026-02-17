# API 자동 생성 가이드

> Swagger(OpenAPI) 스펙 기반으로 **DTO 타입**과 **쿼리/뮤테이션 훅**을 자동 생성하는 파이프라인 설명서입니다.

---

## 목차

- [개요](#개요)
- [설계 원칙](#설계-원칙)
- [아키텍처](#아키텍처)
- [명령어](#명령어)
- [증분 생성 흐름 예시](#증분-생성-흐름-예시)
- [생성되는 파일 구조](#생성되는-파일-구조)
- [Query 훅 상세](#query-훅-상세)
- [Mutation 훅 상세](#mutation-훅-상세)
- [SSR/CSR 사용 패턴](#ssrcsr-사용-패턴)
- [쿼리키 팩토리 패턴](#쿼리키-팩토리-패턴)
- [Public/Private 자동 판별](#publicprivate-자동-판별)
- [커스텀 가이드](#커스텀-가이드)
- [관련 파일](#관련-파일)

---

## 개요

이 프로젝트는 두 단계로 API 코드를 자동 생성합니다:

1. **타입 생성** — 커스텀 스크립트가 Swagger JSON에서 DTO 인터페이스를 추출하여 **태그별 파일**로 생성
2. **훅 생성** — 커스텀 스크립트가 Swagger를 읽고 개별 훅 파일을 생성

### 왜 이런 구조인가?

- **태그별 타입 분리** — Games, Users, Tiers 각각의 DTO를 별도 파일로 관리
- **API당 1파일 훅** — query/mutation 폴더 분리, 개별 훅 파일
- **증분 생성** — `--path`/`--tag` 필터로 필요한 API만 생성
- **Public/Private 자동 판별** — Swagger `security` 필드 기반으로 `GET_PUBLIC`/`GET` 자동 결정

---

## 설계 원칙

| 원칙 | 설명 |
|------|------|
| **엔드포인트 단위 증분 생성** | `--path /api/games/options` → 그 API가 참조하는 타입/훅/쿼리키만 생성 |
| **기존 파일 보존** | 훅은 이미 존재하면 건너뜀 (수동 수정 보호), 타입은 기존 + 신규 병합 |
| **ApiResponse 자동 언래핑** | transformer가 Swagger 레벨에서 래퍼를 벗기고, 훅의 `select`에서도 `response.data`로 언래핑 |
| **태그별 타입 분리** | Games/Users/Tiers 별도 파일, 공유 스키마는 common.ts |
| **중앙 집중 쿼리키** | 모든 쿼리키를 `query-keys.ts` 한 곳에서 관리 (증분 재생성) |
| **Security 기반 자동 판별** | Swagger `security` 필드로 public/private를 자동 결정 (수동 관리 불필요) |

---

## 아키텍처

```text
┌─────────────────────────────┐
│   Swagger JSON              │
│   dev-api.orvit.net         │
└────────────┬────────────────┘
             │
     ┌───────┴────────┐
     │  generate-     │  ← 단일 fetch 후 임시 파일로 저장
     │  api.cjs       │
     └───┬───────┬────┘
         │       │  --spec (로컬 JSON 경로 전달)
         ▼       ▼
┌──────────────┐ ┌──────────────┐
│ generate-    │ │ generate-    │
│ types.cjs    │ │ hooks.cjs    │
└──────┬───────┘ └──────┬───────┘
       │                │
       │   ┌────────────┤
       │   │            │
       ▼   ▼            ├──────────────┐
┌──────────────┐ ┌──────┴───────┐  ┌──┴──────────────┐
│ types/api/   │ │ hooks/       │  │ server/query/    │
│  common.ts   │ │   query/     │  │   query-keys.ts  │
│  games.ts    │ │   mutation/  │  │   (증분 재생성)   │
│  users.ts    │ └──────────────┘  └─────────────────┘
│  tiers.ts    │
│  index.ts    │
└──────────────┘

공통 유틸리티:
┌──────────────────────────┐
│ shared.cjs               │
│  - SWAGGER_URL, ROOT_DIR │
│  - EXCLUDED_TAGS/PATHS   │
│  - parseArgs()           │
│  - fetchSwagger()        │
│  - runBiomeFormat()      │
│  - isApiResponseWrapper()│
└──────────────────────────┘
```

### Swagger 트랜스포머

타입/훅 생성 전에 `scripts/swagger-transformer.cjs`가 OpenAPI 스펙을 전처리합니다:

- **ApiResponse 언래핑**: 백엔드 응답의 `{ statusCode, success, data: T }` 래핑을 벗기고 `T`만 타입으로 추출
  - Pattern A: `allOf: [{ $ref: ApiResponseDto }, { properties: { data: T } }]`
  - Pattern B: `{ type: "object", $ref: ApiResponseDto, properties: { data: T } }`
- **엔드포인트 필터링**: SSE, App(health check) 엔드포인트 제거

### 단일 Swagger Fetch 최적화

`generate-api.cjs`는 Swagger JSON을 **한 번만 fetch**하여 임시 파일로 저장한 후, `--spec` 인자로 `generate-types.cjs`와 `generate-hooks.cjs`에 전달합니다. 네트워크 요청 2회 → 1회로 최적화됩니다.

---

## 명령어

### 타입 + 훅 한번에 (권장)

```bash
pnpm generate:api -- --path /api/games/options
```

`--path`/`--tag` 인자가 타입과 훅 모두에 전달됩니다.

### 타입 생성

```bash
# 전체 태그 생성
pnpm generate:types

# 특정 API의 타입만 (해당 endpoint 스키마만 증분 추가)
pnpm generate:types -- --path /api/games/options

# 태그 단위 (태그의 모든 타입 생성)
pnpm generate:types -- --tag Games
```

- 태그별 파일로 생성 (`games.ts`, `users.ts`, `tiers.ts`)
- 공유 스키마는 `common.ts`에 배치
- `--path`: 해당 endpoint의 타입만 증분 추가 (기존 태그 파일의 타입 유지)
- `--tag` / 인자 없음: 태그의 모든 타입 생성 (덮어쓰기)
- Biome 포매팅 자동 적용

### 훅 생성

```bash
# API 하나만 (주 사용법)
pnpm generate:hooks -- --path /api/games/options

# 태그 단위 (배치)
pnpm generate:hooks -- --tag Games

# 전체 생성
pnpm generate:hooks

# 강제 덮어쓰기 (이미 있는 파일도 재생성)
pnpm generate:hooks -- --path /api/games/options --force
```

- **기존 파일이 있으면 건너뜀** (수정한 훅이 덮어써지지 않음)
- `--force` 옵션으로 강제 재생성 가능
- Biome 포매팅 자동 적용

### Claude Code 스킬

```
/generate-api
```

Claude Code에서 `/generate-api` 명령으로도 실행 가능합니다.

---

## 증분 생성 흐름 예시

```bash
# 1차: games/options만
pnpm generate:api -- --path /api/games/options
```

→ `games.ts`: CategoryDto, GetGameOptionsResponseDto
→ `useGetGameOptionsQuery.ts` 생성
→ `query-keys.ts`: games.options만

```bash
# 2차: games/save 추가
pnpm generate:api -- --path /api/games/save
```

→ `games.ts`: 기존 2개 유지 + InputDto, ClientAnswerDto, SaveGameSession* 추가
→ `useSaveGameSessionMutation.ts` 생성
→ `query-keys.ts`: games.options 유지 (mutation이라 키 추가 없음)

```bash
# 3차: games/sessions 추가
pnpm generate:api -- --path /api/games/sessions
```

→ `games.ts`: 기존 유지 + SessionHistoryDto, GetGameHistoriesResponseDto 추가
→ `common.ts`: PaginationMetadataDto 생성 (Users 태그에서도 사용하는 공유 스키마)
→ `useGetGameHistoriesQuery.ts` 생성
→ `query-keys.ts`: games.options + games.sessions

---

## 생성되는 파일 구조

```text
src/
  server/
    query/
      query-keys.ts                     ← 중앙 집중 쿼리키 (증분 재생성)
  hooks/
    query/                              ← GET 엔드포인트
      useGetGameOptionsQuery.ts         ← queryOptions + SuspenseQuery + Query
      useGetGameHistoriesQuery.ts
      useGetRanksQuery.ts
      useGetUserAnalysisQuery.ts
      useGetUserStatsQuery.ts
      useGetAllTiersQuery.ts
    mutation/                           ← POST/PUT/DELETE 엔드포인트
      useSaveGameSessionMutation.ts     ← useMutation 래퍼
  types/
    api/                                ← 태그별 DTO 타입 (자동 재생성)
      common.ts                         ← 공유 스키마 (PaginationMetadataDto 등)
      games.ts                          ← Games 태그 DTO
      users.ts                          ← Users 태그 DTO
      tiers.ts                          ← Tiers 태그 DTO
      index.ts                          ← barrel re-export
```

---

## Query 훅 상세

모든 Query 훅은 **3가지 export**를 포함합니다. `select`로 `ApiResponse` 래퍼를 자동 언래핑하므로, 사용하는 쪽에서 `data`로 바로 DTO에 접근할 수 있습니다. 기본 `staleTime`(60초)과 `gcTime`(5분)이 인라인 상수로 포함됩니다.

```ts
// hooks/query/useGetGameOptionsQuery.ts

import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { GET_PUBLIC, queryKeys } from "@/server";
import type { GetGameOptionsResponseDto } from "@/types/api";

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

export const gameOptionsQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.games.options(),
    queryFn: () => GET_PUBLIC<GetGameOptionsResponseDto>("api/games/options"),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetGameOptionsSuspenseQuery = () =>
  useSuspenseQuery(gameOptionsQueryOptions());

export const useGetGameOptionsQuery = () =>
  useQuery(gameOptionsQueryOptions());
```

### 파라미터가 있는 경우

```ts
// hooks/query/useGetRanksQuery.ts

import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { GET, queryKeys } from "@/server";
import type { GetRanksResponseDto } from "@/types/api";

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

interface GetRanksParams {
  page: number;
  size: number;
  tierId?: number;
}

export const ranksQueryOptions = (params: GetRanksParams) =>
  queryOptions({
    queryKey: queryKeys.users.ranks(params),
    queryFn: () =>
      GET<GetRanksResponseDto>("api/users/ranks", {
        page: String(params.page),
        size: String(params.size),
        ...(params.tierId && { tierId: String(params.tierId) }),
      }),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetRanksSuspenseQuery = (params: GetRanksParams) =>
  useSuspenseQuery(ranksQueryOptions(params));

export const useGetRanksQuery = (params: GetRanksParams) =>
  useQuery(ranksQueryOptions(params));
```

---

## Mutation 훅 상세

```ts
// hooks/mutation/useSaveGameSessionMutation.ts

export const useSaveGameSessionMutation = () =>
  useMutation({
    mutationFn: (data: SaveGameSessionRequestDto) =>
      POST<SaveGameSessionResponseDto>("api/games/save", data),
  });
```

Mutation 훅은 `onSuccess`, `onError`, `onSettled` 콜백을 훅 내부 또는 호출 시점에 추가할 수 있습니다:

```ts
// 훅 내부에 추가 (항상 실행)
export const useSaveGameSessionMutation = () =>
  useMutation({
    mutationFn: (data: SaveGameSessionRequestDto) =>
      POST<SaveGameSessionResponseDto>("api/games/save", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.games.all });
    },
  });

// 호출 시점에 추가 (그 호출에서만 실행)
const { mutate } = useSaveGameSessionMutation();
mutate(data, {
  onSuccess: (response) => { /* ... */ },
  onError: (error) => { /* ... */ },
});
```

---

## SSR/CSR 사용 패턴

### SSR (Server-Side Rendering)

Server Component에서 `ServerFetchBoundary`로 데이터를 prefetch하고, 클라이언트 컴포넌트에서 `useSuspenseQuery` 훅으로 읽습니다. `select`로 언래핑되어 `data`에서 DTO를 바로 사용할 수 있습니다.

```tsx
// app/(report)/ranking/page.tsx (Server Component)
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import { ranksQueryOptions } from "@/hooks/query/useGetRanksQuery";
import RankingList from "@/components/report/RankingList";

export default function RankingPage() {
  return (
    <ServerFetchBoundary fetchOptions={ranksQueryOptions({ page: 1, size: 20 })}>
      <RankingList />
    </ServerFetchBoundary>
  );
}
```

```tsx
// components/report/RankingList.tsx (Client Component)
"use client";
import { useGetRanksSuspenseQuery } from "@/hooks/query/useGetRanksQuery";

export default function RankingList() {
  const { data } = useGetRanksSuspenseQuery({ page: 1, size: 20 });
  // data = GetRanksResponseDto (ApiResponse 이미 언래핑됨)
  return <div>{/* 랭킹 렌더링 */}</div>;
}
```

### CSR (Client-Side Rendering)

검색, 필터링 등 인터렉션이 필요한 경우 `useQuery` 훅을 사용합니다.

```tsx
"use client";
import { useGetRanksQuery } from "@/hooks/query/useGetRanksQuery";

export default function RankingWithFilter() {
  const [page, setPage] = useState(1);
  const [tierId, setTierId] = useState<number>();

  const { data, isLoading } = useGetRanksQuery({ page, size: 20, tierId });
  // data = GetRanksResponseDto | undefined

  return (
    <div>
      {/* 필터 UI */}
      {/* 랭킹 목록 */}
    </div>
  );
}
```

### SSR + CSR 혼합 (초기 로드는 SSR, 이후 인터렉션은 CSR)

```tsx
// page.tsx — SSR prefetch
<ServerFetchBoundary fetchOptions={ranksQueryOptions({ page: 1, size: 20 })}>
  <RankingWithFilter />
</ServerFetchBoundary>
```

```tsx
// RankingWithFilter.tsx — 초기엔 SSR 데이터, 필터 변경 시 CSR
"use client";
export default function RankingWithFilter() {
  const [page, setPage] = useState(1);
  const { data } = useGetRanksQuery({ page, size: 20 });
  // page=1일 때는 SSR prefetch 데이터 사용 (즉시 렌더링)
  // page 변경 시 CSR로 새 데이터 fetch
}
```

---

## 쿼리키 팩토리 패턴

모든 쿼리키는 `src/server/query/query-keys.ts`에 중앙 집중 관리됩니다. 이 파일은 `pnpm generate:hooks` 실행 시 **증분 재생성**됩니다 (기존 훅 + 새로 생성된 훅의 키만 포함).

### 생성되는 queryKeys 구조

```ts
// src/server/query/query-keys.ts (자동 생성)

export const queryKeys = {
  games: {
    all: ["games"] as const,
    options: () => [...queryKeys.games.all, "options"] as const,
    sessions: (params: unknown) =>
      [...queryKeys.games.all, "sessions", params] as const,
  },
  users: {
    all: ["users"] as const,
    ranks: (params: unknown) =>
      [...queryKeys.users.all, "ranks", params] as const,
    analysis: (params: unknown) =>
      [...queryKeys.users.all, "analysis", params] as const,
    stats: (params: unknown) =>
      [...queryKeys.users.all, "stats", params] as const,
  },
  tiers: {
    all: ["tiers"] as const,
    list: () => [...queryKeys.tiers.all] as const,
  },
};
```

### 캐시 무효화 예시

```ts
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/server";

const queryClient = useQueryClient();

// 특정 params의 랭킹 캐시 무효화
queryClient.invalidateQueries({
  queryKey: queryKeys.users.ranks({ page: 1, size: 20 }),
});

// 모든 유저 관련 캐시 무효화 (부분 매칭)
queryClient.invalidateQueries({ queryKey: queryKeys.users.all });

// 게임 옵션 캐시 무효화
queryClient.invalidateQueries({ queryKey: queryKeys.games.options() });

// 모든 게임 관련 캐시 무효화
queryClient.invalidateQueries({ queryKey: queryKeys.games.all });
```

---

## Public/Private 자동 판별

생성 스크립트는 Swagger 스펙의 `security` 필드를 기반으로 각 엔드포인트의 인증 여부를 **자동 판별**합니다. 수동으로 public/private 목록을 관리할 필요가 없습니다.

### 판별 규칙

| 조건 | 결과 | fetch 함수 |
|------|------|-----------|
| 글로벌 `security` 없음 | 전체 public | `GET_PUBLIC`, `POST_PUBLIC` 등 |
| 글로벌 `security` 있음 + operation `security: []` | 해당 API만 public | `GET_PUBLIC` |
| 글로벌 `security` 있음 + operation에 `security` 미지정 | private (글로벌 상속) | `GET`, `POST` 등 |

### Swagger 스펙 예시

```yaml
# 글로벌 security 정의 (모든 엔드포인트에 기본 적용)
security:
  - BearerAuth: []

paths:
  /api/games/options:
    get:
      security: []          # ← 글로벌 security 오버라이드 → public
      tags: [Games]

  /api/games/sessions:
    get:                     # ← security 미지정 → 글로벌 상속 → private
      tags: [Games]
```

### 현재 상태

현재 Orvit 백엔드 Swagger에는 글로벌 `security`가 정의되지 않아 **모든 엔드포인트가 public으로 판별**됩니다. 백엔드에서 인증을 추가하면 자동으로 반영됩니다.

---

## 커스텀 가이드

생성된 훅은 **시작 템플릿**입니다. 자유롭게 수정할 수 있으며, 수정된 파일은 재생성 시 건너뜁니다 (`--force`로 강제 재생성 가능).

### 불필요한 훅 삭제

SSR만 필요하면 `useQuery` 기반 훅을 삭제:

```ts
// useGetGameOptionsQuery.ts — useSuspenseQuery만 남기기
export const useGetGameOptionsSuspenseQuery = () =>
  useSuspenseQuery(gameOptionsQueryOptions());

// export const useGetGameOptionsQuery 삭제
```

### staleTime / gcTime / enabled 커스터마이징

생성 시 기본값은 `STALE_TIME = 60 * 1000`(60초), `GC_TIME = 5 * 60 * 1000`(5분)입니다. 각 훅 파일에 인라인 상수로 선언되므로 **훅마다 개별 조정** 가능합니다:

```ts
// 이 훅만 staleTime을 30초로, gcTime을 2분으로 변경
const STALE_TIME = 30 * 1000;
const GC_TIME = 2 * 60 * 1000;
```

`enabled` 등 추가 옵션도 자유롭게 추가:

```ts
export const useGetRanksQuery = (params: GetRanksParams) =>
  useQuery({
    ...ranksQueryOptions(params),
    enabled: params.page > 0,    // 조건부 실행
  });
```

---

## 관련 파일

| 파일 | 역할 |
|------|------|
| `scripts/shared.cjs` | 공통 상수(SWAGGER_URL, EXCLUDED_*) 및 유틸(parseArgs, fetchSwagger, runBiomeFormat) |
| `scripts/swagger-transformer.cjs` | ApiResponse 래핑 제거 + 불필요한 엔드포인트 필터링 |
| `scripts/generate-types.cjs` | 태그별 DTO 타입 파일 생성 (증분) |
| `scripts/generate-hooks.cjs` | 개별 훅 파일 + query-keys.ts 생성 (증분, security 자동 판별) |
| `scripts/generate-api.cjs` | 타입 + 훅 통합 실행 (단일 Swagger fetch 최적화) |
| `src/server/query/query-keys.ts` | 중앙 집중 쿼리키 팩토리 (자동 생성, 직접 수정 금지) |
| `src/server/query/server-fetch-boundary.tsx` | SSR prefetch + HydrationBoundary |
| `.claude/skills/generate-api/SKILL.md` | Claude Code `/generate-api` 스킬 정의 |
| `src/server/fetch/fetch-private.ts` | 인증 API 호출 (GET, POST 등) |
| `src/server/fetch/fetch-public.ts` | 비인증 API 호출 (GET_PUBLIC 등) |

### 대상 API 목록

| 태그 | Method | Path | 훅 | 인증 (자동 판별) |
|------|--------|------|----|-----------------|
| Games | GET | /api/games/options | useGetGameOptionsQuery | public |
| Games | GET | /api/games/sessions | useGetGameHistoriesQuery | private |
| Games | POST | /api/games/save | useSaveGameSessionMutation | private |
| Users | GET | /api/users/ranks | useGetRanksQuery | public |
| Users | GET | /api/users/{userId}/analysis | useGetUserAnalysisQuery | private |
| Users | GET | /api/users/{userId}/stats | useGetUserStatsQuery | private |
| Tiers | GET | /api/tiers | useGetAllTiersQuery | public |

**제외**: App (health check), SSE Sample, /api/games/stream (SSE)
