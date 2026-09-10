import React, { useState } from 'react';
import { Gamepad2, Gift, CheckCircle2, XCircle, Sparkles, Copy, Check, MessageSquare, ArrowRight, RotateCcw, MapPin, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, STORE_INFO } from '../data/storeData';

export const TechChallengeQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stage, setStage] = useState<'quiz' | 'reward' | 'coupon'>('quiz');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex] || QUIZ_QUESTIONS[0];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null && isAnswerCorrect === true) return;

    setSelectedOption(index);
    const option = currentQ.options[index];

    if (option.isCorrect) {
      setIsAnswerCorrect(true);
      setErrorMessage(null);
      setScore((prev) => prev + 1);

      // Advance after a brief delay for user feedback
      setTimeout(() => {
        if (currentQuestionIndex + 1 >= totalQuestions) {
          setStage('reward');
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswerCorrect(null);
        }
      }, 900);
    } else {
      setIsAnswerCorrect(false);
      setErrorMessage('Ops! Resposta incorreta. Tente novamente para garantir seu bombom e desconto!');
    }
  };

  const handleUnlockCoupon = (storeName?: string, reviewUrl?: string) => {
    if (storeName) {
      setSelectedStore(storeName);
    }
    const targetUrl = reviewUrl || STORE_INFO.googleReviewUrl;
    
    // Open Google Review in new tab to validate the bombom
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // Transition to coupon release stage
    setTimeout(() => {
      setStage('coupon');
    }, 1000);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('NOVACITY-TECH2026');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    setStage('quiz');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setErrorMessage(null);
    setSelectedStore('');
    setScore(0);
  };

  const whatsappQuizUrl = `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(
    `Olá! Concluí o Desafio Tech no site da Nova City MCZ (${selectedStore ? `Unidade ${selectedStore}` : 'Loja'}) com o cupom NOVACITY-TECH2026 e quero resgatar meu bombom grátis e meus 20% OFF!`
  )}`;

  return (
    <section id="desafio-tech" className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-[#111111] via-[#161616] to-[#1a1a1a] border border-[#333333] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.7)] text-white text-center relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#00E676]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00E676] text-black font-extrabold text-xs uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,230,118,0.4)]">
          <Gamepad2 className="w-4 h-4 text-black" />
          <span>🎮 JOGUE & GANHE</span>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 font-['Outfit',sans-serif]">
          O Desafio Tech da Nova City
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Teste seus conhecimentos sobre celulares, ganhe um <strong className="text-[#00E676]">bombom grátis</strong> na loja e desbloqueie um super desconto para o seu aparelho!
        </p>

        {/* ========================================================================= */}
        {/* ETAPA 1: O QUIZ */}
        {/* ========================================================================= */}
        {stage === 'quiz' && (
          <div id="quiz-box" className="bg-[#1e1e1e] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative">
            
            {/* Progress Bar & Counter */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div id="question-progress" className="text-xs font-black uppercase text-[#00E676] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Pergunta {currentQuestionIndex + 1} de {totalQuestions}</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                {progressPercent}% Concluído
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-zinc-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#00E676] to-[#00C853] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 id="question-text" className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs text-zinc-400 mb-6 italic">
              {currentQ.tip}
            </p>

            {/* Options Grid */}
            <div className="flex flex-col gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-[#2a2a2a] text-zinc-200 border-zinc-700 hover:border-[#00E676] hover:bg-[#333333] hover:text-white';
                
                if (isSelected) {
                  if (option.isCorrect) {
                    btnStyle = 'bg-[#00E676] text-black font-extrabold border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.5)]';
                  } else {
                    btnStyle = 'bg-red-600/90 text-white font-bold border-red-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base transition-all duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{option.text}</span>
                    {isSelected && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-black shrink-0 ml-2" />
                    )}
                    {isSelected && !option.isCorrect && (
                      <XCircle className="w-5 h-5 text-white shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/60 border border-red-700/60 text-red-200 text-xs sm:text-sm flex items-center gap-2 animate-shake">
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isAnswerCorrect && currentQ.options[selectedOption!]?.explanation && (
              <div className="mt-4 p-3.5 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>{currentQ.options[selectedOption!]?.explanation}</span>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 2: VALIDAÇÃO DO BOMBOM COM AVALIAÇÃO NO GOOGLE */}
        {/* ========================================================================= */}
        {stage === 'reward' && (
          <div id="reward-box" className="bg-[#1e1e1e] border-2 border-[#00E676]/60 rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_35px_rgba(0,230,118,0.2)] animate-fade-in relative overflow-hidden">
            
            <div className="w-20 h-20 bg-[#00E676]/15 border-2 border-[#00E676] rounded-full flex items-center justify-center text-[#00E676] mx-auto mb-4 shadow-[0_0_20px_rgba(0,230,118,0.4)] animate-bounce">
              <span className="text-3xl">🍫</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Etapa Final • Validação do Prêmio</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 font-['Outfit',sans-serif]">
              🎉 Você Concluiu as Perguntas!
            </h3>
            
            <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto mb-4">
              Você acertou o desafio e garantiu o seu brinde exclusivo da Nova City MCZ!
            </p>

            {/* Prize Highlight Box */}
            <div className="bg-gradient-to-r from-amber-500/10 via-[#00E676]/15 to-amber-500/10 border-2 border-dashed border-[#00E676] p-4 sm:p-6 rounded-2xl my-5 max-w-lg mx-auto shadow-[0_0_25px_rgba(0,230,118,0.2)]">
              <div className="flex items-center justify-center gap-2 text-[#00E676] text-lg sm:text-xl font-black">
                <Gift className="w-6 h-6 text-[#00E676] shrink-0" />
                <span>🎁 1 Bombom Grátis no Balcão</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-semibold mt-1">
                + 20% de Desconto em Películas & Acessórios na Loja
              </p>
            </div>

            {/* Validation Explanation */}
            <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 max-w-lg mx-auto my-6 text-left">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wide mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Como validar e retirar seu bombom:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Clique no botão abaixo para <strong>avaliar com 5 estrelas no Google</strong>. Isso validará o seu bombom e liberará o código do cupom para apresentar no balcão da loja!
              </p>
            </div>

            {/* PRIMARY GOOGLE REVIEW VALIDATION BUTTON */}
            <div className="max-w-md mx-auto flex flex-col gap-3">
              <button
                type="button"
                id="btn-validate-bombom-google"
                onClick={() => handleUnlockCoupon('Loja Maceió (Rua do Uruguai)', STORE_INFO.googleReviewUrl)}
                className="w-full bg-gradient-to-r from-amber-400 via-[#00E676] to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-black font-black py-4 px-6 rounded-2xl text-sm sm:text-base uppercase tracking-wider transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(0,230,118,0.5)] border-2 border-white/20 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span className="text-lg">⭐</span>
                <span>AVALIAR NO GOOGLE & VALIDAR BOMBOM</span>
                <Sparkles className="w-4 h-4 fill-black" />
              </button>

              <span className="text-[11px] text-zinc-400">
                (Abre o Google Reviews da Nova City e libera seu cupom na hora)
              </span>
            </div>

            {/* Store Selection Alternative Options */}
            <div className="mt-8 pt-6 border-t border-zinc-800 max-w-lg mx-auto">
              <p className="text-xs text-zinc-400 mb-3">
                Ou escolha diretamente por unidade para avaliar:
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => handleUnlockCoupon('Loja Maceió (Rua do Uruguai)', STORE_INFO.googleReviewMaceioUrl || STORE_INFO.googleReviewUrl)}
                  className="flex-1 bg-[#242424] hover:bg-zinc-800 text-zinc-200 hover:text-white p-3 rounded-xl border border-zinc-700 hover:border-[#00E676] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#00E676]" />
                  <span>📍 Maceió (Rua do Uruguai)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUnlockCoupon('Loja Praia do Francês', STORE_INFO.googleReviewFrancesUrl || STORE_INFO.googleReviewUrl)}
                  className="flex-1 bg-[#242424] hover:bg-zinc-800 text-zinc-200 hover:text-white p-3 rounded-xl border border-zinc-700 hover:border-[#00E676] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🏖️ Praia do Francês</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 3: CUPOM FINAL LIBERADO & VALIDADO */}
        {/* ========================================================================= */}
        {stage === 'coupon' && (
          <div id="coupon-box" className="bg-[#1e1e1e] border-2 border-[#00E676] rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_40px_rgba(0,230,118,0.3)] animate-scale-up">
            <div className="w-16 h-16 bg-[#00E676] rounded-full flex items-center justify-center text-black mx-auto mb-3 shadow-[0_0_25px_rgba(0,230,118,0.6)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/15 border border-[#00E676]/40 text-[#00E676] text-xs font-black uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Validação Concluída • Prêmio Liberado</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 font-['Outfit',sans-serif]">
              🍫 Bombom Validado com Sucesso!
            </h3>
            
            {selectedStore && (
              <span className="inline-block bg-zinc-800 text-zinc-300 text-xs px-3.5 py-1 rounded-full border border-zinc-700 mb-3">
                Unidade de retirada: <strong>{selectedStore}</strong>
              </span>
            )}

            <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto mb-4">
              Apresente este código no balcão da loja para retirar seu <strong>bombom</strong> e aplicar o desconto de <strong>20%</strong>:
            </p>

            {/* Coupon Code Block with Copy Action */}
            <div className="max-w-md mx-auto my-5 bg-black border-2 border-[#00E676] rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-inner">
              <div className="font-mono text-xl sm:text-2xl font-black text-[#00E676] tracking-widest pl-2">
                NOVACITY-TECH2026
              </div>
              <button
                type="button"
                onClick={handleCopyCoupon}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-[#00E676] hover:text-black text-white text-xs font-bold transition-all cursor-pointer shadow"
                title="Copiar código do cupom"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#00E676] group-hover:text-black" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            {/* Physical Location Instruction */}
            <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 max-w-md mx-auto mb-5 text-xs text-zinc-300 flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4 text-[#00E676] shrink-0" />
              <span>Retirada: <strong>Rua do Uruguai, 338D - Jaraguá / Centro, Maceió</strong></span>
            </div>

            <p className="text-xs text-zinc-400 mt-2 mb-6">
              *Apresente o cupom e sua avaliação no balcão da loja ou envie direto pelo WhatsApp!
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={whatsappQuizUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 bg-[#00C853] hover:bg-[#00E676] text-black font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>💬 Enviar no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-700"
                title="Jogar novamente"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Jogar de Novo</span>
              </button>
            </div>

            {/* Quick Link to Google Review if needed */}
            <div className="mt-4">
              <a
                href={STORE_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-zinc-400 hover:text-amber-400 underline transition-colors inline-flex items-center gap-1"
              >
                <span>⭐ Reabrir página de avaliação no Google</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
