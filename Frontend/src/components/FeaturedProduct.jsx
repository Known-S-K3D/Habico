  // src/components/FeaturedProducts.jsx
  import React, { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useCart } from "../context/CartContext";
  import "../styles/global.css";
  import "../styles/AdminModal.css";
  const API_URL = "http://localhost:8000/api/products";
  const STORAGE_URL = "http://localhost:8000/storage/";

  const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const openModal = (product) => {
      setSelectedProduct(product);
      setQuantity(1);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
      setQuantity(1);
    };

    const addToCartFromModal = (product) => {
      addToCart({ ...product, quantity });
      closeModal();
    };

    const buyNow = (product) => {
      addToCart({ ...product, quantity });
      closeModal();
      // navigate to cart/checkout - using /cart for compatibility
      navigate("/cart");
    };

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
                
                  <button
                    type="button"
                    onClick={() => openModal(product)}
                    className="w-full p-0 bg-transparent border-0 text-left"
                    aria-label={`Open ${product.name} details`}
                  >
                    <img
                      src={
                        product.image
                          ? `${STORAGE_URL}${product.image}`
                          : "https://via.placeholder.com/300x400?text=Product"
                      }
                      alt={product.name}
                      className="object-cover w-full h-64 transition-transform group-hover:scale-105 rounded-t-xl"
                    />
                  </button>

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

          {/* Product Modal */}
          {modalOpen && selectedProduct && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              role="dialog"
              aria-modal="true"
              onClick={(e) => {
                // close when clicking backdrop
                if (e.target === e.currentTarget) closeModal();
              }}
            >
              <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-2">
                    <img
                      src={
                        selectedProduct.image
                          ? `${STORAGE_URL}${selectedProduct.image}`
                          : "https://via.placeholder.com/500x600?text=Product"
                      }
                      alt={selectedProduct.name}
                      className="object-cover w-full h-80 rounded"
                    />
                  </div>
                  <div className="md:w-1/2 p-4 flex flex-col">
                    <h3 className="mb-2 text-2xl font-semibold">
                      {selectedProduct.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-700">
                      {selectedProduct.description}
                    </p>

                    <div className="mb-4">
                      <label className="block mb-1 text-sm text-gray-600">
                        Quantity
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-1 text-lg font-bold bg-gray-200 rounded"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                          className="w-20 p-2 text-center border rounded"
                          aria-label="Quantity"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1 text-lg font-bold bg-gray-200 rounded"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="block text-sm text-gray-600">Price</span>
                        <span className="text-2xl font-bold text-primary">
                          ₱{selectedProduct.price}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => addToCartFromModal(selectedProduct)}
                          className="w-40 px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => buyNow(selectedProduct)}
                          className="w-40 px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm text-gray-600 border rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

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
