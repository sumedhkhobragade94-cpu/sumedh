import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { MolecularMotionGraphic } from '../components/MolecularMotionGraphic';
import { SkinBarrierComparison2D } from '../components/SkinBarrierComparison2D';
import { MonochromeMarqueeTicker } from '../components/MonochromeMarqueeTicker';
import {
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Truck,
  Droplets,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  FlaskConical,
  Eye,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface ProductDetailViewProps {
  productSlug: string;
  onNavigate: (view: string, param?: string) => void;
  onBuyNow: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productSlug,
  onNavigate,
  onBuyNow
}) => {
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.slug === productSlug) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [activeImageKey, setActiveImageKey] = useState<'primary' | 'texture' | 'lifestyle'>('primary');
  
  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    benefits: true,
    howToUse: false,
    ingredients: false,
    suitableFor: false,
    caution: false,
    faq: false
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onBuyNow();
  };

  const otherProduct = PRODUCTS.find((p) => p.id !== product.id);

  return (
    <div className="py-10 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-8 uppercase tracking-wider font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-black">
            Shop
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-bold">{product.name}</span>
        </nav>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Product Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 shrink-0">
              <button
                onClick={() => setActiveImageKey('primary')}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 p-1 bg-white transition-all ${
                  activeImageKey === 'primary' ? 'border-neutral-900 shadow-xs' : 'border-neutral-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={product.images.primary}
                  alt="Bottle & Box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>

              <button
                onClick={() => setActiveImageKey('texture')}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 p-1 bg-white transition-all ${
                  activeImageKey === 'texture' ? 'border-neutral-900 shadow-xs' : 'border-neutral-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={product.images.texture}
                  alt="Liquid Texture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>

              {product.images.lifestyle && (
                <button
                  onClick={() => setActiveImageKey('lifestyle')}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 p-1 bg-white transition-all ${
                    activeImageKey === 'lifestyle' ? 'border-neutral-900 shadow-xs' : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.images.lifestyle}
                    alt="Routine Pair"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              )}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs relative flex items-center justify-center p-4 min-h-[420px] lg:min-h-[520px]">
              <span
                className="absolute top-4 left-4 z-10 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full shadow-2xs"
                style={{
                  backgroundColor: product.accentColor.light,
                  color: product.accentColor.text,
                  border: `1px solid ${product.accentColor.border}`
                }}
              >
                {product.size} • {product.concentration}
              </span>

              <img
                src={product.images[activeImageKey] || product.images.primary}
                alt={product.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[500px] object-cover rounded-xl transition-all duration-300"
              />
            </div>
          </div>

          {/* Right: Product Purchase Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500 mb-2">
                <span>NOVELIS CLINICAL SERIES</span>
                <span>pH {product.bottleSpecs.ph}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                NOVELIS {product.name}
              </h1>

              <p className="text-sm font-semibold text-neutral-700 mt-1">
                {product.concentration}
              </p>
              
              <p className="text-xs text-neutral-500 mt-0.5">
                {product.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-neutral-200">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Inclusive of all taxes
              </span>
            </div>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Bottle Specs Summary */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Packaging:</span>
                <strong className="text-neutral-900">{product.packaging}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Texture:</span>
                <strong className="text-neutral-900">{product.bottleSpecs.texture}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Active Dosage:</span>
                <strong className="text-neutral-900">2–3 Drops Per Application</strong>
              </div>
            </div>

            {/* Quantity Selector & Main Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-1">
                  <button
                    id="pdp-qty-minus"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-600 hover:text-black rounded"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-neutral-900">{quantity}</span>
                  <button
                    id="pdp-qty-plus"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-600 hover:text-black rounded"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TO CART • ₹{product.price * quantity}</span>
                </button>
              </div>

              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-neutral-50 text-neutral-900 border-2 border-neutral-900 text-xs font-bold uppercase tracking-[0.18em] transition-colors"
              >
                BUY NOW
              </button>
            </div>

            {/* Shipping & Trust icons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Free shipping on orders over ₹799</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>15-Day Return Assurance</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Sections (Accordions / Tabs) */}
        <div className="mt-16 bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
          
          {/* 1. Overview */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('overview')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>1. Overview</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.overview ? 'rotate-180' : ''}`} />
            </button>
            {openSections.overview && (
              <div className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-3 pt-2">
                <p>{product.fullDescription}</p>
                <p>
                  Manufactured in a pharmaceutical-grade ISO facility. Packaged in light-blocking bottles to preserve the biochemical potency of delicate actives.
                </p>
              </div>
            )}
          </div>

          {/* 2. Key Benefits */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('benefits')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>2. Key Benefits</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.benefits ? 'rotate-180' : ''}`} />
            </button>
            {openSections.benefits && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-3 text-xs text-neutral-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. How to Use */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('howToUse')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>3. How to Use</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.howToUse ? 'rotate-180' : ''}`} />
            </button>
            {openSections.howToUse && (
              <div className="mt-4 space-y-4 pt-2 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-center gap-4 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Recommended Timing</span>
                    <strong className="text-neutral-900">{product.howToUse.when}</strong>
                  </div>
                  <div className="border-l border-neutral-200 pl-4">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Application Frequency</span>
                    <strong className="text-neutral-900">{product.howToUse.frequency}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-neutral-900 uppercase tracking-wider text-xs block">Step-by-Step Instructions:</span>
                  <ol className="space-y-2 text-neutral-600">
                    {product.howToUse.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs">
                    <strong className="block text-emerald-900 font-bold mb-1">Pairs Well With:</strong>
                    <ul className="space-y-1 text-emerald-800">
                      {product.howToUse.pairWith.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {product.howToUse.avoidWith && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs">
                      <strong className="block text-amber-900 font-bold mb-1">Precautions &amp; Avoid:</strong>
                      <ul className="space-y-1 text-amber-800">
                        {product.howToUse.avoidWith.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. Ingredients */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('ingredients')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>4. Ingredients &amp; Science</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.ingredients ? 'rotate-180' : ''}`} />
            </button>
            {openSections.ingredients && (
              <div className="mt-4 space-y-5 pt-2">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                    Active Ingredient Breakdown:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.ingredientHighlights.map((ing, i) => (
                      <div key={i} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-neutral-900 font-bold">{ing.name}</strong>
                          {ing.percentage && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-700">
                              {ing.percentage}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-emerald-800 font-medium mt-0.5">{ing.role}</p>
                        <p className="text-neutral-600 mt-1">{ing.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    Complete INCI Ingredient List:
                  </span>
                  <p className="text-xs text-neutral-600 font-mono leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                    {product.ingredientsList}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 5. Suitable For */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('suitableFor')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>5. Suitable For</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.suitableFor ? 'rotate-180' : ''}`} />
            </button>
            {openSections.suitableFor && (
              <div className="mt-4 pt-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  {product.suitableFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 6. Caution & Patch Testing */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('caution')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>6. Caution &amp; Patch Testing</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.caution ? 'rotate-180' : ''}`} />
            </button>
            {openSections.caution && (
              <div className="mt-4 space-y-2 pt-2 text-xs text-neutral-600">
                {product.caution.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-200/50 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Product Specific FAQ */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('faq')}
              className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base uppercase tracking-wider text-neutral-900"
            >
              <span>7. Frequently Asked Questions</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.faq ? 'rotate-180' : ''}`} />
            </button>
            {openSections.faq && (
              <div className="mt-4 space-y-3 pt-2">
                {product.faqs.map((f, i) => (
                  <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                    <strong className="block text-neutral-900 font-bold mb-1">
                      {f.question}
                    </strong>
                    <p className="text-neutral-600 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* 2D MOLECULAR MECHANISM SIMULATOR */}
        <section className="mt-16 bg-white border border-neutral-200/80 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8A9A5B] block mb-1">
                Cellular Action Simulation
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-neutral-900">
                2D Bio-Active Mechanism: {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Simulate how {product.concentration} behaves dynamically on epidermal lipid barriers and pore channels.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider px-3 py-1.5 bg-gray-50 border border-gray-200 shrink-0">
              <Activity className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>Real-time Canvas 60 FPS</span>
            </div>
          </div>

          <MolecularMotionGraphic
            initialMode={product.slug === 'clarify' ? 'bha_penetration' : 'niacinamide_barrier'}
          />
        </section>

        {/* 2D CELLULAR MICRO-SCAN SECTION */}
        <section className="mt-12">
          <SkinBarrierComparison2D
            initialMode={product.slug === 'clarify' ? 'bha_pore' : 'niacinamide_matrix'}
          />
        </section>

        {/* Recommended Pairing Banner */}
        {otherProduct && (
          <div className="mt-16 bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-neutral-50 overflow-hidden border border-neutral-200 shrink-0">
                  <img
                    src={otherProduct.images.primary}
                    alt={otherProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
                    COMPLIMENTARY ROUTINE PAIR
                  </span>
                  <h4 className="text-lg font-bold text-neutral-900">
                    NOVELIS {otherProduct.name} ({otherProduct.concentration})
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {otherProduct.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('product-detail', otherProduct.slug)}
                  className="px-5 py-2.5 border border-neutral-300 hover:border-black text-xs font-semibold uppercase tracking-wider rounded-lg text-neutral-800"
                >
                  View Pair
                </button>
                <button
                  onClick={() => addToCart(otherProduct, 1)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg"
                >
                  Add Pair (₹{otherProduct.price})
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <aside aria-label="Quick Add to Cart" className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 p-3 z-30 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] font-bold text-neutral-900 uppercase">
            NOVELIS {product.name}
          </span>
          <span className="text-xs font-bold text-neutral-900">₹{product.price}</span>
        </div>
        <button
          id="mobile-sticky-add-to-cart-btn"
          onClick={handleAddToCart}
          className="py-2.5 px-6 bg-neutral-900 text-white text-xs font-bold uppercase tracking-[0.16em] rounded-lg shadow-md active:scale-98"
        >
          ADD TO CART
        </button>
      </aside>
    </div>
  );
};
