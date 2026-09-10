import React, { useRef } from 'react';
import { Instagram, Sparkles, ExternalLink, Heart, Zap, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface InstagramReelsSectionProps {
  onOpenLightbox?: (url: string) => void;
}

const INSTAGRAM_VIDEOS = [
  {
    id: 'vid-1',
    url: 'https://res.cloudinary.com/mbpsuaz1/video/upload/v1789047112/grok-video-d78a80d3-3c6c-4c77-b5b4-c6874ecf6b45.mp4',
    title: 'Bastidores da Bancada • Nova City MCZ',
    tag: 'Reparo Express',
  },
  {
    id: 'vid-2',
    url: 'https://res.cloudinary.com/mbpsuaz1/video/upload/v1789047113/grok-video-7622dec1-e663-4eda-ae3f-ee11e2376759.mp4',
    title: 'Acessórios & Películas 9D',
    tag: 'Novidades',
  },
  {
    id: 'vid-3',
    url: 'https://res.cloudinary.com/mbpsuaz1/video/upload/v1789047114/grok-video-388c89c0-ef7d-44d5-bd8c-2f1dd3f20786.mp4',
    title: 'Troca de Tela com Precisão',
    tag: 'Assistência',
  },
  {
    id: 'vid-4',
    url: 'https://res.cloudinary.com/mbpsuaz1/video/upload/v1789047113/grok-video-f2c104ff-a6ce-44c7-8436-f14b3cb76fce.mp4',
    title: 'Organização e Qualidade',
    tag: 'Loja Física',
  },
  {
    id: 'vid-5',
    url: 'https://res.cloudinary.com/mbpsuaz1/video/upload/v1789047114/grok-video-01c87ccb-84a2-4133-8c78-2bcd8d722624.mp4',
    title: 'Clientes Satisfeitos em Maceió',
    tag: 'Entregas',
  },
  {
    id: 'vid-6',
    url: 'https://res.cloudinary.com/mbpsuaz1/video/upload/v1789047117/grok-video-02fb8d81-8dfa-4e1f-83bb-a3f2fdced0d6.mp4',
    title: 'Bateria Nova & Teste de Saúde',
    tag: 'Garantia',
  },
];

export const InstagramReelsSection: React.FC<InstagramReelsSectionProps> = ({ onOpenLightbox }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="instagram-reels" className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#16121a] via-[#121214] to-[#0d1410] border border-pink-500/20 rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#00E676]/15 via-emerald-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Header & Profile Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div
                onClick={() => onOpenLightbox && onOpenLightbox('https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg')}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-[0_0_25px_rgba(236,72,153,0.4)] cursor-pointer shrink-0 transition-transform hover:scale-105"
                title="Perfil Nova City MCZ"
              >
                <img
                  src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg"
                  alt="Nova City MCZ"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@novacitymcz • Instagram Oficial</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                  Reels & Vídeos da Loja (Arraste para o Lado)
                </h2>
              </div>
            </div>

            {/* Navigation Arrows & Follow Button */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 hidden sm:flex">
                <button
                  onClick={() => scrollHorizontally('left')}
                  aria-label="Rolar para esquerda"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white transition-colors cursor-pointer shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollHorizontally('right')}
                  aria-label="Rolar para direita"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white transition-colors cursor-pointer shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-pink-400/30 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>Seguir no Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>
          </div>

          {/* Horizontal Draggable / Scrollable Videos Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: 'thin' }}
          >
            {INSTAGRAM_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="flex-none w-[280px] sm:w-[300px] md:w-[320px] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl snap-start flex flex-col justify-between group hover:border-pink-500/50 transition-all"
              >
                {/* Video Container (Muted, AutoPlay, Loop) */}
                <div className="relative w-full h-[400px] sm:h-[450px] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={video.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow">
                      <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
                      {video.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-pink-400 border border-pink-500/20 shadow">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Caption on video */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="text-sm font-bold text-white leading-snug drop-shadow">
                      {video.title}
                    </p>
                    <p className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1">
                      <span>@novacitymcz</span>
                      <span>•</span>
                      <span className="text-[#00E676]">Reproduzindo vídeo</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Card Footer with Actions */}
                <div className="p-3 bg-zinc-900 flex items-center justify-between border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-400">Arraste para o lado ↔</span>
                  <a
                    href={STORE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
                  >
                    <span>Ver no Insta</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 text-xs text-zinc-400 flex items-center justify-center gap-2">
            <span>📱 Arraste horizontalmente para ver todos os vídeos dos bastidores em Maceió</span>
          </div>

        </div>
      </div>
    </section>
  );
};
