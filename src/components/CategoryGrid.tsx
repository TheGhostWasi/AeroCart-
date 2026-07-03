import { categories } from '../data';
import * as Icons from 'lucide-react';

export default function CategoryGrid({ onViewAll, onCategoryClick }: { onViewAll?: () => void, onCategoryClick?: (slug: string) => void }) {
  return (
    <section className="py-12 bg-white" aria-labelledby="category-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 id="category-heading" className="text-2xl font-bold text-gray-900 tracking-tight">Shop By Category</h2>
            <p className="text-sm text-gray-500 mt-1">Explore our wide range of collections</p>
          </div>
          <button onClick={onViewAll} className="hidden sm:inline-flex text-indigo-600 font-medium hover:text-indigo-700 text-sm transition-colors">
            View All Categories &rarr;
          </button>
          <button onClick={onViewAll} className="sm:hidden text-indigo-600 font-medium hover:text-indigo-700 text-xs transition-colors shrink-0 pl-2">
            View All &rarr;
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 md:flex md:overflow-x-auto md:pb-4 md:gap-4 md:snap-x md:hide-scrollbar lg:grid lg:grid-cols-8 md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none]">
          {categories.map((category) => {
            // @ts-ignore - Dynamic icon rendering for demo
            const IconPattern = Icons[category.icon.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')] || Icons.Box;
            
            return (
              <a 
                key={category.id} 
                href={`/category/${category.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onCategoryClick) onCategoryClick(category.slug);
                }}
                className="group w-full md:w-auto flex-shrink-0 md:snap-start flex flex-col items-center justify-center p-2 md:p-6 bg-white border border-gray-100 rounded-xl md:rounded-2xl hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300"
              >
                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-4 transition-colors ${category.bgColor || 'bg-slate-50 group-hover:bg-indigo-50'}`}>
                  {/* Using a generic icon approach since we don't have the exact SVGs, but representing the visual hierarchy */}
                  <div className={`w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${category.color || 'text-gray-600 group-hover:text-indigo-600'}`}>
                    <IconPattern strokeWidth={1.5} className="w-full h-full" />
                  </div>
                </div>
                <h3 className="text-[10px] md:text-sm font-semibold text-gray-900 text-center mb-1 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2">
                  {category.name}
                </h3>
                <span className="hidden md:inline-block text-xs text-gray-400 font-medium bg-slate-50 px-2 py-0.5 rounded-full group-hover:bg-indigo-50/50 transition-colors">
                  {category.itemCount.toLocaleString()} items
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
