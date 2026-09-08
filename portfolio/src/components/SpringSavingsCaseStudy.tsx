import { useState, useEffect } from "react";
import {
  X, ArrowRight, TrendingUp, Users, Award,
  MessageSquare, CheckCircle, PiggyBank, Zap, ShieldCheck,
} from "lucide-react";
import { usePasswordProtection } from "../hooks/usePasswordProtection";
import PasswordModal from "./PasswordModal";
import springLogo from "../imports/spring-logo.svg";
import springMascot from "../imports/spring-mascot.png";
import springMockup from "../imports/spring-mockup.svg";
import springMidFiScreen from "../imports/spring-midfi-screen.png";
import springDepositsScreen from "../imports/spring-deposits-screen.jpg";
import springHandSketch from "../imports/spring-hand-sketch.jpg";

const CREAM = "#FAF7F2";
const PEACH = "#F2C5A0";
const CORAL = "#FF6B35";
const NAVY = "#1E2B3C";
const BLUE = "#0052CC";
const LBLUE = "#E6F0FF";
const DBLUE = "#003B9B";

/* ── progress ring (SVG) ── */
function Ring({
  pct,
  size = 72,
  color = CORAL,
}: {
  pct: number;
  size?: number;
  color?: string;
}) {
  const r = size * 0.38;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke={`${color}22`} strokeWidth={5} />
      <circle
        cx={c} cy={c} r={r} fill="none" stroke={color}
        strokeWidth={5} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${c} ${c})`}
      />
      <text x={c} y={c - 3} textAnchor="middle" dominantBaseline="central"
        fill={NAVY} fontSize={size * 0.17} fontWeight={800}>{pct}%</text>
      <text x={c} y={c + size * 0.16} textAnchor="middle" dominantBaseline="central"
        fill={`${NAVY}60`} fontSize={size * 0.1}>of goal</text>
    </svg>
  );
}

/* ── phone shell ── */
function Phone({
  children,
  bg = CREAM,
  border = "rgba(0,0,0,0.12)",
}: {
  children: React.ReactNode;
  bg?: string;
  border?: string;
}) {
  return (
    <div
      style={{
        width: 155,
        height: 310,
        flexShrink: 0,
        borderRadius: 26,
        overflow: "hidden",
        border: `3px solid ${border}`,
        background: bg,
        boxShadow: "0 24px 56px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 12,
          background: border === "rgba(0,0,0,0.12)" ? bg : bg,
          borderRadius: "0 0 10px 10px",
          zIndex: 10,
          backgroundColor: bg,
        }}
        aria-hidden="true"
      />
      <div style={{ paddingTop: 14, flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ── PHASE SCREENS ── */

function SketchScreen() {
  return (
    <div style={{ padding: "0 10px", fontFamily: "monospace" }}>
      {/* rough header */}
      <div style={{ border: "1.5px dashed #aaa", borderRadius: 4, padding: "4px 6px",
        marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 7, color: "#888" }}>spring</span>
        <span style={{ fontSize: 7, color: "#888" }}>[👤]</span>
      </div>
      {/* balance card rough */}
      <div style={{ border: "1.5px dashed #aaa", borderRadius: 6, padding: "8px 6px", marginBottom: 6, textAlign: "center" }}>
        <div style={{ fontSize: 6, color: "#999", marginBottom: 2 }}>[ total savings ]</div>
        <div style={{ fontSize: 14, color: "#666", fontWeight: 700 }}>£ ____.__</div>
        <div style={{ fontSize: 6, color: "#999", marginTop: 2 }}>[ interest rate badge ]</div>
      </div>
      {/* goal cards */}
      {["Holiday Fund", "Emergency"].map((g) => (
        <div key={g} style={{ border: "1.5px dashed #aaa", borderRadius: 4, padding: "5px 6px",
          marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 22, height: 22, border: "1px dashed #aaa", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, color: "#999" }}>%</span>
          </div>
          <div>
            <div style={{ fontSize: 7, color: "#666", fontWeight: 600 }}>{g}</div>
            <div style={{ height: 4, background: "#ddd", borderRadius: 2, width: 50, marginTop: 2 }} />
          </div>
        </div>
      ))}
      {/* add button */}
      <div style={{ border: "1.5px dashed #aaa", borderRadius: 4, padding: "5px",
        textAlign: "center", marginTop: 4 }}>
        <span style={{ fontSize: 7, color: "#999" }}>+ Add Goal</span>
      </div>
      {/* nav bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
        borderTop: "1px dashed #ccc", display: "flex", justifyContent: "space-around", padding: "5px 0",
        background: CREAM }}>
        {["Home", "Goals", "Transfer"].map((n) => (
          <span key={n} style={{ fontSize: 6, color: "#aaa" }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function LowFiScreen() {
  return (
    <div style={{ padding: "0 10px", background: "white", height: "100%" }}>
      {/* header */}
      <div style={{ background: "#f5f5f5", borderRadius: 4, padding: "5px 6px",
        marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 32, height: 8, background: "#ccc", borderRadius: 2 }} />
        <div style={{ width: 16, height: 8, background: "#ccc", borderRadius: "50%" }} />
      </div>
      {/* balance */}
      <div style={{ background: "#efefef", borderRadius: 8, padding: "10px", marginBottom: 6 }}>
        <div style={{ width: 50, height: 5, background: "#ccc", borderRadius: 2, marginBottom: 5 }} />
        <div style={{ width: 80, height: 14, background: "#bbb", borderRadius: 2, marginBottom: 4 }} />
        <div style={{ width: 40, height: 5, background: "#ccc", borderRadius: 2 }} />
      </div>
      {/* goal cards */}
      {[70, 40].map((w, i) => (
        <div key={i} style={{ background: "#f8f8f8", borderRadius: 6, padding: "7px",
          marginBottom: 5, display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 24, height: 24, background: "#ddd", borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: `${w}%`, height: 5, background: "#ccc", borderRadius: 2, marginBottom: 4 }} />
            <div style={{ height: 4, background: "#e8e8e8", borderRadius: 2, marginBottom: 2 }}>
              <div style={{ width: `${[55, 30][i]}%`, height: "100%", background: "#bbb", borderRadius: 2 }} />
            </div>
          </div>
        </div>
      ))}
      {/* CTA */}
      <div style={{ background: "#ddd", borderRadius: 4, padding: "6px", textAlign: "center" }}>
        <div style={{ width: 60, height: 6, background: "#bbb", borderRadius: 2, margin: "0 auto" }} />
      </div>
      {/* nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid #eee",
        display: "flex", justifyContent: "space-around", padding: "6px 0" }}>
        {[28, 22, 28, 20].map((w, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: 10, height: 10, background: "#ccc", borderRadius: 2 }} />
            <div style={{ width: w, height: 4, background: "#e5e5e5", borderRadius: 2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MidFiScreen() {
  return (
    <div style={{ background: LBLUE, height: "100%", padding: "0 10px" }}>
      {/* header */}
      <div style={{ background: BLUE, borderRadius: 4, padding: "5px 6px",
        marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>spring</span>
        <div style={{ width: 16, height: 16, borderRadius: "50%",
          background: "rgba(255,255,255,0.3)", border: "1.5px solid rgba(255,255,255,0.5)" }} />
      </div>
      {/* balance card */}
      <div style={{ background: "white", borderRadius: 8, padding: "10px",
        marginBottom: 6, border: `1.5px solid ${BLUE}30` }}>
        <div style={{ color: DBLUE, fontSize: 6, marginBottom: 3 }}>Total Balance</div>
        <div style={{ color: BLUE, fontSize: 14, fontWeight: 800 }}>£12,450.00</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <div style={{ background: `${BLUE}20`, padding: "1px 5px", borderRadius: 2 }}>
            <span style={{ color: BLUE, fontSize: 6, fontWeight: 700 }}>4.30% AER</span>
          </div>
        </div>
      </div>
      {/* Open Banking flow */}
      <div style={{ background: "white", borderRadius: 6, padding: "7px",
        marginBottom: 5, border: `1px solid ${BLUE}20` }}>
        <div style={{ color: DBLUE, fontSize: 6, fontWeight: 700, marginBottom: 4 }}>
          Open Banking — Link Bank
        </div>
        {["Barclays ✓", "Lloyds", "NatWest"].map((b, i) => (
          <div key={b} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "3px 0", borderBottom: i < 2 ? `1px solid ${BLUE}12` : "none" }}>
            <span style={{ fontSize: 6.5, color: i === 0 ? BLUE : `${NAVY}60` }}>{b}</span>
            {i === 0 && <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE }} />}
          </div>
        ))}
      </div>
      {/* goal */}
      <div style={{ background: "white", borderRadius: 6, padding: "7px",
        border: `1px solid ${BLUE}20`, display: "flex", gap: 6, alignItems: "center" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${BLUE}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: BLUE, fontSize: 8, fontWeight: 700 }}>63%</span>
        </div>
        <div>
          <div style={{ color: DBLUE, fontSize: 7, fontWeight: 700 }}>Adventure weekend</div>
          <div style={{ color: `${NAVY}50`, fontSize: 6 }}>£1,098 of £2,000</div>
        </div>
      </div>
    </div>
  );
}

function HiFiScreen() {
  return (
    <div style={{ background: CREAM, height: "100%", padding: "0 10px" }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "6px 0 4px" }}>
        <img src={springLogo} alt="Spring Savings Logo" style={{ height: 20, width: "auto" }} />
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: PEACH,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10 }}>🐾</span>
        </div>
      </div>
      {/* balance card */}
      <div style={{ background: PEACH, borderRadius: 12, padding: "10px",
        marginBottom: 6, position: "relative", overflow: "hidden" }}>
        <div style={{ color: NAVY, fontSize: 6, marginBottom: 2, opacity: 0.7 }}>
          Easy Saver · 4.30% AER
        </div>
        <div style={{ color: NAVY, fontSize: 15, fontWeight: 800 }}>£12,450.00</div>
        <div style={{ color: `${NAVY}70`, fontSize: 6, marginTop: 2 }}>
          +£44.83 interest this month
        </div>
        <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}>
          <Ring pct={63} size={44} />
        </div>
      </div>
      {/* goal card */}
      <div style={{ background: "white", borderRadius: 10, padding: "8px",
        marginBottom: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div>
            <div style={{ color: NAVY, fontSize: 7.5, fontWeight: 700 }}>Adventure weekend</div>
            <div style={{ color: `${NAVY}55`, fontSize: 6 }}>£1,098.27 of £2,000</div>
          </div>
          <Ring pct={63} size={34} />
        </div>
        <div style={{ height: 4, background: "#f0e8e0", borderRadius: 2 }}>
          <div style={{ width: "63%", height: "100%", background: CORAL, borderRadius: 2 }} />
        </div>
      </div>
      {/* action buttons */}
      <div style={{ display: "flex", gap: 5 }}>
        {["Add", "Transfer", "Goals"].map((a) => (
          <div key={a} style={{ flex: 1, background: a === "Add" ? CORAL : `${CORAL}15`,
            borderRadius: 6, padding: "5px 0", textAlign: "center" }}>
            <span style={{ color: a === "Add" ? "white" : CORAL, fontSize: 7, fontWeight: 700 }}>{a}</span>
          </div>
        ))}
      </div>
      {/* mascot */}
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span style={{ fontSize: 22 }}>🐕</span>
        <div style={{ color: `${NAVY}50`, fontSize: 5.5, marginTop: 2 }}>
          Your helpful savings companion
        </div>
      </div>
    </div>
  );
}

/* ── OOH bus-stop ad mockup ── */
function BusStop() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 0,
        padding: "20px 0 0",
      }}
    >
      {/* frame */}
      <div
        style={{
          width: "min(320px, 90vw)",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          border: "8px solid #222",
        }}
      >
        {/* red top bar */}
        <div style={{ background: "#CC0000", padding: "5px 12px", textAlign: "center" }}>
          <span style={{ color: "white", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em" }}>
            Holborn Circus / Fetter Lane
          </span>
        </div>
        {/* ad panel */}
        <div
          style={{
            background: `linear-gradient(160deg, #F5E8D8 0%, ${PEACH} 60%, #FAF0E0 100%)`,
            padding: "24px 20px 16px",
          }}
        >
          <h3
            style={{
              color: NAVY,
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 12,
              maxWidth: 200,
            }}
          >
            Your savings account is missing something.{" "}
            <span style={{ color: NAVY }}>A dog.</span>
          </h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 14 }}>
            {/* mini phone */}
            <div
              style={{
                width: 70,
                background: CREAM,
                borderRadius: 12,
                padding: "6px 6px 8px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                border: "2px solid rgba(0,0,0,0.08)",
                flexShrink: 0,
              }}
            >
              <div style={{ textAlign: "center", fontSize: 7, color: `${NAVY}70`, marginBottom: 3 }}>
                Adventure weekend
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
                <Ring pct={63} size={36} />
              </div>
              <div style={{ textAlign: "center", fontSize: 6, color: `${NAVY}60` }}>
                £1,098.27
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 5 }}>
                {["Add", "Transfer"].map((b) => (
                  <div key={b} style={{ background: CORAL, borderRadius: 3, padding: "2px 4px" }}>
                    <span style={{ color: "white", fontSize: 5.5, fontWeight: 700 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* mascot */}
            <div style={{ fontSize: 56, lineHeight: 1 }}>🐕</div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.12)",
              paddingTop: 12,
            }}
          >
            <p
              style={{
                color: NAVY,
                fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                fontWeight: 900,
                marginBottom: 2,
              }}
            >
              Fetch 4.30% AER*
            </p>
            <p style={{ color: `${NAVY}60`, fontSize: 10, marginBottom: 8 }}>
              spring-savings.co.uk
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  color: NAVY,
                  fontSize: 18,
                  fontWeight: 700,
                  fontStyle: "italic",
                }}
              >
                spring
              </span>
              <div
                style={{
                  background: "rgba(0,0,0,0.08)",
                  borderRadius: 4,
                  padding: "3px 6px",
                  fontSize: 8,
                  color: `${NAVY}80`,
                }}
              >
                FSCS Protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── main ── */
