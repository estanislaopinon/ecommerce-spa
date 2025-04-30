import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Error al cargar el producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Cargando producto...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <Link to="/" className="back-button">
        Volver a la lista
      </Link>
      <div className="product-detail__image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-detail__info">
        <h2 className="product-detail__title">{product.title}</h2>
        <p className="product-detail__price">${product.price}</p>
        <p className="product-detail__category">
          Categoría: {product.category}
        </p>
        <div className="product-detail__description">
          <h3>Descripción</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
