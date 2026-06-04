import type { Metadata } from "next";

import { RouletteWheel } from "@/components/games/roulette-wheel";

export const metadata: Metadata = {
  title: "룰렛 — playingbo",
  description: "룰렛을 돌려 랜덤 미션을 뽑아보세요",
};

export default function RoulettePage() {
  return <RouletteWheel />;
}
