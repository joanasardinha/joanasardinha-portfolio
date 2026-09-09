import { useState, useEffect } from "react";
import {
  X, ArrowRight, Zap, Users, Clock, CheckCircle,
  Shield, Brain, Wifi, Cpu, FileText,
} from "lucide-react";
import { usePasswordProtection } from "../hooks/usePasswordProtection";
import PasswordModal from "./PasswordModal";
import kioskImg from "../imports/Gemini_Generated_Image_yi0wnsyi0wnsyi0w_1.jpg";
import room304Img from "../imports/hospital-kiosk-ui-step2.jpg";
import nursingImg from "../imports/Gemini_Generated_Image_94rj7h94rj7h94rj_1.jpg";
import screen1Img from "../imports/Hospital_Patient_Intake_Interface-1.jpg";
import screen2Img from "../imports/Hospital_Patient_Intake_Interface-2.jpg";
import screen3Img from "../imports/Hospital_Patient_Intake_Interface-3.jpg";
import screen4Img from "../imports/Hospital_Patient_Intake_Interface-4.jpg";
import kioskStep1Img from "../imports/hospital-kiosk-step1.jpg";

const NAVY  = "#030C23";
const NAVY2 = "#0A1931";
const MINT  = "#00E676";
const BLUE  = "#2563EB";
const OFFWHITE = "#F8FAFC";
const LBLUE = "#EFF6FF";
const AMBER = "#F59E0B";
const SLATE = "#64748B";

/* ── QR code SVG ── */
function QRCode({ size = 72 }: { size?: number }) {
  const dots: [number, number][] = [
    [8,1],[9,1],[10,2],[11,1],[12,3],[8,3],[10,3],
    [8,5],[10,5],[12,5],[9,4],[11,4],[8,7],[10,7],
    [12,7],[9,8],[11,6],[12,8],[8,9],[10,9],[11,9],
    [9,10],[11,11],[8,11],[12,10],[10,11],[12,12],
    [8,12],[9,12],[1,8],[2,8],[3,8],[4,8],[5,8],
    [1,10],[3,10],[5,10],[1,12],[2,12],[3,12],[4,12],[5,12],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ display: "block" }}>
      <rect x="0" y="0" width="14" height="14" fill="white" />
      {/* TL finder */}
      <rect x="0" y="0" width="5" height="5" fill={NAVY} />
      <rect x=".6" y=".6" width="3.8" height="3.8" fill="white" />
      <rect x="1.3" y="1.3" width="2.4" height="2.4" fill={NAVY} />
      {/* TR finder */}
      <rect x="9" y="0" width="5" height="5" fill={NAVY} />
      <rect x="9.6" y=".6" width="3.8" height="3.8" fill="white" />
      <rect x="10.3" y="1.3" width="2.4" height="2.4" fill={NAVY} />
      {/* BL finder */}
      <rect x="0" y="9" width="5" height="5" fill={NAVY} />
      <rect x=".6" y="9.6" width="3.8" height="3.8" fill="white" />
      <rect x="1.3" y="10.3" width="2.4" height="2.4" fill={NAVY} />
      {/* data dots */}
      {dots.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={cx * 0.95} y={cy * 0.95} width={0.7} height={0.7} fill={NAVY} />
      ))}
    </svg>
  );
}

/* ── phone shell ── */
function Phone({ children, bg = "white" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: 176, height: 356, borderRadius: 32, overflow: "hidden",
      background: bg, boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
      border: "4px solid rgba(255,255,255,0.08)", flexShrink: 0, position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 52, height: 9, background: "#000", borderRadius: "0 0 12px 12px", zIndex: 10,
      }} aria-hidden="true" />
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

/* ── mobile screens ── */

function ScreenUpload() {
  return (
    <Phone>
      {/* Header */}
      <div style={{ background: NAVY2, padding: "16px 12px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <div style={{ width: 18, height: 18, background: BLUE, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>⚡</span>
          </div>
          <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>Hospital Admission</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 6.5, marginBottom: 4 }}>STEP 1 OF 3 · 33%</div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2 }}>
          <div style={{ width: "33%", height: "100%", background: BLUE, borderRadius: 2 }} />
        </div>
      </div>
      {/* Body */}
      <div style={{ background: "white", flex: 1, padding: "10px 10px 6px", overflow: "hidden" }}>
        <div style={{ color: BLUE, fontSize: 7, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 4 }}>DOCUMENTS</div>
        <div style={{ color: NAVY, fontSize: 14, fontWeight: 900, lineHeight: 1.15, marginBottom: 4 }}>Upload<br />Documents</div>
        <div style={{ color: SLATE, fontSize: 7, marginBottom: 8 }}>Attach your pre-surgery files.</div>
        {[
          { name: "Anesthesia Consultation Report", file: "Anesthesia_Report.pdf · 1.2 MB" },
          { name: "Blood Test & ECG Results", file: "BloodTest_ECG.pdf · 2.4 MB" },
        ].map(({ name, file }) => (
          <div key={name} style={{ border: `1px solid ${MINT}55`, borderRadius: 6, padding: "6px 7px",
            marginBottom: 5, display: "flex", alignItems: "center", gap: 5, background: `${MINT}0a` }}>
            <div style={{ color: SLATE, fontSize: 12, flexShrink: 0 }}>📄</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ background: MINT, borderRadius: 2, padding: "1px 4px", fontSize: 5.5,
                fontWeight: 800, color: "white", display: "inline-block", marginBottom: 2 }}>UPLOADED</span>
              <div style={{ color: NAVY, fontSize: 7, fontWeight: 700, lineHeight: 1.3 }}>{name}</div>
              <div style={{ color: "#94a3b8", fontSize: 6 }}>{file}</div>
            </div>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: MINT, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 9, lineHeight: 1 }}>✓</span>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 5, padding: "5px 6px", background: LBLUE, borderRadius: 5, marginBottom: 6 }}>
          <span style={{ color: BLUE, fontSize: 9, flexShrink: 0 }}>ⓘ</span>
          <span style={{ color: SLATE, fontSize: 6, lineHeight: 1.5 }}>
            Files are encrypted and shared only with your care team. Accepted formats: PDF, JPG, PNG.
          </span>
        </div>
        <div style={{ background: NAVY, borderRadius: 7, padding: "9px", textAlign: "center" }}>
          <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>Continue →</span>
        </div>
      </div>
    </Phone>
  );
}

