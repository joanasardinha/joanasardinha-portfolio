import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer role="contentinfo" className="bg-burgundy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-crimson flex items-center justify-center">
                <span className="text-offwhite font-serif font-black text-sm">S</span>
              </div>
              <div>
                <span className="font-serif font-black text-offwhite text-lg tracking-widest uppercase block">
                  SARDINHA
                </span>
                <span className="text-crimson text-xs tracking-[0.3em] uppercase font-light">DESIGN</span>
              </div>
            </div>
            <p className="text-offwhite/50 text-sm leading-relaxed max-w-xs">
              Senior UX/UI Designer specialising in Agentic UX, Product Strategy, and Design Systems.
              Based in Lisbon, working globally.
            </p>
          </div>

          <div>
            <p className="text-offwhite text-xs tracking-widest uppercase font-semibold mb-5">Navigate</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { href: "#work", label: "Portfolio" },
                  { href: "#experience", label: "Experience" },
                  { href: "#articles", label: "Articles" },
                  { href: "#services", label: "Mentoring" },
                  { href: "#services", label: "Consulting" },
                  { href: "#contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-offwhite/50 text-sm hover:text-offwhite transition-colors focus-visible:outline-crimson"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-offwhite/30 text-xs">
            © {new Date().getFullYear()} Sardinha Design. All rights reserved.
          </p>
          <p className="text-offwhite/20 text-xs">
            Designed & built with care · Lisbon, Portugal
          </p>
          <button
            onClick={scrollTop}
            aria-label="Scroll back to top"
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-offwhite/50 hover:border-crimson hover:text-offwhite transition-all focus-visible:outline-crimson"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
