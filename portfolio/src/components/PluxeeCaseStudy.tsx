import { useState, useEffect } from "react";
import { X, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Shield, Users, TrendingUp, Award } from "lucide-react";
import { usePasswordProtection } from "../hooks/usePasswordProtection";
import PasswordModal from "./PasswordModal";
import workshopImg from "@/imports/C186DFB0-BF81-4D2A-9A92-A99ED28E77D9_1_102_o.jpeg";
import awardDetailImg from "@/imports/Award_Detail.png";
import awardsListImg from "@/imports/Awards_full_list.png";
import homepageImg from "@/imports/Homepage.png";
import recognitionImg from "@/imports/Recognition-1.png";
import sendThanksImg from "@/imports/Send_thanks_recognition.png";
import successMsgImg from "@/imports/Success_Message.png";
import walletRedeemImg from "@/imports/Wallet-1.png";
import walletImg from "@/imports/Wallet.png";

const NAVY   = "#191645";
const NAVY2  = "#120F38";
const NAVY3  = "#1e1a5e";
const GREEN  = "#00E676";
const CYAN   = "#00E5FF";
const YELLOW = "#FFEB3B";
const CORAL  = "#FF6B6B";
const PINK   = "#FFCDD2";
const LBLUE  = "#E1F5FE";
const LGREEN = "#E8F5E9";
const LYELLOW= "#FFFDE7";
const SLATE  = "#94A3B8";
const SLATED = "#64748B";
const WHITE  = "#FFFFFF";

const CORRECT_PASSWORD = "PluxeeOutsystems2024";

/* ── Pluxee X brand mark ── */
function PluxeeX({ size = 40, earned = true }: { size?: number; earned?: boolean }) {
  const bg = earned ? GREEN : "#CBD5E1";
  const fg = earned ? NAVY  : "#94A3B8";
  const r  = size * 0.1;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: "block", flexShrink: 0 }}>
      <rect width="40" height="40" rx={r} fill={bg} />
      {/* Notched-X shape */}
      <polygon points="4,0 16,0 20,6 24,0 36,0 40,4 40,16 34,20 40,24 40,36 36,40 24,40 20,34 16,40 4,40 0,36 0,24 6,20 0,16 0,4" fill={fg} />
    </svg>
  );
}

/* ── Phone frame wrapping a screenshot ── */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      width: 180, height: 370, borderRadius: 32, overflow: "hidden",
      boxShadow: "0 28px 72px rgba(0,0,0,0.45)",
      border: "4px solid rgba(255,255,255,0.10)", flexShrink: 0, background: NAVY,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 54, height: 9, background: "#000", borderRadius: "0 0 12px 12px", zIndex: 10,
      }} aria-hidden="true" />
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
    </div>
  );
}

/* ── Recognition card swatch ── */
function RecognitionCard({ bg, label, text, icon }: { bg: string; label: string; text: string; icon: string }) {
  return (
    <div style={{ borderRadius: 10, background: bg, padding: "12px 12px 10px", flex: 1,
      border: "1.5px solid rgba(0,0,0,0.06)", position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 16, marginBottom: 6 }}>{icon}</div>
      <div style={{ color: NAVY, fontSize: 11.5, fontWeight: 700, lineHeight: 1.35, marginBottom: 7 }}>{text}</div>
      <div style={{ display: "inline-block", background: "rgba(0,0,0,0.12)", borderRadius: 20,
        padding: "2px 8px", color: NAVY, fontSize: 9.5, fontWeight: 700 }}>{label}</div>
      {/* corner accent */}
      <div style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)",
        width: 20, height: 20, background: "rgba(0,0,0,0.12)", borderRadius: 2,
        rotate: "45deg" }} aria-hidden="true" />
    </div>
  );
}

