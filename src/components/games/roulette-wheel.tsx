"use client";

import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const MIN_SEGMENTS = 2;
const MAX_SEGMENTS = 16;
const SPIN_MS = 3000;

type Segment = {
  id: string;
  label: string;
};

let segmentIdCounter = 0;

/** LAN HTTP 등 비보안 컨텍스트에서는 randomUUID가 없을 수 있음 */
function createSegmentId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  segmentIdCounter += 1;
  return `seg-${segmentIdCounter}-${Date.now().toString(36)}`;
}

function createSegment(label: string): Segment {
  return { id: createSegmentId(), label };
}

function colorForIndex(index: number, total: number) {
  const hue = Math.round((index * 360) / total) % 360;
  return `oklch(0.72 0.14 ${hue})`;
}

/** 칸 경계에서 떨어진 안전 구간 안에서만 멈추도록 목표 각도 계산 */
function targetRotationMod(index: number, segmentAngle: number) {
  const center = index * segmentAngle + segmentAngle / 2;
  const half = segmentAngle / 2;
  const margin = Math.max(1.5, half * 0.15);
  const maxJitter = Math.max(0, half - margin);
  const jitter = (Math.random() * 2 - 1) * maxJitter;
  return (360 - (center + jitter) + 360) % 360;
}

const INITIAL_SEGMENTS: Segment[] = [
  createSegment("항목 1"),
  createSegment("항목 2"),
];

