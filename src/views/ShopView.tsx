import React, { useState, useMemo } from 'react';
import { PRODUCTS, BUNDLE_PAIR } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Search, Filter, Sparkles, Check } from 'lucide-react';

interface ShopViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = ['All', 'Serums', 'Acne Care', 'Brightening', 'Hydration'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory ||
        product.tags.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (selectedCategory === 'Serums'); // both are serums

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.concentration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.keyIngredient.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-12 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-neutral-500 block mb-1">
            TARGETED CLINICAL FORMULATIONS
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Skincare Formulas
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
                Minimalist, high-potency actives engineered with balanced carrier bases. 30 ml amber and dark glass droppers.
              </p>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              Showing {filteredProducts.length} formulas
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="shop-search-input"
                type="text"
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-black font-medium text-neutral-700"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center my-8">
            <p className="text-sm font-bold text-neutral-900">No formulas found matching your filter</p>
            <p className="text-xs text-neutral-500 mt-1">Try clearing your search query or selecting &quot;All&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={(slug) => onNavigate('product-detail', slug)}
              />
            ))}

            {/* Bundle card if in All or Serums */}
            {(selectedCategory === 'All' || selectedCategory === 'Serums') && !searchQuery && (
              <article className="flex flex-col bg-white rounded-xl border-2 border-neutral-900 overflow-hidden shadow-sm justify-between">
                <div className="relative aspect-square overflow-hidden bg-neutral-100 p-4 flex items-center justify-center">
                  <span className="absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-black text-white">
                    DUO SYSTEM
                  </span>
                  <img
                    src={BUNDLE_PAIR.image}
                    alt={BUNDLE_PAIR.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 font-semibold mb-1">
                      Salicylic 2% + Niacinamide 10%
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-neutral-900">
                      {BUNDLE_PAIR.name}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      Complete daily clarifying and hydrating pairing for blemish-prone and uneven skin.
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-neutral-900">
                          ₹{BUNDLE_PAIR.price}
                        </span>
                        <span className="text-xs text-neutral-400 line-through">
                          ₹{BUNDLE_PAIR.originalPrice}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold">
                        Save ₹299
                      </span>
                    </div>

                    <button
                      id="shop-add-duo-btn"
                      onClick={() => {
                        addToCart(PRODUCTS[0], 1);
                        addToCart(PRODUCTS[1], 1);
                      }}
                      className="w-full py-2.5 px-4 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2"
                    >
                      ADD DUO TO CART
                    </button>
                  </div>
                </div>
              </article>
            )}
          </div>
        )}

        {/* Routine Banner */}
        <div className="mt-16 bg-neutral-900 text-white rounded-2xl p-8 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-400">
              CONFUSED ABOUT INGREDIENT COMPATIBILITY?
            </span>
            <h3 className="text-xl font-bold text-white">
              Take our 60-second Skincare Diagnostic Quiz
            </h3>
            <p className="text-xs text-neutral-400 max-w-lg">
              Answer 4 questions regarding your skin type, breakouts, and routine preference to receive your exact formula recommendation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('routine-finder')}
            className="px-6 py-3 bg-white hover:bg-neutral-100 text-black text-xs font-bold uppercase tracking-[0.18em] rounded-xl shrink-0 transition-colors"
          >
            Start Routine Quiz
          </button>
        </div>

      </div>
    </div>
  );
};
