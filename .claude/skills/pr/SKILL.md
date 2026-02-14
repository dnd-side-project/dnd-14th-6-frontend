---
name: pr
description: 현재 브랜치의 변경사항을 분석하여 원격에 푸시하고 develop 브랜치 대상으로 Draft PR을 생성하는 스킬. PR 생성, 푸시, pull request 관련 요청에서 자동으로 트리거된다.
user-invocable: true
metadata:
  author: team
  version: "1.0.0"
---

# Create PR Skill

현재 브랜치를 원격에 푸시하고, develop 브랜치 대상으로 Draft PR을 생성한다.

## 실행 절차

### 1단계: 사전 검증

아래 명령어를 **병렬로** 실행하여 현재 상태를 파악한다.

```bash
git status
git branch --show-current
git log --oneline -10
```

검증 항목:
- 커밋되지 않은 변경사항이 있으면 **먼저 커밋을 안내**하고 중단한다
- 현재 브랜치가 `main` 또는 `develop`이면 PR 생성을 중단하고 사용자에게 알린다

### 2단계: 변경사항 분석

develop 브랜치와의 차이를 분석한다.

```bash
git log develop..HEAD --oneline
git diff develop...HEAD --stat
```

- 커밋 히스트리 전체를 확인하여 PR 내용을 파악한다
- **최신 커밋만이 아닌, develop 이후 모든 커밋**을 분석 대상으로 한다

### 3단계: 원격 푸시

```bash
git push -u origin <현재-브랜치명>
```

- 이미 원격에 존재하는 경우에도 최신 커밋을 푸시한다
- `--force` 플래그는 사용하지 않는다

### 4단계: PR 생성

`gh pr create` 명령어로 Draft PR을 생성한다.

```bash
gh pr create --base develop --draft --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

## PR 제목 규칙

커밋 메시지 컨벤션과 동일한 형식을 따른다.

```
<type>(<scope>): <subject>
```

- type, scope, subject 규칙은 커밋 메시지와 동일하다
- 브랜치에 포함된 커밋들의 **전체 맥락**을 요약하여 작성한다
- 70자 이내로 작성한다

## PR 본문 규칙

프로젝트의 PR 템플릿 구조를 **그대로** 사용한다.

### 템플릿 구조

```markdown
## 📂 작업 내용

closes #이슈번호

- [x] 작업 내용 1
- [x] 작업 내용 2

## 💡 자세한 설명
(가능한 한 자세히 작성해 주시면 도움이 됩니다.)

## 📸 스크린샷
```

### 작성 규칙

#### 📂 작업 내용

- `closes #이슈번호` — 브랜치명에서 이슈 번호를 추출한다 (e.g. `feat/#42-login` → `closes #42`)
- 브랜치명에 이슈 번호가 없으면 `closes #이슈번호` 라인을 생략한다
- 체크리스트(`- [x]`)로 작업 내용을 나열한다
- develop 이후 모든 커밋을 기반으로 작업 내용을 정리한다
- 커밋 메시지를 그대로 복사하지 말고, **사용자가 이해하기 쉬운 단위**로 요약한다

#### 💡 자세한 설명

- 변경사항의 배경, 이유, 주요 구현 방식을 설명한다
- 코드 리뷰어가 알아야 할 맥락을 포함한다
- 변경 없으면 생략 가능

#### 📸 스크린샷

- CLI 환경에서는 스크린샷을 첨부할 수 없으므로, UI 변경이 포함된 경우 `스크린샷 추가 필요` 메모를 남긴다
- UI 변경이 없는 경우 해당 섹션을 비워둔다

## 이슈 번호 추출

브랜치명에서 이슈 번호를 자동 추출한다.

| 브랜치명 | 추출 결과 |
|----------|-----------|
| `feat/#42-login` | `#42` |
| `fix/#15-button-bug` | `#15` |
| `chore/#60-ai-skills` | `#60` |
| `feature/login-page` | 없음 (생략) |

## 주의사항

- **항상 `--draft`** 플래그를 사용하여 Draft PR로 생성한다
- **base 브랜치는 항상 `develop`**이다
- `main` 브랜치로의 PR은 생성하지 않는다
- PR 본문은 반드시 **HEREDOC** 형식으로 전달한다
- PR 생성 후 URL을 사용자에게 표시한다
- 이미 동일 브랜치에 열린 PR이 있으면 생성하지 않고 기존 PR URL을 안내한다

## 예시

### 전체 실행 흐름

```bash
# 1. 사전 검증
git status
git branch --show-current
git log --oneline -10

# 2. 변경사항 분석
git log develop..HEAD --oneline
git diff develop...HEAD --stat

# 3. 원격 푸시
git push -u origin feat/#42-login

# 4. PR 생성
gh pr create --base develop --draft --title "feat(auth): 로그인 페이지 추가" --body "$(cat <<'EOF'
## 📂 작업 내용

closes #42

- [x] 로그인 폼 UI 구현
- [x] 로그인 API 연동
- [x] 입력 유효성 검사 추가

## 💡 자세한 설명

이메일/비밀번호 기반 로그인 페이지를 추가했습니다.
React Hook Form을 사용하여 폼 상태를 관리하고, Zod로 유효성 검사를 처리합니다.

## 📸 스크린샷
스크린샷 추가 필요
EOF
)"
```
