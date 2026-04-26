import { ImageResponse } from "next/og";

export const alt = "KDP Niche Scorecard Checklist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #102f28 0%, #0a211c 100%)",
          color: "#ffffff",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "10px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              fontSize: 20,
              fontWeight: 750,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Battlelabs
          </div>
          <div style={{ fontSize: 22, fontWeight: 650, opacity: 0.9 }}>Checklist</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 880, lineHeight: 1.02 }}>
            KDP Niche Scorecard
          </div>
          <div style={{ fontSize: 34, fontWeight: 720, opacity: 0.94 }}>Scoring checklist</div>
          <div style={{ fontSize: 24, fontWeight: 620, opacity: 0.92 }}>
            Buyer intent • Giftability • Competition clarity • Production simplicity • Evergreen demand
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, opacity: 0.9 }}>
            Planning aid — no rankings or sales guarantees
          </div>
          <div style={{ fontSize: 22, fontWeight: 720, opacity: 0.9 }}>
            /kdp-niche-scorecard/checklist
          </div>
        </div>
      </div>
    ),
    size
  );
}

