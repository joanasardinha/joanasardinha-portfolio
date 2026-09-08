import { useState, useEffect } from "react";
import { X, ArrowRight, Layers, Cpu, GitBranch, Shield, Zap, CheckCircle, AlertTriangle, RefreshCw, Clock, Users } from "lucide-react";
import { usePasswordProtection } from "../hooks/usePasswordProtection";
import PasswordModal from "./PasswordModal";

const NAVY   = "#0F172A";
const NAVY2  = "#1E293B";
const NAVY3  = "#263348";
const CYAN   = "#06B6D4";
const TEAL   = "#14B8A6";
const GOLD   = "#F59E0B";
const VIOLET = "#818CF8";
const ROSE   = "#F43F5E";
const SLATE  = "#94A3B8";
const SLATED = "#64748B";
const OFFWHITE = "#F8FAFC";
const WHITE  = "#FFFFFF";

type Tab = "architecture" | "patterns" | "outsystems";

/* ── agent state badge ── */
type AgentState = "idle" | "thinking" | "validating" | "executing" | "handover" | "error" | "approved";
const STATE_META: Record<AgentState, { label: string; color: string; bg: string; dot?: boolean }> = {
  idle:       { label: "Idle",              color: SLATE,   bg: `${SLATE}18`   },
  thinking:   { label: "AI Thinking",       color: CYAN,    bg: `${CYAN}18`,    dot: true },
  validating: { label: "Validating",        color: GOLD,    bg: `${GOLD}18`,    dot: true },
  executing:  { label: "Executing",         color: TEAL,    bg: `${TEAL}18`,    dot: true },
  handover:   { label: "Human Review",      color: VIOLET,  bg: `${VIOLET}18`  },
  error:      { label: "Error Recovery",    color: ROSE,    bg: `${ROSE}15`    },
  approved:   { label: "Approved",          color: TEAL,    bg: `${TEAL}18`    },
};

function StateBadge({ state, size = "sm" }: { state: AgentState; size?: "xs" | "sm" | "md" }) {
  const m = STATE_META[state];
  const fs = size === "xs" ? 9 : size === "sm" ? 10.5 : 12;
  const px = size === "xs" ? "4px 7px" : size === "sm" ? "4px 9px" : "5px 12px";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
      background: m.bg, border: `1px solid ${m.color}35`, borderRadius: 20, padding: px }}>
      {m.dot && <div style={{ width: 5, height: 5, borderRadius: "50%", background: m.color,
        boxShadow: `0 0 5px ${m.color}` }} />}
      <span style={{ color: m.color, fontSize: fs, fontWeight: 700 }}>{m.label}</span>
    </div>
  );
}

/* ── pipeline node ── */
function PipelineNode({ label, state, sub, index, total }: {
  label: string; state: AgentState; sub: string; index: number; total: number;
}) {
  const m = STATE_META[state];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, border: `2px solid ${m.color}50`,
          background: m.bg, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: state === "thinking" || state === "executing" ? `0 0 16px ${m.color}30` : "none" }}>
          <Cpu size={18} color={m.color} />
        </div>
        <div style={{ marginTop: 5, textAlign: "center" }}>
          <div style={{ color: WHITE, fontSize: 10, fontWeight: 700, lineHeight: 1.3 }}>{label}</div>
          <div style={{ color: SLATE, fontSize: 9 }}>{sub}</div>
          <div style={{ marginTop: 3 }}><StateBadge state={state} size="xs" /></div>
        </div>
      </div>
      {index < total - 1 && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 28, height: 2, background: `linear-gradient(90deg, ${m.color}60, ${SLATE}30)` }} />
          <div style={{ color: SLATE, fontSize: 12, marginLeft: -2 }}>›</div>
        </div>
      )}
    </div>
  );
}

