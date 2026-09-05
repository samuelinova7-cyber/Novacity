import React from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { getCartWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const whatsappUrl = getCartWhatsAppUrl(cartItems);

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center text-green-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-none">Sua Sacola de Orçamento</h3>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">
                {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
              <ShoppingBag className="w-12 h-12 stroke-[1.5] text-zinc-700" />
              <p className="text-sm font-semibold text-zinc-400">Sua sacola está vazia</p>
              <p className="text-xs text-zinc-600 max-w-xs">
                Navegue pela nossa vitrine de acessórios e adicione produtos para fechar um pedido conjunto pelo WhatsApp.
              </p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedModel}-${index}`}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3.5 flex gap-3.5 items-center justify-between"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded-xl bg-zinc-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                  <div className="text-[10px] text-zinc-400 mt-0.5 space-x-2">
                    {item.selectedColor && <span>Cor: {item.selectedColor}</span>}
                    {item.selectedModel && <span>• Mod: {item.selectedModel}</span>}
                  </div>
                  <div className="text-xs font-black text-green-400 mt-1">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                    title="Remover item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / WhatsApp Checkout */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold uppercase text-zinc-400">Total Estimado:</span>
              <span className="text-2xl font-black text-green-400">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <p className="text-[11px] text-zinc-500">
              O pedido será enviado formatado com todos os itens diretamente para o WhatsApp do atendimento para checagem de estoque e reserva.
            </p>

            <a
              id="cart-checkout-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-400 text-black py-4 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] transform hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Finalizar Pedido via WhatsApp</span>
            </a>

            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-400 pt-1 cursor-pointer"
            >
              Esvaziar sacola
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
