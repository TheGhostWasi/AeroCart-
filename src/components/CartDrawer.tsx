import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsLoginModalOpen } = useAuth();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    cartTax,
    cartTotal,
  } = useCart();

  // Route to the checkout page and close the side drawer
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? "visible" : "invisible"
      }`}
      id="shopping-cart-drawer-overlay"
    >
      {/* Dark semi-transparent backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
        id="cart-backdrop"
      />

      {/* Cart Container: Slides from the right side */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="cart-drawer-container"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-150 flex-none bg-slate-50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-indigo-650" />
            <h2 className="text-base font-bold text-gray-900 font-sans">
              Shopping Cart
            </h2>
            <span className="bg-indigo-50 text-indigo-750 text-xs font-semibold px-2 py-0.5 rounded-full select-none">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 hover:bg-slate-200 text-gray-400 hover:text-gray-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
            id="cart-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Cart Content List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-350 mb-4 border border-slate-100">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-500 max-w-[240px] mb-6">
                Looks like you haven't added anything to your cart yet. Browse our products to find best deals!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all"
                id={`cart-item-${item.productId}`}
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-none bg-slate-50 border border-slate-100">
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info and Controllers */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-gray-900 truncate pr-2 font-sans">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-1 hover:text-red-500 text-gray-400 rounded transition-colors cursor-pointer"
                      aria-label="Remove item"
                      title="Remove from cart"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Size and Pricing */}
                    <div className="text-xs">
                      <span className="font-bold text-indigo-600">
                        ৳ {item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Step Adjuster */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 px-2.5 text-gray-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors disabled:opacity-40"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 px-2.5 text-gray-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky Cart Summary & Checkout: Non-scrollable Footer */}
        {cartItems.length > 0 && (
          <div className="flex-none border-t border-gray-150 p-6 bg-slate-50 space-y-4">
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">
                  ৳ {cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Estimated Tax (5%)</span>
                <span className="font-semibold text-gray-800">
                  ৳ {cartTax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2.5 border-t border-gray-200">
                <span className="font-extrabold text-gray-900 uppercase tracking-wide text-xs">
                  Grand Total
                </span>
                <span className="text-base font-extrabold text-indigo-600">
                  ৳ {cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCheckout}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
