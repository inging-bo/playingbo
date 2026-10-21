---
name: game-orchestrator
description: playingbo의 게임 개발 작업(새 게임 추가, 게임 수정·보완, 다시 실행, 이전 결과 개선)을 개발자와 QA 에이전트로 조율한다. 게임 구현 요청이면 사용한다. 단순 질문이나 문구 한 줄 수정은 직접 처리해도 된다.
---

# 게임 개발 오케스트레이터

**실행 모드:** 서브에이전트 위임 (개발 → QA 순차, 수정 루프 최대 2회). 단계 간 대화가 필요 없고 결과만 받으면 되므로 `Agent` 단발 호출을 쓴다.

## 0단계: 맥락 확인
- `_workspace/`가 없으면 처음부터 실행한다.
- 있고 일부 수정 요청이면 해당 단계만 다시 실행한다(예: QA 실패 항목 수정 → 개발자만 재호출 후 QA).
- 있고 새 게임 요청이면 `_workspace/`를 `_workspace_{타임스탬프}/`로 옮기고 새로 시작한다.

## 절차
1. `Agent(subagent_type: "game-developer")` — 게임 이름·규칙과 `add-game` 스킬 사용을 지시한다. 산출물은 코드와 `_workspace/01_game-developer_summary.md`.
2. `Agent(subagent_type: "game-qa")` — 변경 파일 목록을 넘긴다. 결과는 `_workspace/02_game-qa_report.md`와 PASS/FAIL.
3. FAIL이면 보고서 경로를 주고 game-developer를 다시 호출한 뒤 QA를 반복한다. 2회 후에도 FAIL이면 남은 문제를 사용자에게 보고한다.
4. 사용자에게 변경 파일, 가정한 내용, QA 결과를 요약한다. 커밋·푸시는 사용자가 요청할 때만 한다(main 푸시는 Vercel 자동 배포를 일으킨다).

## 데이터 전달
파일 기반(`_workspace/{phase}_{agent}_{artifact}.md`) + 에이전트 반환 메시지. `_workspace*/`는 `.gitignore`에 등록되어 커밋되지 않는다.

## 오류 처리
- 에이전트 실패 시 한 번 재시도, 재실패하면 해당 결과 없이 진행하고 보고에 누락을 적는다.
- 한도 소진·권한 거부는 재시도하지 않고 사용자에게 알린다.
- QA는 직접 확인한 사실만 보고한다. 빌드를 실행하지 못했다면 통과로 간주하지 않는다.

## 테스트 시나리오
- 정상: "사다리타기 게임 추가해줘" → 개발자가 컴포넌트·페이지·OG·제목·홈 링크 작성 → QA가 lint/build PASS.
- 오류: 제목 등록을 빠뜨린 경우 → QA가 `game-titles.ts` 불일치로 FAIL → 개발자가 해당 항목만 수정 → 재검증 PASS.
