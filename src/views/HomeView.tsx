import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, BUNDLE_PAIR } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { MolecularMotionGraphic } from '../components/MolecularMotionGraphic';
import { InteractiveRoutineSimulator2D } from '../components/InteractiveRoutineSimulator2D';
import { SkinBarrierComparison2D } from '../components/SkinBarrierComparison2D';
import { MonochromeBottleLab } from '../components/MonochromeBottleLab';
import { MonochromeMarqueeTicker } from '../components/MonochromeMarqueeTicker';
import { useCart } from '../context/CartContext';
import {
  ArrowRight,
  Sparkles,
  Droplets,
  Sun,
  Moon,
  ShieldCheck,
  Check,
  FlaskConical,
  Layers,
  Award,
  ChevronRight,
  Activity,
  Scan,
  Zap
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedConcern, setSelectedConcern] = useState<string>('acne');

  const concerns = [
    {
      id: 'acne',
      label: 'Acne & Breakouts',
      recommendation: PRODUCTS[0], // Clarify
      tip: 'Salicylic Acid 2% clears deep inside lipid pores to target breakout-causing sebum.'
    },
    {
      id: 'pores',
      label: 'Oil & Pores',
      recommendation: PRODUCTS[0], // Clarify
      tip: 'BHA exfoliation unclogs trapped debris, refining the look of stretched, congested pores.'
    },
    {
      id: 'tone',
      label: 'Uneven Skin Tone',
      recommendation: PRODUCTS[1], // Renew
      tip: 'Niacinamide 10% helps fade post-blemish dark marks and harmonizes overall complexion.'
    },
    {
      id: 'hydration',
      label: 'Hydration & Barrier',
      recommendation: PRODUCTS[1], // Renew
      tip: 'Zinc PCA with pure Hyaluronic Acid provides non-comedogenic moisture and soothes stressed skin.'
    }
  ];

  const activeConcernData = concerns.find((c) => c.id === selectedConcern) || concerns[0];

  return (
    <div className="flex flex-col w-full bg-[#fcfcfc] text-[#111]">
      {/* 1. HERO SECTION (Clean Minimalism Split with Motion Graphics) */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-[#fcfcfc]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
          
          {/* Left Column: Typography & Intent */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-16"
          >
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-ping" />
                <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#8A9A5B] font-bold">
                  Science-led Formulations
                </h2>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-[#111]">
                Simply <span className="italic font-serif serif-font">formulated.</span>
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8 pr-0 sm:pr-8">
                Targeted skincare formulas designed for your everyday routine. Minimizing complexity, maximizing clinical efficacy.
              </p>

              {/* Minimalist CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="hero-shop-btn"
                  onClick={() => onNavigate('shop')}
                  className="bg-black text-white px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-gray-800 transition-all shadow-2xs text-center active:scale-98"
                >
                  Shop Skincare
                </button>
                <button
                  id="hero-quiz-btn"
                  onClick={() => onNavigate('routine-finder')}
                  className="border border-gray-200 bg-white px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold hover:border-black transition-all text-center text-neutral-900 active:scale-98"
                >
                  Explore Formulas
                </button>
              </div>

              {/* Minimal Metrics Strip */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-gray-100">
                <div>
                  <span className="block text-[11px] font-bold tracking-wider uppercase text-neutral-900">30 ML</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Pipette</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold tracking-wider uppercase text-neutral-900">100%</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Fragrance-Free</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold tracking-wider uppercase text-neutral-900">pH 3.8–6.0</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Bio-Compatible</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Fashion Product Showcase with Subtle Dot Grid */}
          <div className="lg:col-span-6 bg-gray-50 relative flex items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100 p-8 sm:p-12 overflow-hidden">
            {/* Background dot matrix */}
            <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:space-x-[-20px] max-w-md w-full">
              
              {/* Clarify Minimal Card with motion */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate('product-detail', 'clarify')}
                className="w-full sm:w-52 bg-white shadow-xl border border-gray-100 p-5 flex flex-col cursor-pointer hover:border-black/30 transition-all duration-300 transform sm:translate-y-6 group"
              >
                <div className="w-full aspect-square bg-[#FAFAFA] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={PRODUCTS[0].images.primary}
                    alt="NOVELIS Clarify"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#111]">Clarify</div>
                <div className="text-[9px] text-gray-400 uppercase mt-0.5 tracking-wider">Salicylic Acid 2%</div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-serif serif-font">
                  <span>30 ml</span>
                  <span className="font-sans font-bold text-[11px]">₹{PRODUCTS[0].price}</span>
                </div>
              </motion.div>

              {/* Renew Minimal Card with motion */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ y: -8 }}
                onClick={() => onNavigate('product-detail', 'renew')}
                className="w-full sm:w-52 bg-white shadow-xl border border-gray-100 p-5 flex flex-col cursor-pointer hover:border-black/30 transition-all duration-300 transform sm:-translate-y-6 group"
              >
                <div className="w-full aspect-square bg-[#FAFAFA] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={PRODUCTS[1].images.primary}
                    alt="NOVELIS Renew"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#111]">Renew</div>
                <div className="text-[9px] text-gray-400 uppercase mt-0.5 tracking-wider">Niacinamide 10%</div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-serif serif-font">
                  <span>30 ml</span>
                  <span className="font-sans font-bold text-[11px]">₹{PRODUCTS[1].price}</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. KINETIC MONOCHROME TICKER 01 */}
      <MonochromeMarqueeTicker variant="dark" />

      {/* 3. FOUR-COLUMN MINIMALIST BRAND PILLARS STRIP */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-100 bg-white">
        <div className="p-6 sm:p-8 border-r border-b sm:border-b-0 border-gray-100 flex flex-col items-center text-center group hover:bg-gray-50/60 transition-colors">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-neutral-900 font-mono">
            01 // Targeted Actives
          </span>
          <span className="text-[11px] text-gray-500">
            Specific concerns, clinically solved.
          </span>
        </div>

        <div className="p-6 sm:p-8 lg:border-r border-b sm:border-b-0 border-gray-100 flex flex-col items-center text-center group hover:bg-gray-50/60 transition-colors">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-neutral-900 font-mono">
            02 // Minimal Routines
          </span>
          <span className="text-[11px] text-gray-500">
            Less is more skin science.
          </span>
        </div>

        <div
          onClick={() => onNavigate('routine-finder')}
          className="p-6 sm:p-8 border-r border-gray-100 flex flex-col items-center text-center bg-gray-50/70 hover:bg-gray-100/70 cursor-pointer transition-colors group"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-neutral-900 font-mono group-hover:text-black">
            03 // Routine Diagnostic
          </span>
          <span className="text-[11px] text-gray-500">
            Find your custom active setup →
          </span>
        </div>

        <div
          onClick={() => onNavigate('shop')}
          className="p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50/50 transition-colors group"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-[#8A9A5B] font-mono group-hover:underline">
            04 // Shop The Drop
          </span>
          <span className="text-[11px] text-gray-500">
            Explore 30ml formulations
          </span>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="py-16 sm:py-24 bg-[#fcfcfc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-gray-100">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A9A5B] font-bold block mb-2">
                Primary Formulations
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                Featured Formulas
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-lg">
                High-potency clinical actives suspended in lightweight, bio-compatible water matrices.
              </p>
            </div>

            <button
              onClick={() => onNavigate('shop')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              <span>View All Formulas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onViewProduct={(slug) => onNavigate('product-detail', slug)}
              />
            ))}

            {/* Complete Duo Bundle Card */}
            <article className="flex flex-col bg-[#111] text-white border border-gray-900 overflow-hidden shadow-lg justify-between group">
              <div className="relative aspect-square overflow-hidden bg-black p-4 flex items-center justify-center">
                <span className="absolute top-3 left-3 z-10 text-[9px] uppercase font-bold tracking-[0.2em] px-2.5 py-1 bg-[#8A9A5B] text-white">
                  {BUNDLE_PAIR.savings}
                </span>
                <img
                  src={BUNDLE_PAIR.image}
                  alt={BUNDLE_PAIR.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#8A9A5B] font-bold mb-1">
                    Complete 2-Step System
                  </div>
                  <h3 className="text-lg font-light tracking-wide text-white">
                    {BUNDLE_PAIR.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    CLARIFY 2% BHA (30ml) + RENEW 10% Niacinamide (30ml). Complete morning balance and evening pore clearance.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-white">
                        ₹{BUNDLE_PAIR.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ₹{BUNDLE_PAIR.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A9A5B] font-bold">
                      Free Shipping
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(PRODUCTS[0], 1);
                      addToCart(PRODUCTS[1], 1);
                    }}
                    className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
                  >
                    Add Duo to Cart
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. MONOCHROME BOTTLE LAB (Interactive Exploded Technical Blueprint & Droplet Mechanics) */}
      <section className="py-16 sm:py-24 bg-[#0a0a0c] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.35em] text-[#8A9A5B] block mb-2">
              Hardware &amp; Fluid Engineering
            </span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              Anatomy of Clinical Precision
            </h2>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-md mx-auto">
              Every NOVELIS borosilicate pipette is engineered with micro-metered surface tension geometry to release exact 0.05ml active doses without degradation.
            </p>
          </div>

          <MonochromeBottleLab onExploreProduct={(slug) => onNavigate('product-detail', slug)} />
        </div>
      </section>

      {/* 6. 2D CELLULAR MICRO-SCAN (Interactive Untreated vs Novelis Comparison Slider) */}
      <section className="py-16 sm:py-24 bg-[#fcfcfc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#8A9A5B] block mb-2">
              Direct Clinical Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
              Interactive 2D Cellular Micro-Scan
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Drag the high-contrast laser scanner across the stratum corneum to observe how lipophilic actives dissolve follicular sebum plugs and fortify intercellular lipid bridges.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <SkinBarrierComparison2D />
          </div>
        </div>
      </section>

      {/* 7. 2D MOLECULAR & KINETIC LAB (Real-time Bio-Active Visualizer) */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#8A9A5B] block mb-2">
              Cellular Biophysics
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
              Kinetic Particle Simulation
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Real-time 60 FPS canvas modeling active penetration depth, lipid binding kinetics, and fluid surface tension.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <MolecularMotionGraphic />
          </div>
        </div>
      </section>

      {/* 5. WHY NOVELIS (Minimalist Grid) */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8A9A5B] block mb-2">
              Our Formulation Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
              Why NOVELIS
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              We eliminate the noise and focus strictly on skin-compatible active concentrations with verified stability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-gray-50/70 border border-gray-100 hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-neutral-900 mb-4 font-mono text-xs">
                01
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                Targeted formulas
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Single and dual active formulations concentrated at biologically effective percentages without filler complexes.
              </p>
            </div>

            <div className="p-6 bg-gray-50/70 border border-gray-100 hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-neutral-900 mb-4 font-mono text-xs">
                02
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                Minimal routines
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Skincare made effortless. 2 to 3 targeted steps that integrate smoothly into morning and night rituals.
              </p>
            </div>

            <div className="p-6 bg-gray-50/70 border border-gray-100 hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-neutral-900 mb-4 font-mono text-xs">
                03
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                Thoughtful ingredients
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Zero artificial fragrance, zero drying alcohols, zero essential oils. Formulated strictly to maintain epidermal balance.
              </p>
            </div>

            <div className="p-6 bg-gray-50/70 border border-gray-100 hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-neutral-900 mb-4 font-mono text-xs">
                04
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                Everyday skincare
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Accessible clinical-grade solutions tailored for urban lifestyles, heat, humidity, and Indian climatic conditions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BUILD YOUR ROUTINE (INTERACTIVE CONCERNS FINDER) */}
      <section className="py-16 sm:py-24 bg-[#fcfcfc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8A9A5B] block mb-2">
              Custom Matching
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
              Build Your Routine
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Select your primary skin focus to reveal your tailored NOVELIS formula recommendation.
            </p>
          </div>

          {/* Concern Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {concerns.map((c) => {
              const active = selectedConcern === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedConcern(c.id)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                    active
                      ? 'bg-black text-white border-black shadow-2xs'
                      : 'bg-white text-gray-600 hover:text-black border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Recommended Result Card */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-md p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Product Visual */}
              <div className="md:col-span-5 aspect-square bg-gray-50 border border-gray-100 p-4 flex items-center justify-center">
                <img
                  src={activeConcernData.recommendation.images.primary}
                  alt={activeConcernData.recommendation.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Recommendation Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#8A9A5B] bg-emerald-50/60 px-2.5 py-1 border border-emerald-100 inline-block">
                    Recommended Match for {activeConcernData.label}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-neutral-900 mt-2">
                    NOVELIS {activeConcernData.recommendation.name}
                  </h3>
                  <p className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                    {activeConcernData.recommendation.concentration} • 30 ml
                  </p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 border border-gray-100">
                  <strong className="text-black font-semibold">Why it works:</strong> {activeConcernData.tip}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">
                    Key Outcomes:
                  </span>
                  {activeConcernData.recommendation.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => addToCart(activeConcernData.recommendation, 1)}
                    className="px-6 py-3 bg-black hover:bg-gray-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                  >
                    Add to Cart • ₹{activeConcernData.recommendation.price}
                  </button>

                  <button
                    onClick={() => onNavigate('product-detail', activeConcernData.recommendation.slug)}
                    className="px-5 py-3 border border-gray-200 hover:border-black text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-800 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('routine-finder')}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 hover:text-[#8A9A5B] underline underline-offset-4 transition-colors"
            >
              Need a personalized multi-step diagnosis? Take the Routine Quiz →
            </button>
          </div>

        </div>
      </section>

      {/* 6. 2D INTERACTIVE ROUTINE PROTOCOL SIMULATOR */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-5xl mx-auto">
            <InteractiveRoutineSimulator2D onSelectProduct={(slug) => onNavigate('product-detail', slug)} />
          </div>
        </div>
      </section>

      {/* SECOND KINETIC MONOCHROME TICKER */}
      <MonochromeMarqueeTicker variant="light" />

      {/* 7. SCIENCE LAB HIGHLIGHT */}
      <section className="py-16 sm:py-20 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="bg-white border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8A9A5B] mb-2">
                Formulation Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                Skincare grounded in physiological reality.
              </h2>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                At NOVELIS, we refuse marketing hyperbole. We do not invent proprietary complexes to disguise low active concentrations. Every formula states its exact ingredient percentage, target pH range, and straightforward instructions.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-4 border-t border-gray-100 mt-6">
                <div>
                  <strong className="block text-xs font-bold text-neutral-900 tracking-wider uppercase">Pure Actives</strong>
                  <span className="text-[10px] text-gray-400">Salicylic Acid 2% &amp; Niacinamide 10%</span>
                </div>
                <div>
                  <strong className="block text-xs font-bold text-neutral-900 tracking-wider uppercase">Zero Fragrance</strong>
                  <span className="text-[10px] text-gray-400">Non-sensitizing clinical standard</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 bg-gray-50 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
              <img
                src="/src/assets/images/about_lab_story_1787246174339.jpg"
                alt="NOVELIS Formulation Laboratory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

