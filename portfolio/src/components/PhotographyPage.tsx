import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Info, MapPin, Camera, Maximize2 } from "lucide-react";

type Orientation = "landscape" | "portrait";

interface Photo {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  url: string;
  thumbnailUrl: string;
  orientation: Orientation;
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    iso: string;
    shutterSpeed: string;
  };
}

const CATEGORIES = [
  "All Stories",
  "Street & Urban",
  "Architecture",
  "Travel & Landscapes",
  "Minimalist / Textures",
  "Portraits",
];

const photos: Photo[] = [
  {
    id: "tokyo-nights",
    title: "Tokyo Nights",
    subtitle: "Lanterns bleed vermilion into wet asphalt on a side street off Shinjuku",
    category: "Street & Urban",
    location: "Shinjuku, Tokyo, Japan",
    year: "2023",
    url: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=1600&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=600&auto=format&q=80",
    orientation: "landscape",
    exif: { camera: "Sony α7 IV", lens: "35mm f/1.8", focalLength: "35mm", aperture: "f/1.8", iso: "ISO 3200", shutterSpeed: "1/60s" },
  },
  {
    id: "city-silhouette",
    title: "Vertical City",
    subtitle: "Looking straight up — glass facades dissolving into a pewter sky",
    category: "Street & Urban",
    location: "Canary Wharf, London, UK",
    year: "2022",
    url: "https://images.unsplash.com/photo-1706516693405-6aef0f28cdaa?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1706516693405-6aef0f28cdaa?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Fujifilm X-T5", lens: "14mm f/2.8", focalLength: "14mm", aperture: "f/5.6", iso: "ISO 200", shutterSpeed: "1/250s" },
  },
  {
    id: "rain-reflections",
    title: "Rain Reflections",
    subtitle: "Neon ideograms dissolving in standing water — Shibuya after the storm",
    category: "Street & Urban",
    location: "Shibuya, Tokyo, Japan",
    year: "2023",
    url: "https://images.unsplash.com/photo-1772475898153-2956ebccf48a?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1772475898153-2956ebccf48a?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Sony α7 IV", lens: "50mm f/1.4", focalLength: "50mm", aperture: "f/2.0", iso: "ISO 6400", shutterSpeed: "1/30s" },
  },
  {
    id: "neon-alley",
    title: "Neon Alley",
    subtitle: "After midnight in a forgotten side street, rain-slicked and empty",
    category: "Street & Urban",
    location: "Osaka, Japan",
    year: "2023",
    url: "https://images.unsplash.com/photo-1707872489340-8bf43c9e8c21?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1707872489340-8bf43c9e8c21?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Ricoh GR IIIx", lens: "40mm f/2.8", focalLength: "40mm", aperture: "f/2.8", iso: "ISO 12800", shutterSpeed: "1/15s" },
  },
  {
    id: "concrete-chair",
    title: "Negative Space",
    subtitle: "A single chair against unfinished plaster — geometry as meditation",
    category: "Architecture",
    location: "Studio, Lisbon, Portugal",
    year: "2022",
    url: "https://images.unsplash.com/photo-1616577711667-3da65b20c36a?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1616577711667-3da65b20c36a?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Fujifilm X-T5", lens: "23mm f/2", focalLength: "23mm", aperture: "f/5.6", iso: "ISO 400", shutterSpeed: "1/125s" },
  },
  {
    id: "concrete-wall-bw",
    title: "Mineral Study",
    subtitle: "Exposed aggregate, coarse and methodical — texture as architectural language",
    category: "Architecture",
    location: "Barbican Centre, London, UK",
    year: "2021",
    url: "https://images.unsplash.com/photo-1635074155443-6cbf74711dd2?w=1600&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1635074155443-6cbf74711dd2?w=600&auto=format&q=80",
    orientation: "landscape",
    exif: { camera: "Sony α7R V", lens: "90mm Macro f/2.8", focalLength: "90mm", aperture: "f/8", iso: "ISO 100", shutterSpeed: "1/200s" },
  },
  {
    id: "concrete-stairs",
    title: "Minimal Concrete Architecture",
    subtitle: "Staircase as sculpture — raw Brutalism at its most considered",
    category: "Architecture",
    location: "Champalimaud Foundation, Lisbon, Portugal",
    year: "2022",
    url: "https://images.unsplash.com/photo-1620902740358-c07fe4916812?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1620902740358-c07fe4916812?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Sony α7 IV", lens: "24mm f/1.4", focalLength: "24mm", aperture: "f/4", iso: "ISO 200", shutterSpeed: "1/160s" },
  },
  {
    id: "lisbon-coastal-fog",
    title: "Lisbon Coastal Fog",
    subtitle: "Tagus estuary at dusk — the suspension bridge cuts through marine layer",
    category: "Travel & Landscapes",
    location: "Almada, Lisbon, Portugal",
    year: "2023",
    url: "https://images.unsplash.com/photo-1690724320380-e692a903a041?w=1600&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1690724320380-e692a903a041?w=600&auto=format&q=80",
    orientation: "landscape",
    exif: { camera: "Sony α7R V", lens: "70–200mm f/2.8", focalLength: "135mm", aperture: "f/5.6", iso: "ISO 400", shutterSpeed: "1/500s" },
  },
  {
    id: "santorini-dome",
    title: "Cycladic Blue",
    subtitle: "Iconic dome over the caldera — afternoon light before the tourist hour",
    category: "Travel & Landscapes",
    location: "Oia, Santorini, Greece",
    year: "2022",
    url: "https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Sony α7 IV", lens: "35mm f/1.8", focalLength: "35mm", aperture: "f/8", iso: "ISO 100", shutterSpeed: "1/800s" },
  },
  {
    id: "santorini-church",
    title: "Chapel by the Caldera",
    subtitle: "Pre-dawn stillness — whitewashed chapels before the island wakes",
    category: "Travel & Landscapes",
    location: "Fira, Santorini, Greece",
    year: "2022",
    url: "https://images.unsplash.com/photo-1747933172848-8a02d207facd?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1747933172848-8a02d207facd?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Fujifilm X-T5", lens: "16mm f/1.4", focalLength: "16mm", aperture: "f/6.3", iso: "ISO 200", shutterSpeed: "1/640s" },
  },
  {
    id: "white-fabric",
    title: "Linen Study No. 3",
    subtitle: "Backlit cotton weave — light mapping the warp and weft of the cloth",
    category: "Minimalist / Textures",
    location: "Studio, Porto, Portugal",
    year: "2023",
    url: "https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=1600&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=600&auto=format&q=80",
    orientation: "landscape",
    exif: { camera: "Sony α7R V", lens: "90mm Macro f/2.8", focalLength: "90mm", aperture: "f/11", iso: "ISO 50", shutterSpeed: "1/60s" },
  },
  {
    id: "light-shadow",
    title: "Concrete Light Study",
    subtitle: "Geometric shadow cast by afternoon sun through a louvred facade",
    category: "Minimalist / Textures",
    location: "Cultural Centre, Porto, Portugal",
    year: "2022",
    url: "https://images.unsplash.com/photo-1521194263619-39ecc5b55c61?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1521194263619-39ecc5b55c61?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Sony α7 IV", lens: "50mm f/1.4", focalLength: "50mm", aperture: "f/8", iso: "ISO 100", shutterSpeed: "1/250s" },
  },
  {
    id: "portrait-woman",
    title: "The Quiet Gaze",
    subtitle: "Window sidelight, shallow focus — stillness captured mid-breath",
    category: "Portraits",
    location: "Studio, Lisbon, Portugal",
    year: "2021",
    url: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=1600&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&auto=format&q=80",
    orientation: "landscape",
    exif: { camera: "Sony α7 IV", lens: "85mm f/1.4", focalLength: "85mm", aperture: "f/1.8", iso: "ISO 800", shutterSpeed: "1/200s" },
  },
  {
    id: "portrait-man",
    title: "Brutalist Gaze",
    subtitle: "Direct eye contact — stripped back to face, light, and intent",
    category: "Portraits",
    location: "Studio, London, UK",
    year: "2021",
    url: "https://images.unsplash.com/photo-1594751684241-bcef815d5a57?w=1200&auto=format&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1594751684241-bcef815d5a57?w=400&auto=format&q=80",
    orientation: "portrait",
    exif: { camera: "Fujifilm X-T5", lens: "56mm f/1.2", focalLength: "56mm", aperture: "f/1.4", iso: "ISO 400", shutterSpeed: "1/250s" },
  },
];

