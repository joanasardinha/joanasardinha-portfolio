import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const navLinks = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "articles", label: "Articles" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ activeSection, onNavigate }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-burgundy shadow-2xl border-b border-white/10" : "bg-burgundy/90 backdrop-blur-md"}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => handleNav("hero")}
            className="flex items-center gap-3 group focus-visible:outline-crimson"
            aria-label="Sardinha Design – Go to top"
          >
            <div className="w-8 h-8 bg-crimson flex items-center justify-center">
              <span className="text-offwhite font-serif font-black text-sm leading-none">S</span>
            </div>
            <span className="font-serif font-black text-offwhite text-lg tracking-widest uppercase">
              SARDINHA
            </span>
            <span className="hidden sm:block text-crimson text-xs tracking-[0.3em] uppercase font-light mt-0.5">
              DESIGN
            </span>
          </button>

          <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                aria-current={activeSection === id ? "page" : undefined}
                className={`px-4 py-2 text-sm tracking-widest uppercase font-medium transition-all duration-200 focus-visible:outline-crimson ${
                  activeSection === id
                    ? "text-crimson"
                    : "text-offwhite/70 hover:text-offwhite"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden text-offwhite p-2 focus-visible:outline-crimson"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden bg-burgundy border-t border-white/10"
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`text-left py-3 px-4 text-sm tracking-widest uppercase font-medium border-b border-white/5 transition-colors duration-200 focus-visible:outline-crimson ${
                  activeSection === id ? "text-crimson" : "text-offwhite/80 hover:text-offwhite"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav("services")}
              className="mt-3 py-3 px-4 bg-crimson text-offwhite text-sm tracking-widest uppercase font-semibold focus-visible:outline-offwhite"
            >
              Book a Call
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
