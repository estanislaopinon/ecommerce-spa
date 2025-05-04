import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail({ stocks, updateStock, balance, updateBalance }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        console.log(
          "Producto cargado:",
          response.data,
          "Stock:",
          stocks[id],
          "Saldo:",
          balance
        );
      } catch (err) {
        setError("Error al cargar el producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, stocks, balance]);

  const handleIncreaseQuantity = () => {
    if (quantity < stocks[id] && product?.price * (quantity + 1) <= balance) {
      setQuantity(quantity + 1);
      console.log("Cantidad aumentada:", quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log("Cantidad disminuida:", quantity - 1);
    }
  };

  const handleBuyNow = () => {
    if (
      stocks[id] > 0 &&
      quantity <= stocks[id] &&
      product?.price * quantity <= balance
    ) {
      updateStock(id, quantity);
      updateBalance(product.price * quantity);
      alert(`Has comprado ${quantity} unidad(es) de ${product.title}`);
      console.log("Compra realizada:", {
        product: product.title,
        quantity,
        cost: product.price * quantity,
      });
      setQuantity(1); // Reiniciar cantidad a 1 tras comprar
    } else if (product?.price * quantity > balance) {
      alert("Saldo insuficiente para esta compra.");
    }
  };

  if (loading) return <p className="loading">Cargando producto...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-detail__info">
        <h2 className="product-detail__title">{product.title}</h2>
        <p className="product-detail__price">${product.price}</p>
        <p className="product-detail__category">
          Categoría: {product.category}
        </p>
        <p className="product-detail__stock">
          Stock: {stocks[id]}{" "}
          {stocks[id] === 1 ? "unidad disponible" : "unidades disponibles"}
        </p>
        <div className="product-detail__quantity">
          <button
            className="quantity-button"
            onClick={handleDecreaseQuantity}
            disabled={
              quantity <= 1 ||
              stocks[id] === 0 ||
              product?.price * quantity > balance
            }
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-button"
            onClick={handleIncreaseQuantity}
            disabled={
              quantity >= stocks[id] ||
              product?.price * (quantity + 1) > balance ||
              stocks[id] === 0
            }
          >
            +
          </button>
        </div>
        <button
          className="buy-button"
          onClick={handleBuyNow}
          disabled={stocks[id] === 0 || product?.price * quantity > balance}
        >
          Comprar ahora
        </button>
        <div className="product-detail__description">
          <h3>Descripción</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
