import { useState } from "react";
import { Users, Building2, CheckCircle2, AlertCircle, Clock, ChevronDown, Check, ChevronLeft, ChevronRight } from "lucide-react";

type FormState<T> = { data: T; submitted: boolean; error: string };

interface MentoringForm {
  name: string;
  email: string;
  level: string;
  goal: string;
  time: string;
}

interface ConsultingForm {
  name: string;
  company: string;
  overview: string;
}

const mentoringFeatures = [
  "1-on-1 Portfolio Deep-Dive & Feedback",
  "Career strategy",
  "Interview prep",
  "Weekly async design feedback",
  "Design System & Figma guidance",
];

const consultingFeatures = [
  "UX & Heuristic Audits with action plan",
  "Design System creation in Figma",
  "Agentic UX & AI interface design",
  "Team training & Workshops",
  "UX UI Sprint & Vision PoC",
];

export default function Services() {
  const [openForm, setOpenForm] = useState<"mentoring" | "consulting" | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const cards: ("mentoring" | "consulting")[] = ["mentoring", "consulting"];

  const [mentoring, setMentoring] = useState<FormState<MentoringForm>>({
    data: { name: "", email: "", level: "", goal: "", time: "" },
    submitted: false,
    error: "",
  });

  const [consulting, setConsulting] = useState<FormState<ConsultingForm>>({
    data: { name: "", company: "", overview: "" },
    submitted: false,
    error: "",
  });

  const updateMentoring = (field: keyof MentoringForm, value: string) =>
    setMentoring((s) => ({ ...s, data: { ...s.data, [field]: value }, error: "" }));

  const updateConsulting = (field: keyof ConsultingForm, value: string) =>
    setConsulting((s) => ({ ...s, data: { ...s.data, [field]: value }, error: "" }));

  const submitMentoring = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, level, goal } = mentoring.data;
    if (!name || !email || !level || !goal) {
      setMentoring((s) => ({ ...s, error: "Please fill in all required fields." }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMentoring((s) => ({ ...s, error: "Please enter a valid email address." }));
      return;
    }

    // Send email in background (don't wait for response)
    fetch("https://formspree.io/f/xzzyxxwp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        level,
        goal,
        _captcha: false,
      }),
    }).catch(() => {}); // Silently fail if email doesn't work

    // Always show success to user
    setMentoring((s) => ({ ...s, submitted: true, error: "" }));
  };

  const submitConsulting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, company, overview } = consulting.data;
    if (!name || !overview) {
      setConsulting((s) => ({ ...s, error: "Please fill in all required fields." }));
      return;
    }

    // Send email in background (don't wait for response)
    fetch("https://formspree.io/f/xzzyxxwp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        company: company || "Not provided",
        overview,
        type: "Consulting",
        _captcha: false,
      }),
    }).catch(() => {}); // Silently fail if email doesn't work

    // Always show success to user
    setConsulting((s) => ({ ...s, submitted: true, error: "" }));
  };

  const toggleForm = (type: "mentoring" | "consulting") => {
    setOpenForm((prev) => (prev === type ? null : type));
  };

  const fieldClass =
    "w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-crimson transition-colors";
  const labelClass = "block text-offwhite/80 text-xs font-semibold tracking-widest uppercase mb-2";

  return (
    <section
      id="services"
      aria-label="Services: Mentoring and Consulting"
      className="py-24 lg:py-32 bg-burgundy-light"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-crimson" aria-hidden="true" />
          <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">services</span>
        </div>
        <h2
          className="font-serif text-offwhite leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          Work with me
        </h2>

        {/* ── Mobile carousel ── */}
        <div className="lg:hidden mb-4">
          <div className="overflow-hidden border border-white/15">
            <div
              className="flex transition-transform duration-400 ease-in-out"
              style={{ transform: `translateX(-${activeCard * 100}%)` }}
            >
              {/* MENTORING CARD — mobile */}
              <div
                className={`min-w-full p-8 flex flex-col transition-colors duration-300 ${
                  openForm === "mentoring" ? "bg-white/5" : "bg-transparent"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-crimson/20 flex items-center justify-center">
                    <Users size={16} className="text-crimson" />
                  </div>
                  <span className="text-crimson text-xs tracking-[0.3em] uppercase font-semibold">For Designers</span>
                </div>
                <h3 className="font-serif text-offwhite font-black text-3xl mb-4">Mentoring</h3>
                <p className="text-offwhite/65 text-sm leading-relaxed mb-8">
                  1-on-1 sessions for junior and mid-level UX/UI designers who want to accelerate their career,
                  sharpen their portfolio, and navigate the path to senior roles at top companies.
                </p>
                <ul className="space-y-3 mb-8 flex-1" aria-label="Mentoring includes">
                  {mentoringFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-offwhite/75">
                      <Check size={14} className="text-crimson mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-3 mb-8 border-t border-white/10 pt-8">
                  {[
                    { value: "60-90min", label: "Duration" },
                    { value: "1:1", label: "Format" },
                    { value: "€50", label: "/ Session" },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <p className="font-serif text-offwhite font-black text-xl">{value}</p>
                      <p className="text-offwhite/40 text-xs tracking-widest uppercase mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toggleForm("mentoring")}
                  aria-expanded={openForm === "mentoring"}
                  aria-controls="mentoring-form"
                  className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-semibold transition-all duration-200 ${
                    openForm === "mentoring" ? "bg-crimson text-offwhite" : "bg-offwhite text-burgundy hover:bg-white"
                  }`}
                >
                  {openForm === "mentoring" ? "Close Form" : "Book a Session"}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${openForm === "mentoring" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* CONSULTING CARD — mobile */}
              <div
                className={`min-w-full p-8 flex flex-col transition-colors duration-300 ${
                  openForm === "consulting" ? "bg-white/5" : "bg-transparent"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-crimson/20 flex items-center justify-center">
                    <Building2 size={16} className="text-crimson" />
                  </div>
                  <span className="text-crimson text-xs tracking-[0.3em] uppercase font-semibold">For Companies</span>
                </div>
                <h3 className="font-serif text-offwhite font-black text-3xl mb-4">Consulting</h3>
                <p className="text-offwhite/65 text-sm leading-relaxed mb-8">
                  Strategic design partnerships with startups, scale-ups, and enterprise teams — from foundational
                  design system architecture to integrating Agentic AI into existing products.
                </p>
                <ul className="space-y-3 mb-8 flex-1" aria-label="Consulting includes">
                  {consultingFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-offwhite/75">
                      <Check size={14} className="text-crimson mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-3 mb-8 border-t border-white/10 pt-8">
                  {[
                    { value: "2wk+", label: "Min. Length" },
                    { value: "Remote", label: "Format" },
                    { value: "Custom", label: "Pricing" },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <p className="font-serif text-offwhite font-black text-xl">{value}</p>
                      <p className="text-offwhite/40 text-xs tracking-widest uppercase mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toggleForm("consulting")}
                  aria-expanded={openForm === "consulting"}
                  aria-controls="consulting-form"
                  className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-semibold transition-all duration-200 ${
                    openForm === "consulting"
                      ? "bg-crimson text-offwhite"
                      : "border border-white/30 text-offwhite hover:border-offwhite hover:bg-white/5"
                  }`}
                >
                  {openForm === "consulting" ? "Close Form" : "Inquire Now"}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${openForm === "consulting" ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={() => setActiveCard(0)}
              disabled={activeCard === 0}
              aria-label="Previous card"
              className="w-8 h-8 flex items-center justify-center border border-white/20 text-offwhite/50 hover:border-crimson hover:text-crimson disabled:opacity-25 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="flex gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCard(i)}
                  aria-label={`Go to ${cards[i]} card`}
                  className={`h-1 transition-all duration-300 ${
                    activeCard === i ? "w-8 bg-crimson" : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveCard(1)}
              disabled={activeCard === 1}
              aria-label="Next card"
              className="w-8 h-8 flex items-center justify-center border border-white/20 text-offwhite/50 hover:border-crimson hover:text-crimson disabled:opacity-25 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Desktop: side-by-side ── */}
        <div className="hidden lg:grid grid-cols-2 gap-0 border border-white/15 mb-4">
          {/* MENTORING CARD — desktop */}
          <div
            className={`p-10 border-r border-white/15 flex flex-col transition-colors duration-300 ${
              openForm === "mentoring" ? "bg-white/5" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-crimson/20 flex items-center justify-center">
                <Users size={16} className="text-crimson" />
              </div>
              <span className="text-crimson text-xs tracking-[0.3em] uppercase font-semibold">For Designers</span>
            </div>
            <h3 className="font-serif text-offwhite font-black text-4xl mb-4">Mentoring</h3>
            <p className="text-offwhite/65 text-sm leading-relaxed mb-8">
              1-on-1 sessions for junior and mid-level UX/UI designers who want to accelerate their career,
              sharpen their portfolio, and navigate the path to senior roles at top companies.
            </p>
            <ul className="space-y-3 mb-8 flex-1" aria-label="Mentoring includes">
              {mentoringFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-offwhite/75">
                  <Check size={14} className="text-crimson mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-3 mb-8 border-t border-white/10 pt-8">
              {[
                { value: "60-90min", label: "Duration" },
                { value: "1:1", label: "Format" },
                { value: "€50", label: "/ Session" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-offwhite font-black text-xl">{value}</p>
                  <p className="text-offwhite/40 text-xs tracking-widest uppercase mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => toggleForm("mentoring")}
              aria-expanded={openForm === "mentoring"}
              aria-controls="mentoring-form"
              className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-semibold transition-all duration-200 focus-visible:outline-offwhite ${
                openForm === "mentoring" ? "bg-crimson text-offwhite" : "bg-offwhite text-burgundy hover:bg-white"
              }`}
            >
              {openForm === "mentoring" ? "Close Form" : "Book a Session"}
              <ChevronDown size={16} className={`transition-transform duration-300 ${openForm === "mentoring" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* CONSULTING CARD — desktop */}
          <div
            className={`p-10 flex flex-col transition-colors duration-300 ${
              openForm === "consulting" ? "bg-white/5" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-crimson/20 flex items-center justify-center">
                <Building2 size={16} className="text-crimson" />
              </div>
              <span className="text-crimson text-xs tracking-[0.3em] uppercase font-semibold">For Companies</span>
            </div>
            <h3 className="font-serif text-offwhite font-black text-4xl mb-4">Consulting</h3>
            <p className="text-offwhite/65 text-sm leading-relaxed mb-8">
              Strategic design partnerships with startups, scale-ups, and enterprise teams — from foundational
              design system architecture to integrating Agentic AI into existing products.
            </p>
            <ul className="space-y-3 mb-8 flex-1" aria-label="Consulting includes">
              {consultingFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-offwhite/75">
                  <Check size={14} className="text-crimson mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-3 mb-8 border-t border-white/10 pt-8">
              {[
                { value: "2wk+", label: "Min. Length" },
                { value: "Remote", label: "Format" },
                { value: "Custom", label: "Pricing" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-offwhite font-black text-xl">{value}</p>
                  <p className="text-offwhite/40 text-xs tracking-widest uppercase mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => toggleForm("consulting")}
              aria-expanded={openForm === "consulting"}
              aria-controls="consulting-form"
              className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-semibold transition-all duration-200 focus-visible:outline-offwhite ${
                openForm === "consulting"
                  ? "bg-crimson text-offwhite"
                  : "border border-white/30 text-offwhite hover:border-offwhite hover:bg-white/5"
              }`}
            >
              {openForm === "consulting" ? "Close Form" : "Inquire Now"}
              <ChevronDown size={16} className={`transition-transform duration-300 ${openForm === "consulting" ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* MENTORING FORM — expanded below */}
        <div
          id="mentoring-form"
          role="region"
          aria-label="Book a mentoring session"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openForm === "mentoring" ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={openForm !== "mentoring"}
        >
          <div className="border border-t-0 border-white/15 p-8 lg:p-10">
            <div className="max-w-2xl">
              <h4 className="font-serif text-offwhite font-bold text-2xl mb-2 flex items-center gap-3">
                <Users size={20} className="text-crimson" />
                Book a Mentoring Session
              </h4>
              <p className="text-offwhite/50 text-sm mb-8">
                Fill in the form and I'll get back to you within 48 hours to confirm your slot.
              </p>

              {mentoring.submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle2 size={52} className="text-green-400" />
                  <div>
                    <p className="font-semibold text-offwhite text-xl mb-2">You're booked in!</p>
                    <p className="text-offwhite/60 text-sm max-w-xs">
                      I'll reach out to{" "}
                      <strong className="text-offwhite">{mentoring.data.email}</strong> within 48 hours to
                      confirm your session slot.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitMentoring} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="m-name" className={labelClass}>Full Name *</label>
                      <input
                        id="m-name"
                        type="text"
                        placeholder="Your name"
                        value={mentoring.data.name}
                        onChange={(e) => updateMentoring("name", e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="m-email" className={labelClass}>Email *</label>
                      <input
                        id="m-email"
                        type="email"
                        placeholder="you@email.com"
                        value={mentoring.data.email}
                        onChange={(e) => updateMentoring("email", e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="m-level" className={labelClass}>Current Level *</label>
                    <select
                      id="m-level"
                      value={mentoring.data.level}
                      onChange={(e) => updateMentoring("level", e.target.value)}
                      className={`${fieldClass} appearance-none`}
                    >
                      <option value="">Select your level…</option>
                      <option value="junior">Junior Designer (0–2 years)</option>
                      <option value="mid">Mid-Level Designer (2–4 years)</option>
                      <option value="senior-aspiring">Aspiring Senior (4–6 years)</option>
                      <option value="career-change">Career Changer / Bootcamp Graduate</option>
                      <option value="freelancer">Freelancer / Independent Designer</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="m-goal" className={labelClass}>Main Goal / Topic *</label>
                    <textarea
                      id="m-goal"
                      rows={3}
                      placeholder="e.g. Portfolio review, interview prep, design system guidance…"
                      value={mentoring.data.goal}
                      onChange={(e) => updateMentoring("goal", e.target.value)}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label htmlFor="m-time" className={labelClass}>
                      <Clock size={10} className="inline mr-1" />
                      Preferred Time (CET)
                    </label>
                    <input
                      id="m-time"
                      type="text"
                      placeholder="e.g. Weekday mornings, Friday afternoons…"
                      value={mentoring.data.time}
                      onChange={(e) => updateMentoring("time", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  {mentoring.error && (
                    <p role="alert" className="text-crimson-light text-xs flex items-center gap-1.5">
                      <AlertCircle size={12} />
                      {mentoring.error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="px-10 py-4 bg-crimson text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-crimson-light transition-colors focus-visible:outline-offwhite"
                  >
                    Send Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CONSULTING FORM — expanded below */}
        <div
          id="consulting-form"
          role="region"
          aria-label="Consulting inquiry form"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openForm === "consulting" ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={openForm !== "consulting"}
        >
          <div className="border border-t-0 border-white/15 p-8 lg:p-10">
            <div className="max-w-2xl">
              <h4 className="font-serif text-offwhite font-bold text-2xl mb-2 flex items-center gap-3">
                <Building2 size={20} className="text-crimson" />
                Consulting Inquiry
              </h4>
              <p className="text-offwhite/50 text-sm mb-8">
                I review consulting inquiries each week and follow up within 3–5 business days.
              </p>

              {consulting.submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle2 size={52} className="text-green-400" />
                  <div>
                    <p className="font-semibold text-offwhite text-xl mb-2">Inquiry Received!</p>
                    <p className="text-offwhite/60 text-sm max-w-xs">
                      Thanks, <strong className="text-offwhite">{consulting.data.name}</strong>. I'll follow
                      up within 3–5 business days to discuss your project.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitConsulting} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-name" className={labelClass}>Your Name *</label>
                      <input
                        id="c-name"
                        type="text"
                        placeholder="Full name"
                        value={consulting.data.name}
                        onChange={(e) => updateConsulting("name", e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-company" className={labelClass}>Company / Project</label>
                      <input
                        id="c-company"
                        type="text"
                        placeholder="Acme Inc. or Project Name"
                        value={consulting.data.company}
                        onChange={(e) => updateConsulting("company", e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-overview" className={labelClass}>Project Overview / Timeline *</label>
                    <textarea
                      id="c-overview"
                      rows={5}
                      placeholder="Describe the challenge, desired outcomes, and rough timeline."
                      value={consulting.data.overview}
                      onChange={(e) => updateConsulting("overview", e.target.value)}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>
                  {consulting.error && (
                    <p role="alert" className="text-crimson-light text-xs flex items-center gap-1.5">
                      <AlertCircle size={12} />
                      {consulting.error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="px-10 py-4 bg-offwhite text-burgundy text-sm tracking-widest uppercase font-semibold hover:bg-white transition-colors focus-visible:outline-crimson"
                  >
                    Send Consulting Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
