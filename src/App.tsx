import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
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
import { Product, CartItem } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [quoteIssue, setQuoteIssue] = useState<string | undefined>(undefined);

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
      const sections = ['inicio', 'servicos', 'produtos', 'orcamento', 'desafio-tech', 'localizacao', 'depoimentos', 'instagram-reels'];
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

      {/* Main Sticky Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onNavigateToCatalog={() => handleNavigate('produtos')}
          onNavigateToQuote={() => handleNavigate('orcamento')}
        />

        {/* Quick Services Bar */}
        <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />

        {/* Product Showcase / Vitrine */}
        <ProductCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => {
            handleAddToCart(product);
            setIsCartOpen(true);
          }}
        />

        {/* Interactive Repair Quote Calculator Form */}
        <RepairQuoteForm initialIssue={quoteIssue} />

        {/* Gamified Tech Challenge Quiz & Free Prize */}
        <TechChallengeQuiz />

        {/* Local Trust & Location Map Section */}
        <TrustAndLocation />

        {/* Customer Reviews & Social Proof */}
        <ReviewsSection />

        {/* Instagram Daily Life & Reels Showcase */}
        <InstagramReelsSection />
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
    </div>
  );
}
