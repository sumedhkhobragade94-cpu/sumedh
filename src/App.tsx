import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { RoutineFinderView } from './views/RoutineFinderView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { Order } from './types';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string>('clarify');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [trackerInitialId, setTrackerInitialId] = useState<string>('');

  // Smooth scroll to top when changing view
  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    if (param) {
      setViewParam(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (order: Order) => {
    setLastOrder(order);
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTracker = (orderId?: string) => {
    setTrackerInitialId(orderId || (lastOrder ? lastOrder.id : ''));
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111111] selection:bg-neutral-900 selection:text-white">
      {/* 1. Global Announcement */}
      <AnnouncementBar />

      {/* 2. Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* 3. Main Views */}
      <main className="flex-1 w-full">
        {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentView === 'shop' && <ShopView onNavigate={handleNavigate} />}
        {currentView === 'product-detail' && (
          <ProductDetailView
            productSlug={viewParam}
            onNavigate={handleNavigate}
            onBuyNow={() => handleNavigate('checkout')}
          />
        )}
        {currentView === 'routine-finder' && <RoutineFinderView onNavigate={handleNavigate} />}
        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
        {currentView === 'journal' && <JournalView onNavigate={handleNavigate} />}
        {currentView === 'faq' && <FaqView onNavigate={handleNavigate} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'checkout' && (
          <CheckoutView
            onOrderComplete={handleOrderComplete}
            onBackToShop={() => handleNavigate('shop')}
          />
        )}
        {currentView === 'order-success' && lastOrder && (
          <OrderSuccessView
            order={lastOrder}
            onNavigateHome={() => handleNavigate('home')}
            onTrackOrder={(id) => handleOpenTracker(id)}
          />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* 5. Modals, Drawers, Toasts */}
      <CartDrawer
        onCheckout={() => handleNavigate('checkout')}
        onNavigateToShop={() => handleNavigate('shop')}
      />
      <QuickViewModal
        onViewProductFull={(slug) => handleNavigate('product-detail', slug)}
      />
      <LiveOrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={trackerInitialId}
      />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
