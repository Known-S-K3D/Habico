import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from localStorage when user logs in/out
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // ✅ Persist cart to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // ✅ Add product
  const addToCart = (product, quantity = 1) => {
    if (!user)
      return { ok: false, message: "Please login to add items to your cart." };

    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });

    return { ok: true, message: `${product.name} added to cart.` };
  };

  // ✅ Remove product
  const removeFromCart = (id) => {
    const product = cartItems.find((item) => item.id === id);
    if (!product) return { ok: false, message: "Item not found in cart." };

    setCartItems((prev) => prev.filter((item) => item.id !== id));
    return { ok: true, message: `${product.name} removed from your cart.` };
  };

  // ✅ Clear cart
  const clearCart = () => {
    if (!cartItems.length)
      return { ok: false, message: "Cart is already empty." };

    setCartItems([]);
    return { ok: true, message: "Your cart has been cleared." };
  };

  // ✅ Update quantity
  const updateQuantity = (id, quantity) => {
    const product = cartItems.find((item) => item.id === id);
    if (!product) return;

    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // ✅ Place order (with delay before clearing)
  const placeOrder = async () => {
    if (!user)
      return { ok: false, message: "Please login to place an order." };
    if (!cartItems.length)
      return { ok: false, message: "Your cart is empty." };

    // Show success message first
    const message = "Order placed successfully! 🎉";

    // Delay before clearing cart (2 seconds)
    setTimeout(() => {
      setCartItems([]);
    }, 2000);

    return { ok: true, message };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
