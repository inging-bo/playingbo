import { ImageResponse } from "next/og";

export const alt = "playingbo 동전 던지기";
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
        <div style={{ fontSize: 48, opacity: 0.7, marginBottom: 12 }}>
          playingbo
        </div>
        <div style={{ fontSize: 96, fontWeight: 700 }}>동전 던지기</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.85 }}>
          던져서 앞뒤 정하기
        </div>
      </div>
    ),
    { ...size }
  );
}
