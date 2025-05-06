// Importaciones de dependencias y hooks
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Componente ProductDetail: Muestra los detalles de un producto y permite comprarlo
function ProductDetail({ stocks, updateStock, balance, updateBalance }) {
  // Obtiene el ID del producto desde la URL
  const { id } = useParams();

  // Estados del componente
  const [product, setProduct] = useState(null); // Datos del producto
  const [quantity, setQuantity] = useState(1); // Cantidad seleccionada para comprar
  const [error, setError] = useState(null); // Mensaje de error
  const [loading, setLoading] = useState(true); // Estado de carga

  // useEffect para cargar los detalles del producto al montar el componente
  useEffect(() => {
    async function fetchProduct() {
      try {
        // Realiza una petición a la API para obtener el producto por ID
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);

        // Log para depuración: muestra el producto, stock y saldo
        console.log(
          "Producto cargado:",
          response.data,
          "Stock:",
          stocks[id],
          "Saldo:",
          balance
        );
      } catch (err) {
        // Manejo de errores en caso de fallo en la petición
        setError("Error al cargar el producto.");
        console.error(err);
      } finally {
        // Finaliza el estado de carga
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, stocks, balance]); // Dependencias para re-ejecutar si cambian

  // Función para aumentar la cantidad seleccionada
  const handleIncreaseQuantity = () => {
    // Verifica si hay stock suficiente y si el saldo permite la compra
    if (quantity < stocks[id] && product?.price * (quantity + 1) <= balance) {
      setQuantity(quantity + 1);
      console.log("Cantidad aumentada:", quantity + 1);
    }
  };

  // Función para disminuir la cantidad seleccionada
  const handleDecreaseQuantity = () => {
    // No permite bajar de 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log("Cantidad disminuida:", quantity - 1);
    }
  };

  // Función para manejar la compra del producto
  const handleBuyNow = () => {
    // Verifica si hay stock, si la cantidad es válida y si el saldo es suficiente
    if (
      stocks[id] > 0 &&
      quantity <= stocks[id] &&
      product?.price * quantity <= balance
    ) {
      updateStock(id, quantity); // Actualiza el stock
      updateBalance(product.price * quantity); // Actualiza el saldo
      alert(`Has comprado ${quantity} unidad(es) de ${product.title}`);

      // Log para depuración: detalles de la compra
      console.log("Compra realizada:", {
        product: product.title,
        quantity,
        cost: product.price * quantity,
      });

      setQuantity(1); // Reinicia la cantidad a 1 tras la compra
    } else if (product?.price * quantity > balance) {
      alert("Saldo insuficiente para esta compra.");
    }
  };

  // Estados de carga y error
  if (loading) return <p className="loading">Cargando producto...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      {/* Imagen del producto */}
      <div className="product-detail__image">
        <img src={product.image} alt={product.title} />
      </div>

      {/* Información del producto */}
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

        {/* Control de cantidad */}
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

        {/* Botón de compra */}
        <button
          className="buy-button"
          onClick={handleBuyNow}
          disabled={stocks[id] === 0 || product?.price * quantity > balance}
        >
          Comprar ahora
        </button>

        {/* Descripción del producto */}
        <div className="product-detail__description">
          <h3>Descripción</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
