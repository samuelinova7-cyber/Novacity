import React, { useState } from 'react';
import { Smartphone, ShoppingBag, MessageSquare, Menu, X, Wrench, ShieldCheck, Instagram } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'produtos', label: 'Acessórios' },
    { id: 'orcamento', label: 'Orçamento' },
    { id: 'desafio-tech', label: '⭐ Avalie & Ganhe 🍫', highlight: true },
    { id: 'localizacao', label: 'Como Chegar' },
    { id: 'depoimentos', label: 'Avaliações' },
    { id: 'instagram-reels', label: 'Instagram' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-navigation" className="w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="logo-button"
          onClick={() => handleLinkClick('inicio')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.6)] animate-pulse transition-transform group-hover:scale-105">
            <img
              src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1788977945/WhatsApp_Image_2026-09-09_at_9.11.32_AM.jpg"
              alt="Nova City MCZ Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#00E676]/10 mix-blend-overlay pointer-events-none" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black tracking-tight text-white leading-none flex items-center gap-1.5">
              <span>NOVA CITY</span>
              <span className="text-[#00E676] drop-shadow-[0_0_8px_rgba(0,230,118,0.8)]">MCZ</span>
            </div>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 mt-0.5">
              Assistência & Acessórios
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className={`pb-1 transition-colors relative hover:text-white cursor-pointer ${
                link.highlight
                  ? 'text-[#00E676] hover:text-[#00E676] font-extrabold'
                  : ''
              } ${
                activeSection === link.id
                  ? 'text-white font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-green-500'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Instagram direct link */}
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Nova City MCZ"
            className="hidden sm:flex p-2.5 rounded-xl text-zinc-400 hover:text-pink-400 hover:bg-zinc-900 border border-zinc-800 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Cart Bag button */}
          <button
            id="cart-drawer-toggle"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition-colors cursor-pointer"
            title="Sua sacola de compras"
          >
            <ShoppingBag className="w-4 h-4 text-green-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            id="nav-whatsapp-cta"
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.25)]"
          >
            <MessageSquare className="w-4 h-4 fill-black text-black" />
            <span>Falar no WhatsApp</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-900">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              Chamar Técnico no WhatsApp
            </a>
            <div className="text-center text-xs text-zinc-500">
              📍 Rua do Uruguai, 338D - Maceió
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