const EXIF_FIELDS: { key: keyof Photo["exif"]; label: string }[] = [
  { key: "camera", label: "Camera" },
  { key: "lens", label: "Lens" },
  { key: "focalLength", label: "Focal Length" },
  { key: "aperture", label: "Aperture" },
  { key: "iso", label: "ISO" },
  { key: "shutterSpeed", label: "Shutter" },
];

interface Props {
  onBack: () => void;
}

export default function PhotographyPage({ onBack }: Props) {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showExif, setShowExif] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const filtered =
    activeCategory === "All Stories"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setShowExif(false);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filtered.length) % filtered.length;
    });
    setShowExif(false);
  }, [filtered.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filtered.length;
    });
    setShowExif(false);
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      else if (e.key === "ArrowRight") nextPhoto();
      else if (e.key === "Escape") closeLightbox();
      else if (e.key === "i" || e.key === "I") setShowExif((v) => !v);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prevPhoto, nextPhoto, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 50) prevPhoto();
      else if (dx < -50) nextPhoto();
    } else if (dy > 100) {
      closeLightbox();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0B0B0C", color: "#E0E0E0", fontFamily: "var(--font-sans)" }}
    >
      {/* ── Sticky header ── */}
      <div
        className="sticky top-0 z-20"
        style={{
          background: "rgba(11,11,12,0.96)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Top row: back + title + count */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all duration-200 flex-none"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)")}
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Portfolio</span>
          </button>

          <div
            className="w-px self-stretch flex-none"
            style={{ background: "rgba(255,255,255,0.08)" }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-5 h-px flex-none" style={{ background: "#C81D25" }} aria-hidden="true" />
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold truncate"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Visual Storytelling · Photography
            </span>
          </div>

          <span
            className="text-xs font-mono flex-none hidden sm:block"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {filtered.length} {filtered.length === 1 ? "photograph" : "photographs"}
          </span>
        </div>

        {/* Category filter pills */}
        <div
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-3 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Photo category filter"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
              style={{
                borderColor: activeCategory === cat ? "#C81D25" : "rgba(255,255,255,0.10)",
                color: activeCategory === cat ? "#C81D25" : "rgba(255,255,255,0.32)",
                background: activeCategory === cat ? "rgba(200,29,37,0.06)" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Masonry grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#333" }}>
              No photographs in this collection yet.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-4 group relative cursor-pointer overflow-hidden"
                style={{ background: "#141414" }}
                onClick={() => { setLightboxIndex(i); setShowExif(false); }}
                tabIndex={0}
                role="button"
                aria-label={`View ${photo.title} fullscreen`}
                onKeyDown={(e) => e.key === "Enter" && (setLightboxIndex(i), setShowExif(false))}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
                  }}
                >
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-white font-semibold text-sm mb-1 truncate"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {photo.title}
                      </p>
                      <div
                        className="flex items-center gap-1.5 text-xs mb-2"
                        style={{ color: "rgba(255,255,255,0.42)" }}
                      >
                        <MapPin size={9} />
                        <span className="truncate">{photo.location}</span>
                      </div>
                      <div
                        className="flex gap-2 flex-wrap"
                        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "monospace", fontSize: "0.69rem" }}
                      >
                        <span>{photo.exif.camera}</span>
                        <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                        <span>{photo.exif.focalLength}</span>
                        <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                        <span>{photo.exif.aperture}</span>
                        <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                        <span>{photo.exif.iso}</span>
                      </div>
                    </div>
                    <Maximize2 size={14} style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing: ${currentPhoto.title}`}
          style={{ background: "rgba(7,7,8,0.98)" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "monospace" }}
            >
              {lightboxIndex + 1} / {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExif((v) => !v)}
                aria-label="Toggle EXIF data (I)"
                aria-pressed={showExif}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
                style={{
                  borderColor: showExif ? "#C81D25" : "rgba(255,255,255,0.14)",
                  color: showExif ? "#C81D25" : "rgba(255,255,255,0.38)",
                }}
              >
                <Info size={12} />
                <span className="hidden sm:inline">EXIF</span>
              </button>
              <button
                onClick={closeLightbox}
                aria-label="Close — Esc"
                className="flex items-center justify-center w-9 h-9 border transition-all duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 border transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.4)",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={nextPhoto}
            aria-label="Next photo"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 border transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.4)",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Image — click backdrop to close */}
          <div
            className="flex items-center justify-center w-full h-full px-16 sm:px-20 cursor-pointer"
            style={{
              paddingTop: "72px",
              paddingBottom: showExif ? "220px" : "80px",
              transition: "padding-bottom 0.3s ease",
            }}
            onClick={closeLightbox}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="block w-auto h-auto object-contain"
              style={{ maxHeight: "90vh", maxWidth: "90vw" }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>

          {/* Caption (shown when EXIF is closed) */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 pointer-events-none transition-all duration-300"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
              paddingTop: "48px",
              paddingBottom: "24px",
              opacity: showExif ? 0 : 1,
            }}
          >
            <div className="max-w-5xl mx-auto">
              <p className="text-lg text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                {currentPhoto.title}
              </p>
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <MapPin size={10} />
                <span>{currentPhoto.location}</span>
                <span style={{ margin: "0 4px", color: "rgba(255,255,255,0.14)" }}>·</span>
                <span>{currentPhoto.year}</span>
              </div>
            </div>
          </div>

          {/* EXIF drawer */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-transform duration-300"
            style={{
              background: "rgba(11,11,12,0.98)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              transform: showExif ? "translateY(0)" : "translateY(100%)",
            }}
          >
            <div className="max-w-5xl mx-auto px-6 py-6">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="flex-1 min-w-0">
                  <p className="text-xl text-white mb-1 truncate" style={{ fontFamily: "var(--font-serif)" }}>
                    {currentPhoto.title}
                  </p>
                  <p
                    className="text-sm mb-3 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.36)" }}
                  >
                    {currentPhoto.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.24)" }}>
                    <MapPin size={10} />
                    <span>{currentPhoto.location}</span>
                    <span style={{ margin: "0 4px", color: "rgba(255,255,255,0.12)" }}>·</span>
                    <span>{currentPhoto.year}</span>
                  </div>
                </div>
                <div className="flex-none">
                  <div
                    className="flex items-center gap-2 mb-4 text-xs tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    <Camera size={11} />
                    <span>EXIF Data</span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                    {EXIF_FIELDS.map(({ key, label }) => (
                      <div key={key}>
                        <p
                          className="text-xs uppercase tracking-wider mb-0.5"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                          {label}
                        </p>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>
                          {currentPhoto.exif[key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard hint */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase hidden md:flex items-center gap-4 pointer-events-none"
            style={{
              color: "rgba(255,255,255,0.14)",
              opacity: showExif ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <span>← → navigate</span>
            <span style={{ color: "rgba(255,255,255,0.07)" }}>·</span>
            <span>I exif</span>
            <span style={{ color: "rgba(255,255,255,0.07)" }}>·</span>
            <span>Esc close</span>
          </div>
        </div>
      )}
    </div>
  );
}
