import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Check, Sparkles, AlertCircle, ArrowRight, Clock, ShieldCheck, Droplet } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const InteractiveRoutineSimulator2D: React.FC<{
  onSelectProduct?: (slug: string) => void;
}> = ({ onSelectProduct }) => {
  const [routineTime, setRoutineTime] = useState<'AM' | 'PM'>('PM');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const [isApplying, setIsApplying] = useState<boolean>(false);

  const amSteps = [
    {
      step: 1,
      title: 'Splash & Cleanse',
      sub: 'Gentle lukewarm water or mild foam',
      duration: '30 sec',
      ph: '5.5',
      tip: 'Preserves the overnight acid mantle without stripping essential sebum.',
      product: null
    },
    {
      step: 2,
      title: 'RENEW 10% Niacinamide + Zinc',
      sub: '2–3 drops patted gently into skin',
      duration: '45 sec',
      ph: '5.8',
      tip: 'Controls daytime sebum, suppresses inflammation, and stimulates ceramide synthesis.',
      product: PRODUCTS[1]
    },
    {
      step: 3,
      title: 'Barrier Moisturizer',
      sub: 'Lightweight peptide gel',
      duration: '30 sec',
      ph: '5.5',
      tip: 'Locks water in the stratum corneum without heavy occlusives.',
      product: null
    },
    {
      step: 4,
      title: 'Broad-Spectrum SPF 50+',
      sub: 'PA++++ UVA / UVB Defense',
      duration: '60 sec',
      ph: '6.0',
      tip: 'Crucial for preserving cell DNA and preventing post-inflammatory hyperpigmentation.',
      product: null
    }
  ];

  const pmSteps = [
    {
      step: 1,
      title: 'Double Cleanse',
      sub: 'Dissolve daily urban pollution & sebum',
      duration: '60 sec',
      ph: '5.5',
      tip: 'Ensures a completely bare, dry canvas for maximum acid bioavailability.',
      product: null
    },
    {
      step: 2,
      title: 'CLARIFY 2% Salicylic Acid',
      sub: '2–3 drops over T-zone & blemishes',
      duration: '60 sec wait',
      ph: '3.9',
      tip: 'Lipid-soluble BHA dives into pore lining to dissolve accumulated micro-comedones.',
      product: PRODUCTS[0]
    },
    {
      step: 3,
      title: 'RENEW 10% Niacinamide (Optional)',
      sub: 'Alternate or layer after BHA dries',
      duration: '45 sec',
      ph: '5.8',
      tip: 'Accelerates epidermal barrier repair and fades post-blemish redness.',
      product: PRODUCTS[1]
    },
    {
      step: 4,
      title: 'Ceramide Recovery Cream',
      sub: 'Deep nocturnal barrier nourishment',
      duration: '45 sec',
      ph: '5.5',
      tip: 'Replenishes intercellular lipids while you sleep.',
      product: null
    }
  ];

  const currentSteps = routineTime === 'AM' ? amSteps : pmSteps;
  const currentStep = currentSteps[activeStepIndex] || currentSteps[0];

  return (
    <div className="w-full bg-white border border-gray-100 shadow-sm overflow-hidden text-[#111]">
      {/* Header & AM/PM Toggle */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50/40">
        <div>
          <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-[#8A9A5B] block mb-1">
            2D Motion Protocol
          </span>
          <h3 className="text-xl font-light tracking-tight text-neutral-900">
            Interactive Skincare Routine Flow
          </h3>
        </div>

        {/* AM / PM Pill Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 border border-gray-200">
          <button
            onClick={() => {
              setRoutineTime('AM');
              setActiveStepIndex(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold tracking-[0.2em] transition-all ${
              routineTime === 'AM'
                ? 'bg-black text-white shadow-2xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Morning (AM)</span>
          </button>

          <button
            onClick={() => {
              setRoutineTime('PM');
              setActiveStepIndex(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold tracking-[0.2em] transition-all ${
              routineTime === 'PM'
                ? 'bg-black text-white shadow-2xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Evening (PM)</span>
          </button>
        </div>
      </div>

      {/* 2D Step Flow Visualizer Bar */}
      <div className="p-6 bg-[#fcfcfc] border-b border-gray-100">
        <div className="relative flex items-center justify-between max-w-3xl mx-auto">
          {/* Animated Connecting SVG Wire */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-gray-200 -z-0">
            <motion.div
              className="h-full bg-black"
              initial={false}
              animate={{
                width: `${(activeStepIndex / (currentSteps.length - 1)) * 100}%`
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
          </div>

          {/* Steps Node Buttons */}
          {currentSteps.map((st, idx) => {
            const isCurrent = activeStepIndex === idx;
            const isPassed = activeStepIndex > idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
              >
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                    borderColor: isCurrent ? '#111111' : isPassed ? '#8A9A5B' : '#E5E5E5'
                  }}
                  className={`w-10 h-10 flex items-center justify-center font-mono text-xs font-bold transition-all border-2 ${
                    isCurrent
                      ? 'bg-black text-white shadow-md'
                      : isPassed
                      ? 'bg-[#8A9A5B] text-white'
                      : 'bg-white text-gray-400'
                  }`}
                >
                  {isPassed ? <Check className="w-4 h-4" /> : `0${st.step}`}
                </motion.div>
                <span className={`text-[9px] uppercase tracking-widest mt-2 hidden sm:block font-medium ${
                  isCurrent ? 'text-black font-bold' : 'text-gray-400'
                }`}>
                  Step {st.step}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Detailed Card with 2D Animation */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${routineTime}-${activeStepIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Step Protocol Specs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] px-2.5 py-0.5 bg-black text-white">
                  Step 0{currentStep.step} of 0{currentSteps.length}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#8A9A5B]" />
                  {currentStep.duration}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Target pH: {currentStep.ph}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-tight text-neutral-900">
                {currentStep.title}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
                {currentStep.sub}
              </p>

              <div className="bg-gray-50 p-4 border border-gray-100 text-xs text-neutral-700 leading-relaxed space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#8A9A5B] block">
                  Clinical Rationale:
                </span>
                <p>{currentStep.tip}</p>
              </div>

              {/* Step Navigation Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 border border-gray-200 text-[9px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 hover:border-black transition-colors"
                >
                  Previous Step
                </button>

                <button
                  disabled={activeStepIndex === currentSteps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(currentSteps.length - 1, prev + 1))}
                  className="px-5 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Column: Product Card preview if applicable */}
            <div className="lg:col-span-5 bg-[#fcfcfc] p-6 border border-gray-100 flex flex-col justify-between">
              {currentStep.product ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8A9A5B]">
                      NOVELIS Formula Used
                    </span>
                    <span className="text-[10px] font-bold text-black font-mono">
                      ₹{currentStep.product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white border border-gray-100 p-1 shrink-0">
                      <img
                        src={currentStep.product.images.primary}
                        alt={currentStep.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold tracking-wide uppercase text-neutral-900">
                        {currentStep.product.name}
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        {currentStep.product.concentration} • 30 ml
                      </p>
                      <span className="inline-block text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 mt-1">
                        In Stock • Express Dispatch
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectProduct && currentStep.product) {
                        onSelectProduct(currentStep.product.slug);
                      }
                    }}
                    className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-[9px] font-bold uppercase tracking-[0.2em] transition-colors text-center"
                  >
                    View {currentStep.product.name} Formula Details
                  </button>
                </div>
              ) : (
                <div className="h-full min-h-[160px] flex flex-col items-center justify-center text-center p-4">
                  <ShieldCheck className="w-8 h-8 text-gray-300 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                    Standard Daily Supportive Step
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1 max-w-xs">
                    Pair with your preferred non-comedogenic cleanser or mineral SPF to preserve barrier balance.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
