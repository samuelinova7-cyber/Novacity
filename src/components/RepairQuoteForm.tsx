import React, { useState } from 'react';
import { Smartphone, Wrench, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SMARTPHONE_BRANDS, ISSUE_TYPES, STORE_INFO } from '../data/storeData';
import { getRepairQuoteWhatsAppUrl } from '../utils/whatsapp';

interface RepairQuoteFormProps {
  initialIssue?: string;
}

export const RepairQuoteForm: React.FC<RepairQuoteFormProps> = ({ initialIssue }) => {
  const [selectedBrand, setSelectedBrand] = useState('Apple (iPhone)');
  const [selectedModel, setSelectedModel] = useState('iPhone 13 / 13 Pro');
  const [customModel, setCustomModel] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(initialIssue || ISSUE_TYPES[0]);
  const [clientName, setClientName] = useState('');
  const [extraDetails, setExtraDetails] = useState('');

  const currentBrandObj = SMARTPHONE_BRANDS.find((b) => b.name === selectedBrand) || SMARTPHONE_BRANDS[0];

  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const found = SMARTPHONE_BRANDS.find((b) => b.name === brandName);
    if (found && found.models.length > 0) {
      setSelectedModel(found.models[0]);
    }
  };

  const finalModelString = selectedModel === 'Outro iPhone' || selectedModel === 'Outro Samsung' || selectedModel === 'Outro Xiaomi' || selectedModel === 'Outro Motorola' || selectedModel === 'Outro modelo'
    ? (customModel.trim() || selectedModel)
    : selectedModel;

  const quoteData = {
    brand: selectedBrand,
    model: finalModelString,
    issue: selectedIssue,
    details: extraDetails,
    clientName: clientName,
  };

  const whatsappUrl = getRepairQuoteWhatsAppUrl(quoteData);

  return (
    <section id="orcamento" className="py-16 bg-[#09090b] relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            Simulador de Orçamento Imediato
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
            Descubra o valor do conserto em segundos
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Preencha os dados do seu aparelho abaixo para enviar as especificações diretamente para a bancada técnica da Nova City MCZ pelo WhatsApp.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Form Inputs */}
            <div className="space-y-5">
              
              {/* Step 1: Select Brand */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  1. Qual é a marca do seu aparelho?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SMARTPHONE_BRANDS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleBrandChange(b.name)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-left truncate cursor-pointer ${
                        selectedBrand === b.name
                          ? 'bg-green-500/15 border-green-500 text-green-400 shadow-sm'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {b.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Model */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  2. Modelo do Celular
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-all cursor-pointer"
                >
                  {currentBrandObj.models.map((m) => (
                    <option key={m} value={m} className="bg-zinc-950 text-white">
                      {m}
                    </option>
                  ))}
                </select>

                {/* Optional Custom Model text field */}
                {selectedModel.startsWith('Outro') && (
                  <input
                    type="text"
                    placeholder="Digite o modelo exato (Ex: Redmi Note 11S, iPhone 12 Mini...)"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    className="mt-2.5 w-full bg-zinc-900 border border-zinc-800 focus:border-green-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none"
                  />
                )}
              </div>

              {/* Step 3: Select Issue */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  3. Qual é o problema principal?
                </label>
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-all cursor-pointer"
                >
                  {ISSUE_TYPES.map((issue) => (
                    <option key={issue} value={issue} className="bg-zinc-950 text-white">
                      {issue}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Name & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Seu Nome (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Como prefere ser chamado?"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-green-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Observação adicional
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Urgente, caiu na água..."
                    value={extraDetails}
                    onChange={(e) => setExtraDetails(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-green-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: WhatsApp Preview & Direct Action */}
            <div className="flex flex-col justify-between bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-zinc-200">Bancada Nova City MCZ</span>
                  </div>
                  <span className="text-[11px] text-green-400 font-bold">{STORE_INFO.phoneDisplay}</span>
                </div>

                <div className="text-xs text-zinc-400 mb-2">Mensagem gerada automaticamente:</div>

                {/* Chat bubble simulation */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 space-y-1.5 leading-relaxed">
                  <div className="text-green-400 font-bold">🛠️ SOLICITAÇÃO DE ORÇAMENTO</div>
                  {clientName && <div>👤 Nome: <span className="text-white">{clientName}</span></div>}
                  <div>📱 Marca: <span className="text-white">{selectedBrand}</span></div>
                  <div>📲 Modelo: <span className="text-white">{finalModelString}</span></div>
                  <div>⚠️ Defeito: <span className="text-white">{selectedIssue}</span></div>
                  {extraDetails && <div>📝 Obs: <span className="text-white">{extraDetails}</span></div>}
                  <div className="text-zinc-500 text-[11px] pt-1">📍 Rua do Uruguai, 338D - Maceió</div>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span>Resposta rápida por técnico especializado</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span>Valores para peças Originais e Premium</span>
                  </div>
                </div>
              </div>

              {/* Big Green WhatsApp Send Button */}
              <div className="pt-6">
                <a
                  id="send-quote-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-400 text-black py-4 px-6 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-black" />
                  <span>Enviar Orçamento no WhatsApp</span>
                </a>
                <p className="text-[11px] text-zinc-500 text-center mt-2">
                  Atendimento direto no WhatsApp +55 82 98741-4105
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
