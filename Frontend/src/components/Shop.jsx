import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/product";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";

const CATEGORY_OPTIONS = ["All", "Inabel", "Ikat", "Kalinga"];
const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "₱0 - ₱500", min: 0, max: 500 },
  { label: "₱500 - ₱1000", min: 500, max: 1000 },
  { label: "₱1000+", min: 1000, max: Infinity },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      setMessage("Please login to add to cart.");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    addToCart({ ...product, quantity: Number(quantity) });
    setMessage("Added to cart!");
    setTimeout(() => setMessage(""), 1500);
    setSelected(null); // Auto-close modal after adding
  };

  const handleBuyNow = (product) => {
    if (!user) {
      setMessage("Please login to buy.");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    addToCart({ ...product, quantity: Number(quantity) });
    window.location.href = "/cart";
  };

  // Filtered products
  const filteredProducts = Array.isArray(products)
    ? products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || p.category === category;
        const range = PRICE_RANGES.find((r) => r.label === priceRange);
        const matchesPrice = range ? p.price >= range.min && p.price <= range.max : true;
        return matchesSearch && matchesCategory && matchesPrice;
      })
    : [];

  return (
    <div className="shop-container">
      {/* <h1 className="shop-title">Shop Products</h1> */}

      {/* Search + Filters */}
      <div className="shop-filters">
        
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shop-search"
        />

         <h1 className="shop-title">Filters</h1>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shop-select"
        >
          
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

         <h1 className="shop-title">Price Range</h1>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="shop-select"
        >
          {PRICE_RANGES.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <div className="shop-message-card">
          {message}
        </div>
      )}
      {loading && <div className="shop-message">Loading products...</div>}

      {/* Products Grid */}
      <div className="shop-grid">
        {!loading && filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div
              className="shop-card"
              key={product.id}
              onClick={() => {
                setSelected(product);
                setQuantity(1);
                setMessage("");
              }}
            >
              <img
                src={
                  product.image
                    ? `http://localhost:8000/storage/${product.image}`
                    : "https://via.placeholder.com/200x200?text=No+Image"
                }
                alt={product.name}
                className="shop-card-img"
              />
              <div className="shop-card-body">
                <div className="shop-card-name">{product.name}</div>
                <div className="shop-card-price">₱{product.price}</div>
              </div>
            </div>
          ))
        ) : !loading ? (
          <div className="shop-empty">No products found 😢</div>
        ) : null}
      </div>

      {/* Modal */}
      {selected && (
        <div className="shop-modal-bg" onClick={() => setSelected(null)}>
          <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={
                selected.image
                  ? `http://localhost:8000/storage/${selected.image}`
                  : "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt={selected.name}
              className="shop-modal-img"
            />
            <div className="shop-modal-content">
              <h2 className="shop-modal-title">{selected.name}</h2>
              <div className="shop-modal-price">₱{selected.price}</div>
              <div className="shop-modal-stock">
                Stock: {selected.stock > 0 ? selected.stock : "Out of stock"}
              </div>
              <div className="shop-modal-desc">{selected.description}</div>
              <div className="shop-modal-qty">
                <label>
                  Quantity:
                  <input
                    type="number"
                    min={1}
                    max={selected.stock}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(selected.stock, Number(e.target.value))))
                    }
                    className="shop-modal-qty-input"
                  />
                </label>
              </div>
              <div className="shop-modal-actions">
                <button
                  className="shop-btn"
                  disabled={selected.stock < 1}
                  onClick={() => handleAddToCart(selected)}
                >
                  Add to Cart
                </button>
                <button
                  className="shop-btn buy"
                  disabled={selected.stock < 1}
                  onClick={() => handleBuyNow(selected)}
                >
                  Buy Now
                </button>
                <button className="shop-btn cancel" onClick={() => setSelected(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;