function ScreenPayment() {
  return (
    <Phone>
      <div style={{ background: NAVY2, padding: "16px 12px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{ color: "white", fontSize: 9 }}>💳</span>
          <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>Hospital Admission</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 6.5, marginBottom: 4 }}>STEP 2 OF 3 · 66%</div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2 }}>
          <div style={{ width: "66%", height: "100%", background: BLUE, borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ background: "white", flex: 1, padding: "10px 10px 6px", overflow: "hidden" }}>
        <div style={{ color: SLATE, fontSize: 7, fontWeight: 600, marginBottom: 4 }}>STEP 2 OF 3</div>
        <div style={{ color: NAVY, fontSize: 15, fontWeight: 900, lineHeight: 1.15, marginBottom: 8 }}>Insurance<br />& Co-pay</div>
        {/* Insurance card */}
        <div style={{ background: NAVY2, borderRadius: 8, padding: "8px 9px", marginBottom: 7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: MINT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 7 }}>✓</span>
            </div>
            <span style={{ color: MINT, fontSize: 6.5, fontWeight: 800, letterSpacing: "0.07em" }}>INSURANCE VERIFIED</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 6 }}>Provider</div>
              <div style={{ color: "white", fontSize: 9, fontWeight: 700 }}>HealthCare Plus</div>
              <div style={{ background: MINT, borderRadius: 20, padding: "2px 6px", display: "inline-block", marginTop: 3 }}>
                <span style={{ color: "white", fontSize: 6, fontWeight: 700 }}>● 90% Covered</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 6 }}>Your Co-pay</div>
              <div style={{ color: "white", fontSize: 18, fontWeight: 900, lineHeight: 1 }}>€120</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 6 }}>.00 due today</div>
            </div>
          </div>
        </div>
        {/* Payment methods */}
        <div style={{ color: SLATE, fontSize: 6.5, fontWeight: 600, letterSpacing: "0.07em", marginBottom: 4 }}>PAYMENT METHOD</div>
        {[
          { label: "🍎 Apple Pay / Google Pay", sub: "Instant, no card needed", active: true },
          { label: "🟠 MB WAY", sub: "Portuguese mobile payments", active: false },
          { label: "💳 Credit / Debit Card", sub: "Visa, Mastercard, Amex", active: false },
        ].map(({ label, sub, active }) => (
          <div key={label} style={{ borderRadius: 6, padding: "5px 7px", marginBottom: 4,
            border: `1.5px solid ${active ? BLUE : "#e2e8f0"}`,
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: NAVY, fontSize: 7, fontWeight: 600 }}>{label}</div>
              <div style={{ color: SLATE, fontSize: 6 }}>{sub}</div>
            </div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${active ? BLUE : "#cbd5e1"}`,
              background: active ? BLUE : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "white" }} />}
            </div>
          </div>
        ))}
        <div style={{ background: NAVY, borderRadius: 7, padding: "8px", textAlign: "center", marginTop: 4 }}>
          <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>Pay €120.00</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <span style={{ color: SLATE, fontSize: 6 }}>🔒 Encrypted payment · PCI DSS compliant</span>
        </div>
      </div>
    </Phone>
  );
}

function ScreenPrinting() {
  return (
    <Phone bg="white">
      <div style={{ background: NAVY2, padding: "16px 12px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{ color: "white", fontSize: 9 }}>⚡</span>
          <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>Hospital Admission</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 6.5, marginBottom: 4 }}>COMPLETE · 100%</div>
        <div style={{ height: 3, background: MINT, borderRadius: 2 }} />
      </div>
      <div style={{ background: "white", flex: 1, padding: "10px 10px 6px" }}>
        {/* Payment verified */}
        <div style={{ border: `1.5px solid ${MINT}55`, borderRadius: 8, padding: "8px 9px",
          background: `${MINT}0a`, display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: MINT,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "white", fontSize: 11 }}>✓</span>
          </div>
          <div>
            <div style={{ color: MINT, fontWeight: 800, fontSize: 9 }}>Payment Verified!</div>
            <div style={{ color: SLATE, fontSize: 7 }}>€120.00 received · HealthCare Plus</div>
          </div>
        </div>
        {/* Kiosk printing illustration */}
        <div style={{ background: NAVY2, borderRadius: 8, padding: "10px", marginBottom: 6,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 50, height: 36, background: "#1a2744", borderRadius: 4, border: `1px solid ${BLUE}50`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${MINT}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: MINT, fontSize: 9 }}>✓</span>
            </div>
          </div>
          <div style={{ width: 40, height: 2, background: MINT, borderRadius: 1 }} />
          <div style={{ width: 44, height: 6, border: `1.5px dashed ${MINT}60`, borderRadius: 2 }} />
        </div>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <span style={{ background: AMBER, color: "white", fontSize: 6.5, fontWeight: 800,
            borderRadius: 20, padding: "2px 8px", display: "inline-block", marginBottom: 6 }}>
            ● PRINTING NOW
          </span>
          <div style={{ color: NAVY, fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Look at the Kiosk screen!</div>
          <div style={{ color: SLATE, fontSize: 7, lineHeight: 1.5 }}>
            Your <strong>wristband</strong> and <strong>ID labels</strong> are printing right now.
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, padding: "6px 8px", background: LBLUE, borderRadius: 5, marginBottom: 6 }}>
          <span style={{ color: BLUE, fontSize: 9 }}>⏱</span>
          <span style={{ color: SLATE, fontSize: 6.5, lineHeight: 1.5 }}>
            Collect your wristband from the <strong>kiosk slot below the screen</strong> before continuing.
          </span>
        </div>
        <div style={{ border: `1.5px solid ${NAVY}`, borderRadius: 7, padding: "8px", textAlign: "center" }}>
          <span style={{ color: NAVY, fontSize: 8, fontWeight: 700 }}>View Room Directions →</span>
        </div>
      </div>
    </Phone>
  );
}

function ScreenComplete() {
  return (
    <Phone bg={NAVY2}>
      <div style={{ background: NAVY, padding: "16px 12px 12px", flexShrink: 0 }}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ background: MINT, borderRadius: 20, padding: "2px 8px",
            fontSize: 6.5, fontWeight: 800, color: "white" }}>● CHECK-IN COMPLETE</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: "white", fontSize: 13, fontWeight: 800, lineHeight: 1.2 }}>
              Good morning,<br />John Silva
            </div>
          </div>
          <div style={{ background: "white", padding: 4, borderRadius: 4 }}>
            <QRCode size={44} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
          {[
            { label: "Procedure", val: "Knee Arthroscopy" },
            { label: "Time", val: "09:30 AM" },
          ].map(({ label, val }) => (
            <div key={label} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 5, padding: "5px 6px" }}>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 6 }}>{label}</div>
              <div style={{ color: "white", fontSize: 7.5, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "white", flex: 1, padding: "9px 9px 6px", overflow: "hidden" }}>
        {/* Room card */}
        <div style={{ border: `1.5px solid ${BLUE}40`, borderRadius: 8, padding: "8px 9px",
          background: LBLUE, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: BLUE, fontSize: 6.5, fontWeight: 600 }}>YOUR ROOM</div>
            <div style={{ color: NAVY, fontSize: 24, fontWeight: 900, lineHeight: 1 }}>304</div>
            <div style={{ color: BLUE, fontSize: 7, fontWeight: 600 }}>Floor 3 · Elevator B</div>
          </div>
          <div style={{ width: 30, height: 30, background: NAVY, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 14 }}>🏠</span>
          </div>
        </div>
        <div style={{ color: SLATE, fontSize: 6.5, fontWeight: 700, letterSpacing: "0.07em", marginBottom: 5 }}>FOLLOW THESE STEPS</div>
        {[
          { step: 1, icon: "🖥", text: "Put on your wristband from the kiosk slot.", active: true },
          { step: 2, icon: "📱", text: "Take Elevator B to Floor 3.", active: false },
          { step: 3, icon: "🏠", text: "Head straight to Room 304.", active: false },
        ].map(({ step, icon, text, active }) => (
          <div key={step} style={{ borderRadius: 6, padding: "6px 7px", marginBottom: 4,
            border: `1.5px solid ${active ? MINT + "80" : "#e2e8f0"}`,
            background: active ? `${MINT}0a` : "transparent", display: "flex", gap: 6, alignItems: "flex-start" }}>
            <div>
              <div style={{ color: active ? MINT : SLATE, fontSize: 6, fontWeight: 600 }}>STEP {step}</div>
              <div style={{ color: NAVY, fontSize: 7, fontWeight: 600, lineHeight: 1.4 }}>{icon} {text}</div>
            </div>
          </div>
        ))}
        <div style={{ background: NAVY, borderRadius: 7, padding: "8px", textAlign: "center", marginTop: 4,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <span style={{ fontSize: 10 }}>📞</span>
          <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>Call Nurse for Help</span>
        </div>
      </div>
    </Phone>
  );
}

/* ── kiosk QR panel ── */
function KioskQR() {
  return (
    <div style={{ background: "white", borderRadius: 10, overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)", width: "100%", maxWidth: 500 }}>
      {/* Top bar */}
      <div style={{ background: NAVY, padding: "10px 16px", display: "flex",
        justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 20, height: 20, background: BLUE, borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 10 }}>+</span>
          </div>
          <div>
            <div style={{ color: "white", fontSize: 10, fontWeight: 700 }}>Evergreen Medical Center</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8 }}>Center of Excellence</div>
          </div>
        </div>
        <div style={{ color: "white", fontSize: 10, fontWeight: 600 }}>Surgical Admission Check-in</div>
      </div>
      {/* Breadcrumb */}
      <div style={{ background: OFFWHITE, borderBottom: "1px solid #e2e8f0", padding: "6px 16px",
        display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ background: BLUE, color: "white", borderRadius: 20, padding: "3px 10px",
          fontSize: 8, fontWeight: 700 }}>① Scan & Upload</div>
        <span style={{ color: "#cbd5e1", fontSize: 10 }}>——</span>
        <div style={{ color: SLATE, fontSize: 8 }}>② Review & Pay</div>
        <span style={{ color: "#cbd5e1", fontSize: 10 }}>——</span>
        <div style={{ color: SLATE, fontSize: 8 }}>③ Collect Wristband</div>
      </div>
      {/* Content */}
      <div style={{ padding: "24px 24px 20px", display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: SLATE, fontSize: 9, fontWeight: 600, marginBottom: 6 }}>STEP 1 OF 4</div>
          <h3 style={{ color: NAVY, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 8 }}>
            Scan to Start<br />
            <span style={{ color: BLUE }}>Check-in</span>
          </h3>
          <p style={{ color: SLATE, fontSize: 10, lineHeight: 1.6 }}>
            Open your hospital mobile app and scan the QR code to begin your surgical admission.
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <img src={kioskStep1Img} alt="Hospital Kiosk UI Step 1" style={{ maxWidth: 200, width: "100%", height: "auto", borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}

/* ── kiosk wayfinding ── */
function KioskWayfinding() {
  return (
    <div style={{ background: "white", borderRadius: 10, overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)", width: "100%", maxWidth: 500 }}>
      <div style={{ background: NAVY, padding: "8px 16px", display: "flex",
        justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 18, height: 18, background: BLUE, borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 9 }}>+</span>
          </div>
          <div style={{ color: "white", fontSize: 9, fontWeight: 700 }}>Evergreen Medical Center</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: MINT }} />
          <span style={{ color: MINT, fontSize: 9, fontWeight: 700 }}>All Set!</span>
        </div>
      </div>
      {/* Breadcrumb all done */}
      <div style={{ background: OFFWHITE, borderBottom: "1px solid #e2e8f0", padding: "5px 14px",
        display: "flex", alignItems: "center", gap: 6 }}>
        {["Scan & Upload", "Review & Pay", "Collect Wristband"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ background: `${MINT}20`, border: `1.5px solid ${MINT}`, borderRadius: 20,
              padding: "2px 8px", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: MINT, fontSize: 8 }}>✓</span>
              <span style={{ color: NAVY, fontSize: 7.5, fontWeight: 600 }}>{s}</span>
            </div>
            {i < 2 && <span style={{ color: "#cbd5e1", fontSize: 8 }}>——</span>}
          </div>
        ))}
        <span style={{ color: "#cbd5e1", fontSize: 8 }}>——</span>
        <div style={{ background: BLUE, borderRadius: 20, padding: "2px 8px" }}>
          <span style={{ color: "white", fontSize: 7.5, fontWeight: 600 }}>④ Navigate</span>
        </div>
      </div>
      {/* Route */}
      <div style={{ padding: "12px 14px 10px" }}>
        <div style={{ background: NAVY, borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7, marginBottom: 6 }}>YOUR ROUTE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["Elevator B", "3rd Floor", "Room 304"].map((node, i) => (
              <div key={node} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: i === 2 ? BLUE : "rgba(255,255,255,0.1)", borderRadius: 6,
                  padding: "5px 10px" }}>
                  <span style={{ color: "white", fontSize: i === 2 ? 11 : 9, fontWeight: 800 }}>{node}</span>
                </div>
                {i < 2 && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
        {/* Floor map */}
        <div style={{ background: NAVY, borderRadius: 8, padding: "8px 12px" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7, marginBottom: 5 }}>
            Ground Floor · Kiosk → Elevator B
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 3, marginBottom: 3 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ height: 18, borderRadius: 3,
                  background: i === 7 ? `${BLUE}50` : "rgba(255,255,255,0.07)",
                  border: i === 7 ? `1.5px solid ${BLUE}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i === 7 && <span style={{ color: BLUE, fontSize: 5.5, fontWeight: 700 }}>Elev B</span>}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 3 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ height: 18, borderRadius: 3,
                  background: i === 7 ? `${MINT}30` : "rgba(255,255,255,0.05)",
                  border: i === 7 ? `1.5px solid ${MINT}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i === 7 && <span style={{ color: MINT, fontSize: 5.5, fontWeight: 700 }}>Kiosk</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── AI agent pipeline panel ── */
type AgentStatus = "waiting" | "active" | "done" | "idle";

interface AgentState {
  admissionTag: string;
  agents: { name: string; status: AgentStatus; label: string }[];
  complete?: boolean;
}

const PIPELINE: Record<number, AgentState> = {
  1: {
    admissionTag: "Admission #45367890 · Processing",
    agents: [
      { name: "Clinical Readiness Agent", status: "active", label: "Awaiting Mobile Intake" },
      { name: "Insurance Agent",          status: "idle",   label: "Pending" },
      { name: "Check-in Agent",           status: "idle",   label: "Pending" },
    ],
  },
  2: {
    admissionTag: "Admission #45367890 · Active",
    agents: [
      { name: "Clinical Readiness Agent", status: "done",   label: "Validated" },
      { name: "Insurance Agent",          status: "active", label: "Co-pay Calculated: €120.00" },
      { name: "Check-in Agent",           status: "idle",   label: "Pending" },
    ],
  },
  3: {
    admissionTag: "Admission #45367890 · Active",
    agents: [
      { name: "Clinical Readiness Agent",    status: "done", label: "Validated" },
      { name: "Insurance & Settlement Agent",status: "done", label: "Co-pay Paid €120.00" },
      { name: "Admission & Wristband Agent", status: "active", label: "Dispatching Print" },
    ],
  },
  4: {
    admissionTag: "All agents cleared · Admission #45367890",
    complete: true,
    agents: [
      { name: "Clinical",  status: "done", label: "Cleared" },
      { name: "Insurance", status: "done", label: "Cleared" },
      { name: "Wristband", status: "done", label: "Cleared" },
    ],
  },
};

function AgentPipeline({ step }: { step: 1 | 2 | 3 | 4 }) {
  const state = PIPELINE[step];
  const statusDot: Record<AgentStatus, { bg: string; color: string; ring?: string }> = {
    done:    { bg: MINT,  color: "white" },
    active:  { bg: AMBER, color: NAVY    },
    waiting: { bg: NAVY2, color: SLATE   },
    idle:    { bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" },
  };

  return (
    <div style={{ background: NAVY, borderRadius: 10, padding: "14px 14px",
      border: "1px solid rgba(255,255,255,0.07)", minWidth: 200, width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", align: "center", gap: 6, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: step < 4 ? AMBER : MINT,
            boxShadow: `0 0 6px ${step < 4 ? AMBER : MINT}` }} />
          <span style={{ color: MINT, fontSize: 8, fontWeight: 700, letterSpacing: "0.1em" }}>AI NOW</span>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "5px 8px",
        marginBottom: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: step < 4 ? AMBER : MINT, fontSize: 7.5, fontWeight: 600,
          fontFamily: "monospace" }}>{state.admissionTag}</span>
      </div>

      {state.complete ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: `2.5px solid ${MINT}`,
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
            <span style={{ color: MINT, fontSize: 18 }}>✓</span>
          </div>
          <div style={{ color: MINT, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>Process Complete</div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 5, padding: "5px 8px", marginBottom: 8 }}>
            <div style={{ color: MINT, fontSize: 7, fontFamily: "monospace" }}>All agents cleared</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 7, fontFamily: "monospace" }}>Admission #45367890</div>
          </div>
          {state.agents.map(({ name }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 6,
              padding: "4px 6px", background: "rgba(0,230,118,0.07)", borderRadius: 4, marginBottom: 4 }}>
              <span style={{ color: MINT, fontSize: 9 }}>✓</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 8 }}>{name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 7.5, fontWeight: 700,
            letterSpacing: "0.1em", marginBottom: 8 }}>AGENT PIPELINE</div>
          {state.agents.map(({ name, status, label }) => {
            const dot = statusDot[status];
            return (
              <div key={name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: dot.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: status === "active" ? `1.5px solid ${AMBER}` : "none",
                    boxShadow: status === "active" ? `0 0 8px ${AMBER}60` : "none",
                    flexShrink: 0 }}>
                    {status === "done" && <span style={{ color: dot.color, fontSize: 9 }}>✓</span>}
                    {status === "active" && <div style={{ width: 5, height: 5, borderRadius: "50%", background: dot.color }} />}
                  </div>
                  <span style={{ color: status === "idle" ? "rgba(255,255,255,0.45)" : "white",
                    fontSize: 8.5, fontWeight: 600 }}>{name}</span>
                </div>
                <div style={{ marginLeft: 23 }}>
                  <span style={{ background: status === "done" ? `${MINT}20`
                    : status === "active" ? `${AMBER}20` : "rgba(255,255,255,0.05)",
                    color: status === "done" ? MINT : status === "active" ? AMBER : "rgba(255,255,255,0.3)",
                    fontSize: 7, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3,
                    display: "inline-block" }}>
                    {status === "active" && "● "}{label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Step progress */}
      {!state.complete && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 7 }}>Step {step} of 4</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 7 }}>{step * 25}%</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
            <div style={{ width: `${step * 25}%`, height: "100%", background: MINT, borderRadius: 2,
              transition: "width 0.4s ease" }} />
          </div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 6.5, marginTop: 4, fontFamily: "monospace" }}>
            AI Now · Surgical Admission
          </div>
        </div>
      )}
    </div>
  );
}

/* ── main ── */
export default function HospitalCaseStudy({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const { isProtected, verifyPassword } = usePasswordProtection();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const steps = [
    { n: 1 as const, label: "Arrival & Sync",    icon: "📱", sub: "Phygital QR link" },
    { n: 2 as const, label: "AI Intake & Pay",   icon: "🤖", sub: "Docs + payment" },
    { n: 3 as const, label: "Wristband & Map",   icon: "🏷", sub: "Print + wayfinding" },
    { n: 4 as const, label: "Room Entry",         icon: "🔑", sub: "Smart unlock" },
  ];

  const phoneScreen: Record<number, React.ReactNode> = {
    1: <ScreenUpload />,
    2: <ScreenPayment />,
    3: <ScreenPrinting />,
    4: <ScreenComplete />,
  };

  const stepCopy: Record<number, { title: string; body: string; tags: string[] }> = {
    1: {
      title: "Patient arrives — Kiosk displays a dynamic QR code.",
      body: "Instead of taking a paper ticket, John approaches the kiosk showing a high-contrast QR code. Scanning it with his smartphone instantly links the physical kiosk to his personal mobile session in real time — a single tap syncs device and display.",
      tags: ["Phygital Sync", "QR Link", "Real-Time Session"],
    },
    2: {
      title: "Mobile intake while AI agents work in parallel.",
      body: "John uploads his missing anesthesia report and settles the €120.00 co-pay via Apple Pay. Simultaneously, three AI agents run in the background: the Clinical Agent validates PDFs via OCR, the Insurance Agent verifies 90% HealthCare Plus coverage, and the Check-in Agent queues wristband dispatch.",
      tags: ["OCR Validation", "AI Orchestration", "Apple Pay / MB WAY"],
    },
    3: {
      title: "Wristband dispensed — phone shows the exact route.",
      body: "The kiosk automatically prints and dispenses the pre-encoded wristband and ID labels from the slot. The mobile screen and kiosk display simultaneously update: Elevator B → 3rd Floor → Room 304 with an interactive indoor floor map.",
      tags: ["Hardware Print", "Wayfinding", "Indoor Map"],
    },
    4: {
      title: "Wristband unlocks the door — nurse is already notified.",
      body: "Scanning the wristband at Room 304's keypad unlocks the door and registers arrival. An automated notification fires to the nursing station: \"Patient John Silva has entered Room 304\" — the nurse walks in with the digital chart ready.",
      tags: ["Smart Access", "Automated Alert", "Nurse Notification"],
    },
  };

  const copy = stepCopy[step];

  if (isProtected) {
    return <PasswordModal onSubmit={verifyPassword} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: OFFWHITE, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Close */}
      <button onClick={onClose} aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-none"
        style={{ background: NAVY, color: "white", borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(145deg, ${NAVY} 0%, ${NAVY2} 70%, #0d2458 100%)`,
        padding: "72px 24px 52px", position: "relative", overflow: "hidden" }}
        className="lg:px-16">
        {/* Grid decoration */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${MINT} 1px, transparent 1px), linear-gradient(90deg, ${MINT} 1px, transparent 1px)`,
          backgroundSize: "40px 40px" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%", background: `${BLUE}15` }} />

        <div className="relative max-w-6xl mx-auto">
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <div style={{ width: 32, height: 32, background: BLUE, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 16, fontWeight: 900 }}>+</span>
            </div>
            <div>
              <div style={{ color: "white", fontSize: 14, fontWeight: 800 }}>Evergreen Medical Center</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>Center of Excellence</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div style={{ flex: 1 }}>
              <span style={{ color: MINT, fontSize: 10, letterSpacing: "0.35em", fontWeight: 700,
                textTransform: "uppercase", display: "block", marginBottom: 16, fontFamily: "monospace" }}>
                Case Study · Healthcare UX · Agentic AI · 2026
              </span>
              <h1 className="font-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)",
                color: "white", fontWeight: 900, lineHeight: 1.08, marginBottom: 16 }}>
                Rethinking Hospital Check-In:<br />
                <span style={{ color: MINT }}>A Phygital,</span>{" "}
                <span style={{ color: BLUE }}>AI-Driven</span>{" "}
                Multichannel Experience
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.7,
                maxWidth: 500, marginBottom: 32 }}>
                Eliminating front-desk queues, paperwork, and payment friction for scheduled surgery
                admissions through synchronized mobile & kiosk journeys.
              </p>

              {/* Meta pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                {[
                  ["Role", "Lead UX/UI Designer"],
                  ["Scope", "Multichannel · AI Agents · Kiosk · Mobile"],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px" }}>
                    <div style={{ color: MINT, fontSize: 9, letterSpacing: "0.3em",
                      textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>{label}</div>
                    <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { icon: "⚡", val: "–80%", lbl: "Check-in time (20 min → <3 min)" },
                  { icon: "🎯", val: "95%",  lbl: "AI validation accuracy (OCR)" },
                  { icon: "👩‍⚕️", val: "+40%", lbl: "Staff time reclaimed for care" },
                ].map(({ icon, val, lbl }) => (
                  <div key={val} style={{ background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${MINT}30`, borderRadius: 10, padding: "12px 16px" }}>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{icon}</div>
                    <div style={{ color: MINT, fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 900, lineHeight: 1 }}>{val}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero phone preview */}
            <div className="hidden lg:block flex-shrink-0">
              <ScreenComplete />
            </div>
          </div>
        </div>
      </section>

      {/* ── JOHN'S JOURNEY ── */}
      <section style={{ background: "#f3f4f8" }} className="px-6 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ color: BLUE, fontSize: 10, letterSpacing: "0.3em", fontWeight: 700,
              textTransform: "uppercase", display: "block", marginBottom: 12 }}>John's 4-Step Journey</span>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: NAVY, fontWeight: 900, lineHeight: 1.2 }}>
              From Kiosk to Room in Under 3 Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div style={{ textAlign: "center" }}>
              <img src={kioskImg} alt="Step 1: Kiosk QR Scan"
                style={{ width: "100%", maxWidth: "210px", height: "auto", borderRadius: 12, marginBottom: 16 }} />
              <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 800, marginBottom: 8 }}>
                Step 1: Arrival & Sync
              </h3>
              <p style={{ color: SLATE, fontSize: 14, lineHeight: 1.6 }}>
                John scans the kiosk's QR code with his phone, instantly linking his mobile app to the kiosk display for real-time synchronization.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <img src={room304Img} alt="Step 2-3: Payment & Wristband"
                style={{ width: "100%", maxWidth: "350px", height: "auto", borderRadius: 12, marginBottom: 16 }} />
              <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 800, marginBottom: 8 }}>
                Step 2-3: AI Intake & Print
              </h3>
              <p style={{ color: SLATE, fontSize: 14, lineHeight: 1.6 }}>
                While John uploads docs and pays €120 via Apple Pay, three AI agents validate credentials, verify insurance, and authorize admission—then the kiosk prints his wristband.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <img src={nursingImg} alt="Step 4: Room Entry & Notification"
                style={{ width: "100%", maxWidth: "350px", height: "auto", borderRadius: 12, marginBottom: 16 }} />
              <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 800, marginBottom: 8 }}>
                Step 4: Smart Entry
              </h3>
              <p style={{ color: SLATE, fontSize: 14, lineHeight: 1.6 }}>
                John scans his wristband at Room 304's door, it unlocks instantly, and the nurse is automatically notified with his digital chart ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section style={{ background: OFFWHITE }} className="px-6 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span style={{ color: BLUE, fontSize: 10, letterSpacing: "0.3em", fontWeight: 700,
              textTransform: "uppercase", display: "block", marginBottom: 12 }}>The Challenge</span>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: NAVY, fontWeight: 800, lineHeight: 1.2, marginBottom: 14 }}>
              Paperwork, queues, and co-pay surprises — all before surgery.
            </h2>
            <p style={{ color: SLATE, lineHeight: 1.75, fontSize: 15 }}>
              Traditional hospital admissions pack anxiety-inducing friction into the worst possible moment.
              Patients face 15–20 minute paper queues, unexpected co-pay amounts, and staff who are too
              busy answering form questions to provide actual care.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: Clock,    text: "15–20 min average admission wait time per patient" },
              { icon: FileText, text: "Paper intake forms duplicated across every visit" },
              { icon: Users,    text: "Front-desk staff spend 60% of time on admin, not care" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start",
                background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: 14 }}>
                <div style={{ width: 36, height: 36, background: `${BLUE}12`, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={BLUE} />
                </div>
                <p style={{ color: NAVY, fontSize: 14, lineHeight: 1.5 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UX STRATEGY ── */}
      <div style={{ background: NAVY, padding: "2px 0" }} />
      <section style={{ background: NAVY }} className="px-6 lg:px-16 py-10">
        <div className="max-w-6xl mx-auto">
          <div style={{ color: MINT, fontSize: 10, letterSpacing: "0.3em", fontWeight: 700,
            textTransform: "uppercase", marginBottom: 20, fontFamily: "monospace" }}>UX Strategy</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap,     title: "Progressive Disclosure", desc: "One clear action at a time — never overwhelm a pre-surgery patient." },
              { icon: Shield,  title: "High Contrast WCAG AA",  desc: "All text and controls exceed 4.5:1 contrast on every surface." },
              { icon: Brain,   title: "Human-in-the-Loop AI",   desc: "AI agents handle validation; humans retain override authority." },
              { icon: Wifi,    title: "Phygital Sync",          desc: "Mobile and kiosk share a live session — one action, both screens." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 16 }}>
                <div style={{ width: 34, height: 34, background: `${MINT}18`, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <Icon size={16} color={MINT} />
                </div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{title}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY STEPS ── */}
      <section style={{ background: "#0c1a35" }} className="px-6 lg:px-16 py-14">
        <div className="max-w-6xl mx-auto">
          <span style={{ color: MINT, fontSize: 10, letterSpacing: "0.35em", fontWeight: 700,
            textTransform: "uppercase", display: "block", marginBottom: 12, fontFamily: "monospace" }}>
            Patient Journey — John's Story
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            color: "white", fontWeight: 800, marginBottom: 32, lineHeight: 1.15 }}>
            4 steps. Under <span style={{ color: MINT }}>3 minutes.</span>
          </h2>

          {/* Step tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 36, flexWrap: "wrap" }}>
            {steps.map(({ n, label, icon, sub }) => (
              <button key={n} onClick={() => setStep(n)}
                className="transition-all duration-200 focus-visible:outline-none text-left"
                style={{ flex: "1 1 auto", minWidth: 120, padding: "10px 14px", borderRadius: 8,
                  background: step === n ? BLUE : "rgba(255,255,255,0.06)",
                  border: `1px solid ${step === n ? BLUE : "rgba(255,255,255,0.1)"}` }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{icon}</div>
                <div style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{label}</div>
                <div style={{ color: step === n ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                  fontSize: 10 }}>{sub}</div>
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: kiosk (steps 1,3) or description */}
            <div className="flex-shrink-0">
              {step === 1 && <KioskQR />}
              {step === 3 && <KioskWayfinding />}
              {(step === 2 || step === 4) && (
                <div style={{ flex: 1, maxWidth: 480 }}>
                  <div style={{ color: MINT, fontSize: 10, fontFamily: "monospace",
                    marginBottom: 10 }}>{`// step_${step}_of_4`}</div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.3rem)",
                    lineHeight: 1.3, marginBottom: 14 }}>{copy.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: 14,
                    marginBottom: 16 }}>{copy.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {copy.tags.map(tag => (
                      <span key={tag} style={{ background: `${MINT}15`, border: `1px solid ${MINT}30`,
                        borderRadius: 20, padding: "3px 10px", color: MINT, fontSize: 11, fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Center: phone */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              {phoneScreen[step]}
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>
                Screen {step} of 4 · Mobile app
              </span>
            </div>

            {/* Right: description (steps 1,3) or just AI panel */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              {(step === 1 || step === 3) && (
                <div>
                  <div style={{ color: MINT, fontSize: 10, fontFamily: "monospace",
                    marginBottom: 10 }}>{`// step_${step}_of_4`}</div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
                    lineHeight: 1.35, marginBottom: 12 }}>{copy.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: 14,
                    marginBottom: 14 }}>{copy.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
                    {copy.tags.map(tag => (
                      <span key={tag} style={{ background: `${MINT}15`, border: `1px solid ${MINT}30`,
                        borderRadius: 20, padding: "3px 10px", color: MINT, fontSize: 11, fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ── RESULTS ── */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2458 100%)` }}
        className="px-6 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <span style={{ color: MINT, fontSize: 10, letterSpacing: "0.35em", fontWeight: 700,
            textTransform: "uppercase", display: "block", marginBottom: 14, fontFamily: "monospace" }}>
            {"// impact_metrics"}
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "white",
            fontWeight: 800, marginBottom: 52, lineHeight: 1.15 }}>
            <span style={{ color: MINT }}>3 AI agents.</span> 4 steps.{" "}
            <span style={{ color: BLUE }}>Zero queues.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16, marginBottom: 48 }}>
            {[
              { val: "<3 min", lbl: "End-to-end admission time", prev: "was 15–20 min" },
              { val: "95%",    lbl: "AI document validation accuracy", prev: "OCR + Insurance AI" },
              { val: "+40%",   lbl: "Staff time back for patient care", prev: "vs. paper-based flow" },
            ].map(({ val, lbl, prev }) => (
              <div key={val} style={{ background: "rgba(255,255,255,0.05)",
                border: `1px solid ${MINT}25`, borderRadius: 14, padding: "28px 16px",
                position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: MINT }} aria-hidden="true" />
                <div style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: MINT,
                  lineHeight: 1, marginBottom: 8 }}>{val}</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5,
                  marginBottom: 4 }}>{lbl}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{prev}</p>
              </div>
            ))}
          </div>
          {/* Checklist */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 44 }}>
            {[
              "WCAG 2.2 AA Compliant",
              "PCI DSS Payment Compliant",
              "GDPR-encrypted document handling",
              "Human-in-the-loop override",
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 6,
                background: `${MINT}10`, border: `1px solid ${MINT}25`,
                borderRadius: 20, padding: "5px 12px" }}>
                <CheckCircle size={12} color={MINT} />
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{item}</span>
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="focus-visible:outline-white transition-all hover:opacity-90"
            style={{ background: MINT, color: NAVY, padding: "14px 36px", borderRadius: 6,
              fontWeight: 800, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8 }}>
            Back to Portfolio <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
