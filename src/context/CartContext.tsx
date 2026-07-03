import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types";
import { useAuth } from "./AuthContext";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageURL: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  syncCartWithBackend: (userId: string) => Promise<void>;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, setIsLoginModalOpen } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from local storage", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to local storage", e);
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.productId === product.id);
      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          quantity: newCart[existingIdx].quantity + quantity,
        };
        return newCart;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            title: product.name,
            price: product.price,
            quantity: quantity,
            imageURL: product.image,
          },
        ];
      }
    });
    // Open the Cart Drawer automatically so the user gets immediate visual confirmation
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const syncCartWithBackend = async (userId: string) => {
    // Simulated async operation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const payload = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        console.log(`[CartService] Syncing cart for user ${userId}:`, payload);
        resolve();
      }, 500);
    });
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartTax = Math.round(cartSubtotal * 0.05); // Estimated Tax of 5%
  const cartTotal = cartSubtotal + cartTax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCartWithBackend,
        cartCount,
        cartSubtotal,
        cartTax,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
