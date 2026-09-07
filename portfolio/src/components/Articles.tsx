import { useRef, useState, useEffect } from "react";
import { ExternalLink, Clock, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import gromitGif from "../imports/1_Dk0CBg_V2hP_iDQW2y9d_w.gif";
import aiNativeImg from "../imports/sing_black_and_white_GIF_by_Boomerang_Official.gif";
import japanImg from "../imports/1_5Uocur4S90BLP6Grmw3l7g.jpeg";
import imposterImg from "../imports/0_8HHr3Sp0vW5FOLng.jpeg";
import outsystemsImg from "../imports/1_eDrpw2dlWrSa1USris525w.Jpeg";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  url: string;
  accentColor: string;
  image: string;
}

const CRIMSON = "#C81D25";

const articles: Article[] = [
  {
    id: "ai-native-design-seas",
    title: "Navigating the AI-Native Design Seas: AI Can Be the Engine, but Research Steers the Ship 🌊",
    excerpt:
      "There was a time when my worth as a UX/UI designer felt entirely tied to how many hours I spent inside the Figma shipyard. On why research remains the compass in an AI-powered design world.",
    readTime: "4 min read",
    date: "Sep 2026",
    tags: ["AI", "UX Research", "Design Strategy"],
    url: "https://medium.com/@joanasardinha/navigating-the-ai-native-design-seas-ai-can-be-the-engine-but-research-steers-the-ship-2e4029ce51e3",
    accentColor: CRIMSON,
    image: aiNativeImg,
  },
  {
    id: "ux-designer-reader",
    title: "I'm a UX Designer, not a Reader",
    excerpt:
      "Exploring how AI tools like Gemini and NotebookLM are reshaping the way designers consume research, synthesise insights, and stay sharp in a field that moves faster than anyone can read.",
    readTime: "6 min read",
    date: "Aug 2026",
    tags: ["AI", "Figma", "Productivity"],
    url: "https://medium.com/@joanasardinha/im-a-ux-designer-not-a-reader-d031f231c2d4",
    accentColor: CRIMSON,
    image: gromitGif,
  },
  {
    id: "japan-frictionless-ux",
    title: "What a Journey to Japan Taught Me About Frictionless UX",
    excerpt:
      "A trip to Japan reveals why the world's most intuitive experiences are rarely about the interface — and what Western designers persistently get wrong about 'seamless' design.",
    readTime: "9 min read",
    date: "May 2026",
    tags: ["UX Design", "Travel", "Human-Centred Design"],
    url: "https://medium.com/@joanasardinha/what-a-journey-to-japan-taught-me-about-frictionless-ux-8efe6cc74362",
    accentColor: CRIMSON,
    image: japanImg,
  },
  {
    id: "imposter-syndrome",
    title: "How Our Minds Play Tricks: Cracking the Code of Imposter Syndrome",
    excerpt:
      "A personal and psychological dive into imposter syndrome in design careers — why high-achievers feel it most, and three cognitive reframes that actually shift the pattern.",
    readTime: "8 min read",
    date: "Feb 2024",
    tags: ["Designer's Life", "Mental Health", "Self-Improvement"],
    url: "https://medium.com/@joanasardinha/how-our-minds-play-tricks-cracking-the-code-of-imposter-syndrome-baef9a1ce6e2",
    accentColor: CRIMSON,
    image: imposterImg,
  },
  {
    id: "outsystems-kickoff",
    title: "OutSystems Services Kickoff 2024 — Elevate Together with AI-Driven Logo",
    excerpt:
      "Behind the scenes of designing a motion brand identity for OutSystems' annual kickoff — how AI tools accelerated ideation while a human designer shaped the final vision.",
    readTime: "5 min read",
    date: "Feb 2024",
    tags: ["Branding", "Artificial Intelligence", "Graphic Design"],
    url: "https://medium.com/@joanasardinha/outsystems-services-kickoff-2024-elevate-together-with-ai-driven-logo-174aeb43987c",
    accentColor: CRIMSON,
    image: outsystemsImg,
  },
];

export default function Articles() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateState = () => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = Math.round(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft < maxScroll - 1);

    const cardWidth = el.querySelector("article")?.offsetWidth ?? el.clientWidth;
    setActiveIndex(Math.round(scrollLeft / (cardWidth + 24)));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => el.removeEventListener("scroll", updateState);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? el.clientWidth;
    el.scrollBy({ left: dir === "right" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section id="articles" aria-label="Articles and Writing" className="py-24 lg:py-32 bg-offwhite-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-crimson" aria-hidden="true" />
              <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">On Medium</span>
            </div>
            <h2
              className="font-serif text-charcoal leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              What's on My Mind
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2" role="group" aria-label="Slide navigation">
              <button
                onClick={() => scroll("left")}
                disabled={!canLeft}
                aria-label="Previous article"
                className="w-11 h-11 border border-charcoal/20 flex items-center justify-center text-charcoal/50 hover:border-charcoal hover:text-charcoal transition-all focus-visible:outline-crimson disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canRight}
                aria-label="Next article"
                className="w-11 h-11 border border-charcoal/20 flex items-center justify-center text-charcoal/50 hover:border-charcoal hover:text-charcoal transition-all focus-visible:outline-crimson disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <a
              href="https://medium.com/@joanasardinha"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-charcoal/50 text-xs tracking-widest uppercase font-semibold hover:text-charcoal transition-colors focus-visible:outline-crimson"
            >
              All on Medium
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="region"
          aria-label="Articles carousel"
        >
          {articles.map((article, i) => (
            <article
              key={article.id}
              className="flex-none w-[85vw] sm:w-[420px] lg:w-[480px] bg-white border border-black/8 flex flex-col snap-start card-hover"
            >
              <div
                className="h-1 w-full flex-shrink-0"
                style={{ background: article.accentColor }}
                aria-hidden="true"
              />
              <div className="h-44 w-full flex-shrink-0 overflow-hidden bg-charcoal/5">
                <img
                  src={article.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                      style={{ color: article.accentColor, background: article.accentColor + "18" }}
                    >
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="font-serif text-charcoal font-bold text-2xl leading-tight mb-4"
                  style={{ viewTransitionName: `article-title-${i}` }}
                >
                  {article.title}
                </h3>

                <p className="text-charcoal/60 text-sm leading-relaxed mb-6 flex-1">{article.excerpt}</p>

                <div className="flex items-center justify-between border-t border-black/8 pt-5 mt-auto">
                  <div className="flex items-center gap-3 text-charcoal/40 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-crimson text-xs font-semibold tracking-widest uppercase hover:text-crimson-light transition-colors focus-visible:outline-crimson"
                    aria-label={`Read "${article.title}" on Medium`}
                  >
                    Read
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2" role="tablist" aria-label="Article position">
            {articles.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to article ${i + 1}`}
                onClick={() => {
                  const el = trackRef.current;
                  if (!el) return;
                  const cardWidth = el.querySelector("article")?.offsetWidth ?? el.clientWidth;
                  el.scrollTo({ left: i * (cardWidth + 24), behavior: "smooth" });
                }}
                className={`h-0.5 transition-all duration-300 focus-visible:outline-crimson ${
                  activeIndex === i ? "w-8 bg-crimson" : "w-4 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
              />
            ))}
          </div>
          <a
            href="https://medium.com/@joanasardinha"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center gap-1.5 text-charcoal/50 text-xs tracking-widest uppercase font-semibold hover:text-charcoal transition-colors focus-visible:outline-crimson"
          >
            All on Medium
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
