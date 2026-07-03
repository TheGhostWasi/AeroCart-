import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShoppingCart, SlidersHorizontal, Star, X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { categories, flashSaleProducts, trendingProducts } from "../data";
import SEO from "./SEO";
import { getOptimizedImageUrl } from "../utils/imageUtils";

interface ProductListingPageProps {
  categorySlug: string | null;
  subcategory?: string | null;
  onGoHome: () => void;
  onProductClick: (product: Product) => void;
  onCategoryClick: (slug: string, subCategory?: string) => void;
}

export default function ProductListingPage({
  categorySlug,
  subcategory,
  onGoHome,
  onProductClick,
  onCategoryClick,
}: ProductListingPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const priceMinParam = searchParams.get("price_min") || "";
  const priceMaxParam = searchParams.get("price_max") || "";
  const pageParam = searchParams.get("page") || "1";
  const ratingMinParam = searchParams.get("rating_min") || "";
  const inStockParam = searchParams.get("in_stock") || "";
  const freeDeliveryParam = searchParams.get("free_delivery") || "";

  const [search, setSearch] = useState(searchParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  // Combine some products to create a demo listing
  const allProducts = [...flashSaleProducts, ...trendingProducts];

  let category = categories.find((c) => c.slug === categorySlug);
  if (categorySlug === "flash-sale") {
    category = {
      id: "flash",
      name: "Flash Sale",
      icon: "zap",
      slug: "flash-sale",
      itemCount: flashSaleProducts.length,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    };
  } else if (categorySlug === "trending") {
    category = {
      id: "trending",
      name: "Trending Products",
      icon: "trending-up",
      slug: "trending",
      itemCount: trendingProducts.length,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    };
  } else if (!categorySlug) {
    category = {
      id: "all",
      name: "All Products",
      icon: "shopping-bag",
      slug: "all",
      itemCount: allProducts.length,
      color: "text-slate-700",
      bgColor: "bg-slate-100",
    };
  } else if (!category) {
    category = categories[0];
  }

  // Choose products based on categorySlug
  let baseProducts = allProducts;
  if (categorySlug === "flash-sale") {
    baseProducts = flashSaleProducts;
  } else if (categorySlug === "trending") {
    baseProducts = trendingProducts;
  } else if (categorySlug && categorySlug !== "all") {
    const matchedCategory = categories.find((c) => c.slug === categorySlug);
    if (matchedCategory) {
      baseProducts = allProducts.filter(
        (p) => p.category === matchedCategory.name
      );
    }
  }

  // For demo, if products don't have exact category/subcategory, we just show some based on matching or randomly partition to show filtering effect
  let displayedProducts = baseProducts;

  if (subcategory) {
    // Exact match if possible, fallback to partitioning
    const subcategoryMatched = baseProducts.filter(
      (p) => p.subcategory && p.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
    if (subcategoryMatched.length > 0) {
      displayedProducts = subcategoryMatched;
    } else {
      displayedProducts = baseProducts.filter((p, i) => {
        const subLen = subcategory.length;
        return i % ((subLen % 3) + 2) === 0;
      });
    }
  }

  // Search filtering
  if (search) {
    displayedProducts = displayedProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Price filtering
  if (priceMinParam) {
    const minVal = parseFloat(priceMinParam);
    if (!isNaN(minVal)) {
      displayedProducts = displayedProducts.filter((p) => p.price >= minVal);
    }
  }
  if (priceMaxParam) {
    const maxVal = parseFloat(priceMaxParam);
    if (!isNaN(maxVal)) {
      displayedProducts = displayedProducts.filter((p) => p.price <= maxVal);
    }
  }

  // Customer Ratings filter
  if (ratingMinParam) {
    const minRating = parseFloat(ratingMinParam);
    if (!isNaN(minRating)) {
      displayedProducts = displayedProducts.filter((p) => p.rating >= minRating);
    }
  }

  // Offers & Delivery filters
  if (inStockParam === "true") {
    displayedProducts = displayedProducts.filter((p) => p.stock > 0);
  }
  if (freeDeliveryParam === "true") {
    // Define items above $50 as having free delivery
    displayedProducts = displayedProducts.filter((p) => p.price > 50);
  }

  // Pagination calculations: forced values for testing UI visualization
  const itemsPerPage = 12;
  const currentPageVal = parseInt(pageParam, 10);
  const activePage = isNaN(currentPageVal) || currentPageVal < 1 ? 1 : currentPageVal;
  const totalProductsCount = 40; // Forced simulation count of 40 products
  const totalPages = Math.ceil(totalProductsCount / itemsPerPage) || 1; // Evaluates to 4 pages
  const safePage = Math.min(activePage, totalPages);

  const startIdx = (activePage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedProducts = displayedProducts.slice(startIdx, endIdx);

  const handlePageChange = (pageNum: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (pageNum > 1) {
      newParams.set("page", pageNum.toString());
    } else {
      newParams.delete("page");
    }
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const headerTitle = search ? `Search Results for "${search}"` : (subcategory || category.name);

  // Filter actions
  const handlePriceFilter = (min: string, max: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (min) {
      newParams.set("price_min", min);
    } else {
      newParams.delete("price_min");
    }

    if (max) {
      newParams.set("price_max", max);
    } else {
      newParams.delete("price_max");
    }
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleRatingFilter = (rating: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (rating) {
      newParams.set("rating_min", rating);
    } else {
      newParams.delete("rating_min");
    }
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleToggleFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValue = searchParams.get(key);
    if (currentValue === "true") {
      newParams.delete(key);
    } else {
      newParams.set(key, "true");
    }
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams();
    if (search) {
      newParams.set("search", search);
    }
    // No page param added, meaning we default back to page 1
    setSearchParams(newParams);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filter Badges */}
      {(priceMinParam || priceMaxParam || ratingMinParam || inStockParam === "true" || freeDeliveryParam === "true") && (
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Filters</h3>
            <button
              onClick={handleClearFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 animate-fadeIn">
            {priceMinParam === "100" && priceMaxParam === "500" && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                ৳1,000 - ৳5,000
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handlePriceFilter("", "")} />
              </span>
            )}
            {priceMaxParam === "100" && !priceMinParam && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                Under ৳1,000
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handlePriceFilter("", "")} />
              </span>
            )}
            {priceMinParam === "500" && priceMaxParam === "1500" && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                ৳5,000 - ৳15,000
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handlePriceFilter("", "")} />
              </span>
            )}
            {priceMinParam === "1500" && !priceMaxParam && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                Over ৳15,000
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handlePriceFilter("", "")} />
              </span>
            )}
            {ratingMinParam && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                {ratingMinParam}★ & up
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handleRatingFilter("")} />
              </span>
            )}
            {inStockParam === "true" && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                In Stock
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handleToggleFilter("in_stock")} />
              </span>
            )}
            {freeDeliveryParam === "true" && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                Free Delivery
                <X className="h-3 w-3 cursor-pointer hover:text-indigo-950" onClick={() => handleToggleFilter("free_delivery")} />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="border-b border-gray-100 pb-5">
        <h3 className="text-xs font-bold text-gray-900 mb-3.5 uppercase tracking-wider">Price Range</h3>
        <div className="space-y-3">
          {[
            { label: "All Prices", min: "", max: "" },
            { label: "Under ৳1,000", min: "", max: "100" },
            { label: "৳1,000 - ৳5,000", min: "100", max: "500" },
            { label: "৳5,000 - ৳15,000", min: "500", max: "1500" },
            { label: "Over ৳15,000", min: "1500", max: "" },
          ].map((opt) => {
            const isActive =
              (!opt.min && !opt.max && !priceMinParam && !priceMaxParam) ||
              (opt.min === priceMinParam && opt.max === priceMaxParam);
            return (
              <label
                key={opt.label}
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-950 cursor-pointer select-none py-0.5"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handlePriceFilter(opt.min, opt.max)}
                    className="sr-only"
                  />
                  <div
                    className={`h-[18px] w-[18px] rounded border transition-all flex items-center justify-center ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100"
                        : "border-gray-300 bg-white hover:border-gray-450"
                    }`}
                  >
                    {isActive && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </div>
                <span className={isActive ? "font-semibold text-gray-950" : "font-normal"}>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Ratings */}
      <div className="border-b border-gray-100 pb-5">
        <h3 className="text-xs font-bold text-gray-900 mb-3.5 uppercase tracking-wider">Customer Ratings</h3>
        <div className="space-y-2">
          {[
            { label: "4.5★ & up", val: "4.5" },
            { label: "4.0★ & up", val: "4" },
            { label: "3.5★ & up", val: "3.5" },
          ].map((opt) => {
            const isActive = ratingMinParam === opt.val;
            return (
              <button
                key={opt.label}
                onClick={() => handleRatingFilter(isActive ? "" : opt.val)}
                className={`flex items-center gap-3 w-full text-left text-sm py-2 px-2.5 rounded-xl transition-colors cursor-pointer ${
                  isActive
                    ? "bg-indigo-50 text-indigo-800 font-semibold"
                    : "text-gray-700 hover:bg-slate-150"
                }`}
              >
                <div className="flex text-amber-400 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(parseFloat(opt.val))
                          ? "fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-600">& up</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Offers & Delivery */}
      <div className="pb-2">
        <h3 className="text-xs font-bold text-gray-900 mb-3.5 uppercase tracking-wider">Offers & Delivery</h3>
        <div className="space-y-3">
          {[
            { label: "In Stock Only", key: "in_stock", value: inStockParam === "true" },
            { label: "Free Delivery", key: "free_delivery", value: freeDeliveryParam === "true" },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-950 cursor-pointer select-none py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={opt.value}
                  onChange={() => handleToggleFilter(opt.key)}
                  className="sr-only"
                />
                <div
                  className={`h-[18px] w-[18px] rounded border transition-all flex items-center justify-center ${
                    opt.value
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100"
                      : "border-gray-300 bg-white hover:border-gray-450"
                  }`}
                >
                  {opt.value && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </div>
              <span className={opt.value ? "font-semibold text-gray-950" : "font-normal"}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 py-8">
      <SEO 
        title={headerTitle} 
        description={`Explore our collection of ${headerTitle} on AeroCart. Find the best deals and top quality products.`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-6 flex-wrap gap-y-2">
          <button
            onClick={onGoHome}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="mx-2">&gt;</span>
          <button
            onClick={() => onCategoryClick(category.slug)}
            className={`${subcategory ? "hover:text-indigo-600 transition-colors" : "text-gray-900"} cursor-pointer font-medium`}
          >
            {category.name}
          </button>
          {subcategory && (
            <>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-900 font-medium">{subcategory}</span>
            </>
          )}
        </nav>

        {/* Title / Header block */}
        <div className="mb-8 border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {headerTitle}
          </h1>
          <div className="flex items-center justify-between mt-3">
            <p className="text-gray-500 text-sm">
              {displayedProducts.length} Products Found
            </p>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Grid Split */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* PC Left Sidebar Filters */}
          <div className="hidden md:block md:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm self-start sticky top-24">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-5">
              <SlidersHorizontal className="h-4.5 w-4.5 text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900">Filters</h2>
            </div>
            <FilterContent />
          </div>

          {/* Product grid results */}
          <div className="md:col-span-3">
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={getOptimizedImageUrl(product.image, 400)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 md:p-4 flex flex-col flex-grow">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-base md:text-lg font-bold text-indigo-600">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                          <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 max-w-md mx-auto">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-base font-bold text-gray-900">
                  No products matched
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  No products in this category match your exact price or rating selectors. Try clearing your filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-5 inline-flex items-center justify-center bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            )}

            {/* Elegant Responsive Pagination Bar */}
            {totalPages > 1 && (
              <div id="product-pagination" className="mt-12 flex justify-center border-t border-gray-150 pt-8">
                <nav className="flex items-center gap-2 select-none" aria-label="Pagination Navigation">
                  {/* PREVIOUS BUTTON */}
                  <button
                    id="pagination-prev-btn"
                    onClick={() => activePage > 1 && handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                    className={`flex items-center justify-center rounded-xl p-3 md:px-4 md:py-2 text-sm font-semibold border transition-all ${
                      activePage === 1
                        ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-slate-50 hover:border-gray-400 active:scale-[0.97] cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                    <span className="hidden md:inline ml-1.5 text-xs font-semibold uppercase tracking-wider">Prev</span>
                  </button>

                  {/* PAGES LIST FOR DESKTOP (md and up) */}
                  <div className="hidden md:flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isPageActive = pageNum === activePage;
                      return (
                        <button
                          key={pageNum}
                          id={`pagination-page-${pageNum}`}
                          onClick={() => handlePageChange(pageNum)}
                          className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                            isPageActive
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 font-bold"
                              : "border border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:text-indigo-600 active:scale-[0.97]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* SIMPLIFIED PAGE STATUS FOR MOBILE SCREEN */}
                  <div className="md:hidden flex items-center">
                    <span className="text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-xl px-4 py-2.5 min-w-[90px] text-center shadow-sm uppercase tracking-wider">
                      Page {activePage} / {totalPages}
                    </span>
                  </div>

                  {/* NEXT BUTTON */}
                  <button
                    id="pagination-next-btn"
                    onClick={() => activePage < totalPages && handlePageChange(activePage + 1)}
                    disabled={activePage === totalPages}
                    className={`flex items-center justify-center rounded-xl p-3 md:px-4 md:py-2 text-sm font-semibold border transition-all ${
                      activePage === totalPages
                        ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-slate-50 hover:border-gray-400 active:scale-[0.97] cursor-pointer"
                    }`}
                  >
                    <span className="hidden md:inline mr-1.5 text-xs font-semibold uppercase tracking-wider">Next</span>
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer System */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            isMobileFilterOpen ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop with fade-in/out */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isMobileFilterOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Drawer styled with Evaly premium styling */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
              isMobileFilterOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ height: "80vh", maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Header: Non-scrollable */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4.5 bg-white rounded-t-3xl flex-none">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900">Filters</h2>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-gray-400 hover:text-gray-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Filters Content Area (No Content Cut-Off) */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <FilterContent />
            </div>

            {/* Sticky Action Footer: Non-scrollable */}
            <div className="flex-none border-t border-gray-100 p-4 px-6 bg-white flex gap-3 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
              <button
                onClick={handleClearFilters}
                className="flex-1 border border-gray-200 hover:border-gray-350 hover:bg-slate-50 text-gray-700 font-semibold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer text-center"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-[0.98] text-center cursor-pointer"
              >
                Show {displayedProducts.length} Results
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

