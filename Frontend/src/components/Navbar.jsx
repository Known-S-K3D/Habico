import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
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
  const [storyOpen, setStoryOpen] = useState(false);

  // Refs for dropdown containers
  const storyRef = useRef(null);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/", { replace: true });
  };

  // ✅ Close Story dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (storyRef.current && !storyRef.current.contains(event.target)) {
        setStoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        <Link to="/shop" className="navbar-link" onClick={() => setMenuOpen(false)}>
          Shop
        </Link>

        <Link to="/about" className="navbar-link" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        {/* 🧵 Story Dropdown */}
        <div ref={storyRef} className="navbar-dropdown">
          <button
            className="navbar-link flex items-center gap-1"
            onClick={() => setStoryOpen((prev) => !prev)}
          >
            Story <ChevronDown size={16} />
          </button>

          {storyOpen && (
            <div className="dropdown-menu">
              <Link
                to="/story/ikat"
                className="dropdown-item"
                onClick={() => setStoryOpen(false)}
              >
                Ikat Story
              </Link>
              <Link
                to="/story/inabel"
                className="dropdown-item"
                onClick={() => setStoryOpen(false)}
              >
                Inabel Story
              </Link>
              <Link
                to="/story/kalinga"
                className="dropdown-item"
                onClick={() => setStoryOpen(false)}
              >
                Kalinga Story
              </Link>
            </div>
          )}
        </div>
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

        {/* Admin Link */}
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
