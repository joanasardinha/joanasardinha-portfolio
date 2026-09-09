import { ArrowUp, Link2, Rss, Globe } from "lucide-react";
import faviconImg from "../imports/favicon.png";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joanasardinhadesign/",
      icon: Link2,
    },
    {
      label: "Medium",
      href: "https://medium.com/@joanasardinha",
      icon: Rss,
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/joanasardinha",
      icon: Globe,
    },
  ];

  return (
    <footer role="contentinfo" className="border-t border-white/10" style={{ backgroundColor: "rgb(22, 22, 22)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={faviconImg} alt="Sardinha Design Logo" className="w-8 h-8" />
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
            <p className="text-offwhite text-xs tracking-widest uppercase font-semibold mb-5">Connect</p>
            <nav aria-label="Social media links">
              <ul className="space-y-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-offwhite/50 hover:text-offwhite transition-colors focus-visible:outline-crimson group"
                    >
                      <Icon size={16} className="group-hover:text-crimson transition-colors" />
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
