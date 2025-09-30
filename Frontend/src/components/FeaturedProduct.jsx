// src/components/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:8000/api/products";
const STORAGE_URL = "http://localhost:8000/storage/";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold">Featured Products</h2>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col transition bg-white shadow-lg rounded-xl group hover:shadow-2xl"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={
                    product.image
                      ? `${STORAGE_URL}${product.image}`
                      : "https://via.placeholder.com/300x400?text=Product"
                  }
                  alt={product.name}
                  className="object-cover w-full h-64 transition-transform group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-col justify-between flex-1 p-4">
                <h3 className="mb-1 text-lg font-semibold truncate">
                  {product.name}
                </h3>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-primary">
                    ₱{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-1 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-block px-8 py-3 font-medium text-gray-800 transition border border-gray-300 rounded hover:bg-gray-50"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
