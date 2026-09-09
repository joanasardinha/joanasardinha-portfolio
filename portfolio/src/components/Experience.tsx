import { useState, useRef, useEffect } from "react";
import { Download, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

const timeline = [
  {
    id: 1,
    role: "Senior UX-UI Designer",
    company: "Outsystems",
    location: "Lisbon, PT (Remote)",
    period: "May 2022 — Present",
    description:
      "Spearheaded global UX strategy, design systems, and product innovation across 6 continents, driving low-code accessibility, AI integration, and enterprise digital transformation for clients in banking, retail, public sector, and manufacturing.",
    achievements: [
      "Conducted UX/UI methodology audits, strategy workshops, and high-impact Design Sprints for global clients, mentoring cross-functional teams and external partners worldwide.",
      "Built scalable UI Kits, enterprise Design Systems, and Live Style Guides tailored for complex low-code environments and accessible design standards.",
      "Led Vision Projects shaping agentic AI experiences and next-generation product interfaces across diverse industries and international cultures.",
      "Created and managed OutSystems' internal UX/UI Methodology 2.0, integrating AI tools to streamline design workflows and accelerate delivery timelines.",
    ],
    current: true,
  },
  {
    id: 2,
    role: "Senior UX-UI Designer",
    company: "Ageas Group",
    location: "Portugal",
    period: "July 2019 — May 2022",
    description:
      "Delivered end-to-end UX/UI across multi-brand financial, insurance, and healthcare products, scaling design operations through unified systems and cross-functional collaboration.",
    achievements: [
      "Built, managed, and optimized multi-brand Design Systems, enabling white-label theme customization across Ageas Seguros, Ocidental, Millennium BCP, ActivoBank, Seguro Directo, Fundação Ageas, and Médis.",
      "Conducted extensive user testing and collaborated closely with developers and front-end engineers to ensure design precision and seamless handoffs.",
      "Rapidly designed and launched critical mobile apps, including the Médis app and its telemedicine feature built in just 3 months during the COVID-19 pandemic.",
      "Mentored junior designers and led design alignment with external agency creative teams and key suppliers across all group brands.",
    ],
    current: false,
  },
  {
    id: 3,
    role: "Senior UX Designer",
    company: "Inetum Portugal (GFI Portugal)",
    location: "Lisbon, PT",
    period: "October 2018 — July 2019",
    description:
      "Spearheaded end-to-end UX for the Portuguese Citizen Portal (AMA)—delivering real-time data interfaces, complex interaction models, and multichannel service design. Mentored 3 junior designers, led Design Thinking workshops, and drove high-impact digital projects for Vodafone Empresas, Banco Montepio, CCB, and OKI.",
    achievements: [
      "Service Design; Design Thinking; Design Leadership; Multichannel UX",
    ],
    current: false,
  },
  {
    id: 4,
    role: "UX/UI Designer",
    company: "PHC Software (Cegid)",
    location: "Oeiras, PT",
    period: "February 2017 — October 2018",
    description:
      "Executed end-to-end visual design across print and digital touchpoints, driving brand identity, marketing campaigns, and internal employee engagement initiatives.",
    achievements: [
      "Designed digital and print assets, including landing pages, digital/printed catalogs, flyers, custom iconography, and company mascot.",
      "Ran A/B testing on marketing pages to optimize conversion rates and enhance performance metrics.",
      "Spearheaded event branding and visually designed an internal HR happiness program to boost employee culture.",
    ],
    current: false,
  },
];

const skills: { label: string; items: string[] }[] = [
  {
    label: "Research & Testing",
    items: [
      "Business Analysis", "Competitors Analysis", "Personas",
      "Empathy Journey Mapping", "Information Architecture",
      "Tree Testing", "A/B Testing", "User Testing",
      "UX-UI Assessment", "Accessibility", "Card Sorting",
    ],
  },
  {
    label: "Design & Prototyping",
    items: [
      "Low Fidelity Wireframes", "Mid and High Fidelity Mockups", "Clickable Prototypes",
      "UX Content", "Agentic Experiences", "Branding", "UI Kit & Design Systems", "Inclusive Content and UX",
    ],
  },
  {
    label: "Agentic & AI UX",
    items: ["Conversational Design", "Human-AI Collaboration", "Claude Skills", "Augmented Reality vs Virtual Reality"],
  },
  {
    label: "Tools",
    items: [
      "Figma", "Claude", "Notebook LM", "Gemini", "Miro",
      "UsabilityHub", "Lookback", "Hotjar",
      "Figma Make", "Sketch", "Adobe XD",
      "Adobe Illustrator", "Adobe Photoshop",
    ],
  },
];



export default function Experience() {
  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(timeline.length - 1, i + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) next();
    else if (diff < -threshold) prev();
  };

  const updateActiveIndex = () => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = Math.round(el.scrollLeft);
    const cardWidth = el.querySelector("div[snap-start]")?.offsetWidth ?? el.clientWidth;
    setActiveIndex(Math.round(scrollLeft / (cardWidth + 24)));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    updateActiveIndex();
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, []);

  return (
    <section
      id="experience"
      aria-label="Experience and Career History"
      className="py-14 lg:py-20"
      style={{ background: "#1A1A1A" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-crimson" aria-hidden="true" />
              <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">Career</span>
            </div>
            <h2 className="font-serif text-offwhite leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              My Story so far
            </h2>
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("CV download would trigger here."); }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-offwhite/80 text-sm tracking-widest uppercase font-semibold hover:border-offwhite hover:text-offwhite hover:bg-white/5 transition-all duration-200 focus-visible:outline-crimson self-start lg:self-auto"
            aria-label="Download CV as PDF"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-10">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {timeline.map((item) => (
              <div key={item.id} className="flex-none w-[85vw] sm:w-[420px] border border-white/15 p-6 flex flex-col snap-start">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-offwhite/40 text-xs font-mono tracking-wider">{item.period}</span>
                    {item.current && (
                      <span className="relative px-2 py-0.5 bg-crimson/20 text-crimson text-xs font-semibold tracking-widest uppercase">
                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-crimson animate-ping" aria-hidden="true" />
                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden="true" />
                        <span className="ml-2">Current</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-offwhite font-bold text-2xl mb-1">{item.role}</h3>
                  <p className="text-crimson text-sm font-semibold tracking-wide mb-4">
                    {item.company}
                    <span className="text-offwhite/40 font-normal ml-2">· {item.location}</span>
                  </p>
                  <p className="text-offwhite/60 text-sm leading-relaxed mb-5">{item.description}</p>
                  <ul className="space-y-2.5" aria-label="Key achievements">
                    {item.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-xs text-offwhite/55">
                        <span className="w-1 h-1 rounded-full bg-crimson mt-1.5 flex-shrink-0" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6" role="tablist" aria-label="Experience position">
            {timeline.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to ${timeline[i].company}`}
                onClick={() => {
                  const el = trackRef.current;
                  if (!el) return;
                  const cardWidth = el.querySelector("div[snap-start]")?.offsetWidth ?? el.clientWidth;
                  el.scrollTo({ left: i * (cardWidth + 24), behavior: "smooth" });
                }}
                className={`h-0.5 transition-all duration-300 focus-visible:outline-crimson ${
                  activeIndex === i ? "w-8 bg-crimson" : "w-4 bg-offwhite/20 hover:bg-offwhite/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col">
            {/* Desktop Carousel */}
            <div className="overflow-hidden flex-1">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {timeline.map((item) => (
                  <div key={item.id} className="min-w-full pr-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-offwhite/40 text-xs font-mono tracking-wider">{item.period}</span>
                      {item.current && (
                        <span className="relative px-2 py-0.5 bg-crimson/20 text-crimson text-xs font-semibold tracking-widest uppercase">
                          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-crimson animate-ping" aria-hidden="true" />
                          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden="true" />
                          <span className="ml-2">Current</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-offwhite font-bold text-2xl lg:text-3xl mb-1">{item.role}</h3>
                    <p className="text-crimson text-sm font-semibold tracking-wide mb-4">
                      {item.company}
                      <span className="text-offwhite/40 font-normal ml-2">· {item.location}</span>
                    </p>
                    <p className="text-offwhite/60 text-sm leading-relaxed mb-5">{item.description}</p>
                    <ul className="space-y-2.5" aria-label="Key achievements">
                      {item.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-sm text-offwhite/55">
                          <span className="w-1 h-1 rounded-full bg-crimson mt-2 flex-shrink-0" aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop carousel controls */}
            <div className="flex items-center gap-5 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={prev}
                disabled={active === 0}
                aria-label="Previous role"
                className="w-9 h-9 flex items-center justify-center border border-white/20 text-offwhite/50 hover:border-crimson hover:text-crimson disabled:opacity-20 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-1.5 flex-1">
                {timeline.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to ${timeline[i].company}`}
                    className={`h-0.5 transition-all duration-300 ${
                      active === i ? "flex-[3] bg-crimson" : "flex-1 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <span className="text-offwhite/30 text-xs font-mono tabular-nums">
                {active + 1} / {timeline.length}
              </span>

              <button
                onClick={next}
                disabled={active === timeline.length - 1}
                aria-label="Next role"
                className="w-9 h-9 flex items-center justify-center border border-white/20 text-offwhite/50 hover:border-crimson hover:text-crimson disabled:opacity-20 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-offwhite font-bold text-2xl mb-8 flex items-center gap-3">
                <Briefcase size={18} className="text-crimson" />
                Skills
              </h3>
              <div className="space-y-6">
                {skills.map(({ label, items }) => (
                  <div key={label}>
                    <p className="text-crimson text-xs tracking-widest uppercase font-semibold mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 border border-white/10 text-offwhite/70 text-xs font-medium hover:border-crimson/40 hover:text-offwhite transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
