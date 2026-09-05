import React, { useState } from 'react';
import { X, MessageSquare, ShoppingBag, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color?: string, model?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [selectedModel, setSelectedModel] = useState<string>(
    product.compatibleWith && product.compatibleWith.length > 0 ? product.compatibleWith[0] : ''
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const whatsappUrl = getProductWhatsAppUrl(product, selectedColor, selectedModel);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedModel);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-card"
        className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Container */}
          <div className="relative bg-zinc-900 min-h-[260px] md:min-h-[380px] overflow-hidden flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[320px] object-cover rounded-2xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-green-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details & WhatsApp Conversion */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-[11px] uppercase font-bold text-green-400 tracking-wider">
                {product.categoryLabel}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1 leading-tight font-['Outfit',sans-serif]">
                {product.name}
              </h3>

              {/* Pricing */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-green-400">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-zinc-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                  Pix ou Cartão
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="block text-[11px] font-bold uppercase text-zinc-300 tracking-wider mb-2">
                    Cor: <span className="text-white">{selectedColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          selectedColor === c
                            ? 'bg-green-500/20 border-green-500 text-green-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Model / Compatibility Selector */}
              {product.compatibleWith && product.compatibleWith.length > 0 && (
                <div className="mt-4">
                  <span className="block text-[11px] font-bold uppercase text-zinc-300 tracking-wider mb-2">
                    Compatibilidade / Modelo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibleWith.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedModel(m)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          selectedModel === m
                            ? 'bg-green-500/20 border-green-500 text-green-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-900">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-400 text-black py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Comprar / Reservar no WhatsApp</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 py-3 px-4 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-zinc-400" />
                    <span>Adicionar à Sacola de Orçamento</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-zinc-400" />
                  Retirada ou Entrega Maceió
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  Garantia de Qualidade
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
