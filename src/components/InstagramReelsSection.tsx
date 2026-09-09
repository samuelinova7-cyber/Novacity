import React from 'react';
import { Instagram, Sparkles, ExternalLink, CheckCircle2, ShieldCheck, Heart, Zap } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface InstagramReelsSectionProps {
  onOpenLightbox?: (url: string) => void;
}

export const InstagramReelsSection: React.FC<InstagramReelsSectionProps> = ({ onOpenLightbox }) => {
  return (
    <section id="instagram-reels" className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#16121a] via-[#121214] to-[#0d1410] border border-pink-500/20 rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#00E676]/15 via-emerald-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Instagram Profile Avatar with Glow */}
          <div className="relative mb-6 group">
            <div
              onClick={() => onOpenLightbox && onOpenLightbox('https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg')}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-[0_0_35px_rgba(236,72,153,0.4)] cursor-pointer transition-transform group-hover:scale-105"
              title="Clique para ampliar o perfil"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black p-0.5">
                <img
                  src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg"
                  alt="Nova City MCZ no Instagram"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Verified badge */}
            <div className="absolute bottom-0 right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-1 rounded-full shadow-lg border-2 border-[#121214]">
              <Instagram className="w-4 h-4" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@novacitymcz no Instagram Oficial</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] leading-tight mb-4">
            Acompanhe a <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-[#00E676] bg-clip-text text-transparent">Nova City MCZ</span> no Instagram
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Fique por dentro das novidades em acessórios premium, bastidores de consertos na bancada, lançamentos de cases, películas e promoções relâmpago em Maceió.
          </p>

          {/* 3 Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stories & Bastidores</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Veja o dia a dia dos reparos e novidades que chegam na loja.</p>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ofertas Relâmpago</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Descontos especiais divulgados com exclusividade no feed.</p>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atendimento Rápido</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Tire dúvidas e solicite cotações diretamente pelo Direct.</p>
              </div>
            </div>
          </div>

          {/* Dedicated Follow Button */}
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-400/30 cursor-pointer"
          >
            <Instagram className="w-5 h-5 text-white" />
            <span>Seguir @novacitymcz no Instagram</span>
            <ExternalLink className="w-4 h-4 text-white/80" />
          </a>

          <p className="text-xs text-zinc-500 mt-4">
            Maceió - AL • Jaraguá & Centro • Conteúdo diário e suporte especializado
          </p>

        </div>
      </div>
    </section>
  );
};
