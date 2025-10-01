import React, { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/global.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar" aria-label="Primary">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          Habico
        </Link>
      </div>

      {/* Hamburger Toggle (Mobile) */}
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/shop"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        
      </div>

      {/* Right Side (Cart + User) */}
      <div className="navbar-right">
        {/* Cart */}
        <button
          type="button"
          className="navbar-icon-btn"
          aria-label="View cart"
          title="Cart"
          onClick={() => {
            navigate("/cart");
            setMenuOpen(false);
          }}
        >
          <ShoppingCart size={18} />
          <span className="navbar-cart-badge" aria-hidden>
            {cartItems.length}
          </span>
        </button>

        {/* User Dropdown */}
        <div className="navbar-user-dropdown">
          <button
            className="navbar-icon-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label="User menu"
          >
            <User size={20} />
          </button>

          {userMenuOpen && (
            <div className="user-dropdown-menu">
              {user ? (
                <>
                  <span className="user-dropdown-name">
                    {user.name || user.email}
                  </span>
                  {/* <Link
                    to="/profile"
                    className="user-dropdown-link"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link> */}
                  <button
                    className="user-dropdown-link logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="user-dropdown-link"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="user-dropdown-link"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
         {user?.role === "admin" && (
                <Link
                  to="/admin/home"
                  className="navbar-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
      </div>
    </nav>
  );
};

export default Navbar;
