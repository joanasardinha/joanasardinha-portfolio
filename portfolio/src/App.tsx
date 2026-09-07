import { useState, useRef, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Learning from "./components/Learning";
import Articles from "./components/Articles";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PhotographyPage from "./components/PhotographyPage";

const sectionIds = ["hero", "work", "experience", "articles", "services", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [photographyOpen, setPhotographyOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-64px 0px -40% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (photographyOpen) {
    return (
      <PhotographyPage
        onBack={() => {
          setPhotographyOpen(false);
          setTimeout(() => {
            const el = document.getElementById("work");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-burgundy" style={{ fontFamily: "var(--font-sans)" }}>
      <Nav activeSection={activeSection} onNavigate={scrollTo} />
      <main id="main-content">
        <div id="hero">
          <Hero onNavigate={scrollTo} />
        </div>
        <div id="work">
          <Portfolio onOpenPhotography={() => setPhotographyOpen(true)} />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="learning">
          <Learning />
        </div>
        <div id="articles">
          <Articles />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
