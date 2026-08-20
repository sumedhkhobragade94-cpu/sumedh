import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onNavigateToShop }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    total,
    freeShippingThreshold,
    freeShippingProgress
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoStatus(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFAFA] flex flex-col shadow-2xl border-l border-neutral-200">
          
          {/* Drawer Header */}
          <div className="p-5 bg-white border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 id="slide-over-title" className="text-base font-bold uppercase tracking-[0.14em] text-neutral-900">
                Your Routine Cart
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Routine Progress Announcement */}
          <div className="bg-neutral-900 text-white px-5 py-3 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Your routine is almost complete.
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">NOVELIS LABS</span>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-white border-b border-neutral-100">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    ✓ You have unlocked FREE Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-neutral-900">₹{freeShippingThreshold - subtotal}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] text-neutral-500">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  freeShippingProgress >= 100 ? 'bg-emerald-600' : 'bg-neutral-900'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
                  Explore our targeted formulas designed for your everyday skincare routine.
                </p>
                <button
                  id="empty-cart-shop-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  Explore Formulas
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  id={`cart-item-${item.product.slug}`}
                  className="p-3.5 bg-white rounded-xl border border-neutral-200/80 flex gap-3.5 items-center shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden shrink-0 border border-neutral-100 flex items-center justify-center">
                    <img
                      src={item.product.images.primary}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                          NOVELIS {item.product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-medium">
                          {item.product.concentration} • {item.product.size}
                        </p>
                      </div>
                      <button
                        id={`remove-item-btn-${item.product.slug}`}
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                        <button
                          id={`qty-minus-${item.product.slug}`}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-200 rounded-l"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-plus-${item.product.slug}`}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-200 rounded-r"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-neutral-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout) */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-neutral-200 space-y-3.5">
              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cart-promo-input"
                    type="text"
                    placeholder="Promo code (e.g. SCIENCE10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-black uppercase font-medium"
                  />
                </div>
                <button
                  id="apply-promo-btn"
                  type="submit"
                  className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Promo Messages */}
              {promoStatus && (
                <p className={`text-[11px] font-medium ${promoStatus.success ? 'text-emerald-700' : 'text-red-600'}`}>
                  {promoStatus.message}
                </p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg">
                  <span className="font-semibold">Code &quot;{appliedPromo}&quot; active</span>
                  <button onClick={removePromoCode} className="text-neutral-500 hover:text-neutral-800 underline text-[10px]">
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-200 pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Clinical Formulations • Secure Checkout</span>
              </div>

              {/* Checkout Button */}
              <button
                id="drawer-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.18em] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
