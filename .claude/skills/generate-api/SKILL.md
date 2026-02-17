---
name: generate-api
description: Swagger 기반으로 DTO 타입과 API 쿼리 훅을 자동 생성하는 스킬. API 생성, 훅 생성, 타입 생성 관련 요청에서 트리거된다.
user-invocable: true
metadata:
  author: team
  version: "3.0.0"
---

# Generate API Skill

Swagger(OpenAPI) 스펙을 기반으로 DTO 타입과 개별 API 쿼리/뮤테이션 훅을 자동 생성한다.

## 아키텍처

```text
Swagger JSON
     │
  generate-api.cjs  ← 단일 fetch + 임시 파일 저장
     ├── generate-types.cjs  → src/types/api/ (태그별 파일, 항상 재생성)
     └── generate-hooks.cjs  → src/hooks/query/, mutation/ + query-keys.ts
                               (기존 파일 건너뜀, security 자동 판별)
```

- **공통 유틸**: `scripts/shared.cjs` — SWAGGER_URL, parseArgs, fetchSwagger, runBiomeFormat 등
- **전처리**: `scripts/swagger-transformer.cjs` — ApiResponse 언래핑 + 엔드포인트 필터링
- **쿼리키**: `src/server/query/query-keys.ts` (증분 재생성)
- **단일 fetch**: `generate-api.cjs`가 Swagger를 한 번만 fetch하여 `--spec`으로 하위 스크립트에 전달
- Swagger URL: `https://dev-api.orvit.net/api-docs-json`

## 실행 절차

### 통합 실행 (권장)

```bash
# 특정 API 하나만 (타입 + 훅 동시 생성)
pnpm generate:api -- --path /api/games/options

# 태그 단위 (배치)
pnpm generate:api -- --tag Games

# 전체
pnpm generate:api
```

### 개별 실행

```bash
# 타입만
pnpm generate:types
pnpm generate:types -- --path /api/games/options
pnpm generate:types -- --tag Users

# 훅만
pnpm generate:hooks -- --path /api/games/options
pnpm generate:hooks -- --tag Games
pnpm generate:hooks

# 강제 덮어쓰기 (수정한 훅도 재생성)
pnpm generate:hooks -- --path /api/games/options --force
```

### 결과 확인

생성된 파일 목록 확인 후 `pnpm check` 실행.

## 생성 파일 구조

```text
src/
  types/api/
    common.ts    ← 공유 스키마 (PaginationMetadataDto 등)
    games.ts     ← Games 태그 DTO
    users.ts     ← Users 태그 DTO
    tiers.ts     ← Tiers 태그 DTO
    index.ts     ← barrel re-export
  hooks/
    query/
      useGetGameOptionsQuery.ts
      useGetGameHistoriesQuery.ts
      useGetRanksQuery.ts
      useGetUserAnalysisQuery.ts
      useGetUserStatsQuery.ts
      useGetAllTiersQuery.ts
    mutation/
      useSaveGameSessionMutation.ts
  server/query/
    query-keys.ts  ← 중앙 집중 쿼리키 (증분 재생성)
```

## 사용 가능한 태그

- Games: /api/games/options, /api/games/sessions, /api/games/save
- Users: /api/users/ranks, /api/users/{userId}/analysis, /api/users/{userId}/stats
- Tiers: /api/tiers

## Public/Private 자동 판별

Swagger `security` 필드 기반으로 fetch 함수를 자동 결정한다 (수동 관리 불필요):

| 조건 | 결과 | fetch 함수 |
|------|------|-----------|
| 글로벌 `security` 없음 | 전체 public | `GET_PUBLIC` 등 |
| 글로벌 `security` 있음 + operation `security: []` | public | `GET_PUBLIC` |
| 글로벌 `security` 있음 + operation `security` 미지정 | private | `GET`, `POST` 등 |

## 주의사항

- 타입 파일은 Swagger 기준 매번 덮어쓰므로 **직접 수정 금지**
- 생성된 훅은 시작 템플릿. 개발자가 자유롭게 수정 가능
- 수정된 훅 파일은 재생성 시 건너뜀 (`--force`로 강제 재생성 가능)
- `query-keys.ts`는 기존 훅 + 새 훅의 키만 증분 추가
- 생성된 Query 훅에는 기본 `staleTime`(60초)과 `gcTime`(5분)이 인라인 상수로 포함됨 (훅마다 개별 조정 가능)
- 자세한 사용법은 `docs/api-generation-guide.md` 참조
