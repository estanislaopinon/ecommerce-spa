import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p className="price">${product.price}</p>
      <p className="description">{product.description.substring(0, 100)}...</p>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        setError("Error al cargar los productos. Intenta de nuevo más tarde.");
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Productos</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
