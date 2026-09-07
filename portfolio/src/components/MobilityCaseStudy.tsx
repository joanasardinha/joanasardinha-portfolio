import { useState, useEffect } from "react";
import { X, ArrowRight, Zap, Leaf, MapPin, Clock, Navigation, Battery, Bike } from "lucide-react";

const DARK   = "#121D24";
const DARK2  = "#1E293B";
const TEAL   = "#0D2A26";
const TEAL2  = "#0F3530";
const GREEN  = "#00C853";
const LIME   = "#84CC16";
const YELLOW = "#F59E0B";
const SLATE  = "#94A3B8";
const SLATED = "#64748B";

/* ── ring ── */
function Ring({ pct, size = 80, stroke = 7, color = GREEN }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
    </svg>
  );
}

/* ── phone shell ── */
function Phone({ children, bg = DARK }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: 180, height: 368, borderRadius: 32, overflow: "hidden", background: bg,
      boxShadow: "0 32px 80px rgba(0,0,0,0.5)", border: "4px solid rgba(255,255,255,0.06)",
      flexShrink: 0, position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 54, height: 9, background: "#000", borderRadius: "0 0 12px 12px", zIndex: 10,
      }} aria-hidden="true" />
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

/* ── transport icon ── */
function ModeIcon({ label, icon, active }: { label: string; icon: string; active?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, background: active ? GREEN : "rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
      }}>{icon}</div>
      <span style={{ color: active ? GREEN : SLATE, fontSize: 6.5, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

/* ── SCREEN 1: Dashboard / Home ── */
function ScreenDashboard() {
  return (
    <Phone bg={TEAL}>
      {/* Status bar */}
      <div style={{ padding: "14px 14px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>9:41</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 1, 0.5].map((o, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: `rgba(255,255,255,${o})` }} />)}
          </div>
        </div>
        {/* Map bg (CSS art) */}
        <div style={{
          height: 80, borderRadius: 12, overflow: "hidden", marginBottom: 10, position: "relative",
          background: `linear-gradient(140deg, ${TEAL2} 0%, #0a2020 100%)`,
        }}>
          {/* Street grid */}
          {[20, 45, 68].map(y => (
            <div key={y} style={{ position: "absolute", left: 0, right: 0, top: y, height: 1, background: "rgba(255,255,255,0.06)" }} />
          ))}
          {[20, 50, 80, 120, 155].map(x => (
            <div key={x} style={{ position: "absolute", top: 0, bottom: 0, left: x, width: 1, background: "rgba(255,255,255,0.06)" }} />
          ))}
          {/* Pins */}
          <div style={{ position: "absolute", top: 18, left: 38, fontSize: 10 }}>📍</div>
          <div style={{ position: "absolute", top: 38, left: 90, fontSize: 10 }}>🛴</div>
          <div style={{ position: "absolute", top: 50, left: 130, fontSize: 10 }}>⚡</div>
          {/* Route line */}
          <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%">
            <path d="M50,30 L80,45 L105,45 L140,58" stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
          </svg>
        </div>
        {/* Search bar */}
        <div style={{
          background: "rgba(255,255,255,0.10)", borderRadius: 10, padding: "7px 10px",
          display: "flex", alignItems: "center", gap: 6, marginBottom: 12,
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <span style={{ color: GREEN, fontSize: 10 }}>🔍</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 8.5 }}>Take me somewhere...</span>
        </div>
      </div>
      {/* Quick actions */}
      <div style={{ padding: "0 14px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[
            { label: "Take me somewhere", bg: GREEN, color: DARK },
            { label: "Park", bg: "rgba(255,255,255,0.08)", color: "white" },
          ].map(({ label, bg, color }) => (
            <div key={label} style={{ flex: 1, background: bg, borderRadius: 8, padding: "7px 8px",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color, fontSize: 7.5, fontWeight: 700 }}>{label}</span>
            </div>
          ))}
        </div>
        {/* Mode icons */}
        <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0",
          background: "rgba(255,255,255,0.04)", borderRadius: 12, marginBottom: 10 }}>
          <ModeIcon label="Bus" icon="🚌" />
          <ModeIcon label="Bike" icon="🚲" active />
          <ModeIcon label="Train" icon="🚆" />
          <ModeIcon label="Taxi" icon="🚕" />
          <ModeIcon label="Scooter" icon="🛴" />
        </div>
        {/* Nearby card */}
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "7px 9px",
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: SLATE, fontSize: 6.5 }}>Nearest available</div>
            <div style={{ color: "white", fontSize: 9, fontWeight: 700 }}>3 e-Bikes · 2 min walk</div>
          </div>
          <div style={{ background: GREEN, borderRadius: 6, padding: "4px 8px" }}>
            <span style={{ color: DARK, fontSize: 7.5, fontWeight: 800 }}>Unlock →</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ── SCREEN 2: Route Finder ── */
function ScreenRoute() {
  return (
    <Phone bg={DARK}>
      <div style={{ padding: "14px 12px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>9:41</span>
        </div>
        <div style={{ color: SLATE, fontSize: 7, letterSpacing: "0.15em", marginBottom: 4 }}>ROUTE FINDER</div>
        <div style={{ color: "white", fontSize: 13, fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>
          Best way to<br /><span style={{ color: GREEN }}>ABC Co. HQ</span>
        </div>
        {/* Origin / Dest */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 9, padding: "6px 9px", marginBottom: 10,
          border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, flexShrink: 0 }} />
            <span style={{ color: "white", fontSize: 8 }}>Current Location</span>
          </div>
          <div style={{ width: 1, height: 8, background: "rgba(255,255,255,0.15)", marginLeft: 3.5, marginBottom: 5 }} />
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: YELLOW, flexShrink: 0 }} />
            <span style={{ color: "white", fontSize: 8 }}>ABC Co., Lisbon</span>
          </div>
        </div>
      </div>
      {/* Route options */}
      <div style={{ flex: 1, padding: "0 12px 8px", overflowY: "auto" }}>
        {[
          { mode: "🛴", label: "E-Scooter", time: "8 min", cost: "€1.50", eco: true, best: true },
          { mode: "🚌", label: "Bus Line 45", time: "12 min", cost: "€1.50", eco: false, best: false },
          { mode: "🚕", label: "Ride-hailing", time: "6 min", cost: "€7.20", eco: false, best: false },
          { mode: "🚶", label: "Walk",          time: "22 min", cost: "Free",  eco: true, best: false },
        ].map(({ mode, label, time, cost, eco, best }) => (
          <div key={label} style={{
            borderRadius: 10, padding: "8px 10px", marginBottom: 6,
            background: best ? `${GREEN}18` : "rgba(255,255,255,0.05)",
            border: `1.5px solid ${best ? GREEN + "60" : "rgba(255,255,255,0.06)"}`,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ fontSize: 16, flexShrink: 0 }}>{mode}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                <span style={{ color: "white", fontSize: 8.5, fontWeight: 700 }}>{label}</span>
                {best && <span style={{ background: GREEN, color: DARK, fontSize: 5.5, fontWeight: 800,
                  borderRadius: 20, padding: "1px 5px" }}>FASTEST</span>}
                {eco && <span style={{ background: `${LIME}30`, color: LIME, fontSize: 5.5, fontWeight: 700,
                  borderRadius: 20, padding: "1px 5px" }}>🌿 ECO</span>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: SLATE, fontSize: 7 }}>⏱ {time}</span>
                <span style={{ color: SLATE, fontSize: 7 }}>💶 {cost}</span>
              </div>
            </div>
            <div style={{ color: best ? GREEN : SLATED, fontSize: 12 }}>›</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 12px 10px", flexShrink: 0 }}>
        <div style={{ background: GREEN, borderRadius: 10, padding: "9px", textAlign: "center" }}>
          <span style={{ color: DARK, fontSize: 9, fontWeight: 800 }}>Start with E-Scooter →</span>
        </div>
      </div>
    </Phone>
  );
}

/* ── SCREEN 3: Transit Map ── */
function ScreenMap() {
  return (
    <Phone bg={TEAL}>
      <div style={{ padding: "14px 12px 8px", flexShrink: 0 }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7, marginBottom: 6 }}>9:41</div>
        <div style={{ color: "white", fontSize: 13, fontWeight: 800, marginBottom: 8 }}>
          Nearby <span style={{ color: GREEN }}>Mobility</span>
        </div>
        {/* Filter pills */}
        <div style={{ display: "flex", gap: 5, marginBottom: 10, overflowX: "auto" }}>
          {[
            { l: "All", a: true },
            { l: "🚲 Bikes", a: false },
            { l: "🛴 Scooters", a: false },
            { l: "⚡ EV Charge", a: false },
            { l: "🅿️ Park", a: false },
          ].map(({ l, a }) => (
            <div key={l} style={{ borderRadius: 20, padding: "3px 8px", flexShrink: 0,
              background: a ? GREEN : "rgba(255,255,255,0.08)",
              border: `1px solid ${a ? GREEN : "rgba(255,255,255,0.08)"}` }}>
              <span style={{ color: a ? DARK : "white", fontSize: 7, fontWeight: a ? 700 : 400 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Map area */}
      <div style={{ flex: 1, margin: "0 12px 10px", borderRadius: 14, overflow: "hidden",
        background: `linear-gradient(150deg, ${TEAL2} 0%, #0a2020 100%)`, position: "relative" }}>
        {/* Grid */}
        {[20, 45, 70, 95, 120].map(y => (
          <div key={y} style={{ position: "absolute", left: 0, right: 0, top: y, height: 1, background: "rgba(255,255,255,0.04)" }} />
        ))}
        {[25, 60, 95, 130].map(x => (
          <div key={x} style={{ position: "absolute", top: 0, bottom: 0, left: x, width: 1, background: "rgba(255,255,255,0.04)" }} />
        ))}
        {/* Pins */}
        {[
          { x: 20, y: 22, icon: "🚲", label: "×3" },
          { x: 65, y: 48, icon: "🛴", label: "×2" },
          { x: 110, y: 30, icon: "⚡", label: "×4" },
          { x: 40, y: 80, icon: "🅿️", label: "12" },
          { x: 95, y: 75, icon: "🚲", label: "×1" },
        ].map(({ x, y, icon, label }) => (
          <div key={`${x}-${y}`} style={{ position: "absolute", left: x, top: y,
            display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "white", borderRadius: 6, padding: "2px 4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)", fontSize: 9 }}>{icon}</div>
            <div style={{ background: GREEN, borderRadius: 20, padding: "1px 4px", marginTop: 1 }}>
              <span style={{ color: DARK, fontSize: 6, fontWeight: 800 }}>{label}</span>
            </div>
          </div>
        ))}
        {/* User dot */}
        <div style={{ position: "absolute", left: 74, top: 58,
          width: 14, height: 14, borderRadius: "50%",
          background: `${GREEN}30`, border: `2px solid ${GREEN}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN }} />
        </div>
      </div>
      {/* Bottom sheet preview */}
      <div style={{ padding: "6px 12px 10px", flexShrink: 0 }}>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "7px 9px",
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: SLATE, fontSize: 6 }}>Selected</div>
            <div style={{ color: "white", fontSize: 9, fontWeight: 700 }}>3 × e-Bikes · 45m away</div>
          </div>
          <div style={{ background: GREEN, borderRadius: 6, padding: "4px 8px" }}>
            <span style={{ color: DARK, fontSize: 7.5, fontWeight: 800 }}>Unlock →</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ── SCREEN 4: Carbon Tracker ── */
function ScreenCarbon() {
  return (
    <Phone bg={DARK}>
      <div style={{ padding: "14px 12px 10px", flexShrink: 0 }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7, marginBottom: 8 }}>9:41</div>
        <div style={{ color: SLATE, fontSize: 7, letterSpacing: "0.15em", marginBottom: 3 }}>ECO IMPACT</div>
        <div style={{ color: "white", fontSize: 13, fontWeight: 800, marginBottom: 12 }}>
          Your <span style={{ color: GREEN }}>Carbon</span> Score
        </div>
        {/* Ring */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: 10 }}>
          <Ring pct={74} size={100} stroke={9} color={GREEN} />
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 100, height: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: GREEN, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>74</span>
            <span style={{ color: SLATE, fontSize: 7 }}>/ 100</span>
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}40`,
            borderRadius: 20, padding: "3px 10px", color: GREEN, fontSize: 8, fontWeight: 700 }}>
            🌿 Eco Hero · 74% Green Trips
          </span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 12px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { label: "CO₂ Saved This Week", val: "2.4 kg", icon: "♻️", color: GREEN },
          { label: "Green Trips",          val: "11 / 15", icon: "🌿", color: LIME },
          { label: "Eco Coins Earned",     val: "320 pts", icon: "⭐", color: YELLOW },
        ].map(({ label, val, icon, color }) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 10px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 13 }}>{icon}</span>
              <span style={{ color: SLATE, fontSize: 8 }}>{label}</span>
            </div>
            <span style={{ color, fontSize: 10, fontWeight: 800 }}>{val}</span>
          </div>
        ))}
        {/* Progress bar */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 10px",
          border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: SLATE, fontSize: 8 }}>Monthly Goal</span>
            <span style={{ color: GREEN, fontSize: 8, fontWeight: 700 }}>74%</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
            <div style={{ width: "74%", height: "100%", background: GREEN, borderRadius: 3 }} />
          </div>
        </div>
        <div style={{ background: `${YELLOW}15`, borderRadius: 10, padding: "7px 10px",
          border: `1px solid ${YELLOW}30`, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>🏆</span>
          <div>
            <div style={{ color: YELLOW, fontSize: 8, fontWeight: 700 }}>26 pts to next badge!</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>Use 1 more green trip today</div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ── main ── */
type Tab = "timeline" | "features" | "mockups";

export default function MobilityCaseStudy({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("timeline");
  const [mockupScreen, setMockupScreen] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "timeline", label: "⚡ 72-Hour Timeline" },
    { id: "features", label: "🗺 Feature Breakdown" },
    { id: "mockups",  label: "📱 POC Mockups" },
  ];

  const dayData = [
    {
      day: "Day 1",
      theme: "Research & Wireframe",
      color: GREEN,
      hours: "0–24h",
      tasks: [
        "Competitive audit (Citymapper, Bolt, Gira)",
        "User flow mapping for 3 core journeys",
        "Feature priority matrix (MoSCoW)",
        "Low-fidelity wireframe sketches × 12 screens",
        "POC scope locked with tech lead",
      ],
      output: "12 wireframe screens + feature spec doc",
    },
    {
      day: "Day 2",
      theme: "UI Design & Design System",
      color: YELLOW,
      hours: "24–48h",
      tasks: [
        "Dark + light theme token definitions",
        "Component library: buttons, cards, icons, map pins",
        "Transport mode icon set (bus, bike, taxi, EV, scooter)",
        "Mobility dashboard grid design",
        "High-fidelity screens × all 4 core features",
      ],
      output: "Full Figma hi-fi component library + 4 screens",
    },
    {
      day: "Day 3",
      theme: "Prototype & Stakeholder Pitch",
      color: LIME,
      hours: "48–72h",
      tasks: [
        "Figma prototype with tap interactions",
        "Micro-interactions: scooter unlock animation, carbon ring",
        "Stakeholder pitch deck (7 slides)",
        "Live prototype demo session",
        "Q&A + feedback capture",
      ],
      output: "Interactive prototype + approved budget for full build",
    },
  ];

  const features = [
    {
      icon: Navigation,
      title: "Multi-Modal Route Finder",
      color: GREEN,
      desc: "Compares time, cost, and carbon footprint across walking, e-scooters, buses, and ride-hailing in a single view — ranked by the user's preferred priority.",
      tags: ["Route API", "Real-time Data", "Comparison Cards"],
      screen: 2 as const,
    },
    {
      icon: MapPin,
      title: "Interactive Transit Map",
      color: YELLOW,
      desc: "Live map overlay showing nearest available bikes, scooters, EV charging docks, and parking spots with distance, availability count, and one-tap unlock.",
      tags: ["Map Integration", "Live Availability", "Geo-pins"],
      screen: 3 as const,
    },
    {
      icon: Zap,
      title: "Smart Mobility Dashboard",
      color: LIME,
      desc: "Personalized home screen with active booking cards, quick-unlock widgets, favourite routes, and real-time trip stats — all reachable within 2 taps.",
      tags: ["Dashboard", "Quick Actions", "Widget Cards"],
      screen: 1 as const,
    },
    {
      icon: Leaf,
      title: "Carbon Footprint Tracker",
      color: "#22D3EE",
      desc: "Gamified eco-savings ring tracks weekly CO₂ saved versus car trips, awards Eco Coins for green choices, and sets milestone badges to encourage habit change.",
      tags: ["Gamification", "Eco Coins", "Progress Rings"],
      screen: 4 as const,
    },
  ];

  const screenLabels: Record<number, string> = {
    1: "Home Dashboard",
    2: "Route Finder",
    3: "Transit Map",
    4: "Carbon Tracker",
  };
  const screenNode: Record<number, React.ReactNode> = {
    1: <ScreenDashboard />,
    2: <ScreenRoute />,
    3: <ScreenMap />,
    4: <ScreenCarbon />,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "#F0F4F8", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Close */}
      <button onClick={onClose} aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none"
        style={{ background: DARK, color: "white", borderRadius: "50%", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(145deg, ${DARK} 0%, ${TEAL} 55%, ${DARK2} 100%)`,
        padding: "72px 24px 56px", position: "relative", overflow: "hidden" }}
        className="lg:px-16">
        {/* Grid bg */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${GREEN} 1px, transparent 1px), linear-gradient(90deg, ${GREEN} 1px, transparent 1px)`,
          backgroundSize: "40px 40px" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: -80, right: -80,
          width: 320, height: 320, borderRadius: "50%", background: `${GREEN}10` }} />

        <div className="relative max-w-6xl mx-auto">
          {/* Speed badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7,
            background: `${GREEN}18`, border: `1.5px solid ${GREEN}50`,
            borderRadius: 24, padding: "6px 14px", marginBottom: 24 }}>
            <Zap size={13} color={GREEN} />
            <span style={{ color: GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>
              72-Hour Rapid Design Sprint
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div style={{ flex: 1 }}>
              <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                color: "white", fontWeight: 900, lineHeight: 1.06, marginBottom: 16 }}>
                Mobility App<br />
                <span style={{ color: GREEN }}>3-Day Rapid</span>{" "}
                <span style={{ color: YELLOW }}>POC</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.75,
                maxWidth: 480, marginBottom: 32 }}>
                Designing an all-in-one urban mobility companion in 72 hours to validate multi-modal transit routing and secure stakeholder buy-in.
              </p>

              {/* Meta */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                {[
                  { label: "Role",     value: "Lead UX/UI Designer" },
                  { label: "Sprint",   value: "3 Days / 72 Hours" },
                  { label: "Purpose",  value: "POC for Stakeholder Buy-in" },
                  { label: "Platform", value: "iOS & Android · OutSystems" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)", borderRadius: 8, padding: "8px 14px" }}>
                    <div style={{ color: GREEN, fontSize: 9, letterSpacing: "0.3em",
                      textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>{label}</div>
                    <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Outcome pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { icon: "✅", val: "Budget Approved",    lbl: "Stakeholder pitch success" },
                  { icon: "📱", val: "4 Core Screens",     lbl: "Hi-fi prototype in 72h" },
                  { icon: "🌿", val: "100% Green Routes",  lbl: "Eco-first UX strategy" },
                ].map(({ icon, val, lbl }) => (
                  <div key={val} style={{ background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>{icon}</div>
                    <div style={{ color: GREEN, fontSize: "clamp(1rem, 2vw, 1.4rem)",
                      fontWeight: 900, lineHeight: 1 }}>{val}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero phone */}
            <div className="hidden lg:block flex-shrink-0">
              <ScreenDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: DARK2,
        borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className="focus-visible:outline-none transition-all duration-200"
                style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700,
                  color: tab === id ? GREEN : "rgba(255,255,255,0.4)",
                  borderBottom: `2px solid ${tab === id ? GREEN : "transparent"}`,
                  background: "transparent", cursor: "pointer", whiteSpace: "nowrap" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB: TIMELINE ── */}
      {tab === "timeline" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ color: GREEN, fontSize: 11, letterSpacing: "0.3em", fontWeight: 700,
              textTransform: "uppercase" }}>72-Hour Execution Plan</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: DARK, fontWeight: 800, marginBottom: 40, lineHeight: 1.15 }}>
            From blank canvas to<br /><span style={{ color: GREEN }}>approved prototype</span> — in 3 days.
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {dayData.map(({ day, theme, color, hours, tasks, output }) => (
              <div key={day} style={{ background: "white", borderRadius: 14,
                overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                <div style={{ height: 4, background: color }} aria-hidden="true" />
                <div style={{ padding: "20px 20px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    marginBottom: 12 }}>
                    <div>
                      <div style={{ color, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
                        textTransform: "uppercase", marginBottom: 2 }}>{day}</div>
                      <div style={{ color: DARK, fontSize: 16, fontWeight: 800 }}>{theme}</div>
                    </div>
                    <div style={{ background: `${color}15`, border: `1px solid ${color}30`,
                      borderRadius: 6, padding: "3px 8px" }}>
                      <span style={{ color, fontSize: 9, fontWeight: 700 }}>{hours}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                    {tasks.map(t => (
                      <div key={t} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color,
                          marginTop: 4, flexShrink: 0 }} />
                        <span style={{ color: SLATED, fontSize: 13, lineHeight: 1.45 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: `${color}0f`, border: `1px solid ${color}30`,
                    borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ color, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 2 }}>
                      OUTPUT
                    </div>
                    <div style={{ color: DARK, fontSize: 12, fontWeight: 600 }}>{output}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Challenge callout */}
          <div style={{ marginTop: 40, background: DARK, borderRadius: 14, padding: "28px 32px",
            display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, background: `${YELLOW}20`, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Clock size={20} color={YELLOW} />
            </div>
            <div>
              <div style={{ color: YELLOW, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
                marginBottom: 6, textTransform: "uppercase" }}>The Challenge</div>
              <h3 style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>
                Build a unified urban mobility interface in 72 hours.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontSize: 14 }}>
                One app to rule all modes: public transport, ride-hailing, micromobility (e-scooters, e-bikes), and EV charging stations — under an extreme deadline. No lorem ipsum allowed.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: FEATURES ── */}
      {tab === "features" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em", fontWeight: 700,
            textTransform: "uppercase", marginBottom: 8 }}>Feature Breakdown</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: DARK, fontWeight: 800, marginBottom: 40, lineHeight: 1.2 }}>
            4 features. 72 hours.<br /><span style={{ color: GREEN }}>Full prototype.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, color, desc, tags, screen }) => (
              <div key={title} style={{ background: "white", borderRadius: 14,
                padding: "22px 22px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, background: `${color}18`,
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0 }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <h3 style={{ color: DARK, fontWeight: 800, fontSize: 16, lineHeight: 1.2,
                      marginBottom: 2 }}>{title}</h3>
                    <button onClick={() => { setMockupScreen(screen); setTab("mockups"); }}
                      style={{ color, fontSize: 11, fontWeight: 700, background: "none", border: "none",
                        cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 3 }}>
                      View mockup <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
                <p style={{ color: SLATED, fontSize: 13.5, lineHeight: 1.7, marginBottom: 12 }}>{desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {tags.map(tag => (
                    <span key={tag} style={{ background: `${color}12`, border: `1px solid ${color}25`,
                      color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key learnings */}
          <div style={{ marginTop: 40, background: "white", borderRadius: 14, padding: "28px 28px 24px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <div style={{ width: 28, height: 28, background: `${GREEN}18`, borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={14} color={GREEN} />
              </div>
              <span style={{ color: DARK, fontSize: 16, fontWeight: 800 }}>Key Learnings</span>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              {[
                { icon: "⚡", title: "Component Reuse", desc: "Pre-built card, icon, and map-pin components cut Day 2 UI time by ~40%." },
                { icon: "🎯", title: "Ruthless Prioritisation", desc: "Focusing strictly on 4 core flows avoided scope creep under deadline pressure." },
                { icon: "📊", title: "Visual Storytelling", desc: "High-contrast dark/light theming and live data widgets sold the POC in minutes." },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ background: "#F8FAFC", borderRadius: 10, padding: "14px 14px" }}>
                  <span style={{ fontSize: 20, display: "block", marginBottom: 6 }}>{icon}</span>
                  <div style={{ color: DARK, fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{title}</div>
                  <p style={{ color: SLATED, fontSize: 12.5, lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: MOCKUPS ── */}
      {tab === "mockups" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em", fontWeight: 700,
            textTransform: "uppercase", marginBottom: 8 }}>POC Mockups</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: DARK, fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
            4 screens. 1 ecosystem.<br /><span style={{ color: GREEN }}>Zero compromise.</span>
          </h2>

          {/* Screen picker */}
          <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
            {([1, 2, 3, 4] as const).map(n => (
              <button key={n} onClick={() => setMockupScreen(n)}
                className="focus-visible:outline-none transition-all duration-200"
                style={{ padding: "10px 18px", borderRadius: 8, cursor: "pointer",
                  background: mockupScreen === n ? DARK : "white",
                  border: `1.5px solid ${mockupScreen === n ? DARK : "rgba(0,0,0,0.12)"}`,
                  color: mockupScreen === n ? GREEN : SLATED,
                  fontSize: 12, fontWeight: 700 }}>
                {n === mockupScreen && "→ "}{screenLabels[n]}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
            {/* Phone */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              {screenNode[mockupScreen]}
              <span style={{ color: SLATED, fontSize: 11 }}>Screen {mockupScreen} of 4 · {screenLabels[mockupScreen]}</span>
            </div>

            {/* Annotation */}
            <div style={{ flex: 1 }}>
              {features.map(({ title, color, desc, tags, screen }) => (
                mockupScreen === screen && (
                  <div key={title}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                      background: `${color}12`, border: `1px solid ${color}30`,
                      borderRadius: 20, padding: "4px 12px", marginBottom: 14 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                      <span style={{ color, fontSize: 11, fontWeight: 700 }}>Screen {screen} of 4</span>
                    </div>
                    <h3 style={{ color: DARK, fontSize: 22, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
                      {title}
                    </h3>
                    <p style={{ color: SLATED, fontSize: 14.5, lineHeight: 1.75, marginBottom: 20 }}>{desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
                      {tags.map(tag => (
                        <span key={tag} style={{ background: `${color}12`, border: `1px solid ${color}25`,
                          color, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Design decisions */}
                    <div style={{ background: "white", borderRadius: 12, padding: "18px 18px",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 16 }}>
                      <div style={{ color: DARK, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                        Design Decisions
                      </div>
                      {[
                        ["Dark-first palette", "Reduces cognitive load during transit — easier to scan in bright outdoor light."],
                        ["Single-action CTAs", "One green button per screen state — no decision paralysis."],
                        ["Live availability data", "Placeholders show real API shape; stakeholders could see the vision immediately."],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: GREEN,
                            marginTop: 6, flexShrink: 0 }} />
                          <div>
                            <span style={{ color: DARK, fontWeight: 600, fontSize: 12.5 }}>{k}: </span>
                            <span style={{ color: SLATED, fontSize: 12.5 }}>{v}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
              {/* Nav hint */}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setMockupScreen(s => Math.max(1, s - 1) as 1|2|3|4)}
                  disabled={mockupScreen === 1}
                  style={{ padding: "8px 16px", borderRadius: 7, border: "1.5px solid rgba(0,0,0,0.12)",
                    background: "white", color: mockupScreen === 1 ? "#CBD5E1" : DARK,
                    fontSize: 12, fontWeight: 700, cursor: mockupScreen === 1 ? "default" : "pointer" }}>
                  ← Prev
                </button>
                <button onClick={() => setMockupScreen(s => Math.min(4, s + 1) as 1|2|3|4)}
                  disabled={mockupScreen === 4}
                  style={{ padding: "8px 16px", borderRadius: 7, border: `1.5px solid ${GREEN}`,
                    background: mockupScreen === 4 ? "rgba(0,0,0,0.04)" : GREEN,
                    color: mockupScreen === 4 ? "#CBD5E1" : DARK,
                    fontSize: 12, fontWeight: 700, cursor: mockupScreen === 4 ? "default" : "pointer" }}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      <section style={{ background: `linear-gradient(135deg, ${DARK} 0%, ${TEAL} 100%)` }}
        className="px-6 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <span style={{ color: GREEN, fontSize: 10, letterSpacing: "0.35em", fontWeight: 700,
            textTransform: "uppercase", display: "block", marginBottom: 14, fontFamily: "monospace" }}>
            {"// sprint_outcome"}
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white",
            fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
            <span style={{ color: GREEN }}>Approved.</span>{" "}
            <span style={{ color: YELLOW }}>Budgeted.</span>{" "}
            Built in 72h.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.75, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
            The POC was presented to executive stakeholders and secured immediate project approval and full development budget — a direct result of the visual clarity and speed of the sprint.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 14, marginBottom: 48 }}>
            {[
              { val: "72h", lbl: "From brief to live prototype", icon: "⚡" },
              { val: "4",   lbl: "Core POC screens delivered",  icon: "📱" },
              { val: "✅",  lbl: "Executive approval secured",  icon: "🏆" },
            ].map(({ val, lbl, icon }) => (
              <div key={val} style={{ background: "rgba(255,255,255,0.05)",
                border: `1px solid ${GREEN}20`, borderRadius: 12, padding: "22px 14px",
                position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: GREEN }} aria-hidden="true" />
                <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                <div style={{ color: GREEN, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 900, lineHeight: 1, marginBottom: 6 }}>{val}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.5 }}>{lbl}</p>
              </div>
            ))}
          </div>
          {/* Tool stack */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 44 }}>
            {["Figma", "OutSystems", "FigJam", "Maze (usability testing)", "Lottie (micro-animations)"].map(t => (
              <div key={t} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 20, padding: "5px 13px" }}>
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{t}</span>
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="hover:opacity-90 transition-opacity focus-visible:outline-white"
            style={{ background: GREEN, color: DARK, padding: "14px 36px", borderRadius: 6,
              fontWeight: 800, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8 }}>
            Back to Portfolio <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
