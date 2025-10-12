import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import kalinga from "../product/KalingaProducts/kalinga-bag.jpg";
import "../styles/Hero.css";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ Default fallback product (Kalinga Bag)
  const defaultSlides = [
    {
      id: 3,
      title: "Kalinga Bag",
      description:
        "Bag crafted with intricate designs and vibrant colors, perfect for any occasion.",
      image_url: kalinga,
      price: 1299,
    },
  ];

  // ✅ Fetch products from Laravel backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();

        // ✅ Normalize data and map image paths correctly
        const formattedProducts = Array.isArray(data)
          ? data.map((product) => ({
              id: product.id,
              title: product.name,
              description: product.description,
              price: product.price,
              image_url:
                product.image_url ||
                (product.image
                  ? `http://localhost:8000/storage/${product.image}`
                  : null),
            }))
          : [];

        // ✅ Combine backend products + fallback
        setSlides(formattedProducts.length ? formattedProducts.slice(0, 3) : defaultSlides);
      } catch (error) {
        console.error("Error fetching products:", error);
        setSlides(defaultSlides); // fallback if API fails
      }
    };

    fetchProducts();
  }, []);

  // ✅ Auto-slide every 5s
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  // ✅ Navigate to Shop
  const handleShopNow = () => navigate("/shop");

  // ✅ Add product to cart
  const handleBuyNow = () => {
    const currentProduct = slides[current];
    if (currentProduct) {
      addToCart(currentProduct);
      navigate("/cart");
    }
  };

  if (!slides.length) {
    return (
      <section className="hero-section loading">
        <div>Loading featured products...</div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={slide.id ?? index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          aria-hidden={index === current ? "false" : "true"}
        >
          <div className="hero-card">
            <div className="hero-image-wrapper">
              <img
                src={slide.image_url || ""}
                alt={slide.title || "Featured product"}
                className="hero-image"
                loading="lazy"
              />
            </div>

            <div className="hero-content">
              <h2 className="hero-title">{slide.title}</h2>
              <p className="hero-description">{slide.description}</p>
              {slide.price && (
                <p className="hero-price">₱{Number(slide.price).toLocaleString()}</p>
              )}
              <div className="hero-actions">
                <button
                  onClick={handleShopNow}
                  className="btn btn-primary"
                  aria-label="Shop now"
                >
                  Shop Now
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-secondary"
                  aria-label="Buy now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        className="hero-arrow left"
        onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="hero-arrow right"
        onClick={() => setCurrent((p) => (p + 1) % slides.length)}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="hero-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`indicator ${i === current ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
