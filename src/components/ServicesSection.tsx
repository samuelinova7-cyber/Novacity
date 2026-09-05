import React from 'react';
import { Smartphone, Zap, Cpu, Plug, Camera, RefreshCw, ArrowUpRight, Clock, Shield } from 'lucide-react';
import { SERVICES } from '../data/storeData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Plug':
        return <Plug className="w-6 h-6" />;
      case 'Camera':
        return <Camera className="w-6 h-6" />;
      default:
        return <RefreshCw className="w-6 h-6" />;
    }
  };

  return (
    <section id="servicos" className="py-14 bg-zinc-950/60 border-y border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-green-500 mb-2">
              Assistência Técnica Express
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
              Especialistas em reparos rápidos
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            Traga seu aparelho para a nossa bancada especializada na Rua do Uruguai ou consulte o valor direto pelo WhatsApp.
          </p>
        </div>

        {/* Services Grid (4 col on lg / 2 col on sm / 1 col on xs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/90 transition-all group relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  Mais Procurado
                </div>
              )}

              <div>
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 group-hover:bg-green-500/10 transition-all">
                  {getIconComponent(service.icon)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-green-500" />
                    {service.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    {service.warranty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onSelectServiceForQuote(service.name)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Simular
                  </button>
                  <a
                    href={getGeneralWhatsAppUrl(`Olá, técnico! Gostaria de um orçamento para o serviço de *${service.name}*.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-400 text-black py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner summary */}
        <div className="mt-8 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Garantia total de 90 dias em todos os consertos</h4>
              <p className="text-xs text-zinc-400">Usamos peças testadas e com certificação para garantir a saúde e performance do seu celular.</p>
            </div>
          </div>
          <a
            href={getGeneralWhatsAppUrl('Olá! Gostaria de saber como funciona a garantia e o processo de conserto na loja da Nova City MCZ.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold text-green-400 hover:text-green-300 underline underline-offset-4"
          >
            Tirar dúvidas sobre a garantia →
          </a>
        </div>

      </div>
    </section>
  );
};
