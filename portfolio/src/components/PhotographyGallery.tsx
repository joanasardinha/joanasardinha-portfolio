import { useState, useEffect, useCallback, useRef } from "react";
import { Grid, Film, ChevronLeft, ChevronRight, X, Info, Maximize2, Camera, MapPin } from "lucide-react";

type Orientation = "landscape" | "portrait";
type LayoutMode = "masonry" | "carousel";

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
    exif: {
      camera: "Sony α7 IV",
      lens: "35mm f/1.8",
      focalLength: "35mm",
      aperture: "f/1.8",
      iso: "ISO 3200",
      shutterSpeed: "1/60s",
    },
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
    exif: {
      camera: "Fujifilm X-T5",
      lens: "14mm f/2.8",
      focalLength: "14mm",
      aperture: "f/5.6",
      iso: "ISO 200",
      shutterSpeed: "1/250s",
    },
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
    exif: {
      camera: "Sony α7 IV",
      lens: "50mm f/1.4",
      focalLength: "50mm",
      aperture: "f/2.0",
      iso: "ISO 6400",
      shutterSpeed: "1/30s",
    },
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
    exif: {
      camera: "Ricoh GR IIIx",
      lens: "40mm f/2.8",
      focalLength: "40mm",
      aperture: "f/2.8",
      iso: "ISO 12800",
      shutterSpeed: "1/15s",
    },
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
    exif: {
      camera: "Fujifilm X-T5",
      lens: "23mm f/2",
      focalLength: "23mm",
      aperture: "f/5.6",
      iso: "ISO 400",
      shutterSpeed: "1/125s",
    },
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
    exif: {
      camera: "Sony α7R V",
      lens: "90mm Macro f/2.8",
      focalLength: "90mm",
      aperture: "f/8",
      iso: "ISO 100",
      shutterSpeed: "1/200s",
    },
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
    exif: {
      camera: "Sony α7 IV",
      lens: "24mm f/1.4",
      focalLength: "24mm",
      aperture: "f/4",
      iso: "ISO 200",
      shutterSpeed: "1/160s",
    },
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
    exif: {
      camera: "Sony α7R V",
      lens: "70–200mm f/2.8",
      focalLength: "135mm",
      aperture: "f/5.6",
      iso: "ISO 400",
      shutterSpeed: "1/500s",
    },
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
    exif: {
      camera: "Sony α7 IV",
      lens: "35mm f/1.8",
      focalLength: "35mm",
      aperture: "f/8",
      iso: "ISO 100",
      shutterSpeed: "1/800s",
    },
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
    exif: {
      camera: "Fujifilm X-T5",
      lens: "16mm f/1.4",
      focalLength: "16mm",
      aperture: "f/6.3",
      iso: "ISO 200",
      shutterSpeed: "1/640s",
    },
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
    exif: {
      camera: "Sony α7R V",
      lens: "90mm Macro f/2.8",
      focalLength: "90mm",
      aperture: "f/11",
      iso: "ISO 50",
      shutterSpeed: "1/60s",
    },
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
    exif: {
      camera: "Sony α7 IV",
      lens: "50mm f/1.4",
      focalLength: "50mm",
      aperture: "f/8",
      iso: "ISO 100",
      shutterSpeed: "1/250s",
    },
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
    exif: {
      camera: "Sony α7 IV",
      lens: "85mm f/1.4",
      focalLength: "85mm",
      aperture: "f/1.8",
      iso: "ISO 800",
      shutterSpeed: "1/200s",
    },
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
    exif: {
      camera: "Fujifilm X-T5",
      lens: "56mm f/1.2",
      focalLength: "56mm",
      aperture: "f/1.4",
      iso: "ISO 400",
      shutterSpeed: "1/250s",
    },
  },
];

const EXIF_FIELDS = [
  { key: "camera" as const, label: "Camera" },
  { key: "lens" as const, label: "Lens" },
  { key: "focalLength" as const, label: "Focal Length" },
  { key: "aperture" as const, label: "Aperture" },
  { key: "iso" as const, label: "ISO" },
  { key: "shutterSpeed" as const, label: "Shutter" },
];

