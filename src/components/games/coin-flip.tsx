"use client";

import { useCallback, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { randomInt } from "@/lib/random-int";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FLIP_MS = 1600;
const MIN_EXTRA_TURNS = 4;

type Side = "heads" | "tails";

const SIDE_LABEL: Record<Side, string> = {
  heads: "앞",
  tails: "뒤",
};

/** 앞면은 0deg, 뒷면은 180deg에서 정면을 향한다 */
const SIDE_ANGLE: Record<Side, number> = {
  heads: 0,
  tails: 180,
};

export function CoinFlip() {
  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<Side | null>(null);
  const flippingRef = useRef(false);
  const pendingSideRef = useRef<Side>("heads");

  const flip = useCallback(() => {
    if (flippingRef.current) return;

    const side: Side = randomInt(2) === 0 ? "heads" : "tails";
    const extraTurns = MIN_EXTRA_TURNS + Math.floor(Math.random() * 3);

    pendingSideRef.current = side;
    flippingRef.current = true;
    setFlipping(true);
    setResult(null);
    setRotation((r) => {
      const currentMod = ((r % 360) + 360) % 360;
      const delta = (SIDE_ANGLE[side] - currentMod + 360) % 360;
      return r + extraTurns * 360 + delta;
    });
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform" || !flippingRef.current) return;
      flippingRef.current = false;
      setFlipping(false);
      setResult(pendingSideRef.current);
    },
    []
  );

  const faceClass =
    "absolute inset-0 flex items-center justify-center rounded-full border-8 border-amber-600/70 text-7xl font-bold shadow-inner backface-hidden sm:text-8xl";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle hidden></CardTitle>
        <CardDescription className="text-center">
          버튼을 누르면 동전이 뒤집혀 앞 또는 뒤가 나와요.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="size-48 perspective-midrange sm:size-60">
          <div
            className="relative size-full transition-transform transform-3d [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transitionDuration: flipping ? `${FLIP_MS}ms` : "0ms",
            }}
            onTransitionEnd={handleTransitionEnd}
            aria-hidden
          >
            <div className={cn(faceClass, "bg-amber-300 text-amber-800")}>
              {SIDE_LABEL.heads}
            </div>
            <div
              className={cn(
                faceClass,
                "rotate-y-180 bg-amber-400 text-amber-900"
              )}
            >
              {SIDE_LABEL.tails}
            </div>
          </div>
        </div>

        <div aria-live="polite" className="flex min-h-16 flex-col items-center justify-center gap-1 text-center">
          {result ? (
            <>
              <p className="text-sm text-muted-foreground">결과</p>
              <Badge className="px-4 py-4 text-base">
                {SIDE_LABEL[result]}
              </Badge>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {flipping ? "뒤집는 중…" : "버튼을 눌러 던져보세요"}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className={cn("flex gap-2 pb-safe")}>
        <Button
          className={cn("flex-1 text-lg py-6")}
          onClick={flip}
          disabled={flipping}
        >
          {flipping ? "던지는 중…" : "던지기!"}
        </Button>
      </CardFooter>
    </Card>
  );
}
