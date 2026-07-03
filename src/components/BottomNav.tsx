import React from 'react';
import { Home, Grid, Zap, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  onNavClick?: (id: string) => void;
  onViewAllCategories?: () => void;
  currentRoute?: string;
}

export default function BottomNav({ onNavClick, onViewAllCategories, currentRoute }: BottomNavProps) {
  const { cartCount, setIsCartOpen } = useCart();
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavClick) onNavClick('home');
  };

  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewAllCategories) onViewAllCategories();
  };

  const handleFlashSaleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavClick) onNavClick('flash-sale');
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe" aria-label="Bottom Navigation">
      <div className="flex justify-around items-center h-16">
        <a href="#" onClick={handleHomeClick} className={`flex flex-col items-center justify-center w-full h-full ${currentRoute === 'home' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </a>
        <a href="#" onClick={handleCategoriesClick} className={`flex flex-col items-center justify-center w-full h-full ${currentRoute === 'categories' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>
          <Grid className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Categories</span>
        </a>
        <a href="#" onClick={handleFlashSaleClick} className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-indigo-600 transition-colors">
          <Zap className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Flash Sale</span>
        </a>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-indigo-600 transition-colors relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 mb-1" />
          {cartCount > 0 && (
            <span className="absolute top-2 right-1/4 translate-x-3 block h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold text-center rounded-full border-2 border-white leading-none flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>
        <Link to="/my-account" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-indigo-600 transition-colors">
          <User className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
    </nav>
  );
}