export default function PhotographyGallery() {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("masonry");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showExif, setShowExif] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const filteredPhotos =
    activeCategory === "All Stories"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowExif(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setShowExif(false);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
    setShowExif(false);
  }, [filteredPhotos.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredPhotos.length;
    });
    setShowExif(false);
  }, [filteredPhotos.length]);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  // Scroll active filmstrip thumbnail into view
  useEffect(() => {
    if (layoutMode !== "carousel" || !filmstripRef.current) return;
    const strip = filmstripRef.current;
    const thumb = strip.children[carouselIndex] as HTMLElement | undefined;
    if (thumb) {
      const stripRect = strip.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const offset = thumbRect.left - stripRect.left - stripRect.width / 2 + thumbRect.width / 2;
      strip.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [carouselIndex, layoutMode]);

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

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div style={{ background: "#0B0B0C", color: "#E0E0E0" }}>
      {/* ── Editorial intro ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-14 pb-12">
        <p
          className="text-xs tracking-[0.4em] uppercase font-semibold mb-5"
          style={{ color: "#C81D25", fontFamily: "var(--font-sans)" }}
        >
          Visual Storytelling &amp; Photography
        </p>
        <h3
          className="font-serif leading-none mb-5"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#F4F4F4" }}
        >
          Capturing light, urban geometry,<br className="hidden md:block" /> and quiet human moments.
        </h3>
        <p
          className="text-sm leading-loose max-w-2xl"
          style={{ color: "#5C5C5C", fontFamily: "var(--font-sans)" }}
        >
          Photography is not a hobby that sits beside my design practice — it is the practice. Every hour spent hunting a decisive moment, calibrating for available light, or composing within the fixed rectangle of a viewfinder feeds directly into how I think about hierarchy, whitespace, and visual tension in digital interfaces. The frame is never neutral. Neither is the screen.
        </p>
      </div>

      {/* ── Controls: category filters + layout toggle ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(11,11,12,0.94)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          {/* Category pills */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Photo category filter"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-1.5 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderColor: activeCategory === cat ? "#C81D25" : "rgba(255,255,255,0.1)",
                  color: activeCategory === cat ? "#C81D25" : "rgba(255,255,255,0.35)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout toggle */}
          <div className="flex gap-1 flex-none" role="group" aria-label="Layout mode">
            {(
              [
                { mode: "masonry" as const, icon: <Grid size={13} />, label: "Grid" },
                { mode: "carousel" as const, icon: <Film size={13} />, label: "Filmstrip" },
              ] as const
            ).map(({ mode, icon, label }) => (
              <button
                key={mode}
                onClick={() => setLayoutMode(mode)}
                aria-pressed={layoutMode === mode}
                aria-label={`${label} view`}
                className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderColor:
                    layoutMode === mode ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)",
                  color:
                    layoutMode === mode ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)",
                  background: layoutMode === mode ? "rgba(255,255,255,0.06)" : "transparent",
                }}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {filteredPhotos.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#333", fontFamily: "var(--font-sans)" }}
            >
              No photographs in this collection yet.
            </p>
          </div>
        ) : layoutMode === "masonry" ? (
          /* ── Masonry Grid ── */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filteredPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-4 group relative cursor-pointer overflow-hidden"
                style={{ background: "#161616" }}
                onClick={() => openLightbox(i)}
                tabIndex={0}
                role="button"
                aria-label={`View ${photo.title} fullscreen`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Hover caption overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)",
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
                        className="flex items-center gap-1.5 text-xs mb-2.5"
                        style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)" }}
                      >
                        <MapPin size={9} />
                        <span className="truncate">{photo.location}</span>
                      </div>
                      <div
                        className="flex gap-2 text-xs flex-wrap"
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "monospace",
                          fontSize: "0.7rem",
                        }}
                      >
                        <span>{photo.exif.camera}</span>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <span>{photo.exif.focalLength}</span>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <span>{photo.exif.aperture}</span>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <span>{photo.exif.iso}</span>
                      </div>
                    </div>
                    <Maximize2 size={15} style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Carousel / Filmstrip View ── */
          <div>
            {/* Hero image */}
            <div
              className="relative flex items-center justify-center mb-3"
              style={{ background: "#0E0E0E", minHeight: "60vh" }}
            >
              {/* Prev */}
              <button
                onClick={() =>
                  setCarouselIndex(
                    (i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length
                  )
                }
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.5)",
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Image — click opens lightbox */}
              <div
                className="flex items-center justify-center w-full h-full px-16 py-10 cursor-zoom-in"
                style={{ minHeight: "60vh" }}
                onClick={() => openLightbox(carouselIndex)}
              >
                <img
                  key={filteredPhotos[carouselIndex].id}
                  src={filteredPhotos[carouselIndex].url}
                  alt={filteredPhotos[carouselIndex].title}
                  className="block mx-auto w-auto h-auto"
                  style={{ maxHeight: "68vh", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Next */}
              <button
                onClick={() =>
                  setCarouselIndex((i) => (i + 1) % filteredPhotos.length)
                }
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.5)",
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Caption bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                }}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h4
                      className="text-white text-xl mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {filteredPhotos[carouselIndex].title}
                    </h4>
                    <p
                      className="text-sm mb-2"
                      style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)" }}
                    >
                      {filteredPhotos[carouselIndex].subtitle}
                    </p>
                    <div
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)" }}
                    >
                      <MapPin size={10} />
                      <span>{filteredPhotos[carouselIndex].location}</span>
                      <span style={{ margin: "0 4px", color: "rgba(255,255,255,0.15)" }}>·</span>
                      <span>{filteredPhotos[carouselIndex].year}</span>
                    </div>
                  </div>
                  <div
                    className="text-right hidden sm:block"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "monospace", fontSize: "0.72rem" }}
                  >
                    <div>{filteredPhotos[carouselIndex].exif.camera}</div>
                    <div>
                      {filteredPhotos[carouselIndex].exif.focalLength} &middot;{" "}
                      {filteredPhotos[carouselIndex].exif.aperture} &middot;{" "}
                      {filteredPhotos[carouselIndex].exif.iso}
                    </div>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div
                className="absolute top-4 right-5 text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}
              >
                {carouselIndex + 1} / {filteredPhotos.length}
              </div>
            </div>

            {/* Filmstrip */}
            <div
              ref={filmstripRef}
              className="flex gap-2 overflow-x-auto"
              style={{ scrollbarWidth: "none", paddingBottom: "4px" }}
            >
              {filteredPhotos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setCarouselIndex(i)}
                  aria-label={photo.title}
                  aria-pressed={i === carouselIndex}
                  className="flex-none transition-all duration-200 overflow-hidden"
                  style={{
                    width: photo.orientation === "portrait" ? "60px" : "96px",
                    height: "60px",
                    background: "#1A1A1A",
                    border: i === carouselIndex ? "2px solid #C81D25" : "2px solid transparent",
                    opacity: i === carouselIndex ? 1 : 0.35,
                  }}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-full"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
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
          style={{ background: "rgba(7,7,8,0.97)" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
            }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}
            >
              {lightboxIndex + 1} / {filteredPhotos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExif((v) => !v)}
                aria-label="Toggle EXIF metadata (I)"
                aria-pressed={showExif}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderColor: showExif ? "#C81D25" : "rgba(255,255,255,0.15)",
                  color: showExif ? "#C81D25" : "rgba(255,255,255,0.4)",
                }}
              >
                <Info size={12} />
                <span className="hidden sm:inline">EXIF</span>
              </button>
              <button
                onClick={closeLightbox}
                aria-label="Close fullscreen viewer — Esc"
                className="flex items-center justify-center w-9 h-9 border transition-all duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Prev nav */}
          <button
            onClick={prevPhoto}
            aria-label="Previous photo — left arrow key"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 border transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.4)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next nav */}
          <button
            onClick={nextPhoto}
            aria-label="Next photo — right arrow key"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 border transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.4)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Main image — click backdrop to close */}
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

          {/* Bottom caption (visible when EXIF hidden) */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 pointer-events-none transition-all duration-300"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              paddingTop: "48px",
              paddingBottom: "24px",
              opacity: showExif ? 0 : 1,
            }}
          >
            <div className="max-w-5xl mx-auto">
              <p
                className="text-lg text-white mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {currentPhoto.title}
              </p>
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)" }}
              >
                <MapPin size={10} />
                <span>{currentPhoto.location}</span>
                <span style={{ margin: "0 4px" }}>·</span>
                <span>{currentPhoto.year}</span>
              </div>
            </div>
          </div>

          {/* EXIF drawer — slides up from bottom */}
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
                  <p
                    className="text-xl text-white mb-1 truncate"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {currentPhoto.title}
                  </p>
                  <p
                    className="text-sm mb-3 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-sans)" }}
                  >
                    {currentPhoto.subtitle}
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)" }}
                  >
                    <MapPin size={10} />
                    <span>{currentPhoto.location}</span>
                    <span style={{ margin: "0 4px", color: "rgba(255,255,255,0.12)" }}>·</span>
                    <span>{currentPhoto.year}</span>
                  </div>
                </div>
                <div className="flex-none">
                  <div
                    className="flex items-center gap-2 mb-4 text-xs tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}
                  >
                    <Camera size={11} />
                    <span>EXIF Data</span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                    {EXIF_FIELDS.map(({ key, label }) => (
                      <div key={key}>
                        <p
                          className="text-xs uppercase tracking-wider mb-0.5"
                          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}
                        >
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
              color: "rgba(255,255,255,0.15)",
              fontFamily: "var(--font-sans)",
              opacity: showExif ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <span>← → navigate</span>
            <span style={{ color: "rgba(255,255,255,0.08)" }}>·</span>
            <span>I toggle EXIF</span>
            <span style={{ color: "rgba(255,255,255,0.08)" }}>·</span>
            <span>Esc close</span>
          </div>
        </div>
      )}
    </div>
  );
}
