import React, { useState } from 'react';
import { ARTICLES } from '../data/articles';
import { BookOpen, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Article } from '../types';

interface JournalViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-neutral-500 block mb-2">
            SKIN SCIENCE EDITORIAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            The NOVELIS Journal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            Demystifying cosmetic chemistry, active mechanisms, and everyday skin biology.
          </p>
        </div>

        {selectedArticle ? (
          /* Single Article View */
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-sm space-y-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </button>

            <div className="border-b border-neutral-100 pb-6">
              <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 font-semibold uppercase tracking-wider text-neutral-800 text-[10px]">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedArticle.readTime}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Ready to integrate this science into your routine?</span>
              <button
                onClick={() => {
                  if (selectedArticle.relatedProductSlug === 'duo') {
                    onNavigate('shop');
                  } else {
                    onNavigate('product-detail', selectedArticle.relatedProductSlug);
                  }
                }}
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <span>View Related Formula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Articles List */
          <div className="space-y-6">
            {ARTICLES.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 hover:border-neutral-400 cursor-pointer transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 font-semibold uppercase tracking-wider text-neutral-800 text-[10px]">
                    {art.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  {art.summary}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
