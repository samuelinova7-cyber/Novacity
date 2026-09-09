import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  Tag,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Maximize2
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/storeData';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

const VITRINE_PHOTOS = [
  {
    url: 'https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977938/WhatsApp_Image_2026-09-09_at_9.51.28_AM.jpg',
    title: 'Vitrine 01 - Acessórios de Áudio & Fones Bluetooth',
    badge: 'Vitrine 01',
    description: 'Linha completa de fones TWS, headsets e acessórios com som cristalino e garantia.',
  },
  {
    url: 'https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977938/WhatsApp_Image_2026-09-09_at_9.51.29_AM.jpg',
    title: 'Vitrine 02 - Carregadores Turbo PD, Cabos & Fontes',
    badge: 'Vitrine 02',
    description: 'Carregamento ultrarrápido homologado para iPhone, Samsung e aparelhos Type-C.',
  },
  {
    url: 'https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977938/WhatsApp_Image_2026-09-09_at_9.51.29_AM_1.jpg',
    title: 'Vitrine 03 - Power Banks, Baterias Portáteis & Indução',
    badge: 'Vitrine 03',
    description: 'Baterias externas de alta capacidade e carregadores por indução magnética MagSafe.',
  },
  {
    url: 'https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977938/WhatsApp_Image_2026-09-09_at_9.51.29_AM_2.jpg',
    title: 'Vitrine 04 - Balcão & Películas de Alta Proteção 9D',
    badge: 'Vitrine 04',
    description: 'Aplicação profissional na hora sem bolhas e cases anti-impacto reforçadas.',
  },
];

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenLightbox?: (url: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  
  // Alternating vitrine photos in a single block
  const [vitrineIndex, setVitrineIndex] = useState(0);
  const [isVitrinePaused, setIsVitrinePaused] = useState(false);

  useEffect(() => {
    if (isVitrinePaused) return;
    const interval = setInterval(() => {
      setVitrineIndex((prev) => (prev + 1) % VITRINE_PHOTOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isVitrinePaused]);

  const currentVitrine = VITRINE_PHOTOS[vitrineIndex];

  const handlePrevVitrine = () => {
    setVitrineIndex((prev) => (prev - 1 + VITRINE_PHOTOS.length) % VITRINE_PHOTOS.length);
  };

  const handleNextVitrine = () => {
    setVitrineIndex((prev) => (prev + 1) % VITRINE_PHOTOS.length);
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query) ||
      (product.specifications && product.specifications.toLowerCase().includes(query)) ||
      product.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  // Calculate category counts
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'todos') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === categoryId).length;
  };

  return (
    <section id="produtos" className="py-16 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Single Alternating Block for Vitrine Photos (Proporção Máxima) */}
        <div
          onMouseEnter={() => setIsVitrinePaused(true)}
          onMouseLeave={() => setIsVitrinePaused(false)}
          className="mb-12 bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar of the Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vitrine Oficial da Loja (Bloco Único com Alternância)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentVitrine.title}
              </h3>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline-block">
                {isVitrinePaused ? '⏸️ Pausado (Hover)' : '▶️ Alternando a cada 4.5s'} • {vitrineIndex + 1}/{VITRINE_PHOTOS.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevVitrine}
                  aria-label="Foto Anterior da Vitrine"
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextVitrine}
                  aria-label="Próxima Foto da Vitrine"
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Alternating Image Container in Maximum Proportion */}
          <div
            onClick={() => onOpenLightbox && onOpenLightbox(currentVitrine.url)}
            className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] bg-black rounded-2xl overflow-hidden border border-zinc-800/90 cursor-pointer group shadow-2xl flex items-center justify-center p-3 sm:p-5"
            title="Clique para ampliar esta foto da vitrine em proporção máxima"
          >
            <img
              src={currentVitrine.url}
              alt={currentVitrine.title}
              key={currentVitrine.url}
              className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
                {currentVitrine.badge}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center gap-1.5 shadow-lg group-hover:bg-[#00E676] group-hover:text-black transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ampliar Foto</span>
              </div>
            </div>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2 bg-black/70 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10">
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {currentVitrine.title}
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5">
                  {currentVitrine.description}
                </p>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#00E676] font-extrabold uppercase tracking-wider shrink-0 bg-[#00E676]/10 px-2.5 py-1 rounded-lg border border-[#00E676]/30 self-start sm:self-auto">
                Proporção Máxima 100%
              </span>
            </div>
          </div>

          {/* Quick Select Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 relative z-10">
            {VITRINE_PHOTOS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setVitrineIndex(idx)}
                className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left cursor-pointer ${
                  vitrineIndex === idx
                    ? 'bg-zinc-800 border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.25)]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-12 h-12 bg-black rounded-lg overflow-hidden shrink-0 border border-zinc-800 flex items-center justify-center p-1">
                  <img src={item.url} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-white truncate">{item.badge}</p>
                  <p className="text-[10px] text-zinc-400 truncate">Clique para ver</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#00E676] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo Oficial de Produtos & Preços
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
              Vitrine & Tabela de Acessórios
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Consulte nossa lista com nomes, especificações detalhadas e valores etiquetados em loja. Peça pelo WhatsApp com entrega expressa ou retirada no balcão em Maceió.
            </p>
          </div>

          {/* Controls: Search, View Mode Toggle & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-products-input"
                type="text"
                placeholder="Buscar por nome, cabo, fone, especificação..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] rounded-xl pl-10 pr-16 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-zinc-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shrink-0">
              <button
                id="view-mode-table-btn"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#00E676] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Visualização em Lista / Tabela"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Lista / Tabela</span>
              </button>
              <button
                id="view-mode-grid-btn"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#00E676] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Visualização em Grade de Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grade</span>
              </button>
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                id="product-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#00E676] cursor-pointer"
              >
                <option value="default">Ordenação padrão</option>
                <option value="price-asc">Menor Preço (R$)</option>
                <option value="price-desc">Maior Preço (R$)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills with Count */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00E676] text-black border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.3)]'
                    : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/20 text-black font-extrabold' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Informative Stats Strip */}
        <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 bg-zinc-950/80 border border-zinc-800/80 rounded-xl px-4 py-2.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Exibindo:</span>
            <span className="text-white font-bold">{filteredProducts.length} itens</span>
            {selectedCategory !== 'todos' && (
              <span className="bg-zinc-800 text-[#00E676] px-2 py-0.5 rounded text-[11px] font-semibold">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
              </span>
            )}
            {searchQuery && (
              <span className="text-zinc-400">
                para "<span className="text-white">{searchQuery}</span>"
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
              Valores etiquetados da loja física
            </span>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <span className="hidden sm:inline text-zinc-400">Pix imediato ou até 12x no Cartão</span>
          </div>
        </div>

        {/* Content Render: Table/Column Mode OR Card Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 text-center max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Nenhum produto encontrado</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Não encontramos itens para "{searchQuery}". Deseja consultar disponibilidade de outro modelo no WhatsApp?
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Ver todos os {PRODUCTS.length} produtos
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* ========================================================================= */
          /* COLUMN / TABLE VIEW (Nome, Especificações, Preço e Pedido)                */
          /* ========================================================================= */
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-zinc-900/90 border-b border-zinc-800 text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                    <th className="py-3.5 px-4 w-[34%]">Produto & Nome</th>
                    <th className="py-3.5 px-4 w-[34%]">Especificações Técnicas</th>
                    <th className="py-3.5 px-3 w-[14%] text-center">Categoria</th>
                    <th className="py-3.5 px-4 w-[18%] text-right">Preço & Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/60 text-sm">
                  {filteredProducts.map((product, idx) => (
                    <tr
                      key={product.id}
                      id={`product-row-${product.id}`}
                      className={`hover:bg-zinc-900/60 transition-colors group ${
                        idx % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/20'
                      }`}
                    >
                      {/* Column 1: Nome + Imagem Miniatura */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex items-center gap-3.5">
                          <div
                            onClick={() => onSelectProduct(product)}
                            className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden cursor-pointer relative group-hover:border-zinc-700"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                onClick={() => onSelectProduct(product)}
                                className="font-bold text-white hover:text-[#00E676] transition-colors cursor-pointer text-xs sm:text-sm"
                              >
                                {product.name}
                              </span>
                              {product.badge && (
                                <span className="bg-zinc-800 text-[#00E676] text-[10px] font-bold px-2 py-0.2 rounded-full whitespace-nowrap">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Especificações */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="text-xs text-zinc-300 font-mono bg-zinc-900/70 border border-zinc-800/70 rounded-lg p-2 leading-relaxed">
                          {product.specifications || (
                            <span className="text-zinc-500 italic">
                              {product.description}
                            </span>
                          )}
                        </div>
                        {product.compatibleWith && product.compatibleWith.length > 0 && (
                          <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                            <span className="font-semibold text-zinc-400">Compatível:</span>
                            <span className="truncate max-w-xs">{product.compatibleWith.join(', ')}</span>
                          </div>
                        )}
                      </td>

                      {/* Column 3: Categoria */}
                      <td className="py-3.5 px-3 align-middle text-center">
                        <span className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] font-medium px-2.5 py-1 rounded-lg whitespace-nowrap">
                          {product.categoryLabel}
                        </span>
                      </td>

                      {/* Column 4: Preço & Ações */}
                      <td className="py-3.5 px-4 align-middle text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base sm:text-lg font-black text-[#00E676] font-mono">
                              R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-zinc-500 line-through">
                                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1.5 justify-end">
                            <a
                              id={`table-buy-whatsapp-${product.id}`}
                              href={getProductWhatsAppUrl(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#00E676] hover:bg-[#00c853] text-black text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-[0_0_10px_rgba(0,230,118,0.25)] hover:scale-105"
                              title="Pedir no WhatsApp"
                            >
                              <MessageSquare className="w-3 h-3 fill-black" />
                              <span>Pedir</span>
                            </a>
                            <button
                              onClick={() => onSelectProduct(product)}
                              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-[11px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Ver Detalhes"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* CARD GRID VIEW                                                            */
          /* ========================================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-green-950/20"
              >
                {/* Image & Badges */}
                <div
                  className="relative h-52 bg-zinc-900 overflow-hidden cursor-pointer"
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
                    <span className="absolute top-3 left-3 bg-[#00E676] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
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
                    <span className="text-[10px] uppercase font-bold text-[#00E676] tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-white text-sm mt-1 line-clamp-2 hover:text-[#00E676] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Specifications Pill */}
                    {product.specifications && (
                      <p className="text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800/80 rounded-lg p-1.5 mt-2 line-clamp-2 font-mono">
                        {product.specifications}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 border-t border-zinc-900">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#00E676] font-mono">
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
                  <div className="pt-1 space-y-2">
                    <a
                      id={`product-buy-whatsapp-${product.id}`}
                      href={getProductWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#00E676] hover:bg-[#00c853] text-black py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,230,118,0.25)] hover:scale-[1.01]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-black" />
                      <span>Comprar no WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Ver Detalhes do Produto
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
            <h4 className="text-lg font-bold text-white">Não encontrou o modelo exato que procura?</h4>
            <p className="text-xs text-zinc-400 max-w-xl">
              Temos centenas de outros itens, conectores específicos e películas sob medida disponíveis no estoque de nossa loja física em Maceió (Rua do Uruguai, 338D).
            </p>
          </div>
          <a
            href={getProductWhatsAppUrl({
              id: 'consulta-geral',
              name: 'Consulta de Estoque / Produto Específico',
              category: 'todos',
              categoryLabel: 'Acessórios',
              price: 0,
              image: '',
              description: 'Consulta de estoque para modelo específico',
              inStock: true
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[#00E676] hover:text-[#00c853] px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all"
          >
            Consultar Estoque no WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