export default function SpringSavingsCaseStudy({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(4);
  const [tab, setTab] = useState<"problem" | "process" | "results">("problem");
  const { isProtected, verifyPassword } = usePasswordProtection();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const phases = [
    { n: 1 as const, label: "Hand Sketches", sub: "Rapid ideation" },
    { n: 2 as const, label: "Low-Fi", sub: "Structure & hierarchy" },
    { n: 3 as const, label: "Mid-Fi Blue", sub: "Interaction patterns" },
    { n: 4 as const, label: "Hi-Fi Brand", sub: "Final product" },
  ];

  const phaseScreen = {
    1: <SketchScreen />,
    2: <LowFiScreen />,
    3: <MidFiScreen />,
    4: <HiFiScreen />,
  };

  const phaseBg: Record<number, string> = {
    1: CREAM,
    2: "white",
    3: LBLUE,
    4: CREAM,
  };

  const phaseBorder: Record<number, string> = {
    1: "rgba(0,0,0,0.12)",
    2: "#ddd",
    3: BLUE,
    4: `${CORAL}60`,
  };

  if (isProtected) {
    return <PasswordModal onSubmit={verifyPassword} onClose={onClose} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: CREAM, fontFamily: "system-ui, sans-serif" }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-none"
        style={{
          background: NAVY,
          color: "white",
          borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(145deg, ${CREAM} 0%, #F5DEC8 50%, ${PEACH} 100%)`,
          padding: "72px 24px 48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="lg:px-16"
      >
        {/* Decorative circle */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `${CORAL}10`,
            top: -120,
            right: -100,
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <span
              style={{
                fontFamily: "Georgia, serif",
                color: NAVY,
                fontSize: 26,
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              spring
            </span>
            <span
              style={{
                color: `${NAVY}50`,
                fontSize: 12,
                fontWeight: 500,
                borderLeft: `1px solid ${NAVY}30`,
                paddingLeft: 10,
              }}
            >
              by Paragon Bank
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Text */}
            <div style={{ flex: 1 }}>
              <span
                style={{
                  color: CORAL,
                  fontSize: 11,
                  letterSpacing: "0.35em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                OutSystems Project; Banking; 2024-2025
              </span>
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  color: NAVY,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  marginBottom: 18,
                }}
              >
                Spring Savings —{" "}
                <span style={{ color: CORAL }}>Disrupting</span> the UK Savings
                Market
              </h1>
              <p
                style={{
                  color: `${NAVY}70`,
                  fontSize: 16,
                  lineHeight: 1.7,
                  maxWidth: 480,
                  marginBottom: 32,
                }}
              >
                A mobile-first savings companion helping UK consumers unlock
                high-yield interest through effortless Open Banking integration —
                and a Spaniel called Spring.
              </p>

              {/* Meta pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                {[
                  ["Role", "Senior Lead UX/UI Designer"],
                  ["Platform", "iOS & Android · OutSystems"],
                  ["Award", "OutSystems Innovation Award 2025"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(255,255,255,0.65)",
                      border: `1px solid ${NAVY}12`,
                      borderRadius: 8,
                      padding: "8px 14px",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      style={{
                        color: CORAL,
                        fontSize: 9,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ color: NAVY, fontSize: 12, fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>

            </div>

            {/* Hero mascot */}
            <div className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0">
              <img src={springMascot} alt="Spring Savings Mascot - Spaniel Dog" style={{ maxWidth: 350, width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW TABS ── */}
      <section style={{ background: "white" }} className="px-6 lg:px-16 py-14">
        <div className="max-w-5xl mx-auto">
          {/* Tab switcher */}
          <div
            style={{
              display: "flex",
              background: "#f4f0ec",
              borderRadius: 9999,
              padding: 4,
              width: "fit-content",
              margin: "0 auto 48px",
              gap: 2,
            }}
          >
            {[
              { key: "problem" as const, label: "The Problem" },
              { key: "process" as const, label: "Design Process" },
              { key: "results" as const, label: "Impact & Awards" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="transition-all duration-200 focus-visible:outline-none"
                style={{
                  padding: "10px 22px",
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 600,
                  background: tab === key ? NAVY : "transparent",
                  color: tab === key ? "white" : `${NAVY}60`,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Problem */}
          {tab === "problem" && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                    color: NAVY,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: 14,
                  }}
                >
                  UK savers lose{" "}
                  <span style={{ color: CORAL }}>£24 billion</span> in interest
                  every year.
                </h2>
                <p style={{ color: `${NAVY}70`, lineHeight: 1.75, marginBottom: 14, fontSize: 15 }}>
                  Complex account-opening journeys, fear of switching banks, and
                  a lack of goal-visibility tools mean 55% of UK adults leave
                  their money in low or zero-interest accounts.
                </p>
                <p style={{ color: `${NAVY}70`, lineHeight: 1.75, fontSize: 15 }}>
                  Paragon Bank needed a challenger experience: frictionless
                  Open Banking onboarding, instant transfers, and a companion
                  that made saving feel natural — not bureaucratic.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: PiggyBank, text: "£660B+ sitting in low or zero-interest accounts across the UK" },
                  { icon: Users, text: "29 million adults affected — 55% of the adult population" },
                  { icon: TrendingUp, text: "£24B in annual interest missed due to account-switching friction" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      background: `${CORAL}08`,
                      border: `1px solid ${CORAL}18`,
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: `${CORAL}18`,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} color={CORAL} />
                    </div>
                    <p style={{ color: NAVY, fontSize: 14, lineHeight: 1.55 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          {tab === "process" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  phase: "01",
                  title: "Research",
                  items: [
                    "15 user interviews (multi-demographic)",
                    "Competitive savings app audit",
                    "Open Banking API feasibility study",
                    "WCAG AA accessibility mapping",
                  ],
                },
                {
                  phase: "02",
                  title: "Design",
                  items: [
                    "Sketch → Low-Fi → Mid-Fi → Hi-Fi",
                    "Spring brand identity system",
                    "Mascot & tone-of-voice design",
                    "Goal-setting interaction patterns",
                  ],
                },
                {
                  phase: "03",
                  title: "Validate",
                  items: [
                    "15 moderated usability sessions",
                    "Open Banking linking friction fix",
                    "A/B tested onboarding flows",
                    "Cross-platform iOS & Android QA",
                  ],
                },
              ].map(({ phase, title, items }) => (
                <div
                  key={phase}
                  style={{
                    border: `2px solid ${CORAL}18`,
                    borderRadius: 14,
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      color: CORAL,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.3em",
                      marginBottom: 8,
                    }}
                  >
                    {phase}
                  </div>
                  <h3
                    style={{
                      color: NAVY,
                      fontWeight: 800,
                      fontSize: 18,
                      marginBottom: 16,
                    }}
                  >
                    {title}
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <CheckCircle size={13} color={CORAL} style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ color: `${NAVY}70`, fontSize: 13 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {tab === "results" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="grid lg:grid-cols-3 gap-5">
                {[
                  { val: "£500M+", lbl: "Deposit balance reached in record time" },
                  { val: "4.7/5", lbl: "Average Trustpilot rating post-launch" },
                  { val: "6-mo", lbl: "Business growth target hit ahead of schedule" },
                ].map(({ val, lbl }) => (
                  <div
                    key={val}
                    style={{
                      background: NAVY,
                      borderRadius: 14,
                      padding: "28px 20px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 900,
                        color: CORAL,
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {val}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>
                      {lbl}
                    </p>
                  </div>
                ))}
              </div>
              {/* Award */}
              <div
                style={{
                  background: `${CORAL}10`,
                  border: `2px solid ${CORAL}30`,
                  borderRadius: 14,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <Award size={36} color={CORAL} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ color: NAVY, fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                    OutSystems Innovation Award 2025
                  </div>
                  <p style={{ color: `${NAVY}70`, fontSize: 14 }}>
                    Recognised for cutting-edge cloud-based API functionality and
                    state-of-the-art financial crime prevention capability.
                  </p>
                </div>
              </div>
              {/* Quote */}
              <div
                style={{
                  borderLeft: `4px solid ${CORAL}`,
                  paddingLeft: 20,
                  margin: "4px 0",
                }}
              >
                <MessageSquare
                  size={16}
                  color={CORAL}
                  style={{ marginBottom: 8 }}
                />
                <p
                  style={{
                    color: NAVY,
                    fontSize: 18,
                    fontStyle: "italic",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    marginBottom: 8,
                  }}
                >
                  "This 4.3% savings account is such a game changer — I can
                  actually see my money growing and the dog is adorable."
                </p>
                <span style={{ color: `${NAVY}50`, fontSize: 13 }}>
                  — Verified Trustpilot Review
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── DESIGN EVOLUTION ── */}
      <section
        style={{ background: NAVY }}
        className="px-6 lg:px-16 py-14"
      >
        <div className="max-w-6xl mx-auto">
          <span
            style={{
              color: CORAL,
              fontSize: 11,
              letterSpacing: "0.35em",
              fontWeight: 700,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            Design Evolution
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "white",
              fontWeight: 800,
              marginBottom: 36,
              lineHeight: 1.15,
            }}
          >
            From sketch to{" "}
            <span style={{ color: CORAL }}>Spring.</span>
          </h2>

          {/* Phase tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 36,
              flexWrap: "wrap",
            }}
          >
            {phases.map(({ n, label, sub }) => (
              <button
                key={n}
                onClick={() => setPhase(n)}
                className="transition-all duration-200 focus-visible:outline-none text-left"
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  background:
                    phase === n ? CORAL : "rgba(255,255,255,0.07)",
                  border: `1px solid ${phase === n ? CORAL : "rgba(255,255,255,0.12)"}`,
                  flex: "1 1 auto",
                  minWidth: 120,
                }}
              >
                <div
                  style={{
                    color: phase === n ? "white" : "rgba(255,255,255,0.4)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    marginBottom: 3,
                  }}
                >
                  {n}.
                </div>
                <div
                  style={{
                    color: phase === n ? "white" : "rgba(255,255,255,0.7)",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    color: phase === n ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
                    fontSize: 11,
                  }}
                >
                  {sub}
                </div>
              </button>
            ))}
          </div>

          {/* Phase content */}
          <div
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Phone / Mockup */}
            <div className="flex-shrink-0">
              {phase === 4 ? (
                <img src={springMockup} alt="Spring Savings Hi-Fi Mockup" style={{ maxWidth: 400, width: "100%", height: "auto" }} />
              ) : phase === 3 ? (
                <Phone bg={phaseBg[phase]} border={phaseBorder[phase]}>
                  <img src={springMidFiScreen} alt="Spring Savings Mid-Fi Screen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Phone>
              ) : phase === 2 ? (
                <Phone bg={phaseBg[phase]} border={phaseBorder[phase]}>
                  <img src={springDepositsScreen} alt="Spring Savings Deposits Journey" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Phone>
              ) : phase === 1 ? (
                <Phone bg={phaseBg[phase]} border={phaseBorder[phase]}>
                  <img src={springHandSketch} alt="Spring Savings Hand-Drawn Sketch" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Phone>
              ) : (
                <Phone bg={phaseBg[phase]} border={phaseBorder[phase]}>
                  {phaseScreen[phase]}
                </Phone>
              )}
            </div>

            {/* Phase description */}
            <div style={{ flex: 1 }}>
              {phase === 1 && (
                <>
                  <h3
                    style={{ color: "white", fontWeight: 700, fontSize: 20, marginBottom: 12 }}
                  >
                    Hand-Drawn Sketches
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16, fontSize: 15 }}>
                    Rapid ideation sessions to map the onboarding funnel,
                    goal-setting screens, and instant transfer flows. Focus on
                    navigating the core user mental model before touching any
                    tool.
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Onboarding funnel mapping", "Goal creation flow", "Transfer & balance overview"].map((i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: CORAL, flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{i}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {phase === 2 && (
                <>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
                    Low-Fidelity Wireframes
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16, fontSize: 15 }}>
                    Structural layouts establishing information hierarchy, navigation
                    architecture, and accessibility patterns before adding visual
                    identity. Zero colour bias at this stage.
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Content hierarchy defined", "WCAG AA layout audit", "Component inventory mapped", "Navigation architecture"].map((i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: CORAL, flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{i}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {phase === 3 && (
                <>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
                    Mid-Fidelity — Blueprint Phase
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16, fontSize: 15 }}>
                    Blueprint blue palette introduced to contrast the structural phase
                    with final branding. Open Banking API connection flow, functional
                    components, and interaction states defined.
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Open Banking API flow", "Bank-linking interaction states", "Micro-copy for consent screens", "Error & loading states"].map((i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: CORAL, flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{i}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {phase === 4 && (
                <>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
                    Hi-Fi — Spring Brand Applied
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16, fontSize: 15 }}>
                    Full Spring identity: warm peach tones, circular progress rings, Open
                    Banking transfer flows, and the Spaniel mascot — your helpful savings
                    companion.
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "Peach / cream brand palette",
                      "Circular savings goal progress rings",
                      "Spring mascot integration",
                      "One-tap Open Banking transfers",
                      "4.30% AER rate badge",
                    ].map((i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle size={13} color={CORAL} style={{ flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{i}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── USER TESTING ── */}
      <section style={{ background: "white" }} className="px-6 lg:px-16 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span
                style={{
                  color: CORAL,
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                User Testing
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  color: NAVY,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                15 real savers. One critical friction point.
              </h2>
              <p style={{ color: `${NAVY}70`, lineHeight: 1.75, fontSize: 15, marginBottom: 14 }}>
                Moderated usability sessions with participants aged 24–61
                revealed that Open Banking bank-account linking was the primary
                drop-off point — users lacked confidence in the consent screen
                and didn't understand what data was being shared.
              </p>
              <div
                style={{
                  background: `${CORAL}10`,
                  border: `1.5px solid ${CORAL}25`,
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Zap size={16} color={CORAL} />
                  <span style={{ color: NAVY, fontWeight: 700, fontSize: 14 }}>
                    Key Insight → Fix Applied
                  </span>
                </div>
                <p style={{ color: `${NAVY}70`, fontSize: 14, lineHeight: 1.6 }}>
                  Introduced plain-English Open Banking micro-copy and an
                  instant consent confirmation toast — reducing linking
                  abandonment by{" "}
                  <strong style={{ color: CORAL }}>68%</strong> in the next
                  test round.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: ShieldCheck, title: "WCAG AA throughout", desc: "Every screen validated at AA contrast level, with screen-reader annotations across all interactive elements." },
                { icon: Users, title: "Multi-demographic testing", desc: "Savers aged 24–61 across income brackets to ensure the product works for everyone, not just digital natives." },
                { icon: Zap, title: "Iterative fast cycles", desc: "3-day test → fix → retest loops kept the team moving at startup speed within a regulated banking context." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "14px 16px",
                    background: `${CORAL}06`,
                    borderRadius: 12,
                    border: `1px solid ${CORAL}14`,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: `${CORAL}16`,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color={CORAL} />
                  </div>
                  <div>
                    <div style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                      {title}
                    </div>
                    <p style={{ color: `${NAVY}60`, fontSize: 13, lineHeight: 1.55 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS FOOTER ── */}
      <section
        style={{ background: NAVY }}
        className="px-6 lg:px-16 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span
            style={{
              color: CORAL,
              fontSize: 11,
              letterSpacing: "0.35em",
              fontWeight: 700,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 14,
            }}
          >
            Business Impact
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "white",
              fontWeight: 800,
              marginBottom: 52,
              lineHeight: 1.15,
            }}
          >
            6-month target.{" "}
            <span style={{ color: CORAL }}>Record time.</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              marginBottom: 52,
            }}
          >
            {[
              { val: "£500M+", lbl: "Deposit balance hit ahead of schedule" },
              { val: "4.7/5", lbl: "Trustpilot score at launch" },
              { val: "#1", lbl: "OutSystems Innovation Award 2025" },
            ].map(({ val, lbl }) => (
              <div
                key={val}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${CORAL}30`,
                  borderRadius: 14,
                  padding: "28px 16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: CORAL,
                  }}
                  aria-hidden="true"
                />
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: CORAL,
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {val}
                </div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.5 }}>
                  {lbl}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="focus-visible:outline-white transition-all hover:opacity-90"
            style={{
              background: CORAL,
              color: "white",
              padding: "14px 36px",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 4,
            }}
          >
            Back to Portfolio <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
