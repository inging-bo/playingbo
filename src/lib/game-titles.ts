/** 게임 경로 → 헤더 제목 (새 게임 추가 시 여기에 등록) */
export const GAME_PAGE_TITLES: Record<string, string> = {
  "/games/roulette": "룰렛",
};

export function getGameTitle(pathname: string): string | null {
  return GAME_PAGE_TITLES[pathname] ?? null;
}
