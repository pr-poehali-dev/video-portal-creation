import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SCREENSHOTS, CATEGORIES } from "@/components/data";

interface GallerySectionProps {
  addRef: (el: HTMLElement | null) => void;
}

export default function GallerySection({ addRef }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === "all"
    ? SCREENSHOTS
    : SCREENSHOTS.filter(s => s.category === activeFilter);

  const lightboxItem = lightbox !== null ? SCREENSHOTS.find(s => s.id === lightbox) : null;

  return (
    <>
      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={addRef} className="reveal text-center mb-10">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Скриншоты</span>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl mt-3 mb-4">
              Интерфейс <span className="gradient-text">в деталях</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">Нажмите на скриншот для увеличения</p>
          </div>

          <div ref={addRef} className="reveal flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold border ${
                  activeFilter === cat.id
                    ? "active border-transparent"
                    : "glass border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((shot, i) => (
              <div
                key={shot.id}
                ref={addRef}
                className="reveal group cursor-pointer glass rounded-2xl overflow-hidden glass-hover"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setLightbox(shot.id)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={shot.src}
                    alt={shot.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-white font-semibold">{shot.title}</span>
                    <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
                      <Icon name="ZoomIn" size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-montserrat font-bold mb-1">{shot.title}</h3>
                  <p className="text-white/50 text-sm">{shot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxItem && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <Icon name="X" size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              onClick={() => {
                const idx = SCREENSHOTS.findIndex(s => s.id === lightbox);
                const prev = SCREENSHOTS[(idx - 1 + SCREENSHOTS.length) % SCREENSHOTS.length];
                setLightbox(prev.id);
              }}
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              onClick={() => {
                const idx = SCREENSHOTS.findIndex(s => s.id === lightbox);
                const next = SCREENSHOTS[(idx + 1) % SCREENSHOTS.length];
                setLightbox(next.id);
              }}
            >
              <Icon name="ChevronRight" size={24} />
            </button>

            <img
              src={lightboxItem.src}
              alt={lightboxItem.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-montserrat font-bold text-xl">{lightboxItem.title}</h3>
              <p className="text-white/50 mt-1">{lightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
