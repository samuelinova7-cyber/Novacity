import React, { useState } from 'react';
import { MessageSquare, X, Send, Smartphone } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const handleSendQuickMsg = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getGeneralWhatsAppUrl(quickMsg || undefined);
    window.open(url, '_blank');
    setPopoverOpen(false);
    setQuickMsg('');
  };

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick chat popup window */}
      {popoverOpen && (
        <div className="mb-3 w-80 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-xs">
                NC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Nova City MCZ</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-medium">Atendimento Técnico Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Fechar popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-zinc-950/90 space-y-3 text-xs">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-300 leading-relaxed">
              👋 Olá! Seja bem-vindo à <strong>Nova City MCZ</strong>! Como podemos ajudar você hoje com seu smartphone ou acessórios em Maceió?
            </div>

            <div className="flex flex-col gap-1.5">
              <a
                href={getGeneralWhatsAppUrl('Olá! Preciso de um orçamento para consertar meu celular.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-green-500/50 text-zinc-200 px-3 py-2 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>🛠️ Orçamento de Conserto</span>
                <span className="text-green-400 text-[10px] font-bold">Enviar</span>
              </a>

              <a
                href={getGeneralWhatsAppUrl('Olá! Gostaria de saber o valor e disponibilidade de acessórios.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-green-500/50 text-zinc-200 px-3 py-2 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>🎧 Consultar Acessórios</span>
                <span className="text-green-400 text-[10px] font-bold">Enviar</span>
              </a>
            </div>

            <form onSubmit={handleSendQuickMsg} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Digite sua dúvida aqui..."
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-green-500 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-black px-3 py-2 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                title="Abrir no WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main floating pill button */}
      <div className="flex items-center gap-2 group">
        <button
          onClick={() => setPopoverOpen(!popoverOpen)}
          className="bg-zinc-900/95 hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-500 py-2 pl-4 pr-2 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105 cursor-pointer backdrop-blur-sm"
          title="Falar no WhatsApp"
        >
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-zinc-400 leading-none">Tire suas dúvidas</div>
            <div className="text-xs font-bold text-white mt-0.5">Online agora</div>
          </div>

          <div className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_18px_rgba(34,197,94,0.45)] group-hover:bg-green-400 transition-colors">
            <svg
              className="w-5 h-5 text-black fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
        </button>
      </div>

    </div>
  );
};
