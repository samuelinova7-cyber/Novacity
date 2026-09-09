import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { REVIEWS, STORE_INFO } from '../data/storeData';

interface ReviewsSectionProps {
  onOpenLightbox?: (url: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenLightbox }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="depoimentos" className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* SEÇÃO DE AVALIAÇÕES DO GOOGLE */}
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Google Header */}
        <div className="flex flex-col items-center mb-8 text-center relative z-10">
          
          {/* Logo Photo in Google Reviews with Glow & Animation & Lightbox */}
          <div
            onClick={() => onOpenLightbox && onOpenLightbox('https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg')}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#00E676] shadow-[0_0_25px_rgba(0,230,118,0.5)] animate-pulse mb-4 cursor-pointer transition-transform hover:scale-110 group"
            title="Clique para ampliar a foto da Nova City MCZ nas Avaliações do Google"
          >
            <img
              src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg"
              alt="Nova City MCZ Google Avaliações"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#00E676]/15 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-3">
            <span className="flex text-[#FFD700]">★★★★★</span>
            <span className="text-white font-bold">5.0 no Google</span>
            <span className="text-zinc-500">• 100% de Satisfação</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] max-w-2xl">
            O que nossos clientes dizem no Google
          </h2>

          <p className="text-sm text-zinc-400 mt-2 max-w-lg">
            Atendimento humanizado na Rua do Uruguai, 338D e garantia em todos os serviços e produtos.
          </p>

          {/* Botão Animado e Brilhante - Avaliar 5 estrelas */}
          <div className="mt-5">
            <a
              id="btn-google-review-action"
              href={STORE_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-google-review inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base tracking-wide"
            >
              <span>⭐ Avaliar 5 estrelas no Google</span>
              <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
            </a>
          </div>

          {/* Controls hint */}
          <div className="flex items-center justify-between w-full mt-8 pt-6 border-t border-zinc-800/80">
            <span className="text-xs text-zinc-400 font-medium">
              👉 Arraste para o lado para ver mais depoimentos
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleScrollLeft}
                aria-label="Depoimento anterior"
                className="w-8 h-8 rounded-full bg-[#242424] border border-[#333] flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#00E676] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollRight}
                aria-label="Próximo depoimento"
                className="w-8 h-8 rounded-full bg-[#242424] border border-[#333] flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#00E676] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Comentários Lado a Lado (Arrastáveis e responsivos) */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 custom-scrollbar select-none"
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex-none w-[280px] sm:w-[320px] bg-[#242424] rounded-xl p-5 snap-start border border-[#333333] flex flex-col justify-between hover:border-[#00E676]/60 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#FFD700] text-base tracking-wider font-bold">
                    ★★★★★
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">{review.date}</span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{review.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                  </div>
                  {review.service && (
                    <span className="text-[11px] text-[#00E676] block mt-0.5 font-medium">
                      {review.service}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  Google
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
