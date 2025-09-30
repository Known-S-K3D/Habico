import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../api/axios";
import { FiShoppingCart } from "react-icons/fi";

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.data.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    alert(`${quantity} item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    onAddToCart({ ...product, quantity });
    navigate("/checkout"); // ⚠️ replace with your actual checkout route
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 🖼️ Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.image ? `${STORAGE_URL}${product.image}` : "https://via.placeholder.com/500x500?text=No+Image"}
          alt={product.name}
          className="w-full max-w-lg rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* 📦 Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.story_description}</p>

        <div className="text-2xl font-bold text-indigo-600 mb-6">₱{product.price}</div>

        {/* 📊 Quantity Selector */}
        <div className="flex items-center mb-8">
          <label className="mr-3 font-semibold text-gray-800">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="border border-gray-300 rounded-lg w-20 text-center py-2"
          />
        </div>

        {/* 🛒 Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            <FiShoppingCart size={20} /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
