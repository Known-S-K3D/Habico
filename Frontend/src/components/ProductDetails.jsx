import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const STORAGE_URL = "http://localhost:8000/storage/";

const ProductCard = ({ product, onAddToCart, isLoggedIn }) => {
  const navigate = useNavigate();
  const imageSrc = product.image
    ? `${STORAGE_URL}${product.image}`
    : "https://via.placeholder.com/400x400?text=No+Image";

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Please log in to continue.");
      return;
    }
    onAddToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 w-full max-w-4xl mx-auto my-6 p-6">
      
      {/* 📸 Product Main Image */}
      <div className="flex flex-col items-center md:w-1/2">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />

        {/* 📷 Extra Images (optional thumbnails) */}
        <div className="flex gap-3 mt-4">
          <img
            src={imageSrc}
            alt="thumb1"
            className="w-20 h-20 object-cover rounded-md border"
          />
          <img
            src={imageSrc}
            alt="thumb2"
            className="w-20 h-20 object-cover rounded-md border"
          />
        </div>
      </div>

      {/* 📋 Product Info */}
      <div className="md:w-1/2 flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            {product.story_description || product.description}
          </p>
          <div className="text-3xl font-semibold text-indigo-600 mb-4">
            ₱{product.price}
          </div>
        </div>

        {/* 🛒 Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className={`flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition ${
              !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => isLoggedIn && onAddToCart(product)}
            disabled={!isLoggedIn}
          >
            <FiShoppingCart size={20} />
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Buy Now
          </button>

          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            View Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
