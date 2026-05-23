import { ImageResponse } from "next/og";

export const alt = "Ford Unicars Avanti Brugge Dames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#9f1522",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Diagonale strepen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        {/* Rode cirkel accent rechtsonder */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            backgroundColor: "#7a0f19",
          }}
        />

        {/* Inhoud */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Rode lijn accent */}
          <div
            style={{
              width: 60,
              height: 5,
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: 3,
            }}
          />

          {/* Club naam */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Ford Unicars
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginTop: -16,
            }}
          >
            Avanti Brugge
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginTop: -16,
            }}
          >
            Dames
          </div>

          {/* Subtitel */}
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.65)",
              marginTop: 8,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Basketbalclub · Brugge
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
