import { ImageResponse } from "next/og";

export const alt = "playingbo — 랜덤게임 모음";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(160deg, #2d1a38 0%, #121018 45%, #1a1024 100%)",
          color: "#f4f0eb",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em" }}>
          playingbo
        </div>
        <div style={{ fontSize: 40, marginTop: 20, opacity: 0.85 }}>
          랜덤게임 모음
        </div>
      </div>
    ),
    { ...size }
  );
}
