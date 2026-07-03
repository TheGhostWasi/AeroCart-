import { useState, useMemo, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import CategoryGrid from "./components/CategoryGrid";
import FlashSale from "./components/FlashSale";
import ProductSection from "./components/ProductSection";
import JustForYouSection from "./components/JustForYouSection";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import ProductDetailPage from "./components/ProductDetailPage";
import SEO from "./components/SEO";
import CategoriesPage from "./components/CategoriesPage";
import ProductListingPage from "./components/ProductListingPage";
import BestSellersElectronicsPage from "./pages/BestSellersElectronicsPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import FaqPage from "./pages/FaqPage";
import CareersPage from "./pages/CareersPage";
import SellerCenterPage from "./pages/SellerCenterPage";
import StoresDirectoryPage from "./pages/StoresDirectoryPage";
import MyAccountPage from "./pages/MyAccountPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminPanel from "./pages/AdminPanel";
import { Product } from "./types";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./components/CheckoutPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginModal from "./components/LoginModal";

function ProductListingPageWrapper({
  onGoHome,
  onProductClick,
  onCategoryClick,
}: {
  onGoHome: () => void;
  onProductClick: (product: Product) => void;
  onCategoryClick: (slug: string, subCategory?: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get("sub");
  return (
    <ProductListingPage
      categorySlug={slug || null}
      subcategory={subcategory || null}
      onGoHome={onGoHome}
      onProductClick={onProductClick}
      onCategoryClick={onCategoryClick}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AuthProvider>
      <AppContent navigate={navigate} location={location} />
    </AuthProvider>
  );
}

function AppContent({ navigate, location }: { navigate: any, location: any }) {
  const { isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentRoute = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/product/")) return "product";
    if (path === "/categories") return "categories";
    if (path.startsWith("/category/")) return "category-view";
    if (path === "/checkout") return "checkout";
    if (path === "/login") return "login";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/careers") return "careers";
    if (path === "/seller-center") return "seller-center";
    if (path === "/stores") return "stores";
    if (path === "/my-account") return "my-account";
    if (path === "/privacy-policy") return "privacy-policy";
    return "home";
  }, [location.pathname]);

  const showBanner = useMemo(() => {
    return location.pathname === "/";
  }, [location.pathname]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (slug: string, subCategory?: string) => {
    if (subCategory) {
      navigate(`/category/${slug}?sub=${encodeURIComponent(subCategory)}`);
    } else {
      navigate(`/category/${slug}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewFlashSale = () => {
    navigate("/category/flash-sale");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllCategories = () => {
    navigate("/categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      const header = document.querySelector("header");
      if (element && header) {
        const headerHeight = header.getBoundingClientRect().height;
        const elementPosition = element.getBoundingClientRect().top;
        // The +1 accounts for the bottom border of the header to avoid a gap
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 1;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToSection(id);
        }
      }, 100);
    } else {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToSection(id);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">AeroCart Loading</p>
        </div>
      </div>
    );
  }

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Header
            onNavClick={handleNavClick}
            onProductClick={handleProductClick}
          />

          <main className="flex-grow flex flex-col">
            {/* SEO Header - Hidden visually but present for screen readers & SEO bots */}
            <h1 className="sr-only">
              AeroCart - Everything You Need, Delivered Fast
            </h1>

            {showBanner && <HeroSlider />}

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SEO 
                      title="Home" 
                      description="Welcome to AeroCart - Everything You Need, Delivered Fast. Browse our latest collections and best deals."
                    />
                    <CategoryGrid
                      onViewAll={handleViewAllCategories}
                      onCategoryClick={handleCategoryClick}
                    />
                  <div id="flash-sale">
                    <FlashSale
                      onProductClick={handleProductClick}
                      onViewAllOffers={handleViewFlashSale}
                    />
                  </div>
                  <div id="top-brands">
                    <ProductSection
                      title="Trending Products"
                      subtitle="Discover what others are buying right now"
                      viewAllLink="/trending"
                      onProductClick={handleProductClick}
                    />
                  </div>
                  <div className="bg-slate-50 h-8"></div> {/* Spacer */}
                  <div id="best-sellers">
                    <ProductSection
                      title="Best Sellers in Electronics"
                      subtitle="Top rated tech gear and gadgets"
                      viewAllLink="/best-sellers/electronics"
                      onProductClick={handleProductClick}
                      category="Electronics & Gadget"
                    />
                  </div>
                  <div id="just-for-you">
                    <JustForYouSection onProductClick={handleProductClick} />
                  </div>
                </>
              }
            />
            <Route
              path="/categories"
              element={
                <CategoriesPage
                  onGoHome={handleGoHome}
                  onCategoryClick={handleCategoryClick}
                />
              }
            />
            <Route
              path="/products"
              element={
                <ProductListingPage
                  categorySlug={null}
                  subcategory={null}
                  onGoHome={handleGoHome}
                  onProductClick={handleProductClick}
                  onCategoryClick={handleCategoryClick}
                />
              }
            />
            <Route
              path="/trending"
              element={
                <ProductListingPage
                  categorySlug="trending"
                  subcategory={null}
                  onGoHome={handleGoHome}
                  onProductClick={handleProductClick}
                  onCategoryClick={handleCategoryClick}
                />
              }
            />
            <Route
              path="/category/:slug"
              element={
                <ProductListingPageWrapper
                  onGoHome={handleGoHome}
                  onProductClick={handleProductClick}
                  onCategoryClick={handleCategoryClick}
                />
              }
            />
            <Route
              path="/best-sellers/electronics"
              element={
                <BestSellersElectronicsPage onProductClick={handleProductClick} />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  product={selectedProduct}
                  onGoHome={handleGoHome}
                  onCategoryClick={handleCategoryClick}
                  onProductClick={handleProductClick}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage
                    onGoHome={handleGoHome}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            <Route
              path="/return-policy"
              element={<ReturnPolicyPage />}
            />
            <Route
              path="/shipping-info"
              element={<ShippingInfoPage />}
            />
            <Route
              path="/faqs"
              element={<FaqPage />}
            />
            <Route
              path="/careers"
              element={<CareersPage />}
            />
            <Route
              path="/seller-center"
              element={<SellerCenterPage />}
            />
            <Route
              path="/stores"
              element={<StoresDirectoryPage />}
            />
            <Route
              path="/my-account"
              element={
                <ProtectedRoute>
                  <MyAccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="/admin"
              element={<AdminPanel />}
            />
          </Routes>
        </main>

        <Footer />
        <BottomNav
          onNavClick={handleNavClick}
          onViewAllCategories={handleViewAllCategories}
          currentRoute={currentRoute}
        />
        <CartDrawer />
        <LoginModal />
      </div>
    </CartProvider>
  </WishlistProvider>
);
}

