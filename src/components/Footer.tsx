import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracker }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch {}
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Newsletter Callout */}
        <div className="bg-[#111] border border-neutral-800 p-8 sm:p-10 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[9px] uppercase font-bold tracking-[0.4em] text-[#8A9A5B] mb-2">
                NOVELIS Science Dispatch
              </div>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                Stay in the NOVELIS loop.
              </h3>
              <p className="text-xs text-gray-400 mt-2 max-w-md leading-relaxed">
                Receive evidence-based routine guides, ingredient deep-dives, and early access to upcoming clinical releases.
              </p>
            </div>

            <div>
              {isSubscribed ? (
                <div className="bg-neutral-900 border border-[#8A9A5B]/40 p-4 flex items-center gap-3 text-emerald-200 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">Welcome to the NOVELIS circle.</strong>
                    <span>Check your inbox for your welcome access code.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    id="footer-newsletter-submit-btn"
                    type="submit"
                    className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-gray-500 mt-2">
                We respect your inbox. Transparent science only. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group focus:outline-none flex flex-col"
            >
              <span className="text-2xl font-light tracking-[0.3em] text-white">
                NOVELIS
              </span>
              <span className="text-[8px] tracking-[0.5em] text-gray-400 mt-1 uppercase font-normal">
                Skin Science
              </span>
            </button>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Premium, minimal, science-focused skincare for modern Indian skin. Formulated without unnecessary fillers or artificial fragrances.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] text-gray-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>Targeted 30 ml Formulations • Tested Compatibility</span>
            </div>
          </div>

          {/* Formulas */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white mb-4">
              Formulas
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('product-detail', 'clarify')}
                  className="hover:text-white transition-colors"
                >
                  CLARIFY (Salicylic Acid 2%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product-detail', 'renew')}
                  className="hover:text-white transition-colors"
                >
                  RENEW (Niacinamide 10%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  All Targeted Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routine-finder')}
                  className="text-[#8A9A5B] hover:text-white transition-colors font-medium"
                >
                  Diagnostic Quiz →
                </button>
              </li>
            </ul>
          </div>

          {/* Skin Science */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white mb-4">
              Science &amp; Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors"
                >
                  Science Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Formulation Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Customer Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white mb-4">
              Care &amp; Logistics
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {onOpenTracker && (
                <li>
                  <button
                    id="footer-track-order-btn"
                    onClick={onOpenTracker}
                    className="text-[#8A9A5B] hover:text-white transition-colors font-medium flex items-center gap-1.5"
                  >
                    <span>Track Your Order</span>
                    <span className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full animate-pulse" />
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  15-Day Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Shipping Across India
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Ingredient Transparency
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Care Team
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 uppercase tracking-widest">
          <p className="max-w-xl text-center md:text-left leading-relaxed">
            NOVELIS SKIN SCIENCE formulas are developed for cosmetic care and everyday skin routine support.
          </p>
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} NOVELIS SKIN SCIENCE.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

