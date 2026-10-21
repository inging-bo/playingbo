---
name: add-game
description: playingbo에 새 랜덤 게임(룰렛 같은 페이지)을 추가하거나 기존 게임을 수정할 때 따르는 절차와 완료 체크리스트. 게임 추가, 새 게임 페이지, 게임 제목·OG 이미지·홈 링크 등록, 게임 수정 요청에 사용한다.
---

# 게임 추가 절차

게임이 등록 지점 여러 곳에 흩어져 있어서, 하나라도 빠지면 헤더 제목이 비거나 홈에서 접근할 수 없다. 아래 순서를 지킨다.

1. **문서 확인** — `node_modules/next/dist/docs/01-app`의 관련 문서(라우팅, metadata, 클라이언트 컴포넌트, OG 이미지)를 읽는다.
2. **컴포넌트** — `src/components/games/{game}.tsx`. 상태·이벤트가 있으면 `"use client"`.
3. **페이지** — `src/app/games/{game}/page.tsx`. `roulette/page.tsx`처럼 `metadata`(title, description, openGraph, twitter)를 둔다.
4. **OG 이미지** — `src/app/games/{game}/opengraph-image.tsx`. `roulette/opengraph-image.tsx`의 구조를 복사해 문구만 바꾼다.
5. **제목 등록** — `src/lib/game-titles.ts`의 `GAME_PAGE_TITLES`에 경로를 추가한다.
6. **홈 링크** — `src/app/page.tsx`의 CardContent에 lucide 아이콘이 있는 outline 버튼 링크를 추가한다.

## 완료 체크리스트
- [ ] 위 2~6번 파일이 모두 있고 경로·제목이 서로 일치한다
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과 (CI와 동일 조건)
- [ ] 모바일 폭에서 레이아웃이 깨지지 않는다 (코드상 확인)
