import { useState, useRef, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Learning from "./components/Learning";
import Articles from "./components/Articles";
import Services from "./components/Services";
import Footer from "./components/Footer";
import PhotographyGallery from "./components/PhotographyGallery";
import GalleryAdmin from "./components/GalleryAdmin";
import ProjectPage from "./components/ProjectPage";

const sectionIds = ["hero", "work", "experience", "articles", "services"];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [photographyOpen, setPhotographyOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/admin") {
      setProjectId("admin");
      return;
    }
    const match = pathname.match(/^\/projects\/(.+)$/);
    if (match) {
      setProjectId(match[1]);
    }
  }, []);

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

  if (projectId === "admin") {
    return (
      <GalleryAdmin />
    );
  }

  if (projectId) {
    return (
      <ProjectPage
        projectId={projectId}
        onBack={() => {
          window.history.back();
        }}
      />
    );
  }

  if (photographyOpen) {
    return (
      <PhotographyGallery />
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
      </main>
      <Footer />
    </div>
  );
}
