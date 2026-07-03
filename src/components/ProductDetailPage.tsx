import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "./SEO";
import { getOptimizedImageUrl } from "../utils/imageUtils";
import {
  Star,
  MapPin,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { Product, Question } from "../types";
import { categories, products } from "../data";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";
import QASection from "./QASection";
import ReviewList from "./ReviewList";
import { productService } from "../services/productService";

const MOCK_PRODUCT = {
  id: "mock1",
  title: "Exclusive Embodary Three-Piece Salwar Kameez",
  rating: 4.8,
  reviews: 124,
  answeredQuestions: 14,
  price: 1250,
  originalPrice: 2500,
  discount: 50,
  brand: "Aero Boutique",
  colors: ["Purple", "Navy Blue", "Maroon", "Teal"],
  variants: ["Semi-stitched"],
  description:
    "Elevate your ethnic wardrobe with this Exclusive Embroidery Three-Piece Salwar Kameez. Crafted with premium quality georgette fabric, the kameez features intricate zari and thread embroidery work all over, giving it a rich and festive appeal. The matching bottom is made of soft and comfortable santoon material, while the dupatta is a beautifully embellished chiffon piece that completes the outfit perfectly. Ideal for weddings, parties, and festive occasions. Dry clean recommended for lasting vibrancy and texture.",
  images: [
    "https://images.unsplash.com/photo-1583391733958-650fac5ebf60?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1605704177587-f8239eb8ff58?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550614000-4b95dd5265ec?auto=format&fit=crop&q=80&w=800",
  ],
  category: "Fashion",
  subcategory: "Women's Collection",
};

export default function ProductDetailPage({
  product: propProduct,
  onGoHome,
  onCategoryClick,
  onProductClick,
}: {
  product?: Product | null;
  onGoHome?: () => void;
  onCategoryClick?: (slug: string, subCategory?: string) => void;
  onProductClick?: (product: Product) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, setIsLoginModalOpen } = useAuth();

  // State declarations
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [displayedRelatedCount, setDisplayedRelatedCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Review System State
  const [reviewsList, setReviewsList] = useState<{ id: number; name: string; stars: number; comment: string; date: string }[]>([
    { id: 1, name: "Ahmed Wasi", stars: 5, comment: "Excellent product, exactly as described. Quality is top-notch!", date: "2026-06-15" },
    { id: 2, name: "Farhan Alam", stars: 4, comment: "Very good, but shipping was a bit delayed.", date: "2026-06-10" },
    { id: 3, name: "Sakib Khan", stars: 5, comment: "Amazing fit and beautiful embroidery. Highly recommend!", date: "2026-06-05" },
    { id: 4, name: "Nusrat Jahan", stars: 3, comment: "Color is slightly different from the picture, but quality is okay.", date: "2026-06-01" },
    { id: 5, name: "Tanvir Hasan", stars: 5, comment: "Value for money. Great experience!", date: "2026-05-28" }
  ]);
  
  // Q&A System State
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 2,
      questionText: "Does it come with the matching bottom and dupatta?",
      askedBy: "Sumi",
      answerText: "Yes, this is a complete three-piece set including the kameez, matching bottom, and embellished chiffon dupatta.",
      createdAt: "2026-06-22"
    },
    {
      id: 1,
      questionText: "Is this product suitable for machine wash?",
      askedBy: "Rahat",
      answerText: "We recommend dry wash for lasting vibrancy and texture, as mentioned in the description.",
      createdAt: "2026-06-20"
    }
  ]);

  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const qnaSectionRef = useRef<HTMLDivElement>(null);

  const scrollToReviews = () => {
    if (reviewsSectionRef.current) {
      const headerOffset = 100; // Offset for the fixed header
      const elementPosition = reviewsSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToQnA = () => {
    if (qnaSectionRef.current) {
      const headerOffset = 100;
      const elementPosition = qnaSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const onReviewSubmitted = (newReview: any) => {
    setReviewsList([newReview, ...reviewsList]);
  };

  const onQuestionSubmitted = (newQuestion: Question) => {
    setQuestions([newQuestion, ...questions]);
  };

  // Compatible aliases for existing JSX elements
  const activeImage = selectedImage;
  const setActiveImage = setSelectedImage;

  // Force state refresh & load dynamic updates safely 
  useEffect(() => {
    const loadProductData = async () => {
      // 1. Lifecycle Clean-up: Reset state to initial / loading values
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      setIsLoading(true);
      setProduct(undefined);
      setSelectedImage("");
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
      setDisplayedRelatedCount(4);

      try {
        // 2. Async Fetching from Service
        const foundProduct = propProduct || await productService.fetchProductById(id || "");

        // 4. Robust State Update: Only update the state if foundProduct is defined
        if (foundProduct) {
          setProduct(foundProduct);

          // 3. Image Normalizer: Use suggested robust image mapping
          const resolvedImages = foundProduct?.images?.length
            ? foundProduct.images
            : [foundProduct?.image].filter(Boolean);
          
          const mainImg = (resolvedImages[0] as string) || "";
          setSelectedImage(mainImg);

          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          } else {
            setSelectedColor("");
          }

          if (foundProduct.variants && foundProduct.variants.length > 0) {
            setSelectedSize(foundProduct.variants[0]);
          } else {
            setSelectedSize("");
          }
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
        // Smoothly reset to top on product change
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    loadProductData();
  }, [id, propProduct]);

  // Defensive Loading screen: if loading, return early
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[50vh] text-center bg-white" id="product-detail-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-sm text-slate-500">Loading product details...</p>
      </div>
    );
  }

  // UI Safety Check: If product not found (undefined), show clear message
  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center p-12 min-h-[50vh] text-center bg-white rounded-lg shadow-sm max-w-2xl mx-auto my-8 border border-slate-100"
        id="product-not-found-debug-ui"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-2 font-sans">
          Product Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6 font-mono text-center max-w-md mx-auto">
          Debugging: Product ID "{id}" not found in list.
        </p>
        <button
          onClick={onGoHome}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer duration-200"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // 3. Image Normalizer: Use suggested robust image mapping
  const resolvedImages = product?.images?.length
    ? product.images
    : [product?.image].filter(Boolean);

  const finalImages = resolvedImages.length > 0 ? resolvedImages : MOCK_PRODUCT.images;

  // Construct fully-resolved display details
  const displayProduct = {
    ...MOCK_PRODUCT,
    id: product.id,
    title: product.name,
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    discount: product.discount || 0,
    rating: product.rating,
    reviews: product.reviews,
    brand: product.vendor,
    colors: product.colors || [],
    variants: product.variants || [],
    images: finalImages,
    category: product.category || "Fashion",
    subcategory: product.subcategory || "Women's Collection",
  };

  const averageRating = reviewsList.length > 0 
    ? (reviewsList.reduce((acc, curr) => acc + curr.stars, 0) / reviewsList.length).toFixed(1)
    : displayProduct.rating;
  
  const reviewCount = reviewsList.length > 0 ? reviewsList.length : displayProduct.reviews;


  // Find category slug from the data array based on name, fallback to a basic sanitize
  const foundCategory = categories.find(
    (c) => c.name === displayProduct.category,
  );
  const categorySlug = foundCategory
    ? foundCategory.slug
    : displayProduct.category
        .toLowerCase()
        .replace(/ & /g, "-")
        .replace(/ /g, "-");

  // Related products logic
  const allProducts = products;
  let categoryRelatedProducts: Product[] = [];
  let fallbackProducts: Product[] = [];

  try {
    categoryRelatedProducts = allProducts.filter(
      (p) =>
        p?.category === displayProduct?.category &&
        p?.id !== displayProduct?.id,
    );

    if (categoryRelatedProducts.length < 4) {
      fallbackProducts = allProducts
        .filter(
          (p) =>
            p?.category !== displayProduct?.category &&
            p?.id !== displayProduct?.id,
        )
        .slice(0, 4 - categoryRelatedProducts.length);
    }
  } catch (error) {
    console.error("Error filtering related products:", error);
  }

  const finalRelatedProducts = [
    ...categoryRelatedProducts,
    ...fallbackProducts,
  ];

  const handleLoadMore = () => {
    setDisplayedRelatedCount((prev) => prev + 4);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <div className="bg-slate-50 flex-grow py-6">
      <SEO 
        title={displayProduct.title}
        description={displayProduct.description.substring(0, 160)}
        ogTitle={displayProduct.title}
        ogDescription={displayProduct.description.substring(0, 160)}
        ogImage={displayProduct.images[0]}
        ogType="product"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onGoHome?.();
                }}
                className="hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick?.(categorySlug);
                }}
                className="hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {displayProduct.category}
              </button>
            </li>
            {displayProduct.subcategory && (
              <>
                <li>
                  <span className="mx-1">/</span>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onCategoryClick?.(
                        categorySlug,
                        displayProduct.subcategory,
                      );
                    }}
                    className="hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {displayProduct.subcategory}
                  </button>
                </li>
              </>
            )}
            <li>
              <span className="mx-1">/</span>
            </li>
            <li
              className="text-gray-900 font-medium truncate"
              aria-current="page"
            >
              {displayProduct.title}
            </li>
          </ol>
        </nav>

        {/* Main Product Container */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm sm:overflow-hidden overflow-visible mb-6 h-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
            {/* Left Column: Images */}
            <div className="w-full lg:col-span-4 p-3 sm:p-5 border-b md:border-b-0 md:border-r lg:border-r border-gray-100">
              {/* Main Image */}
              <div className="relative aspect-square max-h-[350px] mx-auto w-full bg-gray-50 rounded-lg overflow-hidden mb-3 border border-gray-100">
                <img
                  src={getOptimizedImageUrl(activeImage, 800)}
                  alt={displayProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 justify-center lg:justify-start">
                {displayProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-12 h-14 sm:w-16 sm:h-20 rounded-md border-2 overflow-hidden transition-all ${
                      activeImage === img
                        ? "border-indigo-600 scale-105"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <img
                      src={getOptimizedImageUrl(img, 200)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Column: Product Details */}
            <div
              style={{ width: "100%", height: "auto", paddingBottom: "50px" }}
              className="lg:col-span-5 p-3 sm:pb-5 block sm:flex sm:flex-col border-b lg:border-b-0 lg:border-r border-gray-100 min-w-0 clear-both"
            >
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-1.5 break-words">
                {displayProduct.title}
              </h1>

              {/* Ratings & Questions */}
              <div className="flex flex-wrap items-center gap-y-1 space-x-3 mb-1.5 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.round(Number(averageRating)) ? "fill-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={scrollToReviews}
                    className="text-indigo-600 hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    {averageRating} ({reviewCount} Reviews)
                  </button>
                </div>
                <span className="text-gray-300">|</span>
                <button
                  onClick={scrollToQnA}
                  className="text-indigo-600 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  {questions.length} Qs
                </button>
              </div>

              <div className="text-sm text-gray-500 mb-2">
                Brand:{" "}
                <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
                  {displayProduct.brand}
                </span>
              </div>

              {/* Price Block */}
              <div className="mb-3 bg-slate-50 p-2 sm:p-3 rounded-lg border border-slate-100 w-full block relative mt-3 h-auto">
                <div className="w-full clear-both block pt-1 relative">
                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 relative">
                    <span className="text-2xl sm:text-3xl font-bold text-indigo-600 leading-none">
                      ৳ {displayProduct.price.toFixed(2)}
                    </span>
                    {displayProduct.originalPrice > displayProduct.price && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          ৳ {displayProduct.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 bg-amber-200 px-2 py-0.5 rounded leading-none shrink-0">
                          -{displayProduct.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Variants */}
              <div className="mb-3">
                {displayProduct.colors.length > 0 && (
                  <div className="mb-2.5">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      Color:{" "}
                      <span className="text-gray-900 font-semibold">
                        {selectedColor}
                      </span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {displayProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`px-2.5 py-1 border rounded-md text-sm font-medium transition-all ${
                            selectedColor === color
                              ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                              : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {displayProduct.variants.length > 0 && (
                  <div className="mb-2.5">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {displayProduct.variants.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(s)}
                          className={`px-2.5 py-1 border rounded-md text-sm font-medium transition-all ${
                            selectedSize === s
                              ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                              : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white overflow-hidden">
                      <button
                        onClick={decreaseQuantity}
                        className="px-2.5 py-1 text-gray-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-8 text-center font-medium text-sm text-gray-900 border-x border-gray-200 py-1">
                        {quantity}
                      </div>
                      <button
                        onClick={increaseQuantity}
                        className="px-2.5 py-1 text-gray-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2 sm:gap-3 pt-2 w-full">
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setIsLoginModalOpen(true);
                    } else if (product) {
                      addToCart(product, quantity);
                      navigate("/checkout");
                    }
                  }}
                  className="flex-1 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold shadow-sm transition-colors text-sm sm:text-base cursor-pointer"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setIsLoginModalOpen(true);
                    } else if (product) {
                      addToCart(product, quantity);
                    }
                  }}
                  className="flex-1 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold shadow-sm transition-colors text-sm sm:text-base cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Right Column: Sidebar Specs */}
            <div className="w-full md:col-span-2 lg:col-span-3 p-3 sm:p-4 bg-slate-50/50 flex flex-col sm:flex-row lg:flex-col gap-4">
              {/* Delivery Info */}
              <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Delivery & Logistics
                  </h3>
                  <Truck className="w-4 h-4 text-indigo-600 opacity-20" />
                </div>

                {/* Inside Dhaka */}
                <div className="flex items-start gap-3 group">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] font-bold text-gray-900">Inside Dhaka</p>
                      <span className="text-[13px] font-extrabold text-indigo-600">৳{product.insideDhakaCharge ?? 60}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Estimated: {product.insideDhakaTime ?? "24 to 48 Hours"}
                    </p>
                  </div>
                </div>

                {/* Outside Dhaka */}
                <div className="flex items-start gap-3 pt-3 border-t border-gray-50">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] font-bold text-gray-900">Outside Dhaka</p>
                      <span className="text-[13px] font-extrabold text-purple-600">৳{product.outsideDhakaCharge ?? 160}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Estimated: {product.outsideDhakaTime ?? "3 to 7 Working Days"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-50 text-[11px] font-bold text-green-600 bg-green-50/50 -mx-4 px-4 py-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CASH ON DELIVERY AVAILABLE</span>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex justify-center items-center pt-2">
                <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-indigo-600 transition-colors group">
                  <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow border border-gray-100 text-current">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Block */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6">
          <div className="bg-slate-50 border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">
              Product Description of {displayProduct.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
              <p className="mb-4">{displayProduct.description}</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  <strong>Material:</strong> Premium Georgette and Santoon
                </li>
                <li>
                  <strong>Work:</strong> Heavy Embroidery with Zari details
                </li>
                <li>
                  <strong>Type:</strong> Semi-Stitched (Fits up to XXL)
                </li>
                <li>
                  <strong>Occasion:</strong> Party Wear, Wedding, Festival
                </li>
                <li>
                  <strong>Care:</strong> Dry Wash Recommended
                </li>
              </ul>
            </div>
          </div>
        </div>

        <QASection 
          productId={id || "default"}
          questions={questions}
          isAuthenticated={isAuthenticated}
          user={user}
          onQuestionSubmitted={onQuestionSubmitted}
          qnaSectionRef={qnaSectionRef}
        />

        <ReviewList 
          productId={id || "default"}
          reviewsList={reviewsList}
          averageRating={averageRating}
          reviewCount={reviewCount}
          isAuthenticated={isAuthenticated}
          user={user}
          reviewsSectionRef={reviewsSectionRef}
          onReviewSubmitted={onReviewSubmitted}
          onLoginRedirect={() => navigate("/login")}
        />

        {/* Related Products Section */}
        {finalRelatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                You may also like
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {finalRelatedProducts.slice(0, displayedRelatedCount).map((p) => (
                <div key={p.id}>
                  <ProductCard
                    product={p}
                    onClick={() => {
                      if (onProductClick) {
                        onProductClick(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {categoryRelatedProducts.length > displayedRelatedCount && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium rounded-full shadow-sm hover:shadow transition-all"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
