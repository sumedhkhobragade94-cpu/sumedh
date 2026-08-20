import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { PRODUCTS, BUNDLE_PAIR } from '../data/products';
import { useCart } from '../context/CartContext';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check, Sun, Moon, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

interface RoutineFinderViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const RoutineFinderView: React.FC<RoutineFinderViewProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentStep] = optionIndex;
    setSelectedAnswers(updatedAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      // Optional async ping to backend diagnostics
      fetch('/api/routine/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: updatedAnswers })
      }).catch(() => {});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setAddedToCartSuccess(false);
  };

  // Calculate recommendation based on scores
  const getRecommendation = () => {
    let clarifyScore = 0;
    let renewScore = 0;
    let bothScore = 0;

    selectedAnswers.forEach((ansIndex, qIndex) => {
      const q = QUIZ_QUESTIONS[qIndex];
      if (q && q.options[ansIndex]) {
        const s = q.options[ansIndex].scores;
        clarifyScore += s.clarify;
        renewScore += s.renew;
        bothScore += s.both;
      }
    });

    if (bothScore >= 7 || (clarifyScore >= 5 && renewScore >= 5)) {
      return {
        type: 'both',
        title: 'The Synergistic Clinical Routine',
        subtitle: 'NOVELIS CLARIFY (PM) + NOVELIS RENEW (AM/PM)',
        matchPercent: 98,
        description: 'Your skin profile shows both active congestion/blemish vulnerability and an urge to fade post-breakout marks while reinforcing barrier hydration. Layering these two complementary formulas provides comprehensive 24-hour balance.',
        products: [PRODUCTS[0], PRODUCTS[1]],
        bundle: BUNDLE_PAIR
      };
    } else if (clarifyScore > renewScore) {
      return {
        type: 'clarify',
        title: 'Targeted Pore Decongestant Routine',
        subtitle: 'NOVELIS CLARIFY (Salicylic Acid 2%)',
        matchPercent: 96,
        description: 'Your priority is unclogging lipid-rich sebaceous pores, eliminating active blemish cycles, and rebalancing excess sebum breakthrough.',
        products: [PRODUCTS[0]]
      };
    } else {
      return {
        type: 'renew',
        title: 'Multi-Action Barrier & Tone Routine',
        subtitle: 'NOVELIS RENEW (Niacinamide 10%)',
        matchPercent: 95,
        description: 'Your primary need is refining enlarged pore texture, fading uneven post-blemish pigmentation, and locking in weightless hydration with Zinc PCA.',
        products: [PRODUCTS[1]]
      };
    }
  };

  const result = isCompleted ? getRecommendation() : null;

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-800 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8A9A5B]" />
            <span>Clinical Diagnostic Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900">
            Routine Finder
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
            Discover the exact NOVELIS formula ratio suited to your physiological skin profile.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            /* QUIZ QUESTIONS STEP */
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 p-6 sm:p-10 shadow-xs"
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-widest mb-4">
                <span>Phase {currentStep + 1} of {totalQuestions}</span>
                <span>{Math.round(((currentStep + 1) / totalQuestions) * 100)}%</span>
              </div>

              <div className="w-full bg-gray-100 h-1 overflow-hidden mb-8">
                <div
                  className="bg-black h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-light text-neutral-900 leading-snug">
                  {currentQuestion.question}
                </h2>
                <p className="text-xs text-neutral-500 mt-1.5">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      id={`quiz-opt-${currentStep}-${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 sm:p-5 border transition-all flex items-start justify-between gap-4 group ${
                        isSelected
                          ? 'border-black bg-gray-50/80 shadow-2xs'
                          : 'border-gray-200 hover:border-black/50 bg-white hover:bg-gray-50/40'
                      }`}
                    >
                      <div>
                        <strong className="block text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black">
                          {opt.label}
                        </strong>
                        <span className="text-xs text-neutral-500 mt-0.5 block leading-relaxed">
                          {opt.description}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 group-hover:border-black'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation back */}
              <div className="flex items-center justify-between pt-8 mt-6 border-t border-gray-100 text-xs">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] ${
                    currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                  Targeted Active Chemistry
                </span>
              </div>

            </motion.div>
          ) : (
            /* RESULT SCREEN */
            result && (
              <motion.div
                key="result-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-200 p-6 sm:p-10 shadow-md space-y-8"
              >
                {/* Top Result Banner */}
                <div className="text-center pb-6 border-b border-gray-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase font-bold tracking-[0.2em] mb-3">
                    <Activity className="w-3.5 h-3.5" />
                    <span>{result.matchPercent}% FORMULA COMPATIBILITY</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-neutral-900">
                    {result.title}
                  </h2>
                  <p className="text-xs font-semibold text-neutral-600 mt-1 uppercase tracking-wider">
                    {result.subtitle}
                  </p>
                  <p className="text-xs text-neutral-600 max-w-xl mx-auto mt-3 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Recommended Product Cards */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 block">
                    Your Tailored Formulations:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.products.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => onNavigate('product-detail', prod.slug)}
                        className="p-4 bg-gray-50/70 border border-gray-200 flex gap-4 items-center cursor-pointer hover:border-black transition-colors group"
                      >
                        <div className="w-16 h-16 bg-white overflow-hidden border border-gray-200 shrink-0">
                          <img
                            src={prod.images.primary}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase">
                            NOVELIS {prod.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-medium">
                            {prod.concentration} • {prod.size}
                          </p>
                          <span className="text-xs font-bold text-neutral-900 mt-1 block">
                            ₹{prod.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to use your routine */}
                <div className="p-6 bg-black text-white space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-[#8A9A5B] font-bold uppercase tracking-wider text-[10px]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bio-Compatible Application Rhythm:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                    <div className="space-y-1">
                      <strong className="text-white flex items-center gap-1.5 text-xs font-bold">
                        <Sun className="w-3.5 h-3.5 text-amber-400" /> Morning Protocol
                      </strong>
                      <p className="text-[11px] leading-relaxed text-gray-400">
                        Gentle cleanse → 2–3 drops RENEW (Niacinamide 10%) → Seal with SPF 30+.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-white flex items-center gap-1.5 text-xs font-bold">
                        <Moon className="w-3.5 h-3.5 text-indigo-400" /> Evening Protocol
                      </strong>
                      <p className="text-[11px] leading-relaxed text-gray-400">
                        Deep cleanse → 2–3 drops CLARIFY (Salicylic Acid 2%) → Light barrier cream.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    id="quiz-add-all-btn"
                    onClick={() => {
                      result.products.forEach((p) => addToCart(p, 1));
                      setAddedToCartSuccess(true);
                      setTimeout(() => setAddedToCartSuccess(false), 3000);
                    }}
                    className="flex-1 py-3.5 bg-black hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-98"
                  >
                    {addedToCartSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Added Routine to Cart!</span>
                      </>
                    ) : (
                      <>
                        <span>Add Recommended Regimen to Cart</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-5 py-3.5 border border-gray-200 hover:border-black text-[10px] font-bold uppercase tracking-wider text-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Diagnostic</span>
                  </button>
                </div>

              </motion.div>
            )
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
