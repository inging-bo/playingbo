import type { Metadata } from "next";

import { CoinFlip } from "@/components/games/coin-flip";

export const metadata: Metadata = {
  title: "동전 던지기",
  description: "동전을 던져 앞뒤를 정해보세요",
  openGraph: {
    title: "동전 던지기 — playingbo",
    description: "동전을 던져 앞뒤를 정해보세요",
  },
  twitter: {
    title: "동전 던지기 — playingbo",
    description: "동전을 던져 앞뒤를 정해보세요",
  },
};

export default function CoinPage() {
  return <CoinFlip />;
}
