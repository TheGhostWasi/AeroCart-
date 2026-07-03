import {
  ShoppingCart,
  Search,
  User,
  Menu,
  Phone,
  HelpCircle,
  ChevronDown,
  Monitor,
  MapPin,
  ArrowUpRight,
  X,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { flashSaleProducts, trendingProducts, categories } from "../data";
import { Link, useNavigate } from "react-router-dom";

import { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function Header({
  onNavClick,
  onProductClick,
}: {
  onNavClick?: (id: string) => void;
  onProductClick?: (product: Product) => void;
}) {
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleNavClickInternal = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(id);
    } else {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const topSearches = ["Smart Watch", "Headphones", "Wallet"];

  const allSuggestions = useMemo(() => {
    return Array.from(
      new Set([
        ...categories.map((c) => c.name),
        ...flashSaleProducts.map((p) => p.name),
        ...trendingProducts.map((p) => p.name),
      ]),
    );
  }, []);

  const filteredSuggestions = allSuggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span className="text-gray-600">{text}</span>;
    const regex = new RegExp(
      `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);
    return (
      <span className="text-gray-600">
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={i} className="font-bold text-gray-900">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearchFocused(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <header
      className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      role="banner"
    >
      {/* Top Utility Bar */}
      <div className="bg-slate-50 border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs text-gray-500 font-medium">
            <div className="flex space-x-6">
              <a
                href="#"
                className="flex items-center hover:text-indigo-600 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                Customer Support
              </a>
              <a
                href="#"
                className="flex items-center hover:text-indigo-600 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 mr-1" />
                Track Order
              </a>
              <Link
                to="/seller-center"
                className="flex items-center hover:text-indigo-600 transition-colors"
              >
                Seller Center
              </Link>
            </div>
            <div className="flex space-x-6">
              <button
                className="flex items-center hover:text-indigo-600 transition-colors"
                aria-haspopup="true"
              >
                English <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              <button
                className="flex items-center hover:text-indigo-600 transition-colors"
                aria-haspopup="true"
              >
                BDT <ChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header: 2 Row Layout */}
        <div className="flex flex-col md:flex-row justify-between md:items-center py-3 md:py-5 gap-3 md:gap-8">
          {/* Row 1/Desktop Top: Logo & Icons */}
          <div className="flex justify-between items-center w-full md:w-auto">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center flex-shrink-0">
              <button
                className="md:hidden p-2 -ml-2 mr-1 text-gray-800"
                aria-label="Open Menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 group"
                aria-label="AeroCart Home"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 text-white rounded-lg md:rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-sm">
                  <ShoppingCart
                    className="w-4 h-4 md:w-6 md:h-6"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="font-bold text-xl md:text-2xl tracking-tight text-gray-900">
                  Aero<span className="text-indigo-600">Cart</span>
                </span>
              </Link>
            </div>

            {/* Mobile Actions Overlay (Row 1 Right) */}
            <div className="flex items-center space-x-2 md:hidden">
              <Link
                to="/my-account"
                className="p-2 text-gray-800 hover:text-indigo-600"
                aria-label="Account"
              >
                <User className="w-6 h-6" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-800 hover:text-indigo-600 relative cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0 block h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold text-center rounded-full border-2 border-white leading-none flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar - Full width on mobile (Row 2), central on desktop */}
          <div className="flex-1 w-full max-w-3xl relative z-50">
            <div className="relative w-full group">
              <form
                role="search"
                onSubmit={handleSearchSubmit}
                className="flex w-full items-center relative z-20"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="search"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="block w-full pl-10 pr-24 py-2.5 md:py-3 border border-gray-200 rounded-full leading-5 bg-slate-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all md:text-sm text-base relative z-10"
                  placeholder="Search products, brands..."
                  required
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 md:px-6 bg-indigo-600 text-white font-medium text-sm rounded-full hover:bg-indigo-700 transition-colors focus:outline-none z-20"
                >
                  Search
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-[calc(100%-1.5rem)] pt-8 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-10">
                  {!searchQuery ? (
                    <div className="p-4 border-b border-gray-50 bg-slate-50/50">
                      <h3 className="text-xs font-semibold text-gray-500 mb-3 ml-1">
                        Top Search
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {topSearches.map((tag, idx) => (
                          <button
                            key={idx}
                            onMouseDown={(e) => e.preventDefault()}
                            onTouchStart={(e) => e.preventDefault()}
                            onClick={() => handleSearch(tag)}
                            className="bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto py-2">
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, idx) => (
                          <li key={idx}>
                            <button
                              className="w-full text-left px-5 py-2.5 hover:bg-slate-50 flex items-center justify-between group/item transition-colors"
                              onMouseDown={(e) => e.preventDefault()}
                              onTouchStart={(e) => e.preventDefault()}
                              onClick={() => handleSearch(suggestion)}
                            >
                              <span className="text-sm">
                                {highlightText(suggestion, searchQuery)}
                              </span>
                              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover/item:text-indigo-400 transition-colors" />
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-5 py-4 text-sm text-gray-500 text-center">
                          No matching results found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/my-account"
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-all flex flex-col items-center gap-1"
              aria-label="Account"
            >
              <User className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-all relative flex flex-col items-center gap-1 group cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover:fill-indigo-50" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 block h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold text-center rounded-full border-2 border-white leading-none flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      <nav
        className="hidden md:block bg-white border-t border-gray-100"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12 items-center">
            <div className="flex items-center space-x-8">
              <div className="relative group/category h-full flex items-center">
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition">
                  <Menu className="w-4 h-4" />
                  All Categories
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {/* Mega Menu Dropdown Mock */}
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 rounded-b-lg py-2 opacity-0 invisible group-hover/category:opacity-100 group-hover/category:visible transition-all duration-200 z-50">
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 hover:text-indigo-600 text-gray-600 font-medium text-sm transition-colors"
                  >
                    <Monitor className="w-4 h-4" /> Electronics
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 hover:text-indigo-600 text-gray-600 font-medium text-sm transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Groceries
                  </a>
                  {/* More categories would go here */}
                </div>
              </div>

              <div className="flex space-x-6">
                <a
                  href="#"
                  onClick={(e) => handleNavClickInternal(e, "home")}
                  className="text-gray-900 border-b-2 border-indigo-600 font-medium text-sm py-[14px]"
                >
                  Home
                </a>
                <a
                  href="#"
                  onClick={(e) => handleNavClickInternal(e, "flash-sale")}
                  className="text-gray-600 hover:text-indigo-600 font-medium text-sm py-[14px] transition-colors flex items-center gap-1"
                >
                  Flash Sale{" "}
                  <span className="bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                    Hot
                  </span>
                </a>
                <a
                  href="#"
                  onClick={(e) => handleNavClickInternal(e, "best-sellers")}
                  className="text-gray-600 hover:text-indigo-600 font-medium text-sm py-[14px] transition-colors"
                >
                  Best Sellers
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Phone className="w-4 h-4" />
              Need Help?{" "}
              <a
                href="tel:+8801234567890"
                className="text-indigo-600 font-bold ml-1"
              >
                16290
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navigation - Mobile (Horizontal Scroll) */}
      <div className="md:hidden border-t border-gray-100 bg-white">
        <nav
          className="flex flex-row overflow-x-auto whitespace-nowrap hide-scrollbar px-4 py-2 gap-4 items-center"
          aria-label="Mobile Navigation"
        >
          <button
            onClick={(e) => handleNavClickInternal(e, "home")}
            className="text-gray-900 font-medium text-sm py-1.5 border-b-2 border-indigo-600 shrink-0"
          >
            Home
          </button>
          <button
            onClick={(e) => handleNavClickInternal(e, "flash-sale")}
            className="text-gray-600 hover:text-indigo-600 font-medium text-sm py-1.5 flex items-center gap-1 shrink-0"
          >
            Flash Sale{" "}
            <span className="bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
              Hot
            </span>
          </button>
          <button
            onClick={(e) => handleNavClickInternal(e, "best-sellers")}
            className="text-gray-600 hover:text-indigo-600 font-medium text-sm py-1.5 shrink-0"
          >
            Best Sellers
          </button>
        </nav>
      </div>
    </header>
  );
}
