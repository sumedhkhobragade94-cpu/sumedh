import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, ArrowRight, Shield, Droplets, Sparkles } from 'lucide-react';

interface QuickViewModalProps {
  onViewProductFull: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onViewProductFull }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState<'primary' | 'texture'>('primary');

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
  };

  const handleFullDetails = () => {
    const slug = quickViewProduct.slug;
    setQuickViewProduct(null);
    onViewProductFull(slug);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-3xl border border-neutral-200">
          {/* Close button */}
          <button
            id="close-quickview-btn"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-100">
              <div className="aspect-square bg-white rounded-xl overflow-hidden border border-neutral-200/80 p-2 relative flex items-center justify-center">
                <img
                  src={selectedImg === 'primary' ? quickViewProduct.images.primary : quickViewProduct.images.texture}
                  alt={quickViewProduct.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 mt-4">
                <button
                  onClick={() => setSelectedImg('primary')}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 p-1 bg-white ${
                    selectedImg === 'primary' ? 'border-black' : 'border-neutral-200'
                  }`}
                >
                  <img
                    src={quickViewProduct.images.primary}
                    alt="Bottle"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setSelectedImg('texture')}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 p-1 bg-white ${
                    selectedImg === 'texture' ? 'border-black' : 'border-neutral-200'
                  }`}
                >
                  <img
                    src={quickViewProduct.images.texture}
                    alt="Liquid texture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Content Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase font-semibold tracking-wider text-neutral-500 mb-1">
                  <span>{quickViewProduct.category}</span>
                  <span>•</span>
                  <span>{quickViewProduct.size}</span>
                </div>

                <h2 className="text-xl font-bold text-neutral-900">
                  NOVELIS {quickViewProduct.name}
                </h2>
                <p className="text-xs text-neutral-600 font-medium mt-0.5">
                  {quickViewProduct.concentration}
                </p>

                <div className="mt-3 flex items-baseline gap-2.5">
                  <span className="text-xl font-bold text-neutral-900">
                    ₹{quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      ₹{quickViewProduct.originalPrice}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Taxes Included
                  </span>
                </div>

                <p className="mt-4 text-xs text-neutral-600 leading-relaxed">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Benefits */}
                <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-neutral-800">
                    Key Action:
                  </span>
                  {quickViewProduct.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Specs pill */}
                <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-neutral-400" />
                    pH {quickViewProduct.bottleSpecs.ph}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    Fragrance-Free
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    30 ml Pipette
                  </span>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <div className="flex gap-3 items-center">
                  <div className="flex items-center border border-neutral-300 rounded-lg bg-neutral-50 p-1">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-1.5 text-neutral-600 hover:text-black rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-neutral-900">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-1.5 text-neutral-600 hover:text-black rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    id="quickview-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.16em] rounded-lg transition-colors shadow-xs"
                  >
                    ADD TO CART • ₹{quickViewProduct.price * qty}
                  </button>
                </div>

                <button
                  onClick={handleFullDetails}
                  className="mt-3 w-full text-center text-xs text-neutral-600 hover:text-black font-semibold flex items-center justify-center gap-1"
                >
                  <span>View full ingredient breakdown &amp; routine steps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
