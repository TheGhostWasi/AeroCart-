import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { products } from '../data';

interface JustForYouSectionProps {
  onProductClick?: (product: Product) => void;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JustForYouSection({ onProductClick }: JustForYouSectionProps) {
  // We use useMemo to only shuffle once when component mounts
  const allShuffled = useMemo(() => shuffleArray(products || []), []);
  
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const displayedProducts = allShuffled.slice(0, displayCount);
  const hasMore = displayCount < allShuffled.length;

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate network delay to make it feel like "fetching"
    setTimeout(() => {
      setDisplayCount(prev => prev + 8);
      setLoading(false);
    }, 600);
  };

  return (
    <section className="py-12 bg-white" aria-labelledby="heading-just-for-you">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <div>
            <h2 id="heading-just-for-you" className="text-2xl font-bold text-gray-900 tracking-tight">Just For You</h2>
            <p className="text-sm text-gray-500 mt-1">Discover what you might like</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
