import { useState, useEffect } from "react";
import { Lock, X, Eye, Mail, AlertCircle, CheckCircle2, BookOpen, Camera } from "lucide-react";
import MedisCaseStudy from "./MedisCaseStudy";
import DevSummitCaseStudy from "./DevSummitCaseStudy";
import SpringSavingsCaseStudy from "./SpringSavingsCaseStudy";
import HospitalCaseStudy from "./HospitalCaseStudy";
import MobilityCaseStudy from "./MobilityCaseStudy";
import AgenticDSCaseStudy from "./AgenticDSCaseStudy";
import PluxeeCaseStudy from "./PluxeeCaseStudy";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  locked: boolean;
  hasCaseStudy?: boolean;
  isGallery?: boolean;
  gradient: string;
  accentColor: string;
  year: string;
}

const projects: Project[] = [
  {
    id: "volta",
    title: "Spring Savings — Mobile App",
    subtitle: "Mobile-first savings companion disrupting the UK savings market  for Paragon Bank",
    category: "UX/UI",
    tags: ["Banking", "Branding", "Mobile Design"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #1E2B3C 0%, #8B3A1A 60%, #FF6B35 100%)",
    accentColor: "#FF6B35",
    year: "2024",
  },
  {
    id: "techforge",
    title: "Phygital Hospital Check-In",
    subtitle: "AI-driven multichannel admission experience for scheduled surgeries — kiosk + mobile synced in real time",
    category: "Agentic UX",
    tags: ["Healthcare UX", "AI Agents", "Service Design"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #030C23 0%, #0A1931 60%, #00E67630 100%)",
    accentColor: "#00E676",
    year: "2026",
  },
  {
    id: "nomad",
    title: "Agentic UX Design System",
    subtitle: "Scalable AI interaction patterns for OutSystems UI — 12 agentic components, HITL flows, and agent pipeline library for enterprise deployment",
    category: "Agentic UX",
    tags: ["Design Systems", "AI Patterns", "OutSystems UI"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #06B6D420 100%)",
    accentColor: "#06B6D4",
    year: "2025",
  },
  {
    id: "fintrack",
    title: "Mobility App — 3-Day Rapid POC",
    subtitle: "All-in-one urban mobility companion — multi-modal routing, live transit map & carbon tracker, built in 72 hours for stakeholder buy-in",
    category: "UX/UI",
    tags: ["Fast Prototyping", "Mobility UX", "PoC"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #0D2A26 0%, #121D24 55%, #00C85320 100%)",
    accentColor: "#00C853",
    year: "2018",
  },
  {
    id: "helio",
    title: "Dev Summit — Conference Brand",
    subtitle: "End-to-end brand identity, event website, and physical collateral for a flagship developer summit",
    category: "Branding",
    tags: ["Brand Identity", "Event Design", "Landing Page"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #FF5500 100%)",
    accentColor: "#FF5500",
    year: "2022",
  },
  {
    id: "medconnect",
    title: "Online Doctor — Médis",
    subtitle: "End-to-end telemedicine mobile experience for health insurance policyholders",
    category: "UX/UI",
    tags: ["Telemedicine UX", "Mobile Design", "Accessibility"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #051A44 0%, #002B66 55%, #003d7a 80%, #00C9A710 100%)",
    accentColor: "#00C9A7",
    year: "2020",
  },
  {
    id: "aria",
    title: "Pluxee Benefits Platform",
    subtitle: "End-to-end employee engagement ecosystem — Mobile App, HR Portal & Sales Backoffice, built through onsite co-creation workshops",
    category: "UX/UI",
    tags: ["Employee Engagement", "OutSystems"],
    locked: false,
    hasCaseStudy: true,
    gradient: "linear-gradient(135deg, #120F38 0%, #191645 60%, #00E67618 100%)",
    accentColor: "#00E676",
    year: "2024",
  },
  {
    id: "nexus",
    title: "Nexus — AI Decision Engine",
    subtitle: "Human-in-the-loop interface for complex AI-driven workflows",
    category: "Agentic UX",
    tags: ["Agentic UX", "Human-AI Collab", "Workflow Design"],
    locked: false,
    gradient: "linear-gradient(135deg, #1a0a00 0%, #7c2d12 50%, #f97316 100%)",
    accentColor: "#f97316",
    year: "2025",
  },
  {
    id: "pele",
    title: "Hagá - PHC Software Mascot",
    subtitle: "Illustrated mascot series honouring the legacy of Pelé",
    category: "Others",
    tags: ["Illustration", "Mascot", "Mobile Design"],
    locked: false,
    gradient: "linear-gradient(135deg, #1a1200 0%, #854d0e 50%, #fbbf24 100%)",
    accentColor: "#fbbf24",
    year: "2023",
  },
  {
    id: "photography",
    title: "Visual Storytelling — Photography",
    subtitle: "Street & urban geometry, quiet human moments, and minimal textures captured through a UX designer's lens across Tokyo, Lisbon, London, and Santorini",
    category: "Photography",
    tags: ["Street & Urban", "Architecture", "Travel", "Portraits"],
    locked: false,
    isGallery: true,
    gradient: "linear-gradient(135deg, #0B0B0C 0%, #1a1a1c 40%, #2a1f1f 70%, #1a0a0a 100%)",
    accentColor: "#C81D25",
    year: "2021–2023",
  },
];

const categories = ["All", "Branding", "UX/UI", "Agentic UX", "Research", "Landing Pages", "Photography", "Others"];

interface ModalState {
  project: Project | null;
  tab: "password" | "request";
  password: string;
  passwordError: string;
  passwordSuccess: boolean;
  form: { name: string; email: string; company: string; reason: string };
  formSubmitted: boolean;
  formError: string;
}

const initModal: ModalState = {
  project: null,
  tab: "password",
  password: "",
  passwordError: "",
  passwordSuccess: false,
  form: { name: "", email: "", company: "", reason: "" },
  formSubmitted: false,
  formError: "",
};

function useInitialShow() {
  const [initialShow, setInitialShow] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 6
  );
  useEffect(() => {
    const handler = () => setInitialShow(window.innerWidth < 768 ? 3 : 6);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return initialShow;
}

export default function Portfolio({ onOpenPhotography }: { onOpenPhotography?: () => void }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modal, setModal] = useState<ModalState>(initModal);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_SHOW = useInitialShow();
  const [caseStudyOpen, setCaseStudyOpen] = useState<"medis" | "devsummit" | "spring" | "hospital" | "mobility" | "agenticds" | "pluxee" | null>(null);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  const openModal = (project: Project) => {
    setModal({ ...initModal, project });
  };

  const closeModal = () => {
    setModal(initModal);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal.password.trim()) {
      setModal((m) => ({ ...m, passwordError: "Please enter a password." }));
      return;
    }
    if (modal.password === "sardinha2024") {
      if (modal.project?.hasCaseStudy) {
        sessionStorage.setItem(`project_${modal.project.id}`, "unlocked");
        window.location.href = `/projects/${modal.project.id}`;
      } else {
        setModal((m) => ({ ...m, passwordSuccess: true, passwordError: "" }));
      }
    } else {
      setModal((m) => ({ ...m, passwordError: "Incorrect password. Try requesting access instead." }));
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, company, reason } = modal.form;
    if (!name || !email || !reason) {
      setModal((m) => ({ ...m, formError: "Please fill in all required fields." }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setModal((m) => ({ ...m, formError: "Please enter a valid email address." }));
      return;
    }
    setModal((m) => ({ ...m, formSubmitted: true, formError: "" }));
  };

  return (
    <section
      id="work"
      aria-label="Portfolio"
      className="py-14 lg:py-20 bg-offwhite"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-crimson" aria-hidden="true" />
              <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">THE PORTFOLIO</span>
            </div>
            <h2 className="font-serif text-charcoal leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              What I've Been Cooking
            </h2>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Portfolio filter"
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => {
                if (cat === "Photography") { onOpenPhotography?.(); return; }
                setActiveFilter(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold border transition-all duration-200 focus-visible:outline-crimson ${
                activeFilter === cat
                  ? "bg-burgundy text-offwhite border-burgundy"
                  : "bg-transparent text-charcoal/60 border-charcoal/20 hover:border-charcoal/60 hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {displayed.map((project) => (
            <article
              key={project.id}
              className={`group overflow-hidden card-hover cursor-pointer ${project.isGallery ? "border border-white/8" : "bg-white border border-black/8"}`}
              style={project.isGallery ? { background: "#0B0B0C" } : undefined}
              onClick={() => {
                if (project.isGallery) { onOpenPhotography?.(); return; }
                if (project.hasCaseStudy) {
                  const key = project.id === "medconnect" ? "medis"
                    : project.id === "helio" ? "devsummit"
                    : project.id === "techforge" ? "hospital"
                    : project.id === "fintrack" ? "mobility"
                    : project.id === "nomad" ? "agenticds"
                    : project.id === "aria" ? "pluxee"
                    : "spring";
                  setCaseStudyOpen(key);
                  return;
                }
                if (project.locked) openModal(project);
              }}
              tabIndex={project.locked || project.hasCaseStudy || project.isGallery ? 0 : undefined}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                if (project.isGallery) { onOpenPhotography?.(); return; }
                if (project.hasCaseStudy) {
                  const key = project.id === "medconnect" ? "medis"
                    : project.id === "helio" ? "devsummit"
                    : project.id === "techforge" ? "hospital"
                    : project.id === "fintrack" ? "mobility"
                    : project.id === "nomad" ? "agenticds"
                    : project.id === "aria" ? "pluxee"
                    : "spring";
                  setCaseStudyOpen(key);
                  return;
                }
                if (project.locked) openModal(project);
              }}
              aria-label={
                project.isGallery
                  ? `${project.title} — Open photography gallery`
                  : project.hasCaseStudy
                  ? `${project.title} — View case study`
                  : project.locked
                  ? `${project.title} — Confidential. Click to request access.`
                  : project.title
              }
            >
              <div
                className="relative h-56 overflow-hidden"
                style={{ background: project.gradient }}
              >
                {project.isGallery ? (
                  <>
                    {/* 3-photo collage preview */}
                    <div className="absolute inset-0 grid grid-cols-3 gap-px opacity-60">
                      <img
                        src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=300&auto=format&q=70"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1690724320380-e692a903a041?w=300&auto=format&q=70"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1620902740358-c07fe4916812?w=300&auto=format&q=70"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg, rgba(11,11,12,0.7) 0%, rgba(11,11,12,0.4) 100%)" }}
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-serif font-black text-white/20 text-center leading-none px-4"
                      style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                      aria-hidden="true"
                    >
                      {project.title.split("—")[0].trim().toUpperCase()}
                    </span>
                  </div>
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 opacity-80"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                  aria-hidden="true"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className="px-2.5 py-1 text-xs font-semibold tracking-wider uppercase"
                    style={{ background: project.accentColor + "33", color: project.accentColor, backdropFilter: "blur(8px)" }}
                  >
                    {project.category}
                  </span>
                  {project.locked && (
                    <span className="px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-black/40 text-white/90 backdrop-blur-sm flex items-center gap-1">
                      <Lock size={10} />
                      Confidential
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 text-white/50 text-xs font-mono">{project.year}</div>
                {project.locked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Lock size={24} />
                      <span className="text-xs tracking-widest uppercase font-semibold">View Access</span>
                    </div>
                  </div>
                )}
                {project.isGallery && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Camera size={24} />
                      <span className="text-xs tracking-widest uppercase font-semibold">Open Gallery</span>
                    </div>
                  </div>
                )}
                {project.hasCaseStudy && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <BookOpen size={24} />
                      <span className="text-xs tracking-widest uppercase font-semibold">View Case Study</span>
                    </div>
                  </div>
                )}
                {!project.locked && !project.hasCaseStudy && !project.isGallery && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <Eye size={24} className="text-white" />
                  </div>
                )}
              </div>

              <div
                className="p-6"
                style={project.isGallery ? { borderTop: "1px solid rgba(255,255,255,0.07)" } : undefined}
              >
                <h3
                  className={`font-serif font-bold text-xl mb-1 group-hover:text-crimson transition-colors duration-200 ${project.isGallery ? "" : "text-charcoal"}`}
                  style={project.isGallery ? { color: "#F0F0F0" } : undefined}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 ${project.isGallery ? "" : "text-charcoal/60"}`}
                  style={project.isGallery ? { color: "rgba(255,255,255,0.38)" } : undefined}
                >
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 text-xs font-medium tracking-wide ${project.isGallery ? "" : "bg-charcoal/5 text-charcoal/60"}`}
                      style={project.isGallery
                        ? { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.38)" }
                        : undefined}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {!showAll && filtered.length > INITIAL_SHOW && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-10 py-4 border border-charcoal/20 text-charcoal text-sm tracking-widest uppercase font-semibold hover:border-burgundy hover:text-burgundy transition-all duration-200"
            >
              View All {filtered.length} Projects
            </button>
          </div>
        )}
      </div>

      {caseStudyOpen === "medis" && <MedisCaseStudy onClose={() => setCaseStudyOpen(null)} />}
      {caseStudyOpen === "devsummit" && <DevSummitCaseStudy onClose={() => setCaseStudyOpen(null)} />}
      {caseStudyOpen === "spring" && <SpringSavingsCaseStudy onClose={() => setCaseStudyOpen(null)} />}
      {caseStudyOpen === "hospital" && <HospitalCaseStudy onClose={() => setCaseStudyOpen(null)} />}
      {caseStudyOpen === "mobility" && <MobilityCaseStudy onClose={() => setCaseStudyOpen(null)} />}
      {caseStudyOpen === "agenticds" && <AgenticDSCaseStudy onClose={() => setCaseStudyOpen(null)} />}
      {caseStudyOpen === "pluxee" && <PluxeeCaseStudy onClose={() => setCaseStudyOpen(null)} />}

      {modal.project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Access ${modal.project.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white w-full max-w-lg shadow-2xl overflow-hidden">
            <div
              className="h-3 w-full"
              style={{ background: modal.project.gradient }}
              aria-hidden="true"
            />
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock size={14} className="text-crimson" />
                    <span className="text-crimson text-xs tracking-widest uppercase font-semibold">
                      Confidential Project
                    </span>
                  </div>
                  <h2 className="font-serif text-charcoal font-bold text-2xl">{modal.project.title}</h2>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="text-charcoal/40 hover:text-charcoal p-1 transition-colors focus-visible:outline-crimson"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex border-b border-black/10 mb-6">
                <button
                  role="tab"
                  aria-selected={modal.tab === "password"}
                  onClick={() => setModal((m) => ({ ...m, tab: "password" }))}
                  className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold transition-colors focus-visible:outline-crimson ${
                    modal.tab === "password"
                      ? "text-crimson border-b-2 border-crimson"
                      : "text-charcoal/50 hover:text-charcoal"
                  }`}
                >
                  <Lock size={12} className="inline mr-2" />
                  Enter Password
                </button>
                <button
                  role="tab"
                  aria-selected={modal.tab === "request"}
                  onClick={() => setModal((m) => ({ ...m, tab: "request" }))}
                  className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold transition-colors focus-visible:outline-crimson ${
                    modal.tab === "request"
                      ? "text-crimson border-b-2 border-crimson"
                      : "text-charcoal/50 hover:text-charcoal"
                  }`}
                >
                  <Mail size={12} className="inline mr-2" />
                  Request Access
                </button>
              </div>

              {modal.tab === "password" && (
                <div>
                  {modal.passwordSuccess ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <CheckCircle2 size={48} className="text-green-500" />
                      <div>
                        <p className="font-semibold text-charcoal text-lg mb-1">Access Granted!</p>
                        <p className="text-charcoal/60 text-sm">
                          You can now view the full case study for{" "}
                          <strong>{modal.project.title}</strong>.
                        </p>
                      </div>
                      <button
                        className="mt-2 px-6 py-3 bg-crimson text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-crimson-light transition-colors focus-visible:outline-charcoal"
                        onClick={closeModal}
                      >
                        Enter Project
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePasswordSubmit} noValidate>
                      <p className="text-charcoal/60 text-sm mb-6">
                        This project is password-protected. If you have the access code, enter it below.
                      </p>
                      <div className="mb-4">
                        <label htmlFor="modal-password" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                          Password
                        </label>
                        <input
                          id="modal-password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Enter access code…"
                          value={modal.password}
                          onChange={(e) => setModal((m) => ({ ...m, password: e.target.value, passwordError: "" }))}
                          className="w-full border border-black/20 px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors"
                          aria-describedby={modal.passwordError ? "pw-error" : undefined}
                          aria-invalid={!!modal.passwordError}
                        />
                        {modal.passwordError && (
                          <p id="pw-error" role="alert" className="mt-2 text-crimson text-xs flex items-center gap-1.5">
                            <AlertCircle size={12} />
                            {modal.passwordError}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-burgundy text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-burgundy-light transition-colors focus-visible:outline-crimson"
                      >
                        Unlock Project
                      </button>
                      <p className="mt-4 text-charcoal/40 text-xs text-center">
                        Hint for demo: try "sardinha2024"
                      </p>
                    </form>
                  )}
                </div>
              )}

              {modal.tab === "request" && (
                <div>
                  {modal.formSubmitted ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <CheckCircle2 size={48} className="text-green-500" />
                      <div>
                        <p className="font-semibold text-charcoal text-lg mb-1">Request Sent!</p>
                        <p className="text-charcoal/60 text-sm max-w-xs">
                          Your access request for <strong>{modal.project.title}</strong> has been sent. I"ll review
                          and respond to <strong>{modal.form.email}</strong> within 48 hours.
                        </p>
                      </div>
                      <button
                        className="mt-2 px-6 py-3 border border-charcoal/20 text-charcoal text-sm tracking-widest uppercase font-semibold hover:border-charcoal transition-colors focus-visible:outline-crimson"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestSubmit} noValidate>
                      <p className="text-charcoal/60 text-sm mb-5">
                        Fill in the form and I"ll send you access within 24–48 hours.
                      </p>
                      <div className="space-y-4">
                        {[
                          { id: "req-name", label: "Your Name *", type: "text", key: "name", placeholder: "Jane Smith" },
                          { id: "req-email", label: "Email Address *", type: "email", key: "email", placeholder: "jane@company.com" },
                          { id: "req-company", label: "Company / Studio", type: "text", key: "company", placeholder: "Acme Inc." },
                        ].map(({ id, label, type, key, placeholder }) => (
                          <div key={key}>
                            <label htmlFor={id} className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                              {label}
                            </label>
                            <input
                              id={id}
                              type={type}
                              placeholder={placeholder}
                              value={modal.form[key as keyof typeof modal.form]}
                              onChange={(e) =>
                                setModal((m) => ({ ...m, form: { ...m.form, [key]: e.target.value }, formError: "" }))
                              }
                              className="w-full border border-black/20 px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors"
                            />
                          </div>
                        ))}
                        <div>
                          <label htmlFor="req-reason" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                            Reason for Access *
                          </label>
                          <textarea
                            id="req-reason"
                            rows={3}
                            placeholder="I'm a recruiter / hiring manager / fellow designer interested in…"
                            value={modal.form.reason}
                            onChange={(e) =>
                              setModal((m) => ({ ...m, form: { ...m.form, reason: e.target.value }, formError: "" }))
                            }
                            className="w-full border border-black/20 px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors resize-none"
                          />
                        </div>
                      </div>
                      {modal.formError && (
                        <p role="alert" className="mt-3 text-crimson text-xs flex items-center gap-1.5">
                          <AlertCircle size={12} />
                          {modal.formError}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="mt-5 w-full py-3 bg-crimson text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-crimson-light transition-colors focus-visible:outline-charcoal"
                      >
                        Send Access Request
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
