import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage for the logged-in user
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`cart_${user.email}`);
      setCartItems(saved ? JSON.parse(saved) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Save cart to localStorage when cartItems change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (product) => {
    if (!user) return false;
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx > -1) {
        // Update quantity if already in cart
        const updated = [...prev];
        updated[idx].quantity += product.quantity;
        return updated;
      }
      return [...prev, { ...product }];
    });
    return true;
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCartItems([]);
  const updateQuantity = (id, qty) =>
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );

  // Simulate placing an order
  const placeOrder = () => {
    if (!user) return { ok: false, message: "Please login to place an order." };
    if (!cartItems.length) return { ok: false, message: "Cart is empty." };
    clearCart();
    return { ok: true, message: "Order placed! Thank you for shopping." };
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