import { Product } from "../types";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { getOptimizedImageUrl } from "../utils/imageUtils";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <article
      className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 overflow-hidden flex flex-col h-full relative cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
        {product.discount && (
          <span className="bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded shadow-sm">
            -{product.discount}%
          </span>
        )}
        {product.isFlashSale && !product.discount && (
          <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded shadow-sm">
            Sale
          </span>
        )}
      </div>

      {/* Floating Actions */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col gap-2 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`bg-white p-1.5 sm:p-2 rounded-full shadow-sm hover:shadow transition-all ${
            isInWishlist(product.id)
              ? "text-orange-500"
              : "text-gray-400 hover:text-indigo-600"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist(product.id) ? "fill-orange-500" : ""}`}
          />
        </button>
        <button
          className="bg-white p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 rounded-full shadow-sm hover:shadow transition-all hidden sm:block"
          aria-label="Quick view"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative pt-[100%] overflow-hidden bg-slate-50 rounded-t-2xl">
        <img
          src={getOptimizedImageUrl(product.image, 400)}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="text-[10px] sm:text-xs text-gray-500 mb-1 font-medium hidden sm:block">
          {product.category}
        </div>
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 leading-snug hover:text-indigo-600 transition-colors">
          <a href="#" onClick={(e) => e.preventDefault()}>
            {product.name}
          </a>
        </h3>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-lg font-bold text-gray-900 leading-none">
                ৳ {product.price.toFixed(2)}
              </span>
            </div>
            {product.originalPrice && (
              <div className="text-[10px] sm:text-xs text-gray-400 line-through mt-0.5 sm:mt-1">
                ৳ {product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
