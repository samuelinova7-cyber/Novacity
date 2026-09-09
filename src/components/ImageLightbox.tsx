import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  imageUrl: string | null;
  altText?: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageUrl, altText, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[90vh] w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
            <ZoomIn className="w-4 h-4 text-[#00E676]" />
            <span>Visualização de Imagem em Ampliação Máxima</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Fechar (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-2 sm:p-6 flex items-center justify-center overflow-auto bg-black/50">
          <img
            src={imageUrl}
            alt={altText || 'Ampliação da Imagem'}
            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_0_30px_rgba(0,230,118,0.2)]"
          />
        </div>

        <div className="px-4 py-3 bg-zinc-950 border-t border-zinc-800 text-center text-xs text-zinc-400">
          {altText || 'Nova City MCZ - Detalhe em alta resolução'}
        </div>
      </div>
    </div>
  );
};
