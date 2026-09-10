import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export default function GalleryManager() {
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [copiedCode, setCopiedCode] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<number | null>(null);

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

  const copyToClipboard = () => {
    const removed = Array.from(selectedPhotos).sort((a, b) => a - b);
    const code = `const photosToRemove = new Set([${removed.join(", ")}]);`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const remaining = 65 - selectedPhotos.size;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={selectAll}
          className="px-6 py-2 border border-charcoal/20 text-charcoal hover:border-charcoal transition-all text-sm font-semibold rounded"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 border border-charcoal/20 text-charcoal hover:border-charcoal transition-all text-sm font-semibold rounded"
        >
          Clear Selection
        </button>
        {selectedPhotos.size > 0 && (
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-crimson text-offwhite hover:bg-crimson/90 transition-all text-sm font-semibold rounded flex items-center gap-2"
          >
            <Copy size={14} />
            {copiedCode ? "Copied!" : "Copy Code"}
          </button>
        )}
      </div>

      {/* Preview Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 bg-charcoal/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="max-w-2xl bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/assets/photo-${previewPhoto}-*.jpg`}
              alt={`Photo ${previewPhoto}`}
              className="w-full h-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/assets/photo-${previewPhoto}.jpg`;
              }}
            />
            <div className="p-4 bg-offwhite">
              <p className="text-sm text-charcoal/60">Photo #{previewPhoto}</p>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="mt-2 w-full px-4 py-2 bg-charcoal text-offwhite rounded hover:bg-charcoal/90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 65 }).map((_, i) => {
          const photoNum = i + 1;
          const isSelected = selectedPhotos.has(photoNum);

          return (
            <div key={photoNum} className="relative group">
              <button
                onClick={() => togglePhoto(photoNum)}
                className={`w-full aspect-square rounded border-2 transition-all overflow-hidden ${
                  isSelected
                    ? "border-crimson bg-crimson/10"
                    : "border-charcoal/20 bg-charcoal/5 hover:border-charcoal/40"
                }`}
              >
                {/* Placeholder with number */}
                <div className="w-full h-full bg-gradient-to-br from-charcoal/20 to-charcoal/40 flex items-center justify-center relative">
                  <span className="text-xs font-bold text-charcoal/40">#{photoNum}</span>

                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-crimson/80">
                      <Check size={20} className="text-offwhite" />
                    </div>
                  )}
                </div>
              </button>

              {/* Preview button */}
              <button
                onClick={() => setPreviewPhoto(photoNum)}
                className="absolute -top-8 right-0 text-xs bg-charcoal text-offwhite px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Preview
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
