import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";
import "../components/OrderConfirmation";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, placeOrder } = useCart();
  const { user } = useAuth();
  const [orderMsg, setOrderMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length ? 50 : 0;
  const total = subtotal + shipping;

  const handleOrder = () => {
    const res = placeOrder();
    setOrderMsg(res.message);
    if (res.ok) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2000);
    }
  };

  if (!user)
    return (
      <div className="cart-container cart-empty">
        <h2>Please login to view your cart.</h2>
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="cart-container cart-empty">
        <h2>Your cart is empty.</h2>
        <a href="/shop" className="cart-btn" style={{ marginTop: 16 }}>Go to Shop</a>
      </div>
    );

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ width: 120 }}>Price</th>
            <th style={{ width: 120 }}>Quantity</th>
            <th style={{ width: 120 }}>Total</th>
            <th style={{ width: 80 }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="cart-product-info">
                  <img
                    src={item.image ? `http://localhost:8000/storage/${item.image}` : "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="cart-product-img"
                  />
                  <div>
                    <div className="cart-product-name">{item.name}</div>
                    <div className="cart-product-model">{item.model}</div>
                  </div>
                </div>
              </td>
              <td>₱{item.price}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                  className="cart-qty-input"
                />
              </td>
              <td>₱{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <div>
          <strong>Subtotal:</strong> ₱{subtotal.toFixed(2)}
        </div>
        <div>
          <strong>Shipping:</strong> ₱{shipping.toFixed(2)}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          Total: ₱{total.toFixed(2)}
        </div>
      </div>
      <div className="cart-actions">
        <button className="cart-btn" onClick={handleOrder}>
          Place Order
        </button>
        <button className="cart-btn clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      {showConfirm && (
        <div className="order-confirm-card">
          <div className="order-confirm-content">
            <span role="img" aria-label="check" style={{ fontSize: 32 }}>✅</span>
            <div style={{ marginTop: 10, fontWeight: 600 }}>Order placed successfully!</div>
            <div style={{ fontSize: 14, color: "#4ade80" }}>{orderMsg}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;