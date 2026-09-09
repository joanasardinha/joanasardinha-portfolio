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
];

// Generate photos array from local imports
const generatePhotos = (): Photo[] => {
  const locations = [
    { city: "Tokyo", country: "Japan", name: "Shinjuku" },
    { city: "Kyoto", country: "Japan", name: "Arashiyama" },
    { city: "Osaka", country: "Japan", name: "Dotonbori" },
    { city: "Reykjavik", country: "Iceland", name: "Golden Circle" },
    { city: "Jökulsárlón", country: "Iceland", name: "Glacier Lagoon" },
    { city: "Lisbon", country: "Portugal", name: "Belém" },
    { city: "Barcelona", country: "Spain", name: "MACBA" },
  ];

  const categories = ["Street & Urban", "Architecture", "Travel & Landscapes", "Minimalist / Textures"];
  const titles = [
    "Urban Reflections",
    "Neon Dreams",
    "Frozen Moments",
    "Sacred Geometry",
    "Light & Shadow",
    "Passing Through",
    "Still Life",
    "Architecture",
    "Night Wandering",
    "Waterscape",
  ];

  const subtitles = [
    "A moment captured in time",
    "Where light meets shadow",
    "The beauty of simplicity",
    "Patterns in chaos",
    "A story untold",
    "Silence speaks volumes",
    "Nature's architecture",
    "Urban poetry",
    "Between worlds",
    "Echoes of time",
  ];

  return Array.from({ length: 65 }, (_, i) => {
    const photoNum = i + 1;
    const location = locations[i % locations.length];
    const category = categories[i % categories.length];
    const title = titles[i % titles.length];
    const subtitle = subtitles[i % subtitles.length];
    const isLandscape = Math.random() > 0.4;

    return {
      id: `photo-${photoNum}`,
      title: `${title} #${photoNum}`,
      subtitle,
      category,
      location: `${location.name}, ${location.city}, ${location.country}`,
      year: "2024",
      url: `/imports/photo-${photoNum}.jpg`,
      thumbnailUrl: `/imports/photo-${photoNum}.jpg`,
      orientation: isLandscape ? "landscape" : "portrait",
      exif: {
        camera: "Sony α7 IV",
        lens: "35mm f/1.8",
        focalLength: "35mm",
        aperture: "f/2.0",
        iso: `ISO ${[400, 800, 1600, 3200, 6400][i % 5]}`,
        shutterSpeed: `1/${[30, 60, 125, 250, 500][i % 5]}s`,
      },
    };
  });
};

const photos = generatePhotos();

export default function PhotographyGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [layout, setLayout] = useState<LayoutMode>("masonry");
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory === "All Stories") {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section className="min-h-screen bg-offwhite py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-crimson" aria-hidden="true" />
            <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">Visual Storytelling</span>
          </div>
          <h1 className="font-serif text-charcoal leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            Photography
          </h1>
          <p className="text-charcoal/60 text-lg mt-6 max-w-2xl">
            A visual diary capturing moments across Japan, Iceland, and beyond. Light, shadow, and the stories in between.
          </p>
        </div>

        {/* Layout & Filter Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          <div className="flex gap-2">
            <button
              onClick={() => setLayout("masonry")}
              className={`w-11 h-11 flex items-center justify-center border transition-all ${
                layout === "masonry"
                  ? "border-charcoal bg-charcoal text-offwhite"
                  : "border-charcoal/20 text-charcoal hover:border-charcoal"
              }`}
              aria-label="Masonry layout"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setLayout("carousel")}
              className={`w-11 h-11 flex items-center justify-center border transition-all ${
                layout === "carousel"
                  ? "border-charcoal bg-charcoal text-offwhite"
                  : "border-charcoal/20 text-charcoal hover:border-charcoal"
              }`}
              aria-label="Carousel layout"
            >
              <Film size={18} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-charcoal text-offwhite"
                    : "border border-charcoal/20 text-charcoal hover:border-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {layout === "masonry" ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            ref={containerRef}
          >
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group cursor-pointer overflow-hidden bg-charcoal/5"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div
                  className={`overflow-hidden ${
                    photo.orientation === "portrait" ? "aspect-[3/4]" : "aspect-video"
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal/90 text-offwhite">
                  <p className="font-serif text-sm font-bold">{photo.title}</p>
                  <p className="text-xs text-offwhite/70 mt-1">{photo.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-96 bg-charcoal/5 overflow-hidden">
            <div className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "none" }}>
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex-none w-full h-full snap-start flex items-center justify-center cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:brightness-75 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-serif text-2xl font-bold text-offwhite">{photo.title}</p>
                      <p className="text-offwhite/80 text-sm mt-2 flex items-center gap-1">
                        <MapPin size={14} />
                        {photo.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-charcoal/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-offwhite hover:text-crimson transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
              {/* Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] max-w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Info */}
              <div className="lg:w-80 text-offwhite flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
                <div className="mb-8">
                  <p className="text-crimson text-xs tracking-widest uppercase font-semibold mb-2">{selectedPhoto.category}</p>
                  <h2 className="font-serif text-3xl font-bold mb-3">{selectedPhoto.title}</h2>
                  <p className="text-offwhite/70 text-sm leading-relaxed mb-4">{selectedPhoto.subtitle}</p>
                  <p className="flex items-center gap-2 text-sm text-offwhite/60">
                    <MapPin size={14} />
                    {selectedPhoto.location}
                  </p>
                </div>

                {/* EXIF Data */}
                <div className="border-t border-offwhite/20 pt-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-crimson mb-4 flex items-center gap-2">
                    <Camera size={14} />
                    Technical Details
                  </p>
                  <div className="space-y-3 text-xs text-offwhite/70">
                    <div>
                      <span className="text-offwhite/50">Camera:</span> {selectedPhoto.exif.camera}
                    </div>
                    <div>
                      <span className="text-offwhite/50">Lens:</span> {selectedPhoto.exif.lens}
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-offwhite/50">Aperture:</span> {selectedPhoto.exif.aperture}
                      </div>
                      <div>
                        <span className="text-offwhite/50">ISO:</span> {selectedPhoto.exif.iso}
                      </div>
                    </div>
                    <div>
                      <span className="text-offwhite/50">Shutter:</span> {selectedPhoto.exif.shutterSpeed}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
