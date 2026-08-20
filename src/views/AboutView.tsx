import React from 'react';
import { ShieldCheck, FlaskConical, Droplets, Check, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-neutral-500 block mb-2">
            OUR PHILOSOPHY
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
            Skincare doesn&apos;t need to be complicated.
          </h1>
          <p className="text-xs sm:text-base text-neutral-600 mt-3 max-w-xl mx-auto leading-relaxed">
            NOVELIS SKIN SCIENCE was founded with a singular conviction: precision formulation is superior to crowded ingredient lists.
          </p>
        </div>

        {/* Hero Brand Imagery */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm mb-16">
          <img
            src="/src/assets/images/about_lab_story_1787246174339.jpg"
            alt="NOVELIS Formulation Laboratory"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[420px] object-cover"
          />
        </div>

        {/* Core Narrative Sections */}
        <div className="space-y-12 text-neutral-700 leading-relaxed text-sm sm:text-base">
          
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              The Origin of NOVELIS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              In a crowded market saturated with opaque proprietary blends, excessive 10-step routines, and exaggerated marketing claims, modern consumers were left with overwhelmed skin barriers and confused shelves.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We asked a fundamental question: What if skincare focused solely on the biological active percentages proven to work, stabilized in clean, bio-compatible water matrices, with complete transparency? That question became <strong>NOVELIS SKIN SCIENCE</strong>.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight text-center mb-8">
              Our 4 Formulation Pillars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 bg-white rounded-xl border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold text-xs">
                  01
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Targeted Formulas
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We formulate with clear, single and dual hero actives at exact biologically effective percentages—such as 2% pure Salicylic Acid and 10% pure Niacinamide with Zinc PCA.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold text-xs">
                  02
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Minimal Routines
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  More is not better. Overloading the skin with conflicting layers compromises barrier lipids. Our formulas are structured to achieve optimal results in 2 to 3 straightforward daily steps.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold text-xs">
                  03
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Clear Ingredient Communication
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  No hidden percentages, no proprietary disguise. We print every ingredient, exact active concentration, and pH target openly on our cartons and website.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold text-xs">
                  04
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Engineered for Modern Climates
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Formulated specifically for high humidity, urban pollution, and varied seasons. Lightweight water textures that absorb instantly without stickiness or greasy residue.
                </p>
              </div>

            </div>
          </div>

          {/* Transparency Table */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900">
              What We Exclude From Every Batch
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Synthetic Perfumes</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Essential Oils</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Drying Alcohols</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Synthetic Dyes</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Non-Comedogenic Bases</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>FSC Recycled Packaging</span>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center pt-6">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all inline-flex items-center gap-2"
            >
              <span>Explore Our Formulas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
