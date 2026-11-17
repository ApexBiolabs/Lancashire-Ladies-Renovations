import { ImageResponse } from "next/og";

export const alt = "Lancashire Ladies Renovations — Your Home. Your Vision. Someone in Your Corner.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#292929", padding: 80, color: "#F7F5F0", fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 70, height: 70, border: "2px solid #B6A083", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontStyle: "italic" }}>LL</div>
          <div style={{ fontSize: 22, letterSpacing: 8, color: "#B6A083", textTransform: "uppercase" }}>Lancashire Ladies Renovations</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05 }}>Beautiful Renovations.</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontStyle: "italic", color: "#E8E1D7" }}>Expertly Managed.</div>
        </div>
        <div style={{ fontSize: 26, color: "#A5ADA0" }}>Your Home. Your Vision. Someone in Your Corner.</div>
      </div>
    ),
    size
  );
}
