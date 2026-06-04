"use client";

import { useCallback, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SEGMENTS = [
  { label: "대박!", emoji: "🎉", color: "oklch(0.78 0.16 145)" },
  { label: "커피 쏘기", emoji: "☕", color: "oklch(0.72 0.12 55)" },
  { label: "한 판 더", emoji: "🎮", color: "oklch(0.7 0.14 250)" },
  { label: "휴식 5분", emoji: "😴", color: "oklch(0.75 0.1 200)" },
  { label: "간식 타임", emoji: "🍕", color: "oklch(0.78 0.15 25)" },
  { label: "춤추기", emoji: "💃", color: "oklch(0.72 0.18 330)" },
  { label: "셀카!", emoji: "📸", color: "oklch(0.7 0.12 280)" },
  { label: "다시 돌리기", emoji: "🔄", color: "oklch(0.8 0.08 100)" },
] as const;

const SEGMENT_COUNT = SEGMENTS.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const SPIN_MS = 2000;

export function RouletteWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<(typeof SEGMENTS)[number] | null>(
    null
  );
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const wheelBackground = useMemo(() => {
    const stops = SEGMENTS.map((seg, i) => {
      const start = i * SEGMENT_ANGLE;
      const end = (i + 1) * SEGMENT_ANGLE;
      return `${seg.color} ${start}deg ${end}deg`;
    }).join(", ");
    return `conic-gradient(from -90deg, ${stops})`;
  }, []);

  const spin = useCallback(() => {
    if (spinning) return;

    const index = Math.floor(Math.random() * SEGMENT_COUNT);
    const extraSpins = 4 + Math.floor(Math.random() * 4);
    const offset = 360 - (index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);

    setResult(null);
    setPendingIndex(index);
    setSpinning(true);
    setRotation((r) => r + extraSpins * 360 + offset);
  }, [spinning]);

  const handleTransitionEnd = useCallback(() => {
    if (pendingIndex === null) return;
    setResult(SEGMENTS[pendingIndex]);
    setPendingIndex(null);
    setSpinning(false);
  }, [pendingIndex]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>룰렛</CardTitle>
        <CardDescription>
          돌려서 나온 항목대로 하기! (8칸)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative size-72 sm:size-80">
          <div
            className="pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1"
            aria-hidden
          >
            <div className="size-0 border-x-[12px] border-x-transparent border-b-[20px] border-b-primary drop-shadow-sm" />
          </div>
          <div
            className="relative size-full rounded-full border-4 border-border shadow-lg transition-transform ease-out"
            style={{
              background: wheelBackground,
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? `${SPIN_MS}ms` : "0ms",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="absolute inset-4 rounded-full bg-background/90 shadow-inner" />
            {SEGMENTS.map((seg, i) => {
              const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2 - 90;
              return (
                <div
                  key={seg.label}
                  className="absolute top-1/2 left-1/2 w-[42%] origin-left"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <span className="block truncate pl-2 text-xs font-semibold text-foreground sm:text-sm">
                    <span className="mr-0.5" aria-hidden>
                      {seg.emoji}
                    </span>
                    {seg.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary shadow-md" />
        </div>

        {result ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">결과</p>
            <Badge className="px-4 py-1.5 text-base">
              <span className="mr-1.5" aria-hidden>
                {result.emoji}
              </span>
              {result.label}
            </Badge>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {spinning ? "돌아가는 중…" : "버튼을 눌러 돌려보세요"}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1" onClick={spin} disabled={spinning}>
          {spinning ? "돌리는 중…" : "돌리기!"}
        </Button>
        <Button
          variant="outline"
          disabled={spinning}
          onClick={() => {
            setResult(null);
            setPendingIndex(null);
          }}
        >
          초기화
        </Button>
      </CardFooter>
    </Card>
  );
}