/* ── component doc card ── */
function ComponentCard({ name, category, desc, states, tag, complexity, color = CYAN }: {
  name: string; category: string; desc: string; states: AgentState[];
  tag: string; complexity: "Low" | "Medium" | "High"; color?: string;
}) {
  const cxColor = complexity === "Low" ? TEAL : complexity === "Medium" ? GOLD : ROSE;
  return (
    <div style={{ background: WHITE, borderRadius: 12, overflow: "hidden",
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ height: 3, background: color }} aria-hidden="true" />
      <div style={{ padding: "14px 14px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ color: SLATED, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: 3 }}>{category}</div>
            <div style={{ color: NAVY, fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{name}</div>
          </div>
          <div style={{ background: `${cxColor}15`, border: `1px solid ${cxColor}30`,
            borderRadius: 5, padding: "2px 7px" }}>
            <span style={{ color: cxColor, fontSize: 9, fontWeight: 700 }}>{complexity}</span>
          </div>
        </div>
        <p style={{ color: SLATED, fontSize: 12, lineHeight: 1.65, marginBottom: 10 }}>{desc}</p>
        {/* State coverage */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ color: SLATED, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 5 }}>Supported States</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {states.map(s => <StateBadge key={s} state={s} size="xs" />)}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ background: `${color}12`, border: `1px solid ${color}25`,
            color, fontSize: 9.5, fontWeight: 700, borderRadius: 20, padding: "3px 9px" }}>
            {tag}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {["Figma", "OS UI"].map(t => (
              <span key={t} style={{ background: "rgba(0,0,0,0.04)", color: SLATED,
                fontSize: 9, borderRadius: 4, padding: "2px 6px", fontFamily: "monospace" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── token chip ── */
function Token({ name, value, color = CYAN }: { name: string; value: string; color?: string }) {
  return (
    <div style={{ background: NAVY3, borderRadius: 7, padding: "6px 9px",
      border: `1px solid rgba(255,255,255,0.06)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: SLATE, fontSize: 9.5, fontFamily: "monospace" }}>{name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
        <span style={{ color: WHITE, fontSize: 9.5, fontFamily: "monospace" }}>{value}</span>
      </div>
    </div>
  );
}

/* ── OS mapping row ── */
function OSRow({ pattern, osComponent, rationale, status }: {
  pattern: string; osComponent: string; rationale: string; status: "Shipped" | "In Review" | "Planned";
}) {
  const sc = status === "Shipped" ? TEAL : status === "In Review" ? GOLD : VIOLET;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr auto",
      gap: 12, padding: "11px 14px", borderBottom: "1px solid rgba(0,0,0,0.05)",
      alignItems: "center" }}>
      <span style={{ color: NAVY, fontSize: 12.5, fontWeight: 600 }}>{pattern}</span>
      <span style={{ color: CYAN, fontSize: 12, fontFamily: "monospace" }}>{osComponent}</span>
      <span style={{ color: SLATED, fontSize: 11.5 }}>{rationale}</span>
      <span style={{ background: `${sc}15`, color: sc, fontSize: 10, fontWeight: 700,
        borderRadius: 20, padding: "2px 9px", whiteSpace: "nowrap",
        border: `1px solid ${sc}30` }}>{status}</span>
    </div>
  );
}

/* ── mini HITL modal ── */
function HITLModal() {
  return (
    <div style={{ background: WHITE, borderRadius: 12, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      overflow: "hidden", width: "100%", border: "1px solid rgba(0,0,0,0.08)" }}>
      <div style={{ background: `${VIOLET}12`, borderBottom: `1px solid ${VIOLET}25`,
        padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <AlertTriangle size={14} color={VIOLET} />
          <span style={{ color: VIOLET, fontSize: 11.5, fontWeight: 700 }}>Human Review Required</span>
        </div>
        <StateBadge state="handover" size="xs" />
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ color: NAVY, fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
          AI Confidence Score Below Threshold
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, height: 5, background: "rgba(0,0,0,0.07)", borderRadius: 3 }}>
            <div style={{ width: "62%", height: "100%", background: GOLD, borderRadius: 3 }} />
          </div>
          <span style={{ color: GOLD, fontSize: 11, fontWeight: 800 }}>62%</span>
          <span style={{ color: SLATE, fontSize: 10 }}>/ 80% min</span>
        </div>
        <div style={{ background: `${GOLD}0d`, border: `1px solid ${GOLD}30`, borderRadius: 7,
          padding: "8px 10px", marginBottom: 10 }}>
          <div style={{ color: SLATED, fontSize: 11, lineHeight: 1.6 }}>
            <strong style={{ color: NAVY2 }}>Agent reasoning:</strong>{" "}
            Insurance policy number format doesn't match expected pattern. Manual verification recommended before proceeding.
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ flex: 1, background: NAVY, borderRadius: 6, padding: "7px", textAlign: "center" }}>
            <span style={{ color: WHITE, fontSize: 10.5, fontWeight: 700 }}>Override & Approve</span>
          </div>
          <div style={{ flex: 1, border: `1.5px solid ${VIOLET}`, borderRadius: 6, padding: "7px", textAlign: "center" }}>
            <span style={{ color: VIOLET, fontSize: 10.5, fontWeight: 700 }}>Escalate to Team</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── mini copilot card ── */
function CopilotCard() {
  return (
    <div style={{ background: WHITE, borderRadius: 12, overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div style={{ background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY3} 100%)`,
        padding: "9px 12px", display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: `${CYAN}30`,
          border: `1px solid ${CYAN}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={10} color={CYAN} />
        </div>
        <span style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>AI Copilot</span>
        <div style={{ marginLeft: "auto" }}><StateBadge state="thinking" size="xs" /></div>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ color: SLATED, fontSize: 10.5, marginBottom: 8, lineHeight: 1.55 }}>
          Based on the uploaded documents, I suggest:
        </div>
        {[
          "Pre-fill patient name from OCR output",
          "Auto-select HealthCare Plus as insurance provider",
          "Flag Blood Test result date as 6 months old",
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start",
            padding: "5px 7px", borderRadius: 6, marginBottom: 4,
            background: i === 0 ? `${CYAN}08` : "rgba(0,0,0,0.025)",
            border: `1px solid ${i === 0 ? CYAN + "25" : "transparent"}` }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: i === 0 ? CYAN : "rgba(0,0,0,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <span style={{ color: i === 0 ? NAVY : SLATED, fontSize: 8 }}>✓</span>
            </div>
            <span style={{ color: i === 2 ? ROSE : NAVY2, fontSize: 11, lineHeight: 1.4 }}>{s}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
          <div style={{ flex: 1, background: CYAN, borderRadius: 6, padding: "6px", textAlign: "center" }}>
            <span style={{ color: NAVY, fontSize: 10, fontWeight: 800 }}>Apply All</span>
          </div>
          <div style={{ flex: 1, border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 6, padding: "6px", textAlign: "center" }}>
            <span style={{ color: SLATED, fontSize: 10, fontWeight: 600 }}>Review Each</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── architecture diagram ── */
function ArchDiagram() {
  const layers = [
    {
      name: "Foundation Layer",
      color: VIOLET,
      items: ["Design Tokens", "Color Primitives", "Typography Scale", "Spacing System", "Motion Curves"],
    },
    {
      name: "Agentic Primitives",
      color: CYAN,
      items: ["StateBadge", "ConfidenceRing", "AgentPipeline", "ProgressNode", "AuditTrail"],
    },
    {
      name: "Composite Patterns",
      color: TEAL,
      items: ["HITLModal", "CopilotCard", "IntakeForm+OCR", "RouteDecision", "ErrorRecovery"],
    },
    {
      name: "OutSystems UI Extension",
      color: GOLD,
      items: ["OSWebBlock", "OSPattern", "ClientAction", "DataAggregate", "ServiceAPI"],
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {layers.map(({ name, color, items }) => (
        <div key={name} style={{ background: NAVY3, borderRadius: 10, overflow: "hidden",
          border: `1px solid ${color}20` }}>
          <div style={{ padding: "8px 14px", borderBottom: `1px solid ${color}15`,
            display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>{name}</span>
          </div>
          <div style={{ padding: "8px 14px", display: "flex", flexWrap: "wrap", gap: 5 }}>
            {items.map(item => (
              <span key={item} style={{ background: `${color}12`, border: `1px solid ${color}25`,
                color, fontSize: 10.5, fontFamily: "monospace", borderRadius: 5, padding: "3px 8px" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
      {/* Arrows suggestion */}
      <div style={{ textAlign: "center", color: SLATE, fontSize: 11, marginTop: 4,
        fontFamily: "monospace" }}>
        ↑ Tokens flow up · Patterns compose down ↓
      </div>
    </div>
  );
}

/* ── main ── */
export default function AgenticDSCaseStudy({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("architecture");
  const [patternFilter, setPatternFilter] = useState<"all" | "pipeline" | "hitl" | "intake" | "copilot">("all");
  const { isProtected, verifyPassword } = usePasswordProtection();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "architecture", label: "🏗 System Architecture" },
    { id: "patterns",     label: "⚡ Agentic Pattern Library" },
    { id: "outsystems",   label: "🔌 OutSystems UI Mapping" },
  ];

  const patternFilters = [
    { id: "all" as const,      label: "All Patterns" },
    { id: "pipeline" as const, label: "Agent Pipelines" },
    { id: "hitl" as const,     label: "Human-in-the-Loop" },
    { id: "intake" as const,   label: "Smart Intake" },
    { id: "copilot" as const,  label: "Copilot & Chat" },
  ];

  const allComponents = [
    {
      cat: "pipeline",
      name: "AgentPipelineBar",
      category: "Agent Pipelines",
      color: CYAN,
      desc: "Horizontally scrollable pipeline showing N sequential agent nodes with live state transitions, progress indicators, and elapsed time per step.",
      states: ["idle", "executing", "validating", "handover", "approved"] as AgentState[],
      tag: "AI Active",
      complexity: "Medium" as const,
    },
    {
      cat: "hitl",
      name: "HITLInterventionModal",
      category: "Human-in-the-Loop",
      color: VIOLET,
      desc: "Full-surface modal triggered when AI confidence falls below configurable threshold. Exposes reasoning chain, evidence fragments, and override/escalate actions.",
      states: ["handover", "validating", "error", "approved"] as AgentState[],
      tag: "Human Review",
      complexity: "High" as const,
    },
    {
      cat: "intake",
      name: "OCRSmartField",
      category: "Smart Intake",
      color: TEAL,
      desc: "Input field enhanced with OCR auto-fill animation, confidence badge, and inline diff comparison between extracted and expected values for human confirmation.",
      states: ["thinking", "validating", "approved", "error"] as AgentState[],
      tag: "AI Auto-Fill",
      complexity: "Medium" as const,
    },
    {
      cat: "copilot",
      name: "CopilotSuggestionCard",
      category: "Copilot & Chat",
      color: GOLD,
      desc: "Contextual inline panel surfacing ranked AI suggestions with one-click apply, individual review mode, and confidence percentage per suggestion item.",
      states: ["thinking", "executing", "handover"] as AgentState[],
      tag: "AI Copilot",
      complexity: "Medium" as const,
    },
    {
      cat: "pipeline",
      name: "ProgressNode",
      category: "Agent Pipelines",
      color: CYAN,
      desc: "Standalone circular or step-indicator node component displaying agent name, current state, elapsed time, and retry count for multi-step orchestrated workflows.",
      states: ["idle", "thinking", "executing", "approved", "error"] as AgentState[],
      tag: "AI Active",
      complexity: "Low" as const,
    },
    {
      cat: "hitl",
      name: "ConfidenceScoreBadge",
      category: "Human-in-the-Loop",
      color: VIOLET,
      desc: "Inline or floating badge displaying AI confidence percentage with colour-coded threshold zones (green ≥80%, amber 60–79%, red <60%) and tooltip with reasoning.",
      states: ["validating", "handover", "approved"] as AgentState[],
      tag: "Transparency",
      complexity: "Low" as const,
    },
    {
      cat: "intake",
      name: "DocumentParseIndicator",
      category: "Smart Intake",
      color: TEAL,
      desc: "File card component showing upload, OCR parsing progress, extraction result summary, and validation status — designed for async document processing flows.",
      states: ["executing", "validating", "approved", "error"] as AgentState[],
      tag: "AI Processing",
      complexity: "Medium" as const,
    },
    {
      cat: "copilot",
      name: "ConversationalActionCard",
      category: "Copilot & Chat",
      color: GOLD,
      desc: "Chat-embedded card for generative actions (form fills, API calls, navigation) triggered by natural language, with confirmation step and undo affordance.",
      states: ["thinking", "executing", "approved", "error"] as AgentState[],
      tag: "Generative",
      complexity: "High" as const,
    },
    {
      cat: "pipeline",
      name: "AuditTrailFeed",
      category: "Agent Pipelines",
      color: CYAN,
      desc: "Append-only log feed rendering agent decisions, timestamps, confidence scores, and human override events — exportable and filterable for compliance review.",
      states: ["executing", "handover", "approved", "error"] as AgentState[],
      tag: "Compliance",
      complexity: "Medium" as const,
    },
    {
      cat: "hitl",
      name: "EscalationOverlay",
      category: "Human-in-the-Loop",
      color: VIOLET,
      desc: "Full-page blocking overlay for critical agent failures or compliance-flagged decisions, routing to a specific team member or queue with SLA timer.",
      states: ["error", "handover"] as AgentState[],
      tag: "Critical Path",
      complexity: "High" as const,
    },
    {
      cat: "intake",
      name: "MultiStepIntakeFlow",
      category: "Smart Intake",
      color: TEAL,
      desc: "Orchestrated wizard pattern with per-step AI validation, real-time field population from agent outputs, and graceful degradation when AI is unavailable.",
      states: ["idle", "thinking", "validating", "handover", "approved"] as AgentState[],
      tag: "Full Flow",
      complexity: "High" as const,
    },
    {
      cat: "copilot",
      name: "PromptSuggestionBar",
      category: "Copilot & Chat",
      color: GOLD,
      desc: "Persistent contextual bar surfacing 3–5 ranked prompt chips based on current form state and user history, reducing blank-field anxiety in complex workflows.",
      states: ["idle", "thinking"] as AgentState[],
      tag: "Contextual",
      complexity: "Low" as const,
    },
  ];

  const filtered = patternFilter === "all"
    ? allComponents
    : allComponents.filter(c => c.cat === patternFilter);

  const pipelineNodes = [
    { label: "Document Agent",  state: "approved"   as AgentState, sub: "OCR + Validation" },
    { label: "Policy Agent",    state: "executing"  as AgentState, sub: "Insurance Lookup" },
    { label: "Risk Agent",      state: "thinking"   as AgentState, sub: "Score Calculation" },
    { label: "Review Agent",    state: "handover"   as AgentState, sub: "Human Escalation" },
    { label: "Commit Agent",    state: "idle"        as AgentState, sub: "Awaiting Approval" },
  ];

  const auditEntries = [
    { time: "09:14:02", agent: "DocumentAgent",  event: "OCR extraction complete", state: "approved" as AgentState },
    { time: "09:14:09", agent: "PolicyAgent",    event: "Coverage verified: 90%",    state: "approved" as AgentState },
    { time: "09:14:18", agent: "RiskAgent",      event: "Confidence 62% — flagged",  state: "handover" as AgentState },
    { time: "09:14:20", agent: "Human",          event: "Manual override triggered",  state: "handover" as AgentState },
    { time: "09:14:35", agent: "CommitAgent",    event: "Awaiting supervisor sign-off", state: "idle" as AgentState  },
  ];

  const tokenGroups = [
    {
      name: "Agent State Colors",
      tokens: [
        { name: "agent.state.active",     value: "#06B6D4", color: CYAN    },
        { name: "agent.state.validating", value: "#F59E0B", color: GOLD    },
        { name: "agent.state.handover",   value: "#818CF8", color: VIOLET  },
        { name: "agent.state.error",      value: "#F43F5E", color: ROSE    },
        { name: "agent.state.success",    value: "#14B8A6", color: TEAL    },
      ],
    },
    {
      name: "Confidence Thresholds",
      tokens: [
        { name: "confidence.high",   value: "≥ 80%", color: TEAL   },
        { name: "confidence.medium", value: "60–79%", color: GOLD   },
        { name: "confidence.low",    value: "< 60%",  color: ROSE   },
      ],
    },
  ];

  const osRows = [
    { pattern: "AgentPipelineBar",       osComponent: "OSWebBlock · Container", rationale: "Wraps ListRecord with client-side state polling via Timer widget", status: "Shipped"    as const },
    { pattern: "HITLInterventionModal",  osComponent: "OSPopup · BoolVar gate",  rationale: "Boolean variable triggers popup; OnClose fires ConfirmAction",   status: "Shipped"    as const },
    { pattern: "OCRSmartField",          osComponent: "Input + DataAction",       rationale: "TextInput extended via JS interop for OCR field pre-population",  status: "Shipped"    as const },
    { pattern: "CopilotSuggestionCard", osComponent: "OSCard · JSON Deserialise",rationale: "Static Entity stores suggestions; card renders via ForEach list",  status: "In Review"  as const },
    { pattern: "DocumentParseIndicator", osComponent: "FileUpload + ProgressBar", rationale: "Native FileUpload feeds BinaryData; async timer drives progress",  status: "Shipped"    as const },
    { pattern: "ConfidenceScoreBadge",   osComponent: "Expression widget",        rationale: "Score attribute rendered inline; colour via If() expressions",    status: "Shipped"    as const },
    { pattern: "AuditTrailFeed",         osComponent: "ListRecord · LogEntity",   rationale: "Append-only server entity; client polls on interval for updates",  status: "In Review"  as const },
    { pattern: "ConversationalActionCard",osComponent: "OSCard + ClientAction",   rationale: "Generative intent from REST AI API; card CTA fires client logic",  status: "Planned"    as const },
    { pattern: "MultiStepIntakeFlow",    osComponent: "WizardPattern · Reactive", rationale: "Step driven by CurrentStep integer var; AI validates OnChange",    status: "In Review"  as const },
    { pattern: "PromptSuggestionBar",    osComponent: "TagCloud · StaticRecord",  rationale: "Contextual prompts from Aggregate with WHERE filtering by screen", status: "Planned"    as const },
  ];

  if (isProtected) {
    return <PasswordModal onSubmit={verifyPassword} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: OFFWHITE, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Close */}
      <button onClick={onClose} aria-label="Close case study"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none"
        style={{ background: NAVY, color: WHITE, borderRadius: "50%", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        <X size={18} />
      </button>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(150deg, ${NAVY} 0%, #131f35 60%, #0e1e2d 100%)`,
        padding: "72px 24px 56px", position: "relative", overflow: "hidden" }}
        className="lg:px-16">
        {/* Grid pattern */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
          backgroundSize: "48px 48px" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: -120, right: -80,
          width: 400, height: 400, borderRadius: "50%", background: `${VIOLET}10` }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -80, left: -60,
          width: 280, height: 280, borderRadius: "50%", background: `${CYAN}08` }} />

        <div className="relative max-w-6xl mx-auto">
          {/* Speed badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7,
            background: `${GOLD}15`, border: `1.5px solid ${GOLD}45`,
            borderRadius: 24, padding: "6px 16px", marginBottom: 28 }}>
            <Zap size={13} color={GOLD} />
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>
              3× Faster AI Feature Prototyping & Reusability
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <div style={{ flex: 1 }}>
              <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                color: WHITE, fontWeight: 900, lineHeight: 1.06, marginBottom: 16 }}>
                Agentic UX<br />
                <span style={{ color: CYAN }}>Design System</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 16, lineHeight: 1.75,
                maxWidth: 500, marginBottom: 32 }}>
                Auditing, extracting, and unifying multi-agent interaction patterns into a centralized OutSystems UI framework for rapid enterprise deployment.
              </p>

              {/* Meta */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                {[
                  { label: "Role",     value: "Design System Lead & UX Architect" },
                  { label: "Scope",    value: "Pattern Mining · System Architecture · OS UI" },
                  { label: "Target",   value: "Enterprise Clients & Internal Teams" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, padding: "8px 14px" }}>
                    <div style={{ color: CYAN, fontSize: 9, letterSpacing: "0.3em",
                      textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>{label}</div>
                    <div style={{ color: WHITE, fontSize: 12, fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { icon: "📦", val: "12",    lbl: "Agentic components shipped" },
                  { icon: "⚡", val: "3×",    lbl: "Faster AI feature delivery" },
                  { icon: "✅", val: "WCAG",  lbl: "AA compliant baseline" },
                ].map(({ icon, val, lbl }) => (
                  <div key={val} style={{ background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${CYAN}25`, borderRadius: 10, padding: "12px 16px" }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>{icon}</div>
                    <div style={{ color: CYAN, fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 900, lineHeight: 1 }}>{val}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live pipeline preview */}
            <div className="hidden lg:flex flex-col gap-5 flex-shrink-0" style={{ minWidth: 340 }}>
              {/* Agent pipeline mini */}
              <div style={{ background: NAVY2, borderRadius: 12, padding: "14px 16px",
                border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ color: SLATE, fontSize: 9.5, letterSpacing: "0.2em",
                  textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" }}>
                  Live Execution Pipeline
                </div>
                <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
                  {pipelineNodes.map((n, i) => (
                    <PipelineNode key={n.label} {...n} index={i} total={pipelineNodes.length} />
                  ))}
                </div>
              </div>
              {/* Mini copilot */}
              <CopilotCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: NAVY2,
        borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {tabs.map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className="focus-visible:outline-none transition-all duration-200 whitespace-nowrap"
                style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700,
                  color: tab === id ? CYAN : "rgba(255,255,255,0.4)",
                  borderBottom: `2px solid ${tab === id ? CYAN : "transparent"}`,
                  background: "transparent", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB: ARCHITECTURE ── */}
      {tab === "architecture" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          {/* Background */}
          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <div>
              <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
                fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Background</div>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: NAVY, fontWeight: 800, lineHeight: 1.15, marginBottom: 14 }}>
                Separate projects.<br /><span style={{ color: CYAN }}>Repeated patterns.</span><br />Wasted cycles.
              </h2>
              <p style={{ color: SLATED, fontSize: 14.5, lineHeight: 1.75, marginBottom: 16 }}>
                As AI agents became core to enterprise apps, each client project (healthcare intake, fintech automation, smart mobility) was independently reinventing the same human-AI interaction patterns. Design, component code, and OutSystems blocks were rebuilt from scratch every time.
              </p>
              <p style={{ color: SLATED, fontSize: 14.5, lineHeight: 1.75 }}>
                The solution: a comprehensive audit across all existing implementations, extraction of recurring patterns, and consolidation into a unified, token-driven design system extending OutSystems UI.
              </p>
            </div>
            <div>
              <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
                fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Audit Process</div>
              {[
                { step: "01", title: "Multi-Project Discovery",  color: CYAN,   desc: "Audited 6 real-world implementations to identify recurring human-AI collaborative workflow patterns and failure modes." },
                { step: "02", title: "Extraction & Abstraction", color: VIOLET, desc: "Standardised UX states across different use cases into core design tokens and reusable UI primitives with clear semantic naming." },
                { step: "03", title: "OutSystems Integration",   color: GOLD,   desc: "Mapped custom AI patterns directly to standard OutSystems web/mobile components for seamless technical handoff to developers." },
              ].map(({ step, title, color, desc }) => (
                <div key={step} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`,
                    border: `1.5px solid ${color}40`, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0, fontFamily: "monospace",
                    color, fontSize: 11, fontWeight: 800 }}>{step}</div>
                  <div>
                    <div style={{ color: NAVY, fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{title}</div>
                    <p style={{ color: SLATED, fontSize: 12.5, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layered architecture diagram */}
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
                fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>System Layers</div>
              <div style={{ background: NAVY, borderRadius: 14, padding: "20px", overflow: "hidden" }}>
                <ArchDiagram />
              </div>
            </div>
            <div>
              <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
                fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Design Tokens</div>
              <div style={{ background: NAVY, borderRadius: 14, padding: "18px" }}>
                {tokenGroups.map(({ name, tokens }) => (
                  <div key={name} style={{ marginBottom: 14 }}>
                    <div style={{ color: SLATE, fontSize: 10, fontFamily: "monospace",
                      marginBottom: 7, letterSpacing: "0.15em" }}>{`// ${name}`}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {tokens.map(t => <Token key={t.name} {...t} />)}
                    </div>
                  </div>
                ))}
                {/* HITL modal preview */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ color: SLATE, fontSize: 10, fontFamily: "monospace",
                    marginBottom: 9, letterSpacing: "0.15em" }}>{"// HITL Component Preview"}</div>
                  <HITLModal />
                </div>
              </div>
            </div>
          </div>

          {/* Audit trail */}
          <div style={{ marginTop: 40, background: NAVY, borderRadius: 14, padding: "20px" }}>
            <div style={{ color: SLATE, fontSize: 10, fontFamily: "monospace",
              letterSpacing: "0.15em", marginBottom: 14 }}>{"// AuditTrailFeed · Live Execution Log"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {auditEntries.map(({ time, agent, event, state }, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center",
                  padding: "8px 10px", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderRadius: 5 }}>
                  <span style={{ color: SLATE, fontSize: 10, fontFamily: "monospace",
                    flexShrink: 0, width: 56 }}>{time}</span>
                  <span style={{ color: CYAN, fontSize: 10.5, fontFamily: "monospace",
                    flexShrink: 0, width: 100 }}>{agent}</span>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, flex: 1 }}>{event}</span>
                  <StateBadge state={state} size="xs" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: PATTERN LIBRARY ── */}
      {tab === "patterns" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
            fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Agentic Pattern Library</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: NAVY, fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            12 components.<br /><span style={{ color: CYAN }}>4 categories.</span>{" "}
            <span style={{ color: GOLD }}>Infinite combinations.</span>
          </h2>

          {/* Filter bar */}
          <div style={{ display: "flex", gap: 7, marginBottom: 32, flexWrap: "wrap" }}>
            {patternFilters.map(({ id, label }) => (
              <button key={id} onClick={() => setPatternFilter(id)}
                className="focus-visible:outline-none transition-all"
                style={{ padding: "8px 16px", borderRadius: 20, cursor: "pointer",
                  fontSize: 12, fontWeight: 700,
                  background: patternFilter === id ? NAVY : WHITE,
                  color: patternFilter === id ? CYAN : SLATED,
                  border: `1.5px solid ${patternFilter === id ? CYAN + "50" : "rgba(0,0,0,0.12)"}` }}>
                {label}
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: SLATED, fontSize: 11 }}>Showing {filtered.length} of {allComponents.length}</span>
            </div>
          </div>

          {/* Live previews (for HITL + Copilot) */}
          {(patternFilter === "all" || patternFilter === "hitl" || patternFilter === "copilot") && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16, marginBottom: 32 }}>
              {(patternFilter === "all" || patternFilter === "hitl") && (
                <div>
                  <div style={{ color: VIOLET, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                    textTransform: "uppercase", marginBottom: 8 }}>↓ Live Component Preview</div>
                  <HITLModal />
                </div>
              )}
              {(patternFilter === "all" || patternFilter === "copilot") && (
                <div>
                  <div style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                    textTransform: "uppercase", marginBottom: 8 }}>↓ Live Component Preview</div>
                  <CopilotCard />
                </div>
              )}
            </div>
          )}

          {/* Pipeline preview */}
          {(patternFilter === "all" || patternFilter === "pipeline") && (
            <div style={{ background: NAVY, borderRadius: 12, padding: "16px 18px", marginBottom: 32 }}>
              <div style={{ color: SLATE, fontSize: 10, fontFamily: "monospace",
                letterSpacing: "0.15em", marginBottom: 14 }}>{"// AgentPipelineBar · Live Preview"}</div>
              <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
                {pipelineNodes.map((n, i) => (
                  <PipelineNode key={n.label} {...n} index={i} total={pipelineNodes.length} />
                ))}
              </div>
            </div>
          )}

          {/* Component grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(c => <ComponentCard key={c.name} {...c} />)}
          </div>
        </section>
      )}

      {/* ── TAB: OUTSYSTEMS UI MAPPING ── */}
      {tab === "outsystems" && (
        <section className="px-6 lg:px-16 py-14 max-w-6xl mx-auto">
          <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
            fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>OutSystems UI Mapping</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: NAVY, fontWeight: 800, marginBottom: 14, lineHeight: 1.2 }}>
            Design pattern → <span style={{ color: GOLD }}>OS component.</span><br />
            <span style={{ color: SLATED, fontWeight: 400, fontSize: "0.72em" }}>
              One source of truth for designers and developers.
            </span>
          </h2>

          {/* Status summary */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {[
              { label: "Shipped",   count: 6, color: TEAL   },
              { label: "In Review", count: 3, color: GOLD   },
              { label: "Planned",   count: 2, color: VIOLET },
            ].map(({ label, count, color }) => (
              <div key={label} style={{ background: `${color}12`, border: `1.5px solid ${color}30`,
                borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ color, fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{count}</div>
                <div>
                  <div style={{ color, fontSize: 11, fontWeight: 700 }}>{label}</div>
                  <div style={{ color: SLATED, fontSize: 11 }}>components</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mapping table */}
          <div style={{ background: WHITE, borderRadius: 12, overflow: "hidden",
            boxShadow: "0 2px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 40 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr auto",
              gap: 12, padding: "11px 14px", background: NAVY2, borderBottom: `2px solid ${CYAN}25` }}>
              {["Agentic Pattern", "OutSystems Component", "Integration Rationale", "Status"].map(h => (
                <span key={h} style={{ color: CYAN, fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace" }}>{h}</span>
              ))}
            </div>
            {osRows.map((row, i) => <OSRow key={i} {...row} />)}
          </div>

          {/* Principles */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ color: SLATED, fontSize: 11, letterSpacing: "0.3em",
              fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>Design Principles</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Shield,      color: CYAN,   title: "Trust Transparency",     desc: "Every AI decision surface exposes confidence score and reasoning — no black boxes." },
                { icon: Users,       color: VIOLET, title: "Human Override First",   desc: "Any AI action can be interrupted, reviewed, or reversed at the interaction layer." },
                { icon: RefreshCw,   color: TEAL,   title: "Graceful Degradation",   desc: "All agentic patterns work without AI — fallback to manual input is always available." },
                { icon: CheckCircle, color: GOLD,   title: "WCAG 2.2 AA Baseline",  desc: "State changes use colour + icon + text — never colour alone — for full accessibility." },
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
          </div>

          {/* Tech spec annotation block */}
          <div style={{ background: NAVY, borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ color: SLATE, fontSize: 10, fontFamily: "monospace",
              letterSpacing: "0.15em", marginBottom: 16 }}>{"// OutSystems Extension · Usage Spec"}</div>
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Web Reactive Apps",
                  lines: [
                    { c: SLATE,  t: "// Drag from System Components panel" },
                    { c: CYAN,   t: "AgentPipelineBar {" },
                    { c: WHITE,  t: '  StatusEntity    : AIStepEntity;' },
                    { c: WHITE,  t: '  OnStepComplete  : Action;' },
                    { c: WHITE,  t: '  PollingInterval : 3000ms;' },
                    { c: CYAN,   t: "}" },
                  ],
                },
                {
                  title: "Mobile ODC Apps",
                  lines: [
                    { c: SLATE,  t: "// Client-side state — no extra server calls" },
                    { c: GOLD,   t: "HITLModal {" },
                    { c: WHITE,  t: '  ShowIf   : ConfidenceScore < 80;' },
                    { c: WHITE,  t: '  OnApprove: SubmitWithOverride();' },
                    { c: WHITE,  t: '  OnEscalate: CreateEscalationRecord();' },
                    { c: GOLD,   t: "}" },
                  ],
                },
              ].map(({ title, lines }) => (
                <div key={title}>
                  <div style={{ color: SLATE, fontSize: 11, marginBottom: 8 }}>{title}</div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8,
                    padding: "12px 14px", fontFamily: "monospace", fontSize: 11, lineHeight: 1.9,
                    border: "1px solid rgba(255,255,255,0.06)" }}>
                    {lines.map(({ c, t }, i) => (
                      <div key={i} style={{ color: c }}>{t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── IMPACT ── */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0e1e2d 100%)` }}
        className="px-6 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <span style={{ color: CYAN, fontSize: 10, letterSpacing: "0.35em", fontWeight: 700,
            textTransform: "uppercase", display: "block", marginBottom: 14, fontFamily: "monospace" }}>
            {"// business_impact"}
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: WHITE,
            fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
            <span style={{ color: CYAN }}>Unified.</span>{" "}
            <span style={{ color: GOLD }}>Scalable.</span>{" "}
            <span style={{ color: VIOLET }}>Trusted.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75,
            marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            One design system enabling every enterprise client team to deploy AI features with consistent UX quality, transparent decision-making, and zero reinvention cost.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 14, marginBottom: 44 }}>
            {[
              { val: "3×",   lbl: "Faster AI feature prototyping cycle",       icon: <Zap size={16} color={GOLD} /> },
              { val: "12",   lbl: "Agentic UI components shipped to OS library", icon: <Layers size={16} color={CYAN} /> },
              { val: "100%", lbl: "WCAG 2.2 AA compliant baseline",             icon: <Shield size={16} color={VIOLET} /> },
              { val: "6+",   lbl: "Client projects using the system today",     icon: <GitBranch size={16} color={TEAL} /> },
            ].map(({ val, lbl, icon }) => (
              <div key={val} style={{ background: "rgba(255,255,255,0.04)",
                border: `1px solid ${CYAN}18`, borderRadius: 12, padding: "22px 14px",
                position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: CYAN }} aria-hidden="true" />
                <div style={{ marginBottom: 6 }}>{icon}</div>
                <div style={{ color: CYAN, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 900, lineHeight: 1, marginBottom: 6 }}>{val}</div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.5 }}>{lbl}</p>
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="hover:opacity-90 transition-opacity focus-visible:outline-white"
            style={{ background: CYAN, color: NAVY, padding: "14px 36px", borderRadius: 6,
              fontWeight: 800, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8 }}>
            Back to Portfolio <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
