import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import "../styles/Donation.css";

const presetAmounts = [100, 200, 500, 1000, 5000];

const DonationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  // Transparency: Fund status (should be fetched from backend in real app)
  const [goalAmount] = useState(500000);
  const [currentFund, setCurrentFund] = useState(18500);
  const remainingFund = goalAmount - currentFund;

  useEffect(() => {
    // Simulate fetch from backend later
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      // 🔁 Redirect directly to login page
      navigate("/login", { replace: true });
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage("Please enter a valid donation amount.");
      return;
    }

    setShowConfirm(true);
  };

  const handlePreset = (val) => {
    setAmount(val);
    setMessage("");
  };

  const confirmDonation = () => {
    setIsDonating(true);

    // Simulate backend donation
    setTimeout(() => {
      const donationValue = Number(amount);
      setCurrentFund((prev) => prev + donationValue);
      setIsDonating(false);
      setShowConfirm(false);
      setMessage(
        `🎉 Thank you for your donation of ₱${donationValue.toFixed(
          2
        )} to the Chumma-ay Weavers and Bead-makers Association!`
      );
      setAmount("");
    }, 1200);
  };

  const cancelDonation = () => {
    setShowConfirm(false);
  };

  return (
    <div className="donation-form-container">
      <h2 className="donation-title">Support the Weaver of Cordillera Region</h2>

      {/* Transparency Section */}
      <div className="fund-status-box">
        <h3>Chumma-ay Weavers and Bead-makers Association — Lubuagan, Kalinga</h3>
        <p><strong>Goal:</strong> ₱{goalAmount.toLocaleString()}</p>
        <p><strong>Collected:</strong> ₱{currentFund.toLocaleString()}</p>
        <p><strong>Remaining:</strong> ₱{remainingFund > 0 ? remainingFund.toLocaleString() : 0}</p>

        <div className="fund-progress-bar">
          <div
            className="fund-progress-fill"
            style={{
              width: `${Math.min((currentFund / goalAmount) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Preset Buttons */}
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

      {/* Donation Form */}
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="donation-confirm-overlay">
          <div className="donation-confirm-box">
            <h3>Confirm Donation</h3>
            <p>
              Are you sure you want to donate{" "}
              <strong>₱{Number(amount).toFixed(2)}</strong>?
            </p>
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
