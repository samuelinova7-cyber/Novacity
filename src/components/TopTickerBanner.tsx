import React from 'react';
import { Flame, Zap, Gift, AlertCircle, Phone, Sparkles, Clock, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface TopTickerBannerProps {
  onNavigateToQuiz?: () => void;
}

export const TopTickerBanner: React.FC<TopTickerBannerProps> = ({ onNavigateToQuiz }) => {
  const tickerItems = [
    {
      badge: 'ATENDIMENTO HOJE',
      text: 'Loja Aberta em Maceió • Rua do Uruguai, 338D - Jaraguá / Centro',
      icon: MapPin,
    },
    {
      badge: 'REPARO EXPRESS',
      text: 'Troca de Tela e Bateria de 30 a 60 min com 90 dias de garantia',
      icon: Zap,
    },
    {
      badge: 'PARCELAMENTO',
      text: 'Em até 12x no cartão ou desconto imediato no Pix',
      icon: Flame,
    },
    {
      badge: 'AVALIE & GANHE 🍫',
      text: 'Responda a avaliação no site, avalie no Google e retire 1 Bombom Grátis + 20% OFF!',
      icon: Gift,
    },
    {
      badge: 'ORÇAMENTO WHATSAPP',
      text: '(82) 98741-4105 • Resposta rápida e diagnóstico gratuito',
      icon: Phone,
    },
    {
      badge: 'QUALIDADE GARANTIDA',
      text: 'Telas Premium OLED/Incell e Acessórios com procedência testada',
      icon: Sparkles,
    },
  ];

  return (
    <div
      id="top-informative-ticker"
      className="w-full bg-[#FFDE00] text-black border-b-2 border-red-600 overflow-hidden select-none py-1.5 shadow-md relative z-50"
      style={{ backgroundColor: '#FFDE00' }}
    >
      <div className="flex items-center">
        
        {/* Left Fixed Red Pill on desktop */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-0.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-r-full shrink-0 shadow z-10 mr-2 border-r border-red-700">
          <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
          <span>INFORMAÇÃO EM TEMPO REAL</span>
        </div>

        {/* Continuous Running Marquee Area */}
        <div className="overflow-hidden w-full relative flex items-center">
          <div className="animate-ticker-marquee flex items-center whitespace-nowrap">
            {/* 1st copy */}
            {tickerItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={`t1-${index}`}
                  className="flex items-center gap-2 mx-5 text-xs sm:text-[13px] font-black tracking-tight text-black"
                >
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm border border-red-700">
                    <IconComp className="w-3 h-3" />
                    {item.badge}
                  </span>
                  <span className="text-black font-extrabold">{item.text}</span>
                  <span className="text-red-600 font-black text-base mx-2">★</span>
                </div>
              );
            })}

            {/* 2nd copy for seamless infinite loop */}
            {tickerItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={`t2-${index}`}
                  className="flex items-center gap-2 mx-5 text-xs sm:text-[13px] font-black tracking-tight text-black"
                >
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm border border-red-700">
                    <IconComp className="w-3 h-3" />
                    {item.badge}
                  </span>
                  <span className="text-black font-extrabold">{item.text}</span>
                  <span className="text-red-600 font-black text-base mx-2">★</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
