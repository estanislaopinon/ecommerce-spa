import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p className="price">${product.price}</p>
      <p className="description">{product.description.substring(0, 100)}...</p>
    </Link>
  );
}

export default ProductCard;
