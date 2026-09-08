import { useState, useEffect } from "react";
import {
  X, Video, Mic, Search, Calendar, CreditCard,
  FileText, Star, TrendingUp, Clock, Users,
  CheckCircle, PhoneOff, ArrowRight,
} from "lucide-react";
import { usePasswordProtection } from "../hooks/usePasswordProtection";
import PasswordModal from "./PasswordModal";

const NAVY = "#002B66";
const DARK = "#051A44";
const TEAL = "#00C9A7";

/* ─── Wave divider ─── */
function Wave({ bg, fill }: { bg: string; fill: string }) {
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: 56 }}>
        <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill={fill} />
      </svg>
    </div>
  );
}

/* ─── Phone frame ─── */
function Phone({ children, tilt = 0 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <div style={{ transform: `rotate(${tilt}deg)`, width: 148, height: 298, flexShrink: 0, position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 28, overflow: "hidden",
        border: "3px solid rgba(255,255,255,0.18)", background: DARK,
        boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
      }}>
        {/* status bar */}
        <div style={{ height: 22, background: "rgba(5,26,68,0.95)", display: "flex",
          alignItems: "center", justifyContent: "space-between", padding: "0 12px", flexShrink: 0 }}>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 7 }}>9:41</span>
          <div style={{ width: 28, height: 6, borderRadius: 3, background: DARK }} />
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            {[3, 5, 7].map((h, i) => (
              <div key={i} style={{ width: 2, height: h, borderRadius: 1, background: "rgba(255,255,255,0.45)" }} />
            ))}
          </div>
        </div>
        <div style={{ height: "calc(100% - 22px)", overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Screen: video call ─── */
function VideoCallScreen() {
  return (
    <div style={{ height: "100%", background: `linear-gradient(160deg, ${DARK}, #0a3060)`, display: "flex", flexDirection: "column" }}>
      {/* Médis bar */}
      <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: TEAL, fontSize: 8, fontWeight: 700 }}>médis</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 7 }}>00:04:23</span>
      </div>
      {/* Doctor video */}
      <div style={{ margin: "0 8px", borderRadius: 12, overflow: "hidden", flex: 1,
        background: "linear-gradient(135deg, #0a3566, #1a5a8a)", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${TEAL}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `2px solid ${TEAL}60`, marginBottom: 6 }}>
          <span style={{ color: TEAL, fontSize: 16, fontWeight: 700 }}>Dr</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 9, fontWeight: 600 }}>Dr. Ana Silva</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>General Practice</span>
        {/* self preview */}
        <div style={{ position: "absolute", bottom: 8, right: 8, width: 30, height: 42, borderRadius: 6,
          background: "#1a4a7a", border: `1px solid ${TEAL}50` }} />
      </div>
      {/* Controls */}
      <div style={{ padding: "10px 0 12px", display: "flex", justifyContent: "center", gap: 10 }}>
        {[
          { Icon: Mic, color: "rgba(255,255,255,0.12)" },
          { Icon: Video, color: "rgba(255,255,255,0.12)" },
          { Icon: PhoneOff, color: "#ef4444" },
        ].map(({ Icon, color }, i) => (
          <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: color,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={11} color="white" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Screen: specialty list ─── */
function SpecialtyScreen() {
  const specs = ["General Practice", "Pediatrics", "Dermatology", "Cardiology"];
  return (
    <div style={{ height: "100%", background: "#f8fafc", padding: "10px 10px 0" }}>
      <div style={{ color: NAVY, fontSize: 9, fontWeight: 800, marginBottom: 8 }}>Choose Specialty</div>
      {/* search bar */}
      <div style={{ background: "white", borderRadius: 8, border: `1px solid ${NAVY}20`,
        padding: "5px 8px", display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
        <Search size={8} color={`${NAVY}60`} />
        <span style={{ color: `${NAVY}40`, fontSize: 8 }}>Search...</span>
      </div>
      {specs.map((s, i) => (
        <div key={s} style={{ background: "white", borderRadius: 8, padding: "7px 8px",
          marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "space-between",
          border: i === 0 ? `1.5px solid ${TEAL}` : `1px solid ${NAVY}12`,
          boxShadow: i === 0 ? `0 2px 8px ${TEAL}20` : "none" }}>
          <div>
            <div style={{ color: NAVY, fontSize: 8, fontWeight: 700 }}>{s}</div>
            <div style={{ color: `${NAVY}60`, fontSize: 7 }}>
              {[3, 8, 5, 4][i]} doctors available
            </div>
          </div>
          {i === 0 && (
            <div style={{ background: TEAL, borderRadius: 4, padding: "2px 5px" }}>
              <span style={{ color: DARK, fontSize: 7, fontWeight: 700 }}>Now</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Screen: schedule ─── */
function ScheduleScreen() {
  return (
    <div style={{ height: "100%", background: "#f8fafc", padding: "10px" }}>
      <div style={{ color: NAVY, fontSize: 9, fontWeight: 800, marginBottom: 8 }}>When do you need it?</div>
      {/* toggle */}
      <div style={{ display: "flex", background: `${NAVY}10`, borderRadius: 8, padding: 2, marginBottom: 10 }}>
        <div style={{ flex: 1, background: NAVY, borderRadius: 6, padding: "5px 0", textAlign: "center" }}>
          <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>Now</span>
        </div>
        <div style={{ flex: 1, padding: "5px 0", textAlign: "center" }}>
          <span style={{ color: `${NAVY}60`, fontSize: 8 }}>Schedule</span>
        </div>
      </div>
      {/* available now card */}
      <div style={{ background: `${TEAL}15`, borderRadius: 8, padding: "10px",
        border: `1.5px solid ${TEAL}50`, marginBottom: 8, textAlign: "center" }}>
        <div style={{ color: TEAL, fontWeight: 800, fontSize: 10 }}>Waiting time</div>
        <div style={{ color: NAVY, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>~3 min</div>
        <div style={{ color: `${NAVY}60`, fontSize: 7 }}>3 GPs available now</div>
      </div>
      <div style={{ background: "white", borderRadius: 8, padding: "8px",
        border: `1px solid ${NAVY}15`, textAlign: "center" }}>
        <div style={{ color: NAVY, fontSize: 8, fontWeight: 600, marginBottom: 6 }}>Or pick a time</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {["10:00", "14:30", "16:00", "Tomorrow", "Wed", "Thu"].map((t, i) => (
            <div key={t} style={{ background: i === 3 ? NAVY : `${NAVY}08`, borderRadius: 4,
              padding: "3px 2px", textAlign: "center" }}>
              <span style={{ color: i === 3 ? "white" : `${NAVY}80`, fontSize: 6.5, fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Screen: payment ─── */
function PaymentScreen() {
  return (
    <div style={{ height: "100%", background: "#f8fafc", padding: "10px" }}>
      <div style={{ color: NAVY, fontSize: 9, fontWeight: 800, marginBottom: 6 }}>Payment</div>
      {/* co-payment badge */}
      <div style={{ background: NAVY, borderRadius: 10, padding: "10px", marginBottom: 8, textAlign: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 7, marginBottom: 2 }}>Co-payment (Médis)</div>
        <div style={{ color: TEAL, fontSize: 28, fontWeight: 900, lineHeight: 1 }}>10€</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>Flat fee · insurance covered</div>
      </div>
      {/* methods */}
      <div style={{ color: NAVY, fontSize: 7, fontWeight: 700, marginBottom: 5, letterSpacing: "0.1em" }}>
        PAYMENT METHOD
      </div>
      {["MB WAY", "Credit Card", "Multibanco"].map((m, i) => (
        <div key={m} style={{ background: "white", borderRadius: 6, padding: "5px 8px", marginBottom: 4,
          border: i === 0 ? `1.5px solid ${TEAL}` : `1px solid ${NAVY}12`,
          display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${i === 0 ? TEAL : `${NAVY}30`}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            {i === 0 && <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL }} />}
          </div>
          <span style={{ color: NAVY, fontSize: 8, fontWeight: i === 0 ? 700 : 400 }}>{m}</span>
        </div>
      ))}
      <div style={{ background: TEAL, borderRadius: 8, padding: "7px", textAlign: "center", marginTop: 6 }}>
        <span style={{ color: DARK, fontSize: 8, fontWeight: 800 }}>Confirm & Connect</span>
      </div>
    </div>
  );
}

/* ─── Screen: post consultation ─── */
function PostConsultScreen() {
  return (
    <div style={{ height: "100%", background: "#f8fafc", padding: "10px", display: "flex", flexDirection: "column" }}>
      <div style={{ background: NAVY, borderRadius: 10, padding: "12px", textAlign: "center", marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${TEAL}30`,
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
          <CheckCircle size={14} color={TEAL} />
        </div>
        <div style={{ color: "white", fontSize: 9, fontWeight: 800 }}>Consultation Complete</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 7 }}>Dr. Ana Silva · 12 min</div>
      </div>
      {[
        { label: "Diagnosis", value: "Seasonal allergy" },
        { label: "Prescription", value: "Sent via SMS & email" },
        { label: "Follow-up", value: "In 2 weeks" },
      ].map(({ label, value }) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "5px 0", borderBottom: `1px solid ${NAVY}10` }}>
          <span style={{ color: `${NAVY}60`, fontSize: 7 }}>{label}</span>
          <span style={{ color: NAVY, fontSize: 7, fontWeight: 700 }}>{value}</span>
        </div>
      ))}
      {/* Rating */}
      <div style={{ marginTop: 8, textAlign: "center" }}>
        <div style={{ color: `${NAVY}60`, fontSize: 7, marginBottom: 4 }}>Rate your experience</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={10} fill={s <= 5 ? "#F59E0B" : "none"} color={s <= 5 ? "#F59E0B" : `${NAVY}30`} />
          ))}
        </div>
      </div>
      <div style={{ background: `${TEAL}15`, borderRadius: 6, padding: "6px", textAlign: "center", marginTop: 8 }}>
        <span style={{ color: TEAL, fontSize: 7, fontWeight: 700 }}>Download Summary (PDF)</span>
      </div>
    </div>
  );
}

/* ─── Feature row ─── */
function FeatureRow({
  number, icon: Icon, title, description, phones, textLeft = false, dark = true,
}: {
  number: string; icon: React.ElementType; title: string; description: string;
  phones: React.ReactNode[]; textLeft?: boolean; dark?: boolean;
}) {
  const fg = dark ? "white" : NAVY;
  const muted = dark ? "rgba(255,255,255,0.62)" : "#475569";

  const text = (
    <div style={{ flex: 1 }}>
      <div style={{ color: TEAL, fontSize: 10, letterSpacing: "0.3em", fontWeight: 700,
        textTransform: "uppercase", marginBottom: 14 }}>Feature {number}</div>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: `${TEAL}22`,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Icon size={20} color={TEAL} />
      </div>
      <h3 className="font-serif" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", color: fg,
        fontWeight: 800, lineHeight: 1.15, marginBottom: 16, whiteSpace: "pre-line" }}>{title}</h3>
      <p style={{ color: muted, lineHeight: 1.75, fontSize: 15, maxWidth: 420 }}>{description}</p>
    </div>
  );

  const mockups = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
      gap: 16, flexShrink: 0 }}>
      {phones.map((p, i) => (
        <Phone key={i} tilt={phones.length > 1 ? (i === 0 ? -6 : 6) : 0}>{p}</Phone>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {textLeft ? <>{text}{mockups}</> : <>{mockups}{text}</>}
    </div>
  );
}

/* ─── Main component ─── */
export default function MedisCaseStudy({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"challenge" | "approach" | "results">("challenge");
  const { isProtected, verifyPassword } = usePasswordProtection();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const tabs = [
    { key: "challenge", label: "The Challenge" },
    { key: "approach", label: "Design Approach" },
    { key: "results", label: "Impact & Results" },
  ] as const;

  if (isProtected) {
    return <PasswordModal onSubmit={verifyPassword} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: DARK }}>
      {/* Close */}
      <button onClick={onClose} aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-white"
        style={{ background: "rgba(255,255,255,0.15)", color: "white", borderRadius: "50%", backdropFilter: "blur(8px)" }}>
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(145deg, ${DARK} 0%, ${NAVY} 55%, #003d7a 80%, ${TEAL}18 100%)` }}
        className="relative px-6 lg:px-16 pt-16 pb-6 overflow-hidden">
        {/* Blobs */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ width: 500, height: 500, background: `${TEAL}07`, borderRadius: "50%",
            position: "absolute", top: -180, right: -100 }} />
          <div style={{ width: 240, height: 240, background: `${TEAL}10`, borderRadius: "50%",
            position: "absolute", bottom: -80, left: "35%" }} />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <div style={{ width: 34, height: 34, background: TEAL, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: DARK, fontWeight: 900, fontSize: 17, fontFamily: "serif" }}>m</span>
            </div>
            <span style={{ color: TEAL, fontWeight: 800, fontSize: 17, letterSpacing: "0.12em" }}>médis</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text */}
            <div style={{ flex: 1 }}>
              <span style={{ color: TEAL, fontSize: 11, letterSpacing: "0.35em", fontWeight: 700,
                textTransform: "uppercase", display: "block", marginBottom: 16 }}>
                Case Study · UX/UI · 2023
              </span>
              <h1 className="font-serif" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                color: "white", fontWeight: 900, lineHeight: 0.95, marginBottom: 20 }}>
                Online<br /><span style={{ color: TEAL }}>Doctor</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.65,
                maxWidth: 460, marginBottom: 32 }}>
                Simplifying remote medical consultations for health insurance policyholders — a seamless end-to-end telemedicine mobile experience.
              </p>
              {/* Meta */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  ["Role", "Lead UX/UI Designer"],
                  ["Timeline", "3 Months"],
                  ["Tools", "Figma · Illustrator · Maze"],
                  ["Client", "Médis Health Insurance"],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)", borderRadius: 8, padding: "8px 14px" }}>
                    <div style={{ color: TEAL, fontSize: 9, letterSpacing: "0.3em",
                      textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>{label}</div>
                    <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero phones */}
            <div className="hidden lg:flex items-end gap-4 flex-shrink-0 pb-4">
              <Phone tilt={-7}><VideoCallScreen /></Phone>
              <Phone tilt={0}><SpecialtyScreen /></Phone>
              <Phone tilt={7}><PaymentScreen /></Phone>
            </div>
          </div>
        </div>
      </section>

      <Wave bg={NAVY} fill="white" />

      {/* ── OVERVIEW TABS ── */}
      <section style={{ background: "white" }} className="px-6 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Tab switcher */}
          <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 9999,
            padding: 4, width: "fit-content", margin: "0 auto 48px", gap: 2 }}>
            {tabs.map(({ key, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className="focus-visible:outline-none transition-all duration-200"
                style={{ padding: "10px 22px", borderRadius: 9999, fontSize: 13, fontWeight: 600,
                  background: tab === key ? NAVY : "transparent",
                  color: tab === key ? "white" : "#64748b",
                  whiteSpace: "nowrap" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Challenge */}
          {tab === "challenge" && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif mb-5" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                  color: NAVY, fontWeight: 800, lineHeight: 1.2 }}>
                  Patients needed faster access to medical advice.
                </h2>
                <p style={{ color: "#475569", lineHeight: 1.75, marginBottom: 14, fontSize: 15 }}>
                  Médis policyholders faced long waiting times and unnecessary ER visits for non-emergency concerns. Booking a GP appointment meant navigating phone queues, clinic schedules, and insurance paperwork.
                </p>
                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15 }}>
                  The objective was to design a seamless end-to-end mobile telemedicine flow allowing users to book, pay, and conduct video or voice consultations within minutes — without leaving home.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: Clock, text: "Average 4+ hour wait for a GP appointment" },
                  { icon: Users, text: "62% of ER visits were non-emergency cases" },
                  { icon: TrendingUp, text: "Low digital adoption among policyholders" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 14,
                    background: `${NAVY}06`, border: `1px solid ${NAVY}12`, borderRadius: 12, padding: 16 }}>
                    <div style={{ width: 40, height: 40, background: `${TEAL}1A`, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={17} color={TEAL} />
                    </div>
                    <p style={{ color: NAVY, fontWeight: 500, fontSize: 14, lineHeight: 1.5 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approach */}
          {tab === "approach" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { phase: "01", title: "Discover", items: ["8 user interviews", "Competitive audit", "Analytics review", "Journey mapping"] },
                { phase: "02", title: "Design", items: ["Information architecture", "Wireframing", "High-fi prototyping", "Component library"] },
                { phase: "03", title: "Validate", items: ["Maze usability tests", "24 participants", "A/B flow variants", "Iterative refinement"] },
              ].map(({ phase, title, items }) => (
                <div key={phase} style={{ border: `2px solid ${NAVY}14`, borderRadius: 14, padding: 24 }}>
                  <div style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", marginBottom: 8 }}>{phase}</div>
                  <h3 style={{ color: NAVY, fontWeight: 800, fontSize: 20, marginBottom: 18 }}>{title}</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle size={13} color={TEAL} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#475569", fontSize: 14 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {tab === "results" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { value: "+45%", label: "Increase in remote appointment completion", icon: TrendingUp },
                { value: "4.8★", label: "Patient satisfaction score post-launch", icon: Star },
                { value: "−60%", label: "Reduction in booking friction time", icon: Clock },
              ].map(({ value, label, icon: Icon }) => (
                <div key={value} style={{ background: NAVY, borderRadius: 14, padding: "32px 24px", textAlign: "center" }}>
                  <Icon size={26} color={TEAL} style={{ margin: "0 auto 14px" }} />
                  <div style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 900, color: TEAL,
                    lineHeight: 1, marginBottom: 10 }}>{value}</div>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.55 }}>{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Wave bg="white" fill={NAVY} />

      {/* ── FEATURE 1: Video & Voice ── */}
      <section style={{ background: NAVY }} className="px-6 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <FeatureRow
            number="01" icon={Video}
            title={"Video & Voice\nConsultations"}
            description="Instant connection with certified GPs and specialists via high-quality video or voice calls. Users can invite a third party and receive files directly in-app during the consultation."
            phones={[<VideoCallScreen key="v1" />, <SpecialtyScreen key="v2" />]}
            textLeft dark
          />
        </div>
      </section>

      <Wave bg={NAVY} fill="white" />

      {/* ── FEATURE 2: Specialty ── */}
      <section style={{ background: "white" }} className="px-6 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <FeatureRow
            number="02" icon={Search}
            title={"Specialty Selection\n& Search"}
            description="Intuitive filtering by medical specialty, real-time doctor availability, and peer ratings. Browse verified specialists, view their availability, and read patient reviews before booking."
            phones={[<SpecialtyScreen key="s1" />]}
            dark={false}
          />
        </div>
      </section>

      <Wave bg="white" fill={NAVY} />

      {/* ── FEATURE 3: Schedule ── */}
      <section style={{ background: NAVY }} className="px-6 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <FeatureRow
            number="03" icon={Calendar}
            title={"Consult Now\nor Later"}
            description="Dual-mode booking: immediate virtual triage with ~3 min estimated wait, or scheduled future appointments based on patient urgency and doctor availability."
            phones={[<ScheduleScreen key="sc1" />]}
            textLeft dark
          />
        </div>
      </section>

      <Wave bg={NAVY} fill="white" />

      {/* ── FEATURE 4: Payment ── */}
      <section style={{ background: "white" }} className="px-6 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <FeatureRow
            number="04" icon={CreditCard}
            title={"Seamless Payment\n& Co-payment"}
            description="Transparent insurance co-payment with a flat €10 fee estimated before confirmation. Supports MB WAY, Credit Card, and Multibanco — no hidden costs, no paperwork."
            phones={[<PaymentScreen key="p1" />]}
            dark={false}
          />
        </div>
      </section>

      <Wave bg="white" fill={NAVY} />

      {/* ── FEATURE 5: Post-Consultation ── */}
      <section style={{ background: NAVY }} className="px-6 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <FeatureRow
            number="05" icon={FileText}
            title={"Post-Consultation\nCare"}
            description="Instant digital summary, prescription delivery via SMS and email, a 5-star rating system, and integrated follow-up appointment scheduling — all in one place."
            phones={[<PostConsultScreen key="pc1" />]}
            textLeft dark
          />
        </div>
      </section>

      <Wave bg={NAVY} fill={DARK} />

      {/* ── RESULTS ── */}
      <section style={{ background: DARK }} className="px-6 lg:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <span style={{ color: TEAL, fontSize: 11, letterSpacing: "0.35em", fontWeight: 700,
            textTransform: "uppercase", display: "block", marginBottom: 14 }}>Impact & Results</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "white",
            fontWeight: 800, marginBottom: 60, lineHeight: 1.15 }}>
            Measurable outcomes,<br /><span style={{ color: TEAL }}>real patient impact.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20, marginBottom: 60 }}>
            {[
              { value: "+45%", label: "Remote appointment completion rate" },
              { value: "4.8/5", label: "Average patient satisfaction score" },
              { value: "−60%", label: "Reduction in booking friction time" },
            ].map(({ value, label }) => (
              <div key={value} style={{ background: "rgba(255,255,255,0.05)",
                border: `1px solid ${TEAL}30`, borderRadius: 16, padding: "36px 24px" }}>
                <div style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, color: TEAL,
                  lineHeight: 1, marginBottom: 10 }}>{value}</div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.5 }}>{label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button onClick={onClose}
              className="focus-visible:outline-white transition-all hover:opacity-90"
              style={{ background: TEAL, color: DARK, padding: "14px 36px", borderRadius: 6,
                fontWeight: 800, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 8 }}>
              Back to Portfolio <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
