import React from "react";
import ProductCard from "./ProductCard";
import "../styles/global.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={product.onAddToCart}
          isLoggedIn={product.isLoggedIn}
        />
      ))}
    </div>
  );
};

export default ProductList;
