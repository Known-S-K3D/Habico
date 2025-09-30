import React from "react";
import "../styles/global.css";

const OrderConfirmation = ({ show, message }) => {
  if (!show) return null;
  return (
    <div className="order-confirm-card">
      <div className="order-confirm-content">
        <span role="img" aria-label="check" style={{ fontSize: 32 }}>✅</span>
        <div style={{ marginTop: 10, fontWeight: 600 }}>Order placed successfully!</div>
        <div style={{ fontSize: 14, color: "#4ade80" }}>{message}</div>
      </div>
    </div>
  );
};

export default OrderConfirmation;