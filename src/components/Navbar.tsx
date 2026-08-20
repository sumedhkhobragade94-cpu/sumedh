import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenTracker }) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'shop', label: 'Shop' },
    { id: 'routine-finder', label: 'Routine Finder' },
    { id: 'about', label: 'About' },
    { id: 'journal', label: 'Journal' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-gray-100 ${
        isScrolled
          ? 'bg-[#fcfcfc]/95 backdrop-blur-md py-4'
          : 'bg-[#fcfcfc] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Brand Logo & Desktop Nav Links */}
        <div className="flex items-center space-x-8 sm:space-x-12">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 -ml-1.5 text-neutral-800 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="text-left group flex flex-col focus:outline-none"
          >
            <span className="text-xl sm:text-2xl tracking-[0.3em] font-light leading-none text-[#111] group-hover:opacity-80 transition-opacity">
              NOVELIS
            </span>
            <span className="text-[8px] tracking-[0.5em] text-gray-400 mt-1 uppercase font-normal">
              Skin Science
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-7 lg:space-x-8 text-[11px] tracking-widest uppercase font-medium">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors py-1 focus:outline-none ${
                    isActive
                      ? 'text-black font-bold border-b border-black'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-5 sm:space-x-6">
          {onOpenTracker && (
            <button
              id="nav-track-order-btn"
              onClick={onOpenTracker}
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-medium text-gray-600 hover:text-black transition-colors py-1"
            >
              <span>Track Order</span>
              <span className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
            </button>
          )}

          <button
            onClick={() => handleNavClick('routine-finder')}
            className="hidden lg:block text-[11px] tracking-widest uppercase font-medium text-[#8A9A5B] hover:text-black transition-colors"
          >
            Diagnostic
          </button>

          <button
            id="cart-drawer-trigger-btn"
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-[11px] tracking-widest uppercase font-medium text-[#111] hover:opacity-75 transition-opacity relative flex items-center gap-1.5 focus:outline-none py-1"
            aria-label={`Shopping Cart with ${totalCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-neutral-900 md:hidden" />
            <span className="hidden md:inline">Cart ({totalCount})</span>
            {totalCount > 0 && (
              <span className="w-1.5 h-1.5 bg-black rounded-full absolute -top-0.5 -right-2 md:relative md:top-0 md:right-0 md:inline-block"></span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#fcfcfc] border-b border-gray-200 shadow-lg py-5 px-6 transition-all">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between py-2.5 text-[11px] uppercase tracking-widest font-medium text-neutral-800 hover:text-black border-b border-gray-100 text-left"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            ))}
            <div className="pt-2">
              <button
                id="mobile-quiz-cta-drawer"
                onClick={() => handleNavClick('routine-finder')}
                className="w-full py-3 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 transition-colors"
              >
                Routine Finder Quiz
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

