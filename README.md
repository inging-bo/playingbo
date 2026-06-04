# playingbo

랜덤게임 모음 — **React**, **Next.js**, **Tailwind CSS**, **shadcn/ui** 로 구성된 웹 앱입니다.

## 기술 스택

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) (`src/components/ui/`)

## 로컬 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

## push → 자동 배포 (Vercel)

Next.js에 가장 잘 맞는 방식입니다. GitHub `main` 브랜치에 push할 때마다 자동 배포됩니다.

1. [vercel.com](https://vercel.com) 로그인 → **Add New Project**
2. GitHub에서 `inging-bo/playingbo` 저장소 Import
3. Framework Preset: **Next.js** (기본값) → **Deploy**
4. 이후 `git push origin main` 할 때마다 프로덕션 배포가 실행됩니다

배포 URL에서 `/api/health` 로 서버 상태를 확인할 수 있습니다.

## 컴포넌트 추가

shadcn 컴포넌트는 CLI로 추가합니다.

```bash
npx shadcn@latest add dialog
```

## CI

`main` push·PR 시 [`.github/workflows/ci.yml`](.github/workflows/ci.yml)에서 lint와 production build를 검증합니다.
