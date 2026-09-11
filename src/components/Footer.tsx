import React from 'react';
import { Smartphone, MapPin, Phone, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black font-black">
                <Smartphone className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                NOVA CITY<span className="text-green-500">MCZ</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Assistência técnica especializada em smartphones e vitrine completa de acessórios premium em Maceió - AL.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-500 text-zinc-300 hover:text-pink-400 flex items-center justify-center transition-colors"
                title="Instagram @novacitymcz"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-green-500 text-zinc-300 hover:text-green-400 flex items-center justify-center transition-colors"
                title="WhatsApp Nova City MCZ"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegação Rápida</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Assistência Técnica Express
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Vitrine de Acessórios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('orcamento')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Simulador de Orçamento
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('desafio-tech')}
                  className="text-[#00E676] hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  ⭐ Avalie & Ganhe Bombom Grátis 🍫
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('depoimentos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Avaliações no Google ⭐
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('instagram-reels')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Instagram Oficial 📱
                </button>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Principais Reparos</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>• Troca de Telas (iPhone, Samsung, Xiaomi)</li>
              <li>• Troca de Bateria 100% Saúde</li>
              <li>• Reparo de Placa & Microssoldagem</li>
              <li>• Conector de Carga & Câmeras</li>
              <li>• Aplicação de Película Cerâmica 9D</li>
              <li>• Desoxidação de Celular Molhado</li>
            </ul>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atendimento em Maceió</h4>
            <div className="space-y-2 text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <a href={`tel:${STORE_INFO.phoneRaw}`} className="hover:text-white">
                  {STORE_INFO.phoneDisplay}
                </a>
              </p>
              <p className="text-[11px] text-zinc-500 pt-1">
                Seg–Sex: {STORE_INFO.hoursWeekday} • Sáb: {STORE_INFO.hoursSaturday}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Nova City MCZ. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Maceió - Alagoas</span>
            <span>•</span>
            <span className="text-green-500 font-semibold">Assistência & Acessórios</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
