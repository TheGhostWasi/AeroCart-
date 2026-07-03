import { trendingProducts, products as allProducts } from '../data';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  onProductClick?: (product: Product) => void;
  category?: string;
}

export default function ProductSection({ title, subtitle, viewAllLink = '#', onProductClick, category }: ProductSectionProps) {
  const displayProducts = category 
    ? (allProducts || []).filter(p => p.category === category).slice(0, 10) 
    : (trendingProducts || []);

  return (
    <section className="py-12 bg-white" aria-labelledby={`heading-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <div>
            <h2 id={`heading-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <Link 
            to={viewAllLink === '#' ? '/categories' : viewAllLink} 
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex text-indigo-600 font-medium hover:text-indigo-700 text-sm transition-colors whitespace-nowrap"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
