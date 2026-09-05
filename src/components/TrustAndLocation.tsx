import React, { useState } from 'react';
import { MapPin, Clock, CreditCard, ShieldCheck, Copy, Check, Navigation, Phone, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const TrustAndLocation: React.FC = () => {
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_INFO.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <section id="localizacao" className="py-16 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Loja Física em Maceió
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
            Venha nos visitar ou receba onde estiver
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Estamos localizados no coração de Maceió, com estrutura completa para testes, aplicação de películas e bancada de reparos imediatos.
          </p>
        </div>

        {/* 2-Column Location & Store Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Store Details & Trust Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center text-green-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Endereço da Loja</h3>
                  <p className="text-sm text-zinc-300 font-medium mt-0.5">
                    {STORE_INFO.address}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Ponto de referência de fácil acesso com estacionamento nas proximidades.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-400 text-black px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir no Google Maps</span>
                </a>

                <a
                  href={`https://waze.com/ul?q=${encodeURIComponent(STORE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Navegar pelo Waze</span>
                </a>
              </div>
            </div>

            {/* Hours & Schedule */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-green-400" />
                <h3 className="text-base font-bold text-white">Horário de Funcionamento</h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Segunda a Sexta-feira:</span>
                  <span className="text-white font-bold">{STORE_INFO.hoursWeekday}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Sábado:</span>
                  <span className="text-white font-bold">{STORE_INFO.hoursSaturday}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-zinc-400">Domingo e Feriados:</span>
                  <span className="text-zinc-500">{STORE_INFO.hoursSunday} (Plantão WhatsApp)</span>
                </div>
              </div>
            </div>

            {/* Payment & InfinitePay Card */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-green-400" />
                <h3 className="text-base font-bold text-white">Pagamento Facilitado</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Aceitamos Pix com envio de comprovante instantâneo, Cartão de Crédito em até 12x via InfinitePay ou dinheiro na retirada.
              </p>

              {/* Chave Pix Copyable Widget */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Chave Pix Celular / Telefone:</span>
                  <span className="text-xs font-mono font-bold text-green-400">{STORE_INFO.phoneDisplay}</span>
                </div>
                <button
                  onClick={handleCopyPix}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedPix ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copiar Chave</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Location Frame */}
          <div className="lg:col-span-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col min-h-[380px]">
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-bold text-white">Mapa de Localização - Nova City MCZ</span>
              </div>
              <span className="text-[11px] text-zinc-500">Maceió - AL</span>
            </div>

            <div className="flex-1 relative w-full h-full min-h-[320px]">
              <iframe
                title="Localização Nova City MCZ Maceió"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.1539281736636!2d-35.72895692419356!3d-9.667822990421255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70145a05b3cb245%3A0x6b139707fb6a1ad6!2sRua%20do%20Uruguai%2C%20338D%20-%20Jaragu%C3%A1%2C%20Macei%C3%B3%20-%20AL!5e0!3m2!1spt-BR!2sbr!4v1709600000000!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0 absolute inset-0 filter invert-[0.9] hue-rotate-180 contrast-[1.1] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-4 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span>📍 Rua do Uruguai, 338D - Maceió</span>
              <a
                href={getGeneralWhatsAppUrl('Olá! Gostaria de pedir referências para chegar na loja da Nova City MCZ.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 font-bold hover:underline"
              >
                Pedir Ponto de Referência no WhatsApp →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
