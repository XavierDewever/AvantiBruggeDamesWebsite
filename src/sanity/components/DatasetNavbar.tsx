"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type NavbarProps = {
  renderDefault: ComponentType<NavbarProps>;
  [key: string]: unknown;
};

// ── Omgevingsconfiguratie ─────────────────────────────────────────────────────
// Pas de hrefs aan als de URLs wijzigen.
const ENVIRONMENTS: { label: string; dataset: string; href: string }[] = [
  {
    label: "Production",
    dataset: "production",
    href: "https://avanti-dames-admin.sanity.studio",
  },
  {
    label: "Development",
    dataset: "development",
    href: "http://localhost:3000/studio",       // ← vervang door je Vercel preview URL indien gewenst
  },
];

const CURRENT_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const current = ENVIRONMENTS.find((e) => e.dataset === CURRENT_DATASET) ?? ENVIRONMENTS[0];
const IS_PRODUCTION = CURRENT_DATASET === "production";

// ── Kleuren per omgeving ──────────────────────────────────────────────────────
const COLOR = IS_PRODUCTION
  ? { bg: "#7f1d1d", border: "#ef4444", dot: "#ef4444", text: "#fca5a5", strong: "#fef2f2" }
  : { bg: "#1a3a2a", border: "#22c55e", dot: "#22c55e", text: "#86efac", strong: "#f0fdf4" };

// ── Component ─────────────────────────────────────────────────────────────────
export function DatasetNavbar(props: NavbarProps) {
  const { renderDefault: DefaultNavbar, ...rest } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

      {/* ── Banner ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "5px 20px",
          backgroundColor: COLOR.bg,
          borderBottom: `2px solid ${COLOR.border}`,
        }}
      >
        {/* Huidig dataset label */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              flexShrink: 0,
              backgroundColor: COLOR.dot,
              boxShadow: `0 0 6px 2px ${COLOR.dot}55`,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: COLOR.text,
            }}
          >
            Dataset:&nbsp;
            <strong style={{ color: COLOR.strong }}>{CURRENT_DATASET}</strong>
          </span>
        </div>

        {/* Dropdown trigger */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 10px 3px 12px",
              borderRadius: "6px",
              border: `1px solid ${COLOR.border}55`,
              backgroundColor: `${COLOR.border}18`,
              color: COLOR.text,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Wissel omgeving
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="currentColor"
              style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none" }}
            >
              <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                minWidth: "200px",
                backgroundColor: "#1c1c1c",
                border: "1px solid #333",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                overflow: "hidden",
                zIndex: 9999,
              }}
            >
              <div style={{ padding: "6px 12px 4px", borderBottom: "1px solid #2a2a2a" }}>
                <span style={{ fontSize: "10px", color: "#666", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Kies omgeving
                </span>
              </div>
              {ENVIRONMENTS.map((env) => {
                const isActive = env.dataset === CURRENT_DATASET;
                return (
                  <a
                    key={env.dataset}
                    href={env.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      textDecoration: "none",
                      backgroundColor: isActive ? "#2a2a2a" : "transparent",
                      cursor: isActive ? "default" : "pointer",
                      pointerEvents: isActive ? "none" : "auto",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#252525";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    }}
                  >
                    {/* Gekleurde dot */}
                    <span style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      backgroundColor: env.dataset === "production" ? "#ef4444" : "#22c55e",
                      boxShadow: isActive ? `0 0 5px 1px ${env.dataset === "production" ? "#ef444466" : "#22c55e66"}` : "none",
                    }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: isActive ? "#fff" : "#aaa" }}>
                          {env.label}
                        </span>
                        {isActive && (
                          <span style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: env.dataset === "production" ? "#ef4444" : "#22c55e",
                            border: `1px solid ${env.dataset === "production" ? "#ef444455" : "#22c55e55"}`,
                            borderRadius: "4px",
                            padding: "1px 5px",
                          }}>
                            actief
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "10px", color: "#555", fontFamily: "monospace" }}>
                        {env.dataset}
                      </span>
                    </div>
                    {!isActive && (
                      <span style={{ marginLeft: "auto", fontSize: "11px", color: "#555" }}>↗</span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Standaard Sanity Studio navbar */}
      <DefaultNavbar {...(rest as NavbarProps)} />
    </div>
  );
}
