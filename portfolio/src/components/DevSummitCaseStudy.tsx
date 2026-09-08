import { useState, useEffect } from "react";
import {
  X, Palette, Globe, Printer, CheckCircle,
  ArrowRight, Code, Users, Calendar, Ticket,
} from "lucide-react";
import { usePasswordProtection } from "../hooks/usePasswordProtection";
import PasswordModal from "./PasswordModal";

const OG = "#FF5500";
const BK = "#0D0D0D";
const DK = "#1A1A1A";

/* ── primitives ── */

function Stripe({ h = 4 }: { h?: number }) {
  return <div style={{ height: h, background: OG, flexShrink: 0 }} />;
}

function Logo({
  fontSize = "inherit",
  onDark = true,
}: {
  fontSize?: string | number;
  onDark?: boolean;
}) {
  const dim = onDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";
  const body = onDark ? "white" : BK;
  return (
    <span style={{ fontFamily: "monospace", fontSize, fontWeight: 900, lineHeight: 1 }}>
      <span style={{ color: dim }}>{"<"}</span>
      <span style={{ color: OG }}>DEV</span>
      <span style={{ color: body }}>summit</span>
      <span style={{ color: dim }}>{"/>"}</span>
    </span>
  );
}

/* ── browser-frame website mockup ── */
function WebsiteMockup() {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          background: "#252525",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
            <div
              key={i}
              style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#181818",
            borderRadius: 4,
            padding: "3px 10px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>
            devsummit.pt
          </span>
        </div>
      </div>

      {/* Site content */}
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        {/* Nav */}
        <div
          style={{
            background: BK,
            padding: "8px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${OG}25`,
          }}
        >
          <Logo fontSize={9} onDark />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {["Speakers", "Schedule", "Venue"].map((n) => (
              <span key={n} style={{ color: "rgba(255,255,255,0.45)", fontSize: 7 }}>
                {n}
              </span>
            ))}
            <div style={{ background: OG, padding: "3px 8px" }}>
              <span style={{ color: BK, fontSize: 7, fontWeight: 800 }}>
                Buy Tickets
              </span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            background: `linear-gradient(120deg, ${BK} 55%, #2a0d00 100%)`,
            padding: "22px 14px 20px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, transparent 60%, ${OG}14)`,
            }}
            aria-hidden="true"
          />
          <div style={{ position: "relative" }}>
            <Logo fontSize={18} onDark />
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 7,
                marginTop: 4,
                marginBottom: 12,
              }}
            >
              Liberta o teu código
            </p>
            <div style={{ background: OG, display: "inline-block", padding: "4px 14px" }}>
              <span style={{ color: BK, fontSize: 7, fontWeight: 800 }}>
                Comprar Bilhete →
              </span>
            </div>
          </div>
        </div>

        <Stripe h={3} />

        {/* Speakers */}
        <div style={{ background: "white", padding: "10px 14px" }}>
          <div
            style={{
              fontSize: 8,
              fontWeight: 800,
              fontFamily: "monospace",
              marginBottom: 7,
            }}
          >
            <span style={{ color: "rgba(0,0,0,0.25)" }}>{"// "}</span>
            <span style={{ color: OG }}>speakers</span>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5 }}
          >
            {["Ana M.", "Bruno R.", "Carla P.", "Diego S."].map((n, i) => (
              <div
                key={n}
                style={{ borderTop: `2px solid ${OG}`, paddingTop: 5 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: `${OG}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 3,
                  }}
                >
                  <span style={{ color: OG, fontSize: 8, fontWeight: 700 }}>
                    {n[0]}
                  </span>
                </div>
                <div style={{ color: BK, fontSize: 7, fontWeight: 700 }}>{n}</div>
                <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 6 }}>
                  {["AI & ML", "DevOps", "Frontend", "Backend"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div style={{ background: DK, padding: "10px 14px" }}>
          <div
            style={{
              color: OG,
              fontSize: 8,
              fontFamily: "monospace",
              fontWeight: 700,
              marginBottom: 7,
            }}
          >
            {"// schedule"}
          </div>
          {[
            ["09:00", "Opening Keynote", true],
            ["11:00", "Workshop: AI Dev Tools", false],
            ["14:00", "Panel: Future of Dev", false],
            ["17:00", "Networking & Demos", false],
          ].map(([t, title, active]) => (
            <div
              key={String(t)}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "4px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                style={{
                  color: active ? OG : "rgba(255,255,255,0.3)",
                  fontSize: 7,
                  fontFamily: "monospace",
                  width: 30,
                  flexShrink: 0,
                }}
              >
                {t}
              </span>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: active ? OG : "rgba(255,255,255,0.15)",
                  boxShadow: active ? `0 0 6px ${OG}` : "none",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: active ? "white" : "rgba(255,255,255,0.4)",
                  fontSize: 7,
                }}
              >
                {String(title)}
              </span>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div
          style={{
            background: OG,
            padding: "8px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: BK, fontSize: 8, fontWeight: 900 }}>
            Ready to level up your code?
          </span>
          <div style={{ background: BK, padding: "3px 9px" }}>
            <span style={{ color: OG, fontSize: 7, fontWeight: 800 }}>
              COMPRAR BILHETE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── badge / lanyard mockup ── */
function Badge({ back = false }: { back?: boolean }) {
  return (
    <div style={{ width: 126, flexShrink: 0 }}>
      {/* Lanyard strap */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 2, height: 32, background: OG }} />
      </div>
      {/* Clip trapezoid */}
      <div
        style={{
          width: 44,
          height: 10,
          background: OG,
          margin: "0 auto -1px",
          clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)",
        }}
      />
      {/* Card face */}
      {!back ? (
        <div
          style={{
            background: BK,
            border: `2px solid ${OG}`,
            borderRadius: "0 0 5px 5px",
            overflow: "hidden",
          }}
        >
          <div style={{ background: OG, padding: "6px 8px" }}>
            <Logo fontSize={8} onDark={false} />
          </div>
          <div style={{ padding: "8px", textAlign: "center" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: `${OG}20`,
                border: `1.5px solid ${OG}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 5px",
              }}
            >
              <span style={{ color: OG, fontSize: 10, fontWeight: 700 }}>JS</span>
            </div>
            <div
              style={{ color: "white", fontSize: 8, fontWeight: 700, marginBottom: 1 }}
            >
              Joana Sardinha
            </div>
            <div
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 6, marginBottom: 7 }}
            >
              Lead Designer
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
              {["VIP", "Speaker", "All Access"].map((t) => (
                <div key={t} style={{ background: OG, padding: "1px 4px", borderRadius: 2 }}>
                  <span style={{ color: BK, fontSize: 5.5, fontWeight: 800 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              borderTop: `1px solid ${OG}28`,
              padding: "4px 8px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.22)",
                fontSize: 5.5,
                fontFamily: "monospace",
              }}
            >
              devsummit.pt · 2024
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "white",
            border: `2px solid ${OG}`,
            borderRadius: "0 0 5px 5px",
            padding: 8,
          }}
        >
          <div
            style={{
              color: OG,
              fontSize: 7,
              fontFamily: "monospace",
              fontWeight: 700,
              marginBottom: 5,
            }}
          >
            {"// schedule"}
          </div>
          {[
            ["09:00", "Opening Keynote"],
            ["11:00", "AI Workshop"],
            ["14:00", "Dev Panel"],
            ["17:00", "Networking"],
          ].map(([t, s]) => (
            <div
              key={t}
              style={{
                display: "flex",
                gap: 5,
                padding: "2.5px 0",
                borderBottom: `1px solid ${OG}15`,
              }}
            >
              <span
                style={{
                  color: OG,
                  fontSize: 6,
                  fontFamily: "monospace",
                  width: 26,
                  flexShrink: 0,
                }}
              >
                {t}
              </span>
              <span style={{ color: "rgba(0,0,0,0.55)", fontSize: 6 }}>{s}</span>
            </div>
          ))}
          <div
            style={{
              marginTop: 6,
              paddingTop: 5,
              borderTop: `1px solid ${OG}18`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "rgba(0,0,0,0.28)",
                fontSize: 5.5,
                fontFamily: "monospace",
              }}
            >
              WiFi: devsummit · code2024
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── billboard mockup ── */
function Billboard() {
  return (
    <div
      style={{
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        position: "relative",
      }}
    >
      <div
        style={{
          background: BK,
          padding: "28px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 140,
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
            height: 5,
            background: OG,
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: OG,
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute",
            right: 36,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "monospace",
            fontSize: 100,
            color: OG,
            opacity: 0.07,
            lineHeight: 1,
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          {"{}"}
        </div>
        <div style={{ position: "relative" }}>
          <Logo fontSize="clamp(1.4rem, 3vw, 2.4rem)" onDark />
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "clamp(0.55rem, 1.1vw, 0.75rem)",
              marginTop: 6,
              marginBottom: 12,
            }}
          >
            Liberta o teu código · 15 Março 2024 · Lisboa
          </p>
          <div
            style={{
              background: OG,
              display: "inline-block",
              padding: "5px 16px",
            }}
          >
            <span
              style={{
                color: BK,
                fontWeight: 800,
                fontSize: "clamp(0.5rem, 0.9vw, 0.7rem)",
                letterSpacing: "0.08em",
              }}
            >
              devsummit.pt
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── main component ── */
export default function DevSummitCaseStudy({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"brand" | "digital" | "physical">("brand");
  const { isProtected, verifyPassword } = usePasswordProtection();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const tabs = [
    { key: "brand" as const, label: "Brand System", icon: Palette },
    { key: "digital" as const, label: "Digital Experience", icon: Globe },
    { key: "physical" as const, label: "Physical Collateral", icon: Printer },
  ];

  if (isProtected) {
    return <PasswordModal onSubmit={verifyPassword} onClose={onClose} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: BK, fontFamily: "system-ui, sans-serif" }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-white"
        style={{
          background: "rgba(255,255,255,0.1)",
          color: "white",
          borderRadius: "50%",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${BK} 60%, #1f0800 100%)`,
          padding: "72px 24px 48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="lg:px-16"
      >
        {/* Code bg decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 40px",
            opacity: 0.04,
            fontFamily: "monospace",
            fontSize: 11,
            color: OG,
            lineHeight: 2,
            userSelect: "none",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          {[
            "const summit = {",
            '  name: "DEV Summit",',
            '  year: 2024,',
            '  city: "Lisboa",',
            "  attendees: 1200,",
            '  vibe: "electric",',
            "};",
            "",
            "function buildExperience() {",
            "  return design + code;",
            "}",
          ].map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Label */}
          <span
            style={{
              color: OG,
              fontSize: 11,
              letterSpacing: "0.35em",
              fontWeight: 700,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 24,
              fontFamily: "monospace",
            }}
          >
            {"// case_study · 2024"}
          </span>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Text */}
            <div style={{ flex: 1 }}>
              {/* Logo hero */}
              <div style={{ marginBottom: 20 }}>
                <Logo fontSize="clamp(2.8rem, 6vw, 5rem)" onDark />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 17,
                  lineHeight: 1.65,
                  maxWidth: 480,
                  marginBottom: 32,
                }}
              >
                Crafting a complete brand identity, digital event experience, and
                physical collateral for a flagship developer summit — from badge to
                billboard.
              </p>

              {/* Meta */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  ["Role", "Lead Brand & UX/UI Designer"],
                  ["Scope", "Brand · Web · Print · Signage"],
                  ["Timeline", "2 Months"],
                  ["Client", "PHC Software"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "8px 14px",
                    }}
                  >
                    <div
                      style={{
                        color: OG,
                        fontSize: 9,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge preview */}
            <div
              className="hidden lg:flex items-end gap-8 flex-shrink-0"
              style={{ paddingBottom: 8 }}
            >
              <Badge back={false} />
              <Badge back={true} />
            </div>
          </div>
        </div>
      </section>

      <Stripe />

      {/* ── CHALLENGE ── */}
      <section
        style={{ background: DK }}
        className="px-6 lg:px-16 py-14"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              style={{
                color: OG,
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                marginBottom: 14,
              }}
            >
              {"// the_challenge"}
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                color: "white",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              One event. One brand.{" "}
              <span style={{ color: OG }}>Zero compromise.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: 15 }}>
              Launching a premier tech summit for developers, engineers, and tech
              leads required a brand that felt as native to a terminal as it did on
              a street billboard — energetic, credible, and unmistakably developer.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: Code,
                text: "Brand needed to speak fluently to a developer audience",
              },
              {
                icon: Users,
                text: "1,200+ attendees across a two-day on-site event",
              },
              {
                icon: Calendar,
                text: "2-month end-to-end delivery: identity → web → print",
              },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: 16,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    background: `${OG}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} color={OG} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.5 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stripe />

      {/* ── INTERACTIVE TABS ── */}
      <section style={{ background: BK }} className="px-6 lg:px-16 py-14">
        <div className="max-w-6xl mx-auto">
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              borderBottom: `2px solid rgba(255,255,255,0.08)`,
              marginBottom: 48,
              gap: 0,
            }}
          >
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="focus-visible:outline-none transition-all duration-200"
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: tab === key ? OG : "rgba(255,255,255,0.35)",
                  borderBottom: tab === key ? `2px solid ${OG}` : "2px solid transparent",
                  marginBottom: -2,
                  background: "transparent",
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          {/* ─ Brand System ─ */}
          {tab === "brand" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {/* Logo section */}
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 16,
                  }}
                >
                  {"// logo_mark"}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div
                    style={{
                      background: BK,
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "32px 24px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Logo fontSize="clamp(1.6rem, 3vw, 2.4rem)" onDark />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      Primary · Dark Background
                    </span>
                  </div>
                  <div
                    style={{
                      background: "white",
                      border: "1px solid rgba(0,0,0,0.08)",
                      padding: "32px 24px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Logo fontSize="clamp(1.6rem, 3vw, 2.4rem)" onDark={false} />
                    <span
                      style={{
                        color: "rgba(0,0,0,0.3)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      Reversed · Light Background
                    </span>
                  </div>
                </div>
              </div>

              {/* Colour palette */}
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 16,
                  }}
                >
                  {"// color_system"}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: "Electric Orange", hex: "#FF5500", bg: OG, text: BK },
                    { name: "Pure Black", hex: "#0D0D0D", bg: BK, text: "white", border: "rgba(255,255,255,0.1)" },
                    { name: "Charcoal", hex: "#1A1A1A", bg: DK, text: "white", border: "rgba(255,255,255,0.08)" },
                    { name: "Crisp White", hex: "#FFFFFF", bg: "white", text: BK },
                  ].map(({ name, hex, bg, text, border }) => (
                    <div
                      key={hex}
                      style={{
                        background: bg,
                        border: border ? `1px solid ${border}` : "none",
                        padding: "24px 16px 14px",
                      }}
                    >
                      <div
                        style={{
                          color: text,
                          fontSize: 12,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {name}
                      </div>
                      <div
                        style={{
                          color: text === "white" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)",
                          fontSize: 10,
                          fontFamily: "monospace",
                        }}
                      >
                        {hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 16,
                  }}
                >
                  {"// typography"}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: 9,
                        marginBottom: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      DISPLAY — BOLD SANS
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      DEV SUMMIT
                    </div>
                    <div
                      style={{
                        color: OG,
                        fontSize: "clamp(1rem, 2vw, 1.6rem)",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginTop: 4,
                      }}
                    >
                      CONFERENCE 2024
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: 9,
                        marginBottom: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      CODE TAG — MONOSPACE
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                        fontWeight: 900,
                        lineHeight: 1.6,
                      }}
                    >
                      <div style={{ color: "rgba(255,255,255,0.25)" }}>
                        {"<DEVsummit/>"}
                      </div>
                      <div style={{ color: OG }}>{"const vibe = 'electric';"}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)" }}>
                        {"// liberta o teu código"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand principles */}
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 16,
                  }}
                >
                  {"// brand_principles"}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {[
                    {
                      label: "High Contrast",
                      desc: "Orange on black. Every surface speaks loudly and clearly — screens, walls, or wristbands.",
                    },
                    {
                      label: "Code-First",
                      desc: "The logo borrows syntax from the world developers live in. The brand feels like it was written, not designed.",
                    },
                    {
                      label: "Event Energy",
                      desc: "Bold type, kinetic layouts, and zero decoration. Pure signal, zero noise.",
                    },
                  ].map(({ label, desc }) => (
                    <div
                      key={label}
                      style={{
                        borderLeft: `3px solid ${OG}`,
                        paddingLeft: 16,
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          fontWeight: 800,
                          fontSize: 15,
                          marginBottom: 8,
                          fontFamily: "monospace",
                        }}
                      >
                        {label}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6 }}>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─ Digital Experience ─ */}
          {tab === "digital" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 20,
                  }}
                >
                  {"// responsive_website · devsummit.pt"}
                </div>
                <WebsiteMockup />
              </div>

              {/* Feature callouts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: Ticket,
                    title: "Ticket Sales CTA",
                    desc: "Persistent orange CTA in the nav and a dedicated hero call-to-action drove 1,200+ ticket sales.",
                  },
                  {
                    icon: Users,
                    title: "Speaker Grid",
                    desc: "Responsive 4-column speaker lineup with topics, timeslots, and social links — easy to scan.",
                  },
                  {
                    icon: Calendar,
                    title: "Live Schedule",
                    desc: "Timeline-style agenda with orange dot indicators and real-time active session highlighting.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: `${OG}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                      }}
                    >
                      <Icon size={16} color={OG} />
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 8,
                      }}
                    >
                      {title}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6 }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─ Physical Collateral ─ */}
          {tab === "physical" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
              {/* Badges */}
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 20,
                  }}
                >
                  {"// event_badges · lanyard_design"}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 48,
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Badge back={false} />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: 10,
                        fontFamily: "monospace",
                        textAlign: "center",
                      }}
                    >
                      Front
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Badge back={true} />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: 10,
                        fontFamily: "monospace",
                        textAlign: "center",
                      }}
                    >
                      Back
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: 16,
                        marginBottom: 10,
                      }}
                    >
                      Event Badges & Lanyards
                    </div>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 14,
                        lineHeight: 1.65,
                        marginBottom: 14,
                      }}
                    >
                      High-impact black/orange badge with tiered access labels (VIP,
                      Speaker, All Access). The reverse carries the day&apos;s schedule and
                      WiFi credentials — zero app required.
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {[
                        "Printed on 450gsm silk-laminate card",
                        "Orange lanyard with woven logo",
                        "Perforated schedule backing",
                        "QR code for digital access pass",
                      ].map((item) => (
                        <li
                          key={item}
                          style={{ display: "flex", alignItems: "center", gap: 8 }}
                        >
                          <CheckCircle size={12} color={OG} style={{ flexShrink: 0 }} />
                          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Billboard */}
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    marginBottom: 20,
                  }}
                >
                  {"// outdoor_advertising · billboard"}
                </div>
                <Billboard />
                <p
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 12,
                    fontFamily: "monospace",
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {"// 6m × 3m street billboard · Lisboa"}
                </p>
              </div>

              {/* Venue signage note */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  "Stage backdrop (8m × 4m)",
                  "Roll-up banners (85cm × 200cm)",
                  "Wayfinding directional signs",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: OG,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        fontSize: 13,
                        fontFamily: "monospace",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Stripe />

      {/* ── RESULTS ── */}
      <section style={{ background: DK }} className="px-6 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            style={{
              color: OG,
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.3em",
              display: "block",
              marginBottom: 14,
            }}
          >
            {"// impact_results"}
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "white",
              fontWeight: 800,
              marginBottom: 56,
              lineHeight: 1.15,
            }}
          >
            Shipped in 2 months.{" "}
            <span style={{ color: OG }}>Sold out in days.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 56,
            }}
          >
            {[
              { value: "1,200+", label: "Tickets sold out — record time for the event" },
              { value: "98%", label: "Positive attendee score on branding & wayfinding" },
              { value: "3×", label: "Social engagement vs. previous edition" },
            ].map(({ value, label }) => (
              <div
                key={value}
                style={{
                  background: BK,
                  border: `1px solid ${OG}28`,
                  padding: "32px 20px",
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
                    background: OG,
                  }}
                  aria-hidden="true"
                />
                <div
                  style={{
                    fontSize: "clamp(2.2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: OG,
                    lineHeight: 1,
                    marginBottom: 10,
                    fontFamily: "monospace",
                  }}
                >
                  {value}
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.55 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="focus-visible:outline-white transition-all hover:opacity-90"
            style={{
              background: OG,
              color: BK,
              padding: "14px 36px",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Back to Portfolio <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
