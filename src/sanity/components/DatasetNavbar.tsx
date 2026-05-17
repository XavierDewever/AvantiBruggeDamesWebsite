"use client";

import type { ComponentType } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
// Minimal typing for the renderDefault prop Sanity passes in v3/v5
type NavbarProps = {
  renderDefault: ComponentType<NavbarProps>;
  [key: string]: unknown;
};

// ── Config ────────────────────────────────────────────────────────────────────
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const IS_PRODUCTION = DATASET === "production";

// Where to switch to — adapt these URLs to match your own setup
const SWITCH_HREF = IS_PRODUCTION
  ? "http://localhost:3000/studio"            // production → open local dev studio
  : "https://avanti-dames-admin.sanity.studio"; // development → open hosted production studio

const SWITCH_LABEL = IS_PRODUCTION ? "Naar development" : "Naar production";

// ── Component ─────────────────────────────────────────────────────────────────
export function DatasetNavbar(props: NavbarProps) {
  const { renderDefault: DefaultNavbar, ...rest } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Banner bovenaan de standaard navbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "6px 20px",
          backgroundColor: IS_PRODUCTION ? "#7f1d1d" : "#1a3a2a",
          borderBottom: `2px solid ${IS_PRODUCTION ? "#ef4444" : "#22c55e"}`,
        }}
      >
        {/* Dataset badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: IS_PRODUCTION ? "#ef4444" : "#22c55e",
              boxShadow: `0 0 6px 2px ${IS_PRODUCTION ? "#ef444466" : "#22c55e66"}`,
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: IS_PRODUCTION ? "#fca5a5" : "#86efac",
            }}
          >
            Dataset:&nbsp;
            <strong style={{ color: IS_PRODUCTION ? "#fef2f2" : "#f0fdf4" }}>
              {DATASET}
            </strong>
          </span>
        </div>

        {/* Wissel-link */}
        <a
          href={SWITCH_HREF}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: IS_PRODUCTION ? "#fca5a5" : "#86efac",
            textDecoration: "none",
            letterSpacing: "0.05em",
            opacity: 0.8,
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.8")}
        >
          ↗ {SWITCH_LABEL}
        </a>
      </div>

      {/* Standaard Sanity Studio navbar */}
      <DefaultNavbar {...(rest as NavbarProps)} />
    </div>
  );
}
