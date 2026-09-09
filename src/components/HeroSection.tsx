import React from 'react';
import { Smartphone, Zap, ShieldCheck, ArrowRight, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface HeroSectionProps {
  onNavigateToCatalog: () => void;
  onNavigateToQuote: () => void;
  onOpenLightbox?: (url: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToCatalog,
  onNavigateToQuote,
  onOpenLightbox,
}) => {
  return (
    <section id="inicio" className="relative pt-6 pb-16 md:py-20 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-emerald-500/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              Assistência Técnica & Acessórios em Maceió
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-white font-['Outfit',sans-serif]">
              Seu smartphone em <br />
              <span className="text-green-500 underline decoration-zinc-800 underline-offset-8">
                boas mãos.
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Conserto rápido, preço justo e entrega garantida. Somos especialistas em Apple, Samsung, Xiaomi e nas principais marcas do mercado.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                id="hero-whatsapp-btn"
                href={getGeneralWhatsAppUrl('Olá! Gostaria de falar com um técnico para tirar uma dúvida sobre meu celular.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(34,197,94,0.35)] cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-black text-black" />
                WhatsApp do Técnico
              </a>

              <button
                id="hero-vitrine-btn"
                onClick={onNavigateToCatalog}
                className="w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Ver Vitrine de Acessórios</span>
                <ArrowRight className="w-4 h-4 text-green-400" />
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-zinc-900 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-zinc-200">Garantia</div>
                  <div className="text-[11px] text-zinc-500">90 dias com nota</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-zinc-200">Rápido</div>
                  <div className="text-[11px] text-zinc-500">Pronto no mesmo dia</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-zinc-200">Loja Física</div>
                  <div className="text-[11px] text-zinc-500">Rua do Uruguai, 338D</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Device Frame Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient Background Glow */}
            <div className="absolute w-[360px] h-[360px] bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Smartphone Display Card Mockup */}
            <div className="relative w-[310px] sm:w-[340px] bg-zinc-950 border-[8px] border-zinc-800/90 rounded-[2.75rem] shadow-2xl overflow-hidden flex flex-col p-4 space-y-3.5 z-10">
              
              {/* Device Dynamic Island Notch */}
              <div className="h-5 bg-zinc-800 w-28 mx-auto rounded-full mb-1 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
              </div>

              {/* Promo Card Inside Mockup with Cloudinary Image in Maximum Proportion */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden group">
                <div
                  onClick={() => onOpenLightbox && onOpenLightbox('https://res.cloudinary.com/mbpsuaz1/image/upload/v1788978308/WhatsApp_Image_2026-09-09_at_3.20.39_PM.jpg')}
                  className="relative h-48 bg-black overflow-hidden cursor-pointer flex items-center justify-center p-2"
                  title="Clique para ampliar em proporção máxima"
                >
                  <img
                    src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1788978308/WhatsApp_Image_2026-09-09_at_3.20.39_PM.jpg"
                    alt="Case MagSafe Space Destaque da Semana"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-2.5 left-2.5 bg-[#00E676] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Destaque da Semana (Proporção Máxima)
                  </span>
                </div>
                <div className="p-3.5 text-left space-y-1">
                  <h3 className="font-bold text-sm text-white">Case MagSafe Space</h3>
                  <p className="text-[11px] text-zinc-400">Proteção antichoque para iPhone</p>
                  <div className="pt-1.5 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[11px] text-zinc-500 line-through">R$ 89,90</span>
                      <span className="text-base font-black text-[#00E676]">R$ 69,90</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">Loja Física & Entrega</span>
                  </div>
                </div>
              </div>

              {/* 2 Mini Feature Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-xl p-3 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-zinc-400">Energia</span>
                    <Zap className="w-3.5 h-3.5 text-[#00E676]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Fonte Turbo 20W</span>
                    <span className="text-[10px] text-zinc-500">USB-C Homologado</span>
                  </div>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-xl p-3 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-zinc-400">Blindagem</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E676]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Película 9D Cerâmica</span>
                    <span className="text-[10px] text-zinc-500">Privacidade 180°</span>
                  </div>
                </div>
              </div>

              {/* Assistência Direct Interactive Box with Image in Maximum Proportion */}
              <div className="bg-zinc-900 border border-[#00E676]/30 rounded-2xl overflow-hidden flex flex-col">
                <div
                  onClick={() => onOpenLightbox && onOpenLightbox('https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977938/WhatsApp_Image_2026-09-09_at_9.13.13_AM_1.jpg')}
                  className="relative h-40 bg-black overflow-hidden cursor-pointer group flex items-center justify-center p-2"
                  title="Clique para ampliar a imagem da assistência técnica"
                >
                  <img
                    src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977938/WhatsApp_Image_2026-09-09_at_9.13.13_AM_1.jpg"
                    alt="Assistência Técnica Express Nova City"
                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-2 left-3 bg-[#00E676] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                    Assistência Técnica Express (Proporção Máxima)
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs text-zinc-200 font-medium leading-snug">
                    Especialistas em reparos rápidos. Tela trincada ou bateria fraca?
                  </p>
                  <button
                    onClick={onNavigateToQuote}
                    className="w-full bg-[#00E676] hover:bg-[#00c853] text-black py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Calcular Orçamento Online</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
