"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

type Health = { ok: boolean; time: string };

export function ServerStatus() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data: Health) => setHealth(data))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <Badge variant="destructive">서버에 연결할 수 없습니다</Badge>
    );
  }

  if (!health) {
    return <Badge variant="secondary">서버 상태 확인 중…</Badge>;
  }

  return (
    <Badge variant="outline">
      서버 정상 · {new Date(health.time).toLocaleString("ko-KR")}
    </Badge>
  );
}
