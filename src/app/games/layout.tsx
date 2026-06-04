import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-background via-background to-muted/40">
      <header className="border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-sm">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
          ← 홈
        </Link>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
