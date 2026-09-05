import React, { useState } from 'react';
import { Search, ShoppingBag, MessageSquare, ArrowUpRight, Shield, Zap, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/storeData';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="produtos" className="py-16 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-green-500 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Vitrine de Eletrônicos & Acessórios
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
              Acessórios de alta performance
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Confira os produtos disponíveis em nossa loja física em Maceió. Compre online pelo WhatsApp com retirada imediata ou entrega rápida.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-products-input"
              type="text"
              placeholder="Buscar por case, fone, cabo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`filter-category-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-green-500 text-black border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 text-center max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Nenhum produto encontrado</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Não encontramos resultados para "{searchQuery}". Deseja consultar disponibilidade de outro item no WhatsApp?
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-green-950/20"
              >
                {/* Image & Badges */}
                <div
                  className="relative h-56 bg-zinc-900 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-green-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Ver detalhes"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-green-400 tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-white text-base mt-1 line-clamp-2 hover:text-green-400 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-green-400">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      À vista no Pix ou até 12x no cartão
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <a
                      id={`product-buy-whatsapp-${product.id}`}
                      href={getProductWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 hover:bg-green-400 text-black py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(34,197,94,0.25)] hover:scale-[1.01]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-black" />
                      <span>Comprar no WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Ver Cores & Detalhes
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* Custom inquiry box */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">Procurando algum modelo específico para o seu aparelho?</h4>
            <p className="text-xs text-zinc-400 max-w-xl">
              Temos um estoque amplo de películas especiais, carregadores de alta voltagem e cases personalizadas na loja física.
            </p>
          </div>
          <a
            href={getProductWhatsAppUrl({
              id: 'consulta-geral',
              name: 'Acessório Personalizado / Modelo Específico',
              category: 'capinhas',
              categoryLabel: 'Acessórios',
              price: 0,
              image: '',
              description: 'Consulta de estoque para modelo específico',
              inStock: true
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-green-400 hover:text-green-300 px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all"
          >
            Consultar Estoque no WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
