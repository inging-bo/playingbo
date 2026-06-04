import { ImageResponse } from "next/og";

export const alt = "playingbo 룰렛";
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
        <div style={{ fontSize: 96, fontWeight: 700 }}>룰렛</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.85 }}>
          돌려서 랜덤 미션 뽑기
        </div>
      </div>
    ),
    { ...size }
  );
}
