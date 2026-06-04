"use client";

import { usePathname } from "next/navigation";

import { getGameTitle } from "@/lib/game-titles";

export function GamesHeaderTitle() {
  const pathname = usePathname();
  const title = getGameTitle(pathname);

  if (!title) return null;

  return (
    <h1 className="truncate text-center text-lg font-semibold tracking-tight">
      {title}
    </h1>
  );
}
