import { ArrowDown, Sparkles } from "lucide-react";
import heroPhoto from "../imports/Gemini_Generated_Image_vn5cndvn5cndvn5c__1_.png";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-burgundy"
      style={{ paddingTop: "80px" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 70% 40%, #C81D25 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.3) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.3) 60px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left column — text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-crimson" aria-hidden="true" />
              <span className="text-white text-xs tracking-[0.4em] uppercase font-semibold flex items-center gap-2">
                <Sparkles size={12} />
                Senior UX/UI Designer · Lisbon, PT
              </span>
            </div>

            <h1
              className="font-serif text-offwhite leading-none tracking-tight mb-6 whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 0.9 }}
              translate="no"
              spellCheck={false}
            >
              {"Hi! I'm "}<span className="italic text-crimson">{"JOANA"}</span>
            </h1>

            <p
              className="text-offwhite/70 text-lg font-light leading-relaxed mb-10 mt-6"
              translate="no"
              spellCheck={false}
            >
              <span translate="no">{"A "}</span>
              <span translate="no"><strong className="text-offwhite font-medium"><span translate="no">{"Senior UX/UI Designer"}</span></strong></span>
              <span translate="no">{" turning messy enterprise "}</span>
              <span translate="no"><strong className="text-offwhite font-medium"><span translate="no">{"problems into simple, inclusive digital experiences."}</span></strong></span>
              <span translate="no">{" Powered by "}</span>
              <span translate="no"><strong className="text-offwhite font-medium"><span translate="no">{"AI curiosity"}</span></strong></span>
              <span translate="no">{", "}</span>
              <span translate="no"><strong className="text-offwhite font-medium"><span translate="no">{"accessibility-first thinking"}</span></strong></span>
              <span translate="no">{", and design that actually "}</span>
              <span translate="no"><strong className="text-offwhite font-medium"><span translate="no">{"works for everyone"}</span></strong></span>
              <span translate="no">{" (with a bit of "}</span>
              <span translate="no"><strong className="text-offwhite font-medium"><span translate="no">{"fun"}</span></strong></span>
              <span translate="no">{" along the way)."}</span>
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => onNavigate("work")}
                className="group px-8 py-4 bg-crimson text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-crimson-light transition-all duration-200 focus-visible:outline-offwhite flex items-center gap-3"
              >
                View Work
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate("services")}
                className="px-8 py-4 border border-offwhite/30 text-offwhite text-sm tracking-widest uppercase font-semibold hover:border-offwhite hover:bg-white/5 transition-all duration-200 focus-visible:outline-crimson"
              >
                Book a Call
              </button>
            </div>

          </div>

          {/* Right column — photo */}
          <div className="hidden lg:flex justify-end items-end">
            <img
              src={heroPhoto}
              alt="Joana Sardinha"
              className="w-full max-h-[640px] object-contain object-bottom"
            />
          </div>

        </div>

        {/* Stats — full width, single row */}
        <div className="mt-10 border-t border-white/10 pt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "70+", label: "Projects Shipped" },
              { value: "25+", label: "Design Systems Built" },
              { value: "5", label: "Continents Reached" },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col gap-1 lg:px-8 ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
              >
                <span
                  className="font-serif text-offwhite font-black"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1 }}
                >
                  {value}
                </span>
                <span className="text-offwhite/50 text-xs tracking-widest uppercase font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="absolute right-10 bottom-1/4 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-32 bg-gradient-to-b from-crimson to-transparent" aria-hidden="true" />
        <span
          className="text-offwhite/30 text-xs tracking-widest uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden">
        <ArrowDown size={16} className="text-offwhite/40 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
