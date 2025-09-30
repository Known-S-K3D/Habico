import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";  

const presetAmounts = [50, 100, 200, 500, 1000];

const DonationForm = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Please login to make a donation.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage("Please enter a valid donation amount.");
      return;
    }

    // show confirmation modal instead of donating immediately
    setShowConfirm(true);
  };

  const handlePreset = (val) => {
    setAmount(val);
    setMessage("");
  };

  const confirmDonation = () => {
    setIsDonating(true);

    // simulate backend call (replace with real API)
    setTimeout(() => {
      setIsDonating(false);
      setShowConfirm(false);
      setMessage(`🎉 Thank you for your donation of ₱${Number(amount).toFixed(2)}!`);
      setAmount("");
    }, 1200);
  };

  const cancelDonation = () => {
    setShowConfirm(false);
  };

  return (
    <div className="donation-form-container">
      <h2 className="donation-title">Support Habico</h2>

      <div className="preset-container">
        {presetAmounts.map((val) => (
          <button
            key={val}
            type="button"
            className={`donation-preset-btn ${amount == val ? "active" : ""}`}
            onClick={() => handlePreset(val)}
          >
            ₱{val}
          </button>
        ))}
      </div>

      <form className="donation-form" onSubmit={handleSubmit}>
        <label className="donation-label">
          Donation Amount (₱)
          <input
            type="number"
            min="1"
            step="any"
            className="donation-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </label>
        <button className="donation-btn" type="submit">
          Donate
        </button>
      </form>

      {message && <div className="donation-message">{message}</div>}

      {showConfirm && (
        <div className="donation-confirm-overlay">
          <div className="donation-confirm-box">
            <h3>Confirm Donation</h3>
            <p>Are you sure you want to donate <strong>₱{Number(amount).toFixed(2)}</strong>?</p>
            <div className="donation-confirm-actions">
              <button
                className="donation-btn confirm"
                onClick={confirmDonation}
                disabled={isDonating}
              >
                {isDonating ? "Processing..." : "Yes, Donate"}
              </button>
              <button className="donation-btn cancel" onClick={cancelDonation}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
