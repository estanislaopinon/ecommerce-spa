// Importaciones de dependencias y hooks
import React from "react";
import { Link } from "react-router-dom";

// Componente ProductCard: Muestra una tarjeta de producto con enlace a los detalles
function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Imagen del producto */}
      <img src={product.image} alt={product.title} />

      {/* Título del producto */}
      <h2>{product.title}</h2>

      {/* Precio del producto */}
      <p className="price">${product.price}</p>

      {/* Descripción recortada del producto */}
      <p className="description">{product.description.substring(0, 100)}...</p>
    </Link>
  );
}

export default ProductCard;