export function RouletteWheel() {
  const listId = useId();
  const [segments, setSegments] = useState<Segment[]>(INITIAL_SEGMENTS);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Segment | null>(null);
  const rotationRef = useRef(0);
  const spinningRef = useRef(false);
  const winningIndexRef = useRef(0);
  const snapModRef = useRef(0);

  const segmentCount = segments.length;
  const segmentAngle = 360 / segmentCount;
  const canSpin =
    !spinning &&
    segments.every((s) => s.label.trim().length > 0) &&
    segmentCount >= MIN_SEGMENTS;

  const wheelBackground = useMemo(() => {
    const stops = segments
      .map((_, i) => {
        const start = i * segmentAngle;
        const end = (i + 1) * segmentAngle;
        return `${colorForIndex(i, segmentCount)} ${start}deg ${end}deg`;
      })
      .join(", ");
    return `conic-gradient(from 0deg, ${stops})`;
  }, [segments, segmentCount, segmentAngle]);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    setResult(null);
  }, [segmentCount]);

  const updateLabel = useCallback((index: number, label: string) => {
    setSegments((prev) =>
      prev.map((s, i) => (i === index ? { ...s, label } : s))
    );
  }, []);

  const addSegment = useCallback(() => {
    setSegments((prev) => {
      if (prev.length >= MAX_SEGMENTS) return prev;
      return [...prev, createSegment(`항목 ${prev.length + 1}`)];
    });
  }, []);

  const removeSegment = useCallback((index: number) => {
    setSegments((prev) =>
      prev.length <= MIN_SEGMENTS
        ? prev
        : prev.filter((_, i) => i !== index)
    );
  }, []);

  const spin = useCallback(() => {
    if (!canSpin) return;

    const index = Math.floor(Math.random() * segmentCount);
    const extraSpins = 4 + Math.floor(Math.random() * 4);
    const targetMod = targetRotationMod(index, segmentAngle);
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;

    winningIndexRef.current = index;
    snapModRef.current = targetMod;

    setResult(null);
    spinningRef.current = true;
    setSpinning(true);
    setRotation((r) => {
      const next = r + extraSpins * 360 + delta;
      rotationRef.current = next;
      return next;
    });
  }, [canSpin, segmentCount, segmentAngle]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform" || !spinningRef.current) return;

      const fullTurns = Math.floor(rotationRef.current / 360);
      const snapped = fullTurns * 360 + snapModRef.current;
      const index = winningIndexRef.current;

      spinningRef.current = false;
      setSpinning(false);
      rotationRef.current = snapped;
      setRotation(snapped);
      setResult(segments[index] ?? null);
    },
    [segments]
  );

  const labelSize =
    segmentCount > 10
      ? "text-[9px]"
      : segmentCount > 6
        ? "text-[10px]"
        : "text-xs sm:text-sm";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle hidden></CardTitle>
        <CardDescription className="text-center">
          칸마다 글자를 적고 돌려보세요. 기본 {MIN_SEGMENTS}칸, 최대{" "}
          {MAX_SEGMENTS}칸.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="relative size-64 sm:size-80">
          <div
            className="pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1"
            aria-hidden
          >
            <div className="rotate-180 size-0 border-x-[18px] border-x-transparent border-b-[28px] border-b-primary drop-shadow-sm" />
          </div>
          <div
            className="relative size-full rounded-full border-4 border-border shadow-lg transition-transform [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{
              background: wheelBackground,
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? `${SPIN_MS}ms` : "0ms",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="absolute inset-4 rounded-full bg-background/90 shadow-inner" />
            {segments.map((seg, i) => {
              const angle = i * segmentAngle + segmentAngle / 2 - 90;
              const display = seg.label.trim() || `칸 ${i + 1}`;
              // 칸 호의 중간 반지름 + 해당 각도에서의 최대 너비(현 중앙 정렬)
              const labelRadius = 0.72;
              const maxLabelWidth =
                2 *
                labelRadius *
                Math.sin((segmentAngle / 2) * (Math.PI / 180)) *
                100;

              return (
                <div
                  key={seg.id}
                  className="pointer-events-none absolute top-1/2 left-1/2 w-1/2 origin-left"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className={cn(
                      "absolute text-center font-semibold leading-tight text-foreground",
                      labelSize
                    )}
                    style={{
                      left: `${labelRadius * 100}%`,
                      top: "50%",
                      transform: `translate(-75%, -50%) rotate(${-angle}deg)`,
                      maxWidth: `${maxLabelWidth}%`,
                    }}
                  >
                    <span className="block truncate">{display}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 size-6 sm:size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary shadow-md" />
        </div>
        
        {result ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-muted-foreground">결과</p>
            <Badge className="max-w-full px-4 py-4 text-base">
              <span className="truncate">{result.label.trim()}</span>
            </Badge>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {spinning
              ? "돌아가는 중…"
              : canSpin
                ? "버튼을 눌러 돌려보세요"
                : "모든 칸에 글자를 입력해 주세요"}
          </p>
        )}

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <Label id={listId}>칸 설정 ({segmentCount}칸) <Badge variant="outline">최소 {MIN_SEGMENTS} 칸, 최대 {MAX_SEGMENTS} 칸</Badge></Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSegment}
              disabled={spinning || segmentCount >= MAX_SEGMENTS}
            >
              <Plus data-icon="inline-start" />
              칸 추가
            </Button>
          </div>
          <ul
            className="grid grid-cols-2 gap-x-1 gap-y-2"
            aria-labelledby={listId}
          >
            {segments.map((seg, index) => (
              <li key={seg.id} className="flex min-w-0 items-center gap-1">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ background: colorForIndex(index, segmentCount) }}
                  aria-hidden
                />
                <Input
                  clearable
                  value={seg.label}
                  onChange={(e) => updateLabel(index, e.target.value)}
                  placeholder={`칸 ${index + 1}`}
                  disabled={spinning}
                  aria-label={`${index + 1}번 칸`}
                  className="min-w-0 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => removeSegment(index)}
                  disabled={spinning || segmentCount <= MIN_SEGMENTS}
                  aria-label={`${index + 1}번 칸 삭제`}
                >
                  <Minus />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className={cn("flex gap-2 pb-safe")}>
        <Button className={cn("flex-1 text-lg py-6")} onClick={spin} disabled={!canSpin}>
          {spinning ? "돌리는 중…" : "돌리기!"}
        </Button>
        <Button
          variant="outline"
          disabled={spinning}
          onClick={() => setResult(null)}
          className={cn("py-6 px-4")}
        >
          결과 지우기
        </Button>
      </CardFooter>
    </Card>
  );
}
