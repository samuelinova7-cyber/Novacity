import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { TopTickerBanner } from './components/TopTickerBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { RepairQuoteForm } from './components/RepairQuoteForm';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { TrustAndLocation } from './components/TrustAndLocation';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { TechChallengeQuiz } from './components/TechChallengeQuiz';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { ImageLightbox } from './components/ImageLightbox';
import { Product, CartItem } from './types';
import { playClickSound } from './utils/sound';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [quoteIssue, setQuoteIssue] = useState<string | undefined>(undefined);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Global sound effect on clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
        playClickSound();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Scroll navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceName: string) => {
    setQuoteIssue(serviceName);
    handleNavigate('orcamento');
  };

  // Cart operations
  const handleAddToCart = (product: Product, color?: string, model?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedModel === model
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, quantity: 1, selectedColor: color, selectedModel: model }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Monitor scroll for active nav section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicos', 'instagram-reels', 'produtos', 'depoimentos', 'orcamento', 'desafio-tech', 'localizacao'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-green-500 selection:text-black">
      {/* Top Physical & Live Status Announcement Bar */}
      <TopBar />

      {/* Sticky Header Container (Informative Yellow Running Ticker + Main Navbar) */}
      <div className="sticky top-0 z-40 w-full shadow-2xl">
        <TopTickerBanner onNavigateToQuiz={() => handleNavigate('desafio-tech')} />
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onNavigateToCatalog={() => handleNavigate('produtos')}
          onNavigateToQuote={() => handleNavigate('orcamento')}
          onOpenLightbox={(url) => setLightboxImage(url)}
        />

        {/* Quick Services Bar */}
        <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />

        {/* Instagram Daily Life & Reels Showcase */}
        <InstagramReelsSection onOpenLightbox={(url) => setLightboxImage(url)} />

        {/* Product Showcase / Vitrine */}
        <ProductCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => {
            handleAddToCart(product);
            setIsCartOpen(true);
          }}
          onOpenLightbox={(url) => setLightboxImage(url)}
        />

        {/* Customer Reviews & Social Proof (Google Reviews) */}
        <ReviewsSection onOpenLightbox={(url) => setLightboxImage(url)} />

        {/* Interactive Repair Quote Calculator Form */}
        <RepairQuoteForm
          initialIssue={quoteIssue}
          onOpenLightbox={(url) => setLightboxImage(url)}
        />

        {/* Gamified Tech Challenge Quiz & Free Prize */}
        <TechChallengeQuiz />

        {/* Local Trust & Location Map Section */}
        <TrustAndLocation onOpenLightbox={(url) => setLightboxImage(url)} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, color, model) => {
          handleAddToCart(product, color, model);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Image Lightbox Modal */}
      <ImageLightbox
        imageUrl={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
