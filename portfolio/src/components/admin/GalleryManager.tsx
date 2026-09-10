import { useState, useEffect } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { getPortfolioData, savePortfolioData } from "../../data/portfolio";

const photoModules = import.meta.glob<{ default: string }>('/src/imports/photo-*.jpg', { eager: true });

export default function GalleryManager() {
  const [hiddenPhotos, setHiddenPhotos] = useState<Set<number>>(new Set());
  const [previewPhoto, setPreviewPhoto] = useState<number | null>(null);
  const [photoLoadError, setPhotoLoadError] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadHiddenPhotos();
  }, []);

  const loadHiddenPhotos = () => {
    const data = getPortfolioData();
    setHiddenPhotos(new Set(data.hiddenPhotos));
  };

  const togglePhoto = (photoNum: number) => {
    const newHidden = new Set(hiddenPhotos);
    if (newHidden.has(photoNum)) {
      newHidden.delete(photoNum);
    } else {
      newHidden.add(photoNum);
    }
    setHiddenPhotos(newHidden);

    // Save to portfolio data
    const data = getPortfolioData();
    data.hiddenPhotos = Array.from(newHidden);
    savePortfolioData(data);
  };

  const publishAll = () => {
    setHiddenPhotos(new Set());
    localStorage.setItem("hiddenPhotos", JSON.stringify([]));
  };

  const hideAll = () => {
    const all = new Set(Array.from({ length: 65 }, (_, i) => i + 1));
    setHiddenPhotos(all);
    localStorage.setItem("hiddenPhotos", JSON.stringify([...all]));
  };

  const published = 65 - hiddenPhotos.size;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 border border-charcoal/10 rounded">
          <div className="text-3xl font-bold text-green-600">{published}</div>
          <div className="text-sm text-charcoal/60 mt-2">Published</div>
        </div>
        <div className="bg-white p-6 border border-charcoal/10 rounded">
          <div className="text-3xl font-bold text-crimson">{hiddenPhotos.size}</div>
          <div className="text-sm text-charcoal/60 mt-2">Hidden</div>
        </div>
        <div className="bg-white p-6 border border-charcoal/10 rounded">
          <div className="text-3xl font-bold text-charcoal">65</div>
          <div className="text-sm text-charcoal/60 mt-2">Total Photos</div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-offwhite-dark p-4 rounded border border-charcoal/10 mb-8">
        <p className="text-sm text-charcoal/70">
          ✨ Click any photo to toggle between <strong>Published</strong> (visible on website) and <strong>Hidden</strong> (not shown). Changes are saved automatically!
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={publishAll}
          className="px-6 py-2 border border-green-600 text-green-600 hover:bg-green-600/10 transition-all text-sm font-semibold rounded"
        >
          Publish All
        </button>
        <button
          onClick={hideAll}
          className="px-6 py-2 border border-crimson text-crimson hover:bg-crimson/10 transition-all text-sm font-semibold rounded"
        >
          Hide All
        </button>
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
            <div className="aspect-video bg-charcoal/10 flex items-center justify-center relative overflow-hidden">
              <img
                src={photoModules[`/src/imports/photo-${previewPhoto}.jpg`]?.default || ''}
                alt={`Photo ${previewPhoto}`}
                className="w-full h-full object-cover"
                onError={() => setPhotoLoadError(prev => new Set([...prev, previewPhoto]))}
              />
              {photoLoadError.has(previewPhoto) && (
                <div className="text-center">
                  <p className="text-charcoal/60 text-sm">Photo #{ previewPhoto}</p>
                  <p className="text-charcoal/40 text-xs mt-2">
                    (Image file not found)
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 bg-offwhite border-t border-charcoal/10">
              <p className="text-sm text-charcoal/70 mb-3">
                Status: <strong>{hiddenPhotos.has(previewPhoto) ? "🔒 Hidden" : "✅ Published"}</strong>
              </p>
              <button
                onClick={() => {
                  togglePhoto(previewPhoto);
                  setPreviewPhoto(null);
                }}
                className="w-full px-4 py-2 bg-charcoal text-offwhite rounded font-semibold hover:bg-charcoal/90 transition-all"
              >
                Toggle Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 65 }).map((_, i) => {
          const photoNum = i + 1;
          const isHidden = hiddenPhotos.has(photoNum);

          return (
            <button
              key={photoNum}
              onClick={() => setPreviewPhoto(photoNum)}
              className={`aspect-square rounded border-2 transition-all overflow-hidden relative group ${
                isHidden
                  ? "border-crimson bg-crimson/10"
                  : "border-green-600 bg-green-600/5 hover:border-green-600/50"
              }`}
            >
              {/* Placeholder with number */}
              <div className="w-full h-full bg-gradient-to-br from-charcoal/20 to-charcoal/40 flex items-center justify-center relative">
                <span className="text-xs font-bold text-charcoal/40">#{photoNum}</span>

                {/* Status icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal/40">
                  {isHidden ? (
                    <EyeOff size={20} className="text-crimson" />
                  ) : (
                    <Eye size={20} className="text-green-400" />
                  )}
                </div>

                {/* Status badge */}
                <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  isHidden
                    ? "bg-crimson text-offwhite"
                    : "bg-green-600 text-offwhite"
                }`}>
                  {isHidden ? "×" : "✓"}
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal text-offwhite text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isHidden ? "Hidden" : "Published"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-12 p-6 bg-white rounded border border-charcoal/10">
        <h3 className="font-serif font-bold text-charcoal mb-2">Status Summary</h3>
        <p className="text-sm text-charcoal/70">
          📊 Your gallery currently has <strong className="text-green-600">{published} photos published</strong> and <strong className="text-crimson">{hiddenPhotos.size} photos hidden</strong>. All changes are automatically saved to your browser.
        </p>
      </div>
    </div>
  );
}
