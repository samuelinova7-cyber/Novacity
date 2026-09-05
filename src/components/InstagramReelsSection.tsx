import React, { useState, useRef, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, Play, Pause, ExternalLink, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { REELS_DATA, STORE_INFO } from '../data/storeData';
import { ReelItem } from '../types';

export const InstagramReelsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [likesState, setLikesState] = useState<{ [id: string]: { liked: boolean; count: number } }>({});
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Initialize likes state from REELS_DATA
  useEffect(() => {
    const initial: { [id: string]: { liked: boolean; count: number } } = {};
    REELS_DATA.forEach((reel) => {
      initial[reel.id] = { liked: false, count: reel.likes };
    });
    setLikesState(initial);
  }, []);

  // Smooth Auto-scroll loop as specified in the snippet
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout | null = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        if (!container) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }, 30);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused]);

  const handleToggleLike = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesState((prev) => {
      const current = prev[reelId] || { liked: false, count: 100 };
      const isNowLiked = !current.liked;
      return {
        ...prev,
        [reelId]: {
          liked: isNowLiked,
          count: isNowLiked ? current.count + 1 : current.count - 1,
        },
      };
    });
  };

  const handleOpenInstagram = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(STORE_INFO.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollManual = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const amount = direction === 'left' ? -270 : 270;
      containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="instagram-reels" className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-[#121212] border border-[#333333] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@novacitymcz no Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              Acompanhe nosso dia a dia no Instagram
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Confira os bastidores dos consertos, novidades em acessórios premium e entregas para clientes em Maceió.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Direct profile button */}
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-transform hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir no Instagram</span>
            </a>

            {/* Manual scroll navigation buttons */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full p-1">
              <button
                onClick={() => scrollManual('left')}
                aria-label="Reel anterior"
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollManual('right')}
                aria-label="Próximo reel"
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reels Lado a Lado (Rolagem Infinita / Automática + Arrastável) */}
        <div
          ref={containerRef}
          id="reelsContainer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          {REELS_DATA.map((reel) => {
            const likeInfo = likesState[reel.id] || { liked: false, count: reel.likes };

            return (
              <div
                key={reel.id}
                className="flex-none w-[240px] sm:w-[260px] h-[444px] bg-[#242424] rounded-2xl overflow-hidden snap-start relative border border-[#333333] shadow-[0_4px_20px_rgba(0,0,0,0.6)] group hover:border-[#00E676]/70 transition-all"
              >
                {/* Media representation / Visual background */}
                <div className="w-full h-full relative overflow-hidden bg-zinc-900">
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    loading="lazy"
                  />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping" />
                      {reel.badge || 'Reel'}
                    </span>
                  </div>

                  {/* Top Instagram Logo Watermark */}
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Sobreposição de interação simulando o Instagram */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-16 pb-4 px-4 flex justify-between items-end z-20">
                  
                  {/* Reel info & description */}
                  <div className="pr-2 flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-xs font-black text-[#00E676] tracking-wide">
                        {reel.tag}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-100 font-medium leading-snug line-clamp-2">
                      {reel.caption}
                    </p>
                    <button
                      onClick={() => handleOpenInstagram()}
                      className="mt-2 text-[10px] font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Ver no Instagram</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Reel action buttons column */}
                  <div className="flex flex-col gap-2.5 items-center shrink-0">
                    {/* Like button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(reel.id, e)}
                      aria-label="Curtir reel"
                      className={`w-9 h-9 rounded-full flex flex-col items-center justify-center backdrop-blur-md transition-all transform active:scale-125 ${
                        likeInfo.liked
                          ? 'bg-red-500/20 text-red-500 border border-red-500/40'
                          : 'bg-black/60 text-white hover:bg-[#00E676] hover:text-black border border-white/10'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          likeInfo.liked ? 'fill-red-500 text-red-500 scale-110' : ''
                        }`}
                      />
                    </button>
                    <span className="text-[10px] font-bold text-zinc-300 font-mono">
                      {likeInfo.count}
                    </span>

                    {/* Comment / Instagram link button */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenInstagram(e)}
                      aria-label="Comentar no Instagram"
                      className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#00E676] hover:text-black text-white border border-white/10 flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-110 cursor-pointer"
                      title="Abrir no Instagram"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner for Instagram CTA */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Instagram className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Siga a @novacitymcz
              </span>
              <span className="text-xs text-zinc-400">
                Postamos stories diários com reposições, promoções e dicas técnicas!
              </span>
            </div>
          </div>

          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-pink-500/60 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Acessar @novacitymcz</span>
            <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
