import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "playingbo — 랜덤게임 모음",
    template: "%s — playingbo",
  },
  description: "친구와 함께 즐기는 랜덤 미니게임 모음",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "playingbo",
    title: "playingbo — 랜덤게임 모음",
    description: "친구와 함께 즐기는 랜덤 미니게임 모음",
  },
  twitter: {
    card: "summary_large_image",
    title: "playingbo — 랜덤게임 모음",
    description: "친구와 함께 즐기는 랜덤 미니게임 모음",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col px-safe pt-safe pb-safe">
        {children}
      </body>
    </html>
  );
}
