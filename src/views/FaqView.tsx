import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true
  });

  const categories = ['All', 'Usage', 'Formulation', 'Orders & Shipping', 'Safety'];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-neutral-500 block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Answers to your Skincare Questions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            Guidance on product application, compatibility, order processing, and storage.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search questions or keywords (e.g. 'layering', 'AM/PM', 'shipping')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-black shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden shadow-2xs">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500">
              No matching questions found. Try a different keyword or contact our support team.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div key={faq.id} className="p-5 sm:p-6 transition-colors hover:bg-neutral-50/50">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-black' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions */}
        <div className="mt-12 p-6 sm:p-8 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-base font-bold text-white">Still have a specific question?</h4>
            <p className="text-xs text-neutral-400">Our customer support specialists are available Monday to Saturday.</p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-white text-black hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shrink-0"
          >
            Contact Care Team
          </button>
        </div>

      </div>
    </div>
  );
};
