---
name: commit
description: 변경사항을 분석하여 맥락별로 커밋을 생성하는 스킬. 여러 맥락이 섞여 있으면 분리하고, 단일 맥락이면 하나의 커밋으로 생성한다. git diff, git status 등 변경사항 확인이 필요한 상황에서 자동으로 트리거된다.
user-invocable: true
metadata:
  author: team
  version: "1.0.0"
---

# Commit Skill

변경사항을 분석하여 적절한 단위로 커밋을 생성한다.

## 실행 절차

### 1단계: 변경사항 분석

아래 명령어를 **병렬로** 실행하여 현재 상태를 파악한다.

```bash
git status
git diff
git diff --cached
git log --oneline -5
```

### 2단계: 맥락 분리 판단

변경된 파일과 diff 내용을 분석하여 **독립된 맥락**이 섞여 있는지 판단한다.

분리가 필요한 경우 예시:
- 기능 추가 + 버그 수정
- UI 변경 + API 변경
- 리팩토링 + 새 기능
- 설정 변경 + 코드 변경
- 테스트 추가 + 구현 코드 변경

분리가 **불필요한** 경우:
- 하나의 기능을 위해 여러 파일을 수정한 경우 (e.g. 컴포넌트 + 스타일 + 타입)
- 리팩토링이 하나의 목적으로 일관된 경우

### 3단계: 커밋 생성

맥락별로 관련 파일만 `git add`하여 각각 커밋한다.

- **단일 맥락**: 한 번에 커밋
- **복수 맥락**: 맥락별로 분리하여 순차 커밋 (영향도가 낮은 것부터)

## 커밋 메시지 규칙

이 프로젝트는 commitlint (`@commitlint/config-conventional`)을 사용한다.

### 형식

```
<type>(<scope>): <subject>
```

### type (필수, 소문자)

| type | 용도 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `style` | 코드 포맷팅, 세미콜론 등 (기능 변경 없음) |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정, 패키지 등 기타 변경 |
| `revert` | 이전 커밋 되돌리기 |

### scope (필수)

변경 범위를 나타낸다. 괄호 안에 작성한다.

- `*` — 프로젝트 전체 또는 여러 도메인에 걸친 변경
- 도메인/페이지명 — 특정 도메인에 한정된 변경 (e.g. `home`, `auth`, `mypage`, `settings`)
- 모듈명 — 공통 모듈에 한정된 변경 (e.g. `api`, `ui`, `hooks`, `utils`)

scope는 변경된 파일의 위치와 맥락을 기반으로 판단한다.

### subject (필수)

- **한국어**로 작성한다
- 마침표(`.`)로 끝내지 않는다
- header 전체 길이 100자 이내
- 명령형/서술형 자유 (e.g. "로그인 페이지 추가", "버튼 색상 변경")

### 예시

```
feat(home): 메인 배너 캐러셀 추가
feat(auth): 로그인 페이지 추가
fix(mypage): 프로필 이미지 업로드 안 되는 문제 수정
chore(*): Vercel Agent Skills 세팅
style(ui): 공통 버튼 컴포넌트 import 순서 정리
refactor(api): API 호출 로직을 커스텀 훅으로 분리
docs(*): README 프로젝트 구조 설명 추가
test(auth): 로그인 유효성 검사 테스트 추가
```

### 이슈 번호

- 브랜치명에 `#123` 형태의 이슈 번호가 포함된 경우, `prepare-commit-msg` 훅이 자동으로 커밋 메시지 끝에 `(#123)`을 추가한다
- 커밋 메시지에 수동으로 이슈 번호를 넣지 않는다

## pre-commit 훅 실패 시

1. `pnpm run lint` (biome check)가 pre-commit 훅으로 실행된다
2. 훅 실패 시 커밋은 생성되지 않는다
3. lint 에러를 수정한다
4. 수정한 파일을 다시 `git add`한다
5. **새 커밋을 생성**한다 (`--amend` 사용 금지 — 이전 커밋을 덮어쓸 위험)

## 주의사항

- `.env`, 인증 파일 등 민감한 파일은 커밋하지 않는다
- `git add -A`나 `git add .` 대신 파일을 **개별 지정**하여 staging한다
- `--no-verify` 플래그를 사용하지 않는다
- 커밋 메시지는 반드시 HEREDOC 형식으로 전달한다
- Co-Authored-By 라인을 커밋 메시지 끝에 추가한다

```bash
git commit -m "$(cat <<'EOF'
feat(auth): 로그인 페이지 추가

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```