/* ── CSS-art HR dashboard ── */
function HRDashboard() {
  const stats = [
    { label: "Total Employees", val: "1,284", delta: "+12%", color: GREEN },
    { label: "Recognitions Sent", val: "3,417", delta: "+34%", color: CYAN },
    { label: "Budget Allocated", val: "€48,200", delta: "92% used", color: YELLOW },
    { label: "Redemption Rate", val: "78%", delta: "+8 pts", color: CORAL },
  ];
  const rows = [
    { name: "Product Team", recognitions: 142, budget: "€4,800", rate: "84%" },
    { name: "Engineering",  recognitions: 98,  budget: "€3,200", rate: "71%" },
    { name: "Sales EMEA",   recognitions: 230, budget: "€7,600", rate: "91%" },
    { name: "HR & Ops",     recognitions: 55,  budget: "€1,800", rate: "68%" },
  ];
  return (
    <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.07)" }}>
      {/* Top bar */}
      <div style={{ background: NAVY, padding: "10px 16px", display: "flex",
        alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <PluxeeX size={22} earned />
          <span style={{ color: WHITE, fontSize: 12, fontWeight: 800 }}>pluxee</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>HR Portal</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Dashboard", "Employees", "Budget", "Reports"].map((t, i) => (
            <span key={t} style={{ color: i === 0 ? GREEN : "rgba(255,255,255,0.45)",
              fontSize: 10, fontWeight: i === 0 ? 700 : 400,
              borderBottom: i === 0 ? `2px solid ${GREEN}` : "none", paddingBottom: 2 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        {/* KPI grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
          {stats.map(({ label, val, delta, color }) => (
            <div key={label} style={{ borderRadius: 8, padding: "10px 10px",
              background: `${color}12`, border: `1px solid ${color}30` }}>
              <div style={{ color: SLATED, fontSize: 9, marginBottom: 3 }}>{label}</div>
              <div style={{ color: NAVY, fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{val}</div>
              <div style={{ color, fontSize: 9.5, fontWeight: 700, marginTop: 3 }}>{delta}</div>
            </div>
          ))}
        </div>
        {/* Team table */}
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 70px",
            padding: "7px 10px", background: "#F8FAFC", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            {["Team", "Recognitions", "Budget", "Rate"].map(h => (
              <span key={h} style={{ color: SLATED, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
            ))}
          </div>
          {rows.map(({ name, recognitions, budget, rate }, i) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 70px",
              padding: "8px 10px", background: i % 2 === 0 ? WHITE : "#FAFBFC",
              borderBottom: i < rows.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
              alignItems: "center" }}>
              <span style={{ color: NAVY, fontSize: 11.5, fontWeight: 600 }}>{name}</span>
              <span style={{ color: SLATED, fontSize: 11 }}>{recognitions}</span>
              <span style={{ color: SLATED, fontSize: 11 }}>{budget}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ flex: 1, height: 4, background: "rgba(0,0,0,0.07)", borderRadius: 2 }}>
                  <div style={{ width: rate, height: "100%", background: GREEN, borderRadius: 2 }} />
                </div>
                <span style={{ color: NAVY, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{rate}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Quick actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {[
            { label: "Allocate Budget", bg: GREEN, color: NAVY },
            { label: "Export Report", bg: "transparent", color: NAVY, border: true },
            { label: "Add Employee", bg: "transparent", color: NAVY, border: true },
          ].map(({ label, bg, color, border }) => (
            <div key={label} style={{ borderRadius: 7, padding: "7px 12px",
              background: bg, color, fontSize: 11, fontWeight: 700,
              border: border ? "1.5px solid rgba(0,0,0,0.15)" : "none", cursor: "pointer" }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── CSS-art Backoffice ── */
function BackofficeDashboard() {
  const clients = [
    { name: "Accenture Portugal", employees: 340, status: "Active", plan: "Enterprise", arr: "€28,000" },
    { name: "NOS Comunicações",   employees: 620, status: "Active", plan: "Pro",        arr: "€42,000" },
    { name: "EDP Renewables",     employees: 180, status: "Trial",  plan: "Starter",    arr: "€8,400" },
    { name: "Millennium BCP",     employees: 850, status: "Active", plan: "Enterprise", arr: "€61,000" },
  ];
  const statusColor = (s: string) => s === "Active" ? GREEN : s === "Trial" ? YELLOW : CORAL;
  return (
    <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div style={{ background: NAVY2, padding: "10px 16px", display: "flex",
        alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <PluxeeX size={22} earned />
          <span style={{ color: WHITE, fontSize: 12, fontWeight: 800 }}>pluxee</span>
          <span style={{ color: CYAN, fontSize: 11 }}>Backoffice & Sales Tool</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Clients", "Contracts", "Demo Mode", "Analytics"].map((t, i) => (
            <span key={t} style={{ color: i === 2 ? YELLOW : i === 0 ? GREEN : "rgba(255,255,255,0.4)",
              fontSize: 10, fontWeight: i === 0 || i === 2 ? 700 : 400,
              background: i === 2 ? `${YELLOW}22` : "transparent",
              borderRadius: 4, padding: i === 2 ? "2px 6px" : 0 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        {/* ARR strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
          {[
            { label: "Total ARR", val: "€1.4M", color: GREEN },
            { label: "Active Clients", val: "87", color: CYAN },
            { label: "Demo Sessions", val: "23 this month", color: YELLOW },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background: `${color}12`, border: `1px solid ${color}30`,
              borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ color: SLATED, fontSize: 9, marginBottom: 3 }}>{label}</div>
              <div style={{ color: NAVY, fontSize: 15, fontWeight: 900 }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Clients table */}
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 80px 70px 90px 80px",
            padding: "7px 10px", background: "#F8FAFC", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            {["Client", "Employees", "Status", "Plan", "ARR"].map(h => (
              <span key={h} style={{ color: SLATED, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
            ))}
          </div>
          {clients.map(({ name, employees, status, plan, arr }, i) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "1.4fr 80px 70px 90px 80px",
              padding: "8px 10px", background: i % 2 === 0 ? WHITE : "#FAFBFC",
              borderBottom: i < clients.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
              alignItems: "center" }}>
              <span style={{ color: NAVY, fontSize: 11.5, fontWeight: 600 }}>{name}</span>
              <span style={{ color: SLATED, fontSize: 11 }}>{employees}</span>
              <span style={{ background: `${statusColor(status)}20`, color: statusColor(status),
                fontSize: 9.5, fontWeight: 700, borderRadius: 20, padding: "2px 8px",
                display: "inline-block" }}>{status}</span>
              <span style={{ color: SLATED, fontSize: 11 }}>{plan}</span>
              <span style={{ color: NAVY, fontSize: 11, fontWeight: 700 }}>{arr}</span>
            </div>
          ))}
        </div>
        {/* Demo mode banner */}
        <div style={{ background: `${YELLOW}20`, border: `1.5px solid ${YELLOW}60`, borderRadius: 9,
          padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: NAVY, fontWeight: 800, fontSize: 12 }}>⭐ Interactive Demo Mode</div>
            <div style={{ color: SLATED, fontSize: 11 }}>Live sandbox for sales pitches — pre-loaded with sample data</div>
          </div>
          <div style={{ background: NAVY, borderRadius: 7, padding: "6px 12px" }}>
            <span style={{ color: GREEN, fontSize: 11, fontWeight: 700 }}>Launch Demo →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Password gate ── */
interface GateProps {
  onUnlock: () => void;
}
function PasswordGate({ onUnlock }: GateProps) {
  const [formTab, setFormTab] = useState<"password" | "request">("password");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError("Incorrect password. Request access below if you need it.");
    }
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: NAVY, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px 24px",
      position: "relative", overflow: "hidden" }}>
      {/* Background blurred screenshot collage */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex",
        gap: 16, justifyContent: "center", alignItems: "center", opacity: 0.08,
        filter: "blur(16px) saturate(0.4)", pointerEvents: "none", transform: "scale(1.1)" }}>
        <img src={homepageImg} alt="" style={{ width: 160, height: 320, objectFit: "cover", borderRadius: 20 }} />
        <img src={walletImg} alt="" style={{ width: 160, height: 320, objectFit: "cover", borderRadius: 20 }} />
        <img src={awardsListImg} alt="" style={{ width: 160, height: 320, objectFit: "cover", borderRadius: 20 }} />
      </div>
      {/* Grid bg */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${GREEN} 1px, transparent 1px), linear-gradient(90deg, ${GREEN} 1px, transparent 1px)`,
        backgroundSize: "44px 44px" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <PluxeeX size={40} earned />
            <span style={{ color: WHITE, fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>pluxee</span>
          </div>
          {/* NDA badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
            background: `${CORAL}18`, border: `1.5px solid ${CORAL}50`,
            borderRadius: 24, padding: "5px 14px", marginBottom: 16 }}>
            <Lock size={11} color={CORAL} />
            <span style={{ color: CORAL, fontSize: 11, fontWeight: 700 }}>Confidential · NDA Protected</span>
          </div>
          <h1 style={{ color: WHITE, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900,
            lineHeight: 1.15, marginBottom: 8 }}>
            Pluxee Benefits Platform
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13.5, lineHeight: 1.65 }}>
            This case study is protected under NDA. Enter your access password or request access from the designer.
          </p>
        </div>

        {/* Gate card */}
        <div style={{ background: WHITE, borderRadius: 16, overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
          {/* Green top accent */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${GREEN}, ${CYAN})` }} />

          {/* Tab switcher */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { id: "password" as const, icon: <Lock size={12} />, label: "Enter Password" },
              { id: "request"  as const, icon: <Mail size={12} />, label: "Request Access" },
            ].map(({ id, icon, label }) => (
              <button key={id} onClick={() => setFormTab(id)}
                style={{ flex: 1, padding: "12px 0", fontSize: 11.5, fontWeight: 700,
                  color: formTab === id ? NAVY : SLATED,
                  borderBottom: `2px solid ${formTab === id ? GREEN : "transparent"}`,
                  background: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                {icon}{label}
              </button>
            ))}
          </div>

          <div style={{ padding: "24px 24px 20px" }}>
            {formTab === "password" && (
              <form onSubmit={handleUnlock} noValidate>
                <p style={{ color: SLATED, fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
                  Enter the access password to unlock the full case study content and design process.
                </p>
                <label style={{ display: "block", color: NAVY, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <input type={showPw ? "text" : "password"} value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter access password…"
                    aria-invalid={!!error} aria-describedby={error ? "pw-err" : undefined}
                    style={{ width: "100%", padding: "11px 40px 11px 14px", border: `1.5px solid ${error ? CORAL : "rgba(0,0,0,0.15)"}`,
                      borderRadius: 8, fontSize: 14, color: NAVY, outline: "none", boxSizing: "border-box",
                      background: WHITE, fontFamily: "inherit" }} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: SLATED, padding: 0 }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error && (
                  <p id="pw-err" role="alert" style={{ color: CORAL, fontSize: 12,
                    display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                    <AlertCircle size={13} />{error}
                  </p>
                )}
                <button type="submit" style={{ width: "100%", background: NAVY, color: WHITE,
                  padding: "12px", borderRadius: 8, fontWeight: 800, fontSize: 13,
                  border: "none", cursor: "pointer", letterSpacing: "0.05em" }}>
                  Unlock Case Study →
                </button>
                <p style={{ color: "rgba(0,0,0,0.3)", fontSize: 11, textAlign: "center", marginTop: 10 }}>
                  🔒 Password shared under NDA agreement
                </p>
              </form>
            )}

            {formTab === "request" && (
              submitted ? (
                <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
                  <CheckCircle2 size={48} color={GREEN} style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontWeight: 700, color: NAVY, fontSize: 16, marginBottom: 6 }}>Request Sent!</p>
                  <p style={{ color: SLATED, fontSize: 13, lineHeight: 1.6 }}>
                    Your access request has been received. The designer will respond to{" "}
                    <strong>{form.email}</strong> within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequest} noValidate>
                  <p style={{ color: SLATED, fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
                    Fill in the form and the designer will review your request and get back to you.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { id: "req-name", label: "Full Name *", key: "name", type: "text", ph: "Jane Smith" },
                      { id: "req-email", label: "Work Email *", key: "email", type: "email", ph: "jane@company.com" },
                      { id: "req-company", label: "Company", key: "company", type: "text", ph: "Acme Ltd." },
                    ].map(({ id, label, key, type, ph }) => (
                      <div key={key}>
                        <label htmlFor={id} style={{ display: "block", color: NAVY, fontSize: 10.5,
                          fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>
                          {label}
                        </label>
                        <input id={id} type={type} placeholder={ph}
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          style={{ width: "100%", padding: "10px 12px", border: "1.5px solid rgba(0,0,0,0.13)",
                            borderRadius: 7, fontSize: 13, color: NAVY, outline: "none",
                            boxSizing: "border-box", fontFamily: "inherit" }} />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="req-msg" style={{ display: "block", color: NAVY, fontSize: 10.5,
                        fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>
                        Reason for Access *
                      </label>
                      <textarea id="req-msg" rows={3} placeholder="I'm a recruiter / hiring manager interested in…"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{ width: "100%", padding: "10px 12px", border: "1.5px solid rgba(0,0,0,0.13)",
                          borderRadius: 7, fontSize: 13, color: NAVY, outline: "none",
                          boxSizing: "border-box", resize: "none", fontFamily: "inherit" }} />
                    </div>
                  </div>
                  {formError && (
                    <p role="alert" style={{ color: CORAL, fontSize: 12,
                      display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                      <AlertCircle size={13} />{formError}
                    </p>
                  )}
                  <button type="submit" style={{ width: "100%", background: GREEN, color: NAVY,
                    padding: "12px", borderRadius: 8, fontWeight: 800, fontSize: 13,
                    border: "none", cursor: "pointer", letterSpacing: "0.05em", marginTop: 14 }}>
                    Send Access Request
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
type ActiveTab = "workshop" | "app" | "hr" | "backoffice";

const APP_SCREENS = [
  { img: homepageImg,    alt: "Pluxee home — Hall of Fame & activity feed",  label: "Home Feed" },
  { img: recognitionImg, alt: "Recognition tab — Awards & send recognition", label: "Recognition" },
  { img: sendThanksImg,  alt: "Send thanks — recognition card selection",    label: "Send Thanks" },
  { img: successMsgImg,  alt: "Success — recognition shared confirmation",   label: "All Done!" },
  { img: walletImg,      alt: "Wallet — available & reward points",          label: "Wallet" },
  { img: walletRedeemImg,alt: "Wallet redeem — QR code & PIN",              label: "Redeem" },
  { img: awardsListImg,  alt: "Awards grid — my awards & team awards",       label: "Awards Grid" },
  { img: awardDetailImg, alt: "Award detail — top performer badge",          label: "Award Detail" },
];

const SCREEN_NOTES: Record<number, { title: string; points: string[] }> = {
  0: { title: "Home Feed", points: [
    "Hall of Fame carousel surfaces celebrated colleagues at a glance.",
    "Activity feed shows live recognition events with relationship context ('We are a team').",
    "Announcements carousel uses editorial photography and bold product copy.",
    "Bottom nav gives equal weight to Home, Recognition, Redeem, Benefits, Account.",
  ]},
  1: { title: "Recognition Hub", points: [
    "Award badges are shown in earned (neon green) vs locked (grey) states.",
    "Program values carousel links company culture pillars to recognition categories.",
    "4 send-recognition types: Thanks, Nomination, Birthday, Long Service.",
    "Colour-coded type tiles create instant visual scanning for the correct action.",
  ]},
  2: { title: "Send Thanks Card Picker", points: [
    "4 coloured card templates map to company values: Innovation, Teamwork, Development, Top Performance.",
    "Template / Customize tab pattern allows personal message option without friction.",
    "Corner accent triangles add brand geometry consistent with Pluxee's X mark language.",
    "Clear Continue / Cancel CTA hierarchy keeps the flow unambiguous.",
  ]},
  3: { title: "Success Confirmation", points: [
    "Yellow bottom sheet over blurred background creates a celebratory moment pause.",
    "Cyan Pluxee X mark reinforces brand in the highest-emotion screen.",
    "'All Done!' copy is energetic and peer-to-peer in tone.",
    "'Who will you recognize next?' nudge encourages repeat engagement loops.",
  ]},
  4: { title: "Wallet Overview", points: [
    "Three distinct point buckets: Available (redeem), To Reward (send), Rewarded (history).",
    "Neon green card rows create strong visual affordance for action.",
    "Dark navy CTA buttons stand out on the green surfaces for high contrast.",
    "Three lifestyle banner cards cross-sell Pluxee partner benefits below the fold.",
  ]},
  5: { title: "Redeem Points", points: [
    "Cyan bottom sheet provides a clear visual mode switch for the redeem flow.",
    "Dual redemption methods: QR code scan OR 6-digit PIN for flexibility.",
    "Large QR code ensures easy scanning in real-world partner retail scenarios.",
    "Point balance re-confirmed at top of the modal to reduce anxiety before commitment.",
  ]},
  6: { title: "Awards Grid", points: [
    "3-column grid presents full badge catalogue at a glance.",
    "Earned badges (green background) vs locked (grey) create instant progress reading.",
    "Dates on earned badges reinforce the memory and celebration of achievement.",
    "'My awards' / 'Team awards' tabs enable both personal pride and team visibility.",
  ]},
  7: { title: "Award Detail", points: [
    "Full-screen badge with project context makes the award meaningful, not just symbolic.",
    "Point value ('200 points were awarded') connects the badge to tangible wallet value.",
    "Share CTA turns individual recognition into social proof across the team.",
    "Clean white background with large badge imagery makes this a trophy-case moment.",
  ]},
};

export default function PluxeeCaseStudy({ onClose }: { onClose: () => void }) {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<ActiveTab>("workshop");
  const [screenIdx, setScreenIdx] = useState(0);
  const { isProtected, verifyPassword } = usePasswordProtection();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <button onClick={onClose} aria-label="Close"
          className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none"
          style={{ background: NAVY2, color: WHITE, borderRadius: "50%", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          <X size={18} />
        </button>
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </div>
    );
  }

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: "workshop",   label: "1. Onsite Co-Creation" },
    { id: "app",        label: "2. Mobile App" },
    { id: "hr",         label: "3. HR Portal" },
    { id: "backoffice", label: "4. Backoffice & Sales" },
  ];

  if (isProtected) {
    return <PasswordModal onSubmit={verifyPassword} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "#F0F4F8", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Close */}
      <button onClick={onClose} aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none"
        style={{ background: NAVY, color: WHITE, borderRadius: "50%", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(150deg, ${NAVY2} 0%, ${NAVY} 60%, ${NAVY3} 100%)`,
        padding: "72px 24px 56px", position: "relative", overflow: "hidden" }}
        className="lg:px-16">
        {/* Grid bg */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${GREEN} 1px, transparent 1px), linear-gradient(90deg, ${GREEN} 1px, transparent 1px)`,
          backgroundSize: "44px 44px" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: -80, right: -80,
          width: 320, height: 320, borderRadius: "50%", background: `${GREEN}10` }} />

        <div className="relative max-w-6xl mx-auto">
          {/* NDA badge + ecosystem badge */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
              background: `${CORAL}18`, border: `1.5px solid ${CORAL}50`,
              borderRadius: 24, padding: "5px 12px" }}>
              <Shield size={11} color={CORAL} />
              <span style={{ color: CORAL, fontSize: 11, fontWeight: 700 }}>Confidential · NDA Protected</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
              background: `${GREEN}18`, border: `1.5px solid ${GREEN}45`,
              borderRadius: 24, padding: "5px 12px" }}>
              <span style={{ color: GREEN, fontSize: 11, fontWeight: 700 }}>
                🌐 3 Connected Interfaces: Mobile App + HR Web Portal + Sales Backoffice
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div style={{ flex: 1 }}>
              {/* Pluxee wordmark */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <PluxeeX size={36} earned />
                <span style={{ color: WHITE, fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em" }}>pluxee</span>
              </div>
              <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                color: WHITE, fontWeight: 900, lineHeight: 1.06, marginBottom: 14 }}>
                Transforming Employee<br />
                <span style={{ color: GREEN }}>Recognition</span> &{" "}
                <span style={{ color: CYAN }}>Benefits</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 15.5, lineHeight: 1.75,
                maxWidth: 500, marginBottom: 28 }}>
                Designing an interconnected 3-tier digital ecosystem through onsite co-creation workshops: Employee Mobile App, Client HR Portal, and Pluxee Commercial Backoffice.
              </p>
              {/* Meta pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {[
                  { label: "Role",    value: "Lead UX/UI Designer & Workshop Facilitator" },
                  { label: "Client",  value: "Pluxee Benefits" },
                  { label: "Scope",   value: "Onsite Workshops · Mobile · Web Portal · Backoffice" },
                  { label: "Methods", value: "Co-creation · Rapid Prototyping · Usability Testing" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, padding: "7px 12px" }}>
                    <div style={{ color: GREEN, fontSize: 8.5, letterSpacing: "0.3em",
                      textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>{label}</div>
                    <div style={{ color: WHITE, fontSize: 11.5, fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>
              {/* Metrics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { icon: "📱", val: "3",     lbl: "Connected platforms designed" },
                  { icon: "🏆", val: "12",    lbl: "Award badge types designed" },
                  { icon: "🌿", val: "87",    lbl: "Enterprise clients onboarded" },
                ].map(({ icon, val, lbl }) => (
                  <div key={val} style={{ background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${GREEN}25`, borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{icon}</div>
                    <div style={{ color: GREEN, fontSize: "clamp(1.4rem,2.5vw,2rem)",
                      fontWeight: 900, lineHeight: 1 }}>{val}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* 3 phone preview strip */}
            <div className="hidden lg:flex items-end gap-4 flex-shrink-0" style={{ paddingBottom: 4 }}>
              {[
                { img: homepageImg,   alt: "Home",   scale: 0.82, mt: 24 },
                { img: recognitionImg,alt: "Awards", scale: 1,    mt: 0  },
                { img: walletImg,     alt: "Wallet", scale: 0.82, mt: 24 },
              ].map(({ img, alt, scale, mt }) => (
                <div key={alt} style={{ flexShrink: 0, transform: `scale(${scale})`, marginTop: mt,
                  transformOrigin: "bottom center" }}>
                  <PhoneFrame src={img} alt={alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY TABS ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: NAVY2,
        borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {tabs.map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className="focus-visible:outline-none transition-all duration-200 whitespace-nowrap"
                style={{ padding: "14px 18px", fontSize: 12, fontWeight: 700,
                  color: tab === id ? GREEN : "rgba(255,255,255,0.4)",
                  borderBottom: `2px solid ${tab === id ? GREEN : "transparent"}`,
                  background: "transparent", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB 1: WORKSHOP ── */}
      {tab === "workshop" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
            fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Onsite Co-Creation</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: NAVY, fontWeight: 800, marginBottom: 40, lineHeight: 1.15 }}>
            Sticky notes on glass.<br /><span style={{ color: GREEN }}>Insights that shaped everything.</span>
          </h2>

          {/* Workshop hero photo */}
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 40,
            boxShadow: "0 8px 48px rgba(0,0,0,0.15)", position: "relative" }}>
            <img src={workshopImg} alt="Onsite workshop — sticky note affinity mapping on glass wall at Pluxee"
              style={{ width: "100%", maxHeight: 520, objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
            {/* Caption overlay */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(18,15,56,0.85))",
              padding: "40px 24px 20px" }}>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                Onsite Workshop — Pluxee Innovation Room, UK
              </div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
                Multi-day affinity mapping & user journey sessions with HR leads, sales reps, and end-users
              </div>
            </div>
            {/* NDA overlay tag */}
            <div style={{ position: "absolute", top: 14, left: 14,
              display: "flex", alignItems: "center", gap: 5,
              background: `${CORAL}cc`, borderRadius: 20, padding: "4px 10px" }}>
              <Lock size={10} color={WHITE} />
              <span style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>NDA · Client Confidential</span>
            </div>
          </div>

          {/* Sticky notes detail callouts */}
          <div style={{ background: NAVY, borderRadius: 14, padding: "20px 22px", marginBottom: 36 }}>
            <div style={{ color: SLATED, fontSize: 10, fontFamily: "monospace",
              letterSpacing: "0.15em", marginBottom: 14 }}>// Workshop insights captured on glass wall</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { text: "Endorse recognition", color: YELLOW },
                { text: "Create feedback culture", color: YELLOW },
                { text: "Send recognition", color: YELLOW },
                { text: "I want to recognise & honor my team", color: YELLOW },
                { text: "Recognize team (internal & external)", color: YELLOW },
                { text: "Connect KPIs / values to recognition", color: YELLOW },
                { text: "Insights help me improve", color: YELLOW },
                { text: "Overview of team's recognition", color: YELLOW },
                { text: "Reminders / automated recognition", color: YELLOW },
                { text: "Need to change a small reward", color: YELLOW },
                { text: "Renew things available to share", color: YELLOW },
              ].map(({ text, color }) => (
                <div key={text} style={{ background: color, borderRadius: 2, padding: "7px 10px",
                  fontSize: 11.5, fontWeight: 700, color: NAVY, boxShadow: "2px 3px 8px rgba(0,0,0,0.3)",
                  transform: `rotate(${(Math.abs(text.charCodeAt(0)) % 5) - 2}deg)`,
                  display: "inline-block" }}>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* 3 process pillars */}
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                day: "Day 1–2",
                icon: <Users size={20} color={GREEN} />,
                color: GREEN,
                title: "Onsite Brainstorming & Journey Mapping",
                desc: "Facilitated multi-day alignment sessions directly in the client's innovation room. Mapped complex user journeys using sticky notes, affinity diagrams, and process walls across three distinct user groups.",
                outputs: ["User journey maps × 3 personas", "Affinity clusters × 11 themes", "Opportunity backlog × 28 items"],
              },
              {
                day: "Day 3–4",
                icon: <TrendingUp size={20} color={CYAN} />,
                color: CYAN,
                title: "Stakeholder Alignment & Prioritisation",
                desc: "Brought together HR leads, commercial sales representatives, and end-users to align business requirements with real employee needs. Ran MoSCoW prioritisation and How Might We exercises.",
                outputs: ["Feature priority matrix", "3-pillar ecosystem architecture", "Success metric definitions"],
              },
              {
                day: "Day 5+",
                icon: <Award size={20} color={YELLOW} />,
                color: YELLOW,
                title: "Iterative Usability Testing",
                desc: "Conducted live, in-person testing sessions with prototypes. Refined micro-copy, reward redemption flows, and recognition card templates based on direct, unmoderated user feedback loops.",
                outputs: ["3 prototype iterations", "Usability report × 48 findings", "Recognition flow optimised by 40%"],
              },
            ].map(({ day, icon, color, title, desc, outputs }) => (
              <div key={day} style={{ background: WHITE, borderRadius: 14, overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ height: 4, background: color }} />
                <div style={{ padding: "18px 18px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, background: `${color}15`, borderRadius: 9,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                    <div style={{ background: `${color}15`, border: `1px solid ${color}30`,
                      borderRadius: 6, padding: "2px 8px", color, fontSize: 10, fontWeight: 700 }}>{day}</div>
                  </div>
                  <h3 style={{ color: NAVY, fontSize: 15, fontWeight: 800, marginBottom: 8, lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ color: SLATED, fontSize: 12.5, lineHeight: 1.7, marginBottom: 12 }}>{desc}</p>
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 10 }}>
                    {outputs.map(o => (
                      <div key={o} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color,
                          marginTop: 5, flexShrink: 0 }} />
                        <span style={{ color: SLATED, fontSize: 12 }}>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB 2: MOBILE APP ── */}
      {tab === "app" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
            fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Employee Mobile App</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: NAVY, fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
            Recognition, rewards, and belonging<br /><span style={{ color: GREEN }}>in one pocket-sized experience.</span>
          </h2>

          {/* Screen thumbnail strip */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
            {APP_SCREENS.map(({ img, alt, label }, i) => (
              <button key={i} onClick={() => setScreenIdx(i)}
                className="focus-visible:outline-none transition-all"
                style={{ flexShrink: 0, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
                <div style={{ width: 72, borderRadius: 14, overflow: "hidden",
                  border: `2.5px solid ${screenIdx === i ? GREEN : "rgba(0,0,0,0.10)"}`,
                  boxShadow: screenIdx === i ? `0 0 0 3px ${GREEN}30` : "none",
                  transition: "all 0.2s" }}>
                  <img src={img} alt={alt} style={{ width: "100%", aspectRatio: "9/18",
                    objectFit: "cover", objectPosition: "top", display: "block" }} />
                </div>
                <div style={{ color: screenIdx === i ? GREEN : SLATED, fontSize: 10,
                  fontWeight: screenIdx === i ? 700 : 400, marginTop: 5, textAlign: "center" }}>{label}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Phone */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <PhoneFrame src={APP_SCREENS[screenIdx].img} alt={APP_SCREENS[screenIdx].alt} />
              {/* Prev/Next */}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setScreenIdx(i => Math.max(0, i - 1))}
                  disabled={screenIdx === 0}
                  style={{ padding: "7px 14px", borderRadius: 7, border: "1.5px solid rgba(0,0,0,0.12)",
                    background: WHITE, color: screenIdx === 0 ? "#CBD5E1" : NAVY,
                    fontSize: 11.5, fontWeight: 700, cursor: screenIdx === 0 ? "default" : "pointer" }}>
                  ← Prev
                </button>
                <button onClick={() => setScreenIdx(i => Math.min(APP_SCREENS.length - 1, i + 1))}
                  disabled={screenIdx === APP_SCREENS.length - 1}
                  style={{ padding: "7px 14px", borderRadius: 7,
                    border: `1.5px solid ${screenIdx === APP_SCREENS.length - 1 ? "rgba(0,0,0,0.08)" : GREEN}`,
                    background: screenIdx === APP_SCREENS.length - 1 ? "rgba(0,0,0,0.04)" : GREEN,
                    color: screenIdx === APP_SCREENS.length - 1 ? "#CBD5E1" : NAVY,
                    fontSize: 11.5, fontWeight: 700, cursor: screenIdx === APP_SCREENS.length - 1 ? "default" : "pointer" }}>
                  Next →
                </button>
              </div>
              <span style={{ color: SLATED, fontSize: 11 }}>Screen {screenIdx + 1} of {APP_SCREENS.length}</span>
            </div>

            {/* Annotation panel */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
                background: `${GREEN}12`, border: `1px solid ${GREEN}30`,
                borderRadius: 20, padding: "4px 11px", marginBottom: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN }} />
                <span style={{ color: GREEN, fontSize: 11, fontWeight: 700 }}>
                  {APP_SCREENS[screenIdx].label}
                </span>
              </div>
              <h3 style={{ color: NAVY, fontSize: 20, fontWeight: 800, marginBottom: 14, lineHeight: 1.25 }}>
                {SCREEN_NOTES[screenIdx].title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {SCREEN_NOTES[screenIdx].points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start",
                    background: WHITE, borderRadius: 8, padding: "10px 12px",
                    border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: GREEN,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: NAVY, fontSize: 10, fontWeight: 900 }}>{i + 1}</span>
                    </div>
                    <p style={{ color: SLATED, fontSize: 13, lineHeight: 1.65 }}>{pt}</p>
                  </div>
                ))}
              </div>

              {/* Recognition card palette (only show on screen 2) */}
              {screenIdx === 2 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: SLATED, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                    textTransform: "uppercase", marginBottom: 10 }}>Recognition Card Templates</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <RecognitionCard bg={PINK}    label="Innovation" icon="💡" text="You consistently ignite creativity to solve problems innovatively." />
                    <RecognitionCard bg={LBLUE}   label="Client Focus" icon="🚀" text="You have a masterful touch in tailoring solutions to client needs." />
                    <RecognitionCard bg={LGREEN}  label="Teamwork" icon="🤝" text="You are the catalyst for a welcoming and inclusive team environment." />
                    <RecognitionCard bg={LYELLOW} label="Development" icon="🎓" text="You cultivate a spirit of learning and continuous improvement." />
                  </div>
                </div>
              )}

              {/* Awards grid (only on screen 6) */}
              {screenIdx === 6 && (
                <div style={{ background: WHITE, borderRadius: 12, padding: "14px 14px",
                  border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ color: SLATED, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                    textTransform: "uppercase", marginBottom: 10 }}>Award Badge Types</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                    {[
                      { name: "Top Performer", earned: true },
                      { name: "There For You", earned: true },
                      { name: "Problem Solver", earned: false },
                      { name: "Feedback Wand", earned: false },
                      { name: "Superachiever", earned: false },
                      { name: "Colleague Care", earned: false },
                      { name: "Thought Leader", earned: false },
                      { name: "Innovation Hero", earned: false },
                    ].map(({ name, earned }) => (
                      <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <PluxeeX size={36} earned={earned} />
                        <span style={{ color: SLATED, fontSize: 9, textAlign: "center", lineHeight: 1.3 }}>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 3: HR PORTAL ── */}
      {tab === "hr" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
            fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Pillar B · HR Web Portal</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: NAVY, fontWeight: 800, marginBottom: 14, lineHeight: 1.2 }}>
            Empowering HR managers to run<br /><span style={{ color: GREEN }}>recognition programs at scale.</span>
          </h2>
          <p style={{ color: SLATED, fontSize: 14.5, lineHeight: 1.75, maxWidth: 580, marginBottom: 36 }}>
            The HR Portal gives contracting companies full visibility and control over their Pluxee benefits program — from budget allocation and team engagement analytics to individual milestone tracking and automated recognition scheduling.
          </p>
          <div style={{ marginBottom: 36 }}>
            <HRDashboard />
          </div>
          {/* Key capabilities */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, color: GREEN,  title: "Engagement Analytics",     desc: "Real-time dashboards tracking recognition volume, redemption rate, and peer-to-peer activity by team." },
              { icon: Users,      color: CYAN,   title: "Employee Milestones",       desc: "Automated birthday and work anniversary recognitions with customisable card templates and point awards." },
              { icon: Shield,     color: YELLOW, title: "Budget Management",         desc: "Granular budget allocation per team, spend tracking, and automated alerts before budget depletion." },
              { icon: Award,      color: CORAL,  title: "Recognition Reporting",     desc: "Exportable reports for payroll, compliance, and board-level reporting on program ROI and participation." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} style={{ background: WHITE, borderRadius: 12, padding: "16px 16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ width: 36, height: 36, background: `${color}12`, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ color: NAVY, fontWeight: 700, fontSize: 13, marginBottom: 5 }}>{title}</div>
                <p style={{ color: SLATED, fontSize: 12, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB 4: BACKOFFICE ── */}
      {tab === "backoffice" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
            fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Pillar C · Backoffice & Sales Tool</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: NAVY, fontWeight: 800, marginBottom: 14, lineHeight: 1.2 }}>
            One tool. Two jobs:<br />
            <span style={{ color: CYAN }}>Client support</span> &{" "}
            <span style={{ color: YELLOW }}>sales conversion.</span>
          </h2>
          <p style={{ color: SLATED, fontSize: 14.5, lineHeight: 1.75, maxWidth: 600, marginBottom: 36 }}>
            A dual-purpose platform enabling Pluxee support agents to manage client accounts in real time, while simultaneously equipping commercial sales teams with an interactive live demo mode to close new enterprise deals.
          </p>
          <div style={{ marginBottom: 36 }}>
            <BackofficeDashboard />
          </div>
          {/* Dual purpose callout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                label: "Support Mode", color: CYAN,
                icon: <Shield size={18} color={CYAN} />,
                title: "Client Account Management",
                items: [
                  "Full client account view with contract status, plan details, and renewal dates",
                  "Employee data management: onboard, offboard, and update profiles",
                  "Point allocation and balance adjustments with audit trail",
                  "Issue tracking and SLA-monitored resolution workflows",
                ],
              },
              {
                label: "Sales Mode", color: YELLOW,
                icon: <TrendingUp size={18} color={YELLOW} />,
                title: "Interactive Demo Mode",
                items: [
                  "Pre-loaded sandbox with sample enterprise data for live pitch sessions",
                  "Configurable demo scenarios matching prospect's industry and size",
                  "Side-by-side ROI calculator comparing manual vs Pluxee-powered recognition",
                  "One-click proposal generator exporting to PDF or Slides",
                ],
              },
            ].map(({ label, color, icon, title, items }) => (
              <div key={label} style={{ background: WHITE, borderRadius: 14, overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ height: 4, background: color }} />
                <div style={{ padding: "18px 18px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, background: `${color}15`, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                    <div>
                      <div style={{ color, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                        textTransform: "uppercase" }}>{label}</div>
                      <div style={{ color: NAVY, fontSize: 14, fontWeight: 800 }}>{title}</div>
                    </div>
                  </div>
                  {items.map(item => (
                    <div key={item} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color,
                        marginTop: 5, flexShrink: 0 }} />
                      <p style={{ color: SLATED, fontSize: 12.5, lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── IMPACT ── */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY2} 0%, ${NAVY} 100%)` }}
        className="px-6 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <span style={{ color: GREEN, fontSize: 10, letterSpacing: "0.35em", fontWeight: 700,
            textTransform: "uppercase", display: "block", marginBottom: 14, fontFamily: "monospace" }}>
            {"// business_impact"}
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: WHITE,
            fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
            <span style={{ color: GREEN }}>Recognised.</span>{" "}
            <span style={{ color: YELLOW }}>Rewarded.</span>{" "}
            <span style={{ color: CYAN }}>Retained.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75,
            marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            A co-created, tested, and shipped ecosystem that transformed how enterprises manage employee benefits and recognition — from scattered spreadsheets to a unified, engaging digital experience.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 14, marginBottom: 44 }}>
            {[
              { val: "↓ HR Admin", lbl: "Streamlined benefit distribution reduced manual overhead", icon: "📋" },
              { val: "↑ Engagement", lbl: "Peer recognition participation increased across teams", icon: "🏆" },
              { val: "Sales Tool", lbl: "Interactive demo mode boosted enterprise deal conversion", icon: "💼" },
            ].map(({ val, lbl, icon }) => (
              <div key={val} style={{ background: "rgba(255,255,255,0.05)",
                border: `1px solid ${GREEN}20`, borderRadius: 12, padding: "22px 14px",
                position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: GREEN }} aria-hidden="true" />
                <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                <div style={{ color: GREEN, fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>{val}</div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.5 }}>{lbl}</p>
              </div>
            ))}
          </div>
          {/* Compliance pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 44 }}>
            {["WCAG 2.2 AA Compliant", "GDPR-compliant data handling", "OutSystems ODC architecture", "Co-created with end-users"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6,
                background: `${GREEN}10`, border: `1px solid ${GREEN}25`,
                borderRadius: 20, padding: "5px 12px" }}>
                <CheckCircle2 size={12} color={GREEN} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{t}</span>
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="hover:opacity-90 transition-opacity focus-visible:outline-white"
            style={{ background: GREEN, color: NAVY, padding: "14px 36px", borderRadius: 6,
              fontWeight: 800, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8 }}>
            Back to Portfolio <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
