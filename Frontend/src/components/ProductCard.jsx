import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/global.css";

const STORAGE_URL = "http://localhost:8000/storage/";

const ProductCard = ({ product, onAddToCart, isLoggedIn }) => {
  const imageSrc = product.image
    ? `${STORAGE_URL}${product.image}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* 📦 Product Card Clickable Area */}
      <Link to={`/product/${product.id}`} className="block">
        {/* 🖼️ Product Image */}
        <div className="relative">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-56 object-cover object-center"
          />
        </div>

        {/* 📋 Product Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-primary font-bold text-xl">
              ₱{product.price}
            </span>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        </div>
      </Link>

      {/* 🛒 Add to Cart (stays outside the Link so clicking it won’t navigate) */}
      <div className="p-4 pt-0 flex justify-end">
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm flex items-center gap-1"
          onClick={() => isLoggedIn && onAddToCart(product)}
          disabled={!isLoggedIn}
          title={isLoggedIn ? "Add to cart" : "Login to add to cart"}
          style={{
            opacity: isLoggedIn ? 1 : 0.5,
            cursor: isLoggedIn ? "pointer" : "not-allowed",
          }}
        >
          <FiShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
