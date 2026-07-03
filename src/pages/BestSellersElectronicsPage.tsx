import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { products as allMockProducts } from "../data";

interface BestSellersElectronicsPageProps {
  onProductClick: (product: Product) => void;
}

export default function BestSellersElectronicsPage({ onProductClick }: BestSellersElectronicsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin Panel Preparation (Dynamic State)
  // Simulate an API fetch for the "Best Sellers in Electronics" collection
  useEffect(() => {
    setLoading(true);
    // In the future, this would be: fetch('/api/collections/best-sellers-electronics')
    const fetchMockData = async () => {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const electronicsProducts = allMockProducts.filter(p => p.category === "Electronics & Gadget").slice(0, 20);
      
      setProducts(electronicsProducts);
      setLoading(false);
    };

    fetchMockData();
  }, []);

  return (
    <div className="bg-gray-50 flex-grow pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-900 font-medium" aria-current="page">
              Best Sellers in Electronics
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Best Sellers in Electronics</h1>
          <p className="mt-2 text-gray-600">Top rated tech gear and gadgets</p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
