import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function Home() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
