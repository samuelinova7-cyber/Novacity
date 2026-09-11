import React, { useState } from 'react';
import {
  Star,
  Gift,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  RotateCcw,
  MapPin,
  Award,
  Volume2,
  VolumeX,
  Heart,
  Zap,
  ShieldCheck,
  Tag,
  CreditCard,
  Users,
  ThumbsUp,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { EVALUATION_QUESTIONS, STORE_INFO } from '../data/storeData';
import { soundEffects } from '../utils/soundEffects';

export const TechChallengeQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stage, setStage] = useState<'survey' | 'reward' | 'coupon'>('survey');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<string>('Loja Maceió (Rua do Uruguai)');
  const [isCopied, setIsCopied] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [ratingsCount, setRatingsCount] = useState<number[]>([]);

  const currentQ = EVALUATION_QUESTIONS[currentQuestionIndex] || EVALUATION_QUESTIONS[0];
  const totalQuestions = EVALUATION_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleToggleSound = () => {
    const newMuteState = soundEffects.toggleMute();
    setIsSoundMuted(newMuteState);
    if (!newMuteState) {
      soundEffects.playSelect();
    }
  };

  const getOptionIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'CheckCircle':
        return <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#00E676] shrink-0" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'Tag':
        return <Tag className="w-5 h-5 text-[#00E676] shrink-0" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-blue-400 shrink-0" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-pink-500 fill-pink-500 shrink-0" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400 shrink-0" />;
      case 'ThumbsUp':
        return <ThumbsUp className="w-5 h-5 text-emerald-400 shrink-0" />;
      default:
        return <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />;
    }
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const option = currentQ.options[index];

    // Play lively animated sound effects
    soundEffects.playStar(option.stars ? option.stars - 1 : index);
    setFeedbackText(option.feedback || 'Excelente! Obrigado pela avaliação.');
    setRatingsCount((prev) => [...prev, option.stars || 5]);

    // Advance to next question or reward stage
    setTimeout(() => {
      if (currentQuestionIndex + 1 >= totalQuestions) {
        soundEffects.playCelebrationFanfare();
        setStage('reward');
      } else {
        soundEffects.playStepSuccess();
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setFeedbackText(null);
      }
    }, 1100);
  };

  const handleUnlockCoupon = (storeName?: string, reviewUrl?: string) => {
    if (storeName) {
      setSelectedStore(storeName);
    }
    const targetUrl = reviewUrl || STORE_INFO.googleReviewUrl;

    // Play exciting reward unlocking sound effect
    soundEffects.playRewardUnlock();

    // Open Google Review in new tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // Transition to validated coupon stage
    setTimeout(() => {
      setStage('coupon');
    }, 1200);
  };

  const handleCopyCoupon = () => {
    soundEffects.playCopySnap();
    navigator.clipboard.writeText('NOVACITY-BOMBOM');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    soundEffects.playSelect();
    setStage('survey');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setFeedbackText(null);
    setSelectedStore('Loja Maceió (Rua do Uruguai)');
    setRatingsCount([]);
  };

  const whatsappQuizUrl = `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(
    `Olá Nova City MCZ! Concluí a avaliação no site com nota 5 Estrelas no Google (${selectedStore}) e gerei o cupom NOVACITY-BOMBOM para retirar meu Bombom Grátis 🍫 + 20% de Desconto no balcão!`
  )}`;

  return (
    <section id="desafio-tech" className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-[#111111] via-[#161616] to-[#1a1a1a] border border-[#333333] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.7)] text-white text-center relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#00E676]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar with Badge and Sound Effect Toggle */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-[#00E676] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,193,7,0.4)]">
            <span className="text-sm">⭐</span>
            <span>AVALIE & GANHE • SISTEMA DE AVALIAÇÃO</span>
            <span className="text-sm">🍫</span>
          </div>

          {/* Sound Controls Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isSoundMuted
                ? 'bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                : 'bg-emerald-950/60 border-[#00E676]/40 text-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.2)]'
            }`}
            title={isSoundMuted ? 'Ativar Sons Animados' : 'Desativar Sons Animados'}
          >
            {isSoundMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sem Som</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Sons Ativados</span>
              </>
            )}
          </button>
        </div>

        {/* Main Section Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-['Outfit',sans-serif]">
          Sistema de Avaliação Nova City MCZ
        </h2>
        
        <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Responda a <strong className="text-white">4 perguntas rápidas</strong> sobre sua experiência, avalie a loja no Google no final e retire seu <strong className="text-[#00E676]">Bombom Grátis 🍫</strong> + <strong>20% OFF</strong> no balcão!
        </p>

        {/* ========================================================================= */}
        {/* ETAPA 1: AS PERGUNTAS DA AVALIAÇÃO COM SONS */}
        {/* ========================================================================= */}
        {stage === 'survey' && (
          <div id="survey-box" className="bg-[#1e1e1e] border border-zinc-800 rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative animate-fade-in">
            
            {/* Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="text-xs font-black uppercase text-[#00E676] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Etapa {currentQuestionIndex + 1} de {totalQuestions} • {currentQ.category}</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                {progressPercent}% Concluído
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-zinc-800 h-2.5 rounded-full mb-6 overflow-hidden p-0.5 border border-zinc-700/50">
              <div
                className="bg-gradient-to-r from-amber-400 via-[#00E676] to-[#00C853] h-full transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(0,230,118,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1.5 leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              {currentQ.subtitle}
            </p>

            {/* Options List */}
            <div className="flex flex-col gap-3.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#00E676]/20 to-amber-500/20 border-[#00E676] text-white shadow-[0_0_25px_rgba(0,230,118,0.35)] scale-[1.01]'
                        : 'bg-[#242424] border-zinc-700/80 text-zinc-200 hover:border-amber-400 hover:bg-[#2c2c2c] hover:text-white hover:scale-[1.008]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-black/50 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-amber-400 transition-colors">
                        {getOptionIcon(option.icon)}
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E676] transition-colors leading-snug">
                          {option.text}
                        </p>
                        {option.badge && (
                          <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                            {option.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#00E676] border-[#00E676] text-black'
                          : 'border-zinc-600 group-hover:border-amber-400 text-transparent'
                      }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Instant Feedback Box upon selection */}
            {feedbackText && (
              <div className="mt-5 p-4 bg-[#00E676]/15 border border-[#00E676] rounded-2xl flex items-center gap-3 animate-fade-in text-[#00E676]">
                <Sparkles className="w-5 h-5 shrink-0 animate-spin" />
                <span className="text-xs sm:text-sm font-bold">{feedbackText}</span>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span>🔊 Toque em uma opção para ouvir o som e avançar</span>
              </span>
              <span className="font-semibold text-amber-400">Prêmio: 🍫 1 Bombom Grátis</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 2: FIM DAS PERGUNTAS • BOTÃO PARA AVALIAR NO GOOGLE & GANHAR BOMBOM */}
        {/* ========================================================================= */}
        {stage === 'reward' && (
          <div id="reward-box" className="bg-[#1e1e1e] border-2 border-[#00E676] rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_40px_rgba(0,230,118,0.25)] animate-fade-in relative overflow-hidden">
            
            {/* Animated Floating Chocolate Icon */}
            <div className="w-24 h-24 bg-gradient-to-tr from-amber-500/20 via-[#00E676]/20 to-amber-500/20 border-2 border-[#00E676] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,230,118,0.5)] animate-bounce">
              <span className="text-4xl sm:text-5xl select-none">🍫</span>
            </div>

            {/* Victory Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Perguntas Concluídas com Sucesso!</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 font-['Outfit',sans-serif]">
              Você Ganhou um Bombom Grátis!
            </h3>
            
            <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Obrigado pelas suas respostas! Agora falta apenas o último passo para validar a sua retirada:
            </p>

            {/* Prize Highlight Box */}
            <div className="bg-gradient-to-r from-amber-500/15 via-[#00E676]/20 to-amber-500/15 border-2 border-dashed border-[#00E676] p-5 rounded-2xl my-5 max-w-lg mx-auto shadow-[0_0_30px_rgba(0,230,118,0.25)]">
              <div className="flex items-center justify-center gap-2 text-[#00E676] text-xl sm:text-2xl font-black">
                <Gift className="w-6 h-6 text-[#00E676] shrink-0" />
                <span>🎁 1 BOMBOM GRÁTIS NO BALCÃO</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-300 font-bold mt-1">
                + 20% DE DESCONTO EM PELÍCULAS 9D E ACESSÓRIOS
              </p>
            </div>

            {/* Instructions box */}
            <div className="bg-black/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 max-w-lg mx-auto my-6 text-left">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wide mb-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>Como validar e retirar seu bombom:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Clique no botão destacado abaixo para <strong>publicar sua avaliação com 5 estrelas no Google</strong>. Isso validará o seu bombom e liberará o código do cupom na hora!
              </p>
            </div>

            {/* PRIMARY GOOGLE REVIEW BUTTON REQUESTED BY USER */}
            <div className="max-w-md mx-auto flex flex-col gap-3">
              <button
                type="button"
                id="btn-evaluate-google-bombom"
                onClick={() => handleUnlockCoupon('Loja Maceió (Rua do Uruguai)', STORE_INFO.googleReviewUrl)}
                className="w-full bg-gradient-to-r from-amber-400 via-[#00E676] to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-black font-black py-4 px-6 rounded-2xl text-sm sm:text-base uppercase tracking-wider transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_35px_rgba(0,230,118,0.6)] border-2 border-white/30 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span className="text-xl">⭐</span>
                <span>AVALIAR NO GOOGLE & GANHAR BOMBOM</span>
                <span className="text-xl">🍫</span>
              </button>

              <span className="text-[11px] text-zinc-400 flex items-center justify-center gap-1">
                <span>⚡ Abre o Google Reviews oficial da Nova City e libera seu cupom</span>
              </span>
            </div>

            {/* Alternative Unit Selection */}
            <div className="mt-8 pt-6 border-t border-zinc-800 max-w-lg mx-auto">
              <p className="text-xs text-zinc-400 mb-3">
                Ou escolha diretamente por unidade para avaliar no Google:
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
        {/* ETAPA 3: CUPOM VALIDADO COM SUCESSO & LIBERADO */}
        {/* ========================================================================= */}
        {stage === 'coupon' && (
          <div id="coupon-box" className="bg-[#1e1e1e] border-2 border-[#00E676] rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_40px_rgba(0,230,118,0.3)] animate-scale-up">
            <div className="w-16 h-16 bg-[#00E676] rounded-full flex items-center justify-center text-black mx-auto mb-3 shadow-[0_0_25px_rgba(0,230,118,0.6)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00E676]/15 border border-[#00E676]/40 text-[#00E676] text-xs font-black uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Avaliação Concluída • Bombom Liberado!</span>
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
                NOVACITY-BOMBOM
              </div>
              <button
                type="button"
                onClick={handleCopyCoupon}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-[#00E676] hover:text-black text-white text-xs font-bold transition-all cursor-pointer shadow"
                title="Copiar código do cupom"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#00E676]" />
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
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto justify-center">
              <a
                href={whatsappQuizUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playSelect()}
                className="w-full sm:w-auto flex-1 bg-[#00C853] hover:bg-[#00E676] text-black font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>💬 Enviar no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-700"
                title="Avaliar novamente"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Avaliar de Novo</span>
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
