import { useState, useEffect } from "react";
import { X, Check, Copy } from "lucide-react";

export default function GalleryAdmin() {
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("removedPhotos");
    if (saved) {
      setSelectedPhotos(new Set(JSON.parse(saved)));
    }
  }, []);

  const togglePhoto = (photoNum: number) => {
    const newSelected = new Set(selectedPhotos);
    if (newSelected.has(photoNum)) {
      newSelected.delete(photoNum);
    } else {
      newSelected.add(photoNum);
    }
    setSelectedPhotos(newSelected);
    localStorage.setItem("removedPhotos", JSON.stringify([...newSelected]));
  };

  const selectAll = () => {
    const all = new Set(Array.from({ length: 65 }, (_, i) => i + 1));
    setSelectedPhotos(all);
    localStorage.setItem("removedPhotos", JSON.stringify([...all]));
  };

  const clearAll = () => {
    setSelectedPhotos(new Set());
    localStorage.setItem("removedPhotos", JSON.stringify([]));
  };

  const generateCode = () => {
    const removed = Array.from(selectedPhotos).sort((a, b) => a - b);
    return `// Add this to generatePhotos() in PhotographyGallery.tsx
const photosToRemove = new Set([${removed.join(", ")}]);

return Array.from({ length: 65 }, (_, i) => {
  const photoNum = i + 1;
  if (photosToRemove.has(photoNum)) return null;
  // ... rest of photo generation
}).filter(Boolean);`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const remaining = 65 - selectedPhotos.size;

  return (
    <section className="min-h-screen bg-offwhite py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-crimson" aria-hidden="true" />
            <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">
              Admin Panel
            </span>
          </div>
          <h1 className="font-serif text-charcoal leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            Gallery Manager
          </h1>
          <p className="text-charcoal/60 text-lg mt-6 max-w-2xl">
            Click photos to mark for removal. Changes are saved locally in your browser.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 border border-charcoal/10 rounded">
            <div className="text-3xl font-bold text-crimson">65</div>
            <div className="text-sm text-charcoal/60 mt-2">Total Photos</div>
          </div>
          <div className="bg-white p-6 border border-charcoal/10 rounded">
            <div className="text-3xl font-bold text-crimson">{selectedPhotos.size}</div>
            <div className="text-sm text-charcoal/60 mt-2">Marked for Removal</div>
          </div>
          <div className="bg-white p-6 border border-charcoal/10 rounded">
            <div className="text-3xl font-bold text-charcoal">{remaining}</div>
            <div className="text-sm text-charcoal/60 mt-2">Will Keep</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-12 flex-wrap">
          <button
            onClick={selectAll}
            className="px-6 py-2 border border-charcoal/20 text-charcoal hover:border-charcoal transition-all text-sm font-semibold"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-2 border border-charcoal/20 text-charcoal hover:border-charcoal transition-all text-sm font-semibold"
          >
            Clear Selection
          </button>
          {selectedPhotos.size > 0 && (
            <button
              onClick={copyToClipboard}
              className="px-6 py-2 bg-crimson text-offwhite hover:bg-crimson/90 transition-all text-sm font-semibold flex items-center gap-2"
            >
              <Copy size={14} />
              {copiedCode ? "Copied!" : "Copy Code"}
            </button>
          )}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {Array.from({ length: 65 }).map((_, i) => {
            const photoNum = i + 1;
            const isSelected = selectedPhotos.has(photoNum);

            return (
              <button
                key={photoNum}
                onClick={() => togglePhoto(photoNum)}
                className={`aspect-square rounded border-2 transition-all relative overflow-hidden group ${
                  isSelected
                    ? "border-crimson bg-crimson/10"
                    : "border-charcoal/20 bg-charcoal/5 hover:border-charcoal/40"
                }`}
              >
                {/* Placeholder Image */}
                <div className="w-full h-full bg-gradient-to-br from-charcoal/20 to-charcoal/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-charcoal/40">#{photoNum}</span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />

                {/* Checkmark when selected */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-crimson/80">
                    <Check size={20} className="text-offwhite" />
                  </div>
                )}

                {/* Number badge */}
                <div className="absolute bottom-1 right-1 text-xs bg-charcoal/70 text-offwhite px-1.5 py-0.5 rounded">
                  #{photoNum}
                </div>
              </button>
            );
          })}
        </div>

        {/* Code Output */}
        {selectedPhotos.size > 0 && (
          <div className="bg-charcoal text-offwhite p-8 rounded border border-charcoal/20 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold">Generated Code</h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-crimson hover:bg-crimson/90 transition-all rounded text-sm font-semibold"
              >
                <Copy size={14} />
                {copiedCode ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-charcoal-dark p-4 rounded overflow-x-auto text-xs leading-relaxed font-mono border border-offwhite/10">
{`// Filter to remove selected photos
const photosToRemove = new Set([${Array.from(selectedPhotos).sort((a, b) => a - b).join(", ")}]);

// In generatePhotos(), add this condition:
if (photosToRemove.has(photoNum)) {
  // Skip this photo
  continue;
}`}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-offwhite-dark p-8 rounded border border-charcoal/10">
          <h3 className="font-serif text-lg font-bold text-charcoal mb-4">How to Use</h3>
          <ol className="space-y-3 text-charcoal/70 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-crimson flex-shrink-0">1.</span>
              <span>Click on any photo to mark it for removal (they'll turn red with a checkmark)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-crimson flex-shrink-0">2.</span>
              <span>Use "Select All" / "Clear Selection" to bulk edit</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-crimson flex-shrink-0">3.</span>
              <span>Click "Copy Code" to generate the removal filter</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-crimson flex-shrink-0">4.</span>
              <span>Paste the code into PhotographyGallery.tsx to apply changes</span>
            </li>
          </ol>
          <p className="text-charcoal/50 text-xs mt-6">
            💾 Your selection is saved in your browser's local storage
          </p>
        </div>
      </div>
    </section>
  );
}
