import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  const { addToCart, setQuickViewProduct, items } = useCart();

  const isItemInCart = items.some((item) => item.product.id === product.id);

  return (
    <article
      id={`product-card-${product.slug}`}
      className="group flex flex-col bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 shadow-2xs hover:shadow-md"
    >
      {/* Product Image Area */}
      <div className="relative w-full aspect-square bg-gray-50/80 overflow-hidden flex items-center justify-center p-5">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 bg-[#8A9A5B] text-white">
            {product.size} • {product.concentration}
          </span>
        </div>

        {/* Quick View Button on Desktop Hover */}
        <button
          id={`quick-view-btn-${product.slug}`}
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 text-neutral-700 hover:text-black hover:bg-white shadow-2xs"
          title="Quick preview"
          aria-label={`Quick preview ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Clickable Image */}
        <div
          onClick={() => onViewProduct(product.slug)}
          className="cursor-pointer w-full h-full flex items-center justify-center"
        >
          <img
            src={product.images.primary}
            alt={product.fullName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Key Active */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1.5">
            <span>{product.category}</span>
            <span>pH {product.bottleSpecs.ph}</span>
          </div>

          {/* Product Name */}
          <button
            id={`product-name-link-${product.slug}`}
            onClick={() => onViewProduct(product.slug)}
            className="text-left w-full focus:outline-none group/title"
          >
            <h3 className="text-base font-light tracking-wide text-neutral-900 group-hover/title:text-neutral-700 transition-colors uppercase">
              NOVELIS {product.name}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {product.concentration}
            </p>
          </button>

          {/* Short Description */}
          <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Benefits List */}
          <ul className="mt-3 space-y-1 text-[11px] text-gray-600 border-t border-gray-100 pt-2.5">
            {product.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#8A9A5B]">•</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-5 pt-3.5 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-neutral-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A9A5B] font-bold bg-emerald-50 px-2 py-0.5">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`view-product-btn-${product.slug}`}
              type="button"
              onClick={() => onViewProduct(product.slug)}
              className="w-full py-2.5 px-3 border border-gray-200 hover:border-black text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-800 hover:text-black transition-colors text-center"
            >
              View
            </button>

            <button
              id={`add-to-cart-btn-${product.slug}`}
              type="button"
              onClick={() => addToCart(product, 1)}
              className="w-full py-2.5 px-3 bg-black hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-98"
            >
              {isItemInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Add More</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

