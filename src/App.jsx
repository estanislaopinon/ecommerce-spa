import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  // Cargar productos y categorías
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories"),
        ]);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        console.log("Categorías cargadas:", categoriesResponse.data);
      } catch (err) {
        setError("Error al cargar los datos. Intenta de nuevo más tarde.");
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // Filtrar productos por búsqueda y categoría
  useEffect(() => {
    let filtered = products;

    // Aplicar filtro de búsqueda si existe
    if (activeSearch) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(activeSearch.toLowerCase())
      );
      console.log(
        "Búsqueda activa:",
        activeSearch,
        "Productos filtrados:",
        filtered
      );
    }

    // Aplicar filtro de categoría solo si no es "Todas"
    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
      console.log(
        "Categoría seleccionada:",
        selectedCategory,
        "Productos filtrados:",
        filtered
      );
    }

    setFilteredProducts(filtered);
    console.log("Estado final de filteredProducts:", filtered);
  }, [activeSearch, selectedCategory, products]);

  const handleSearch = (term) => {
    setActiveSearch(term);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    console.log("Cambiando a categoría:", category);
    setSelectedCategory(category);
  };

  return (
    <div className="container">
      <Header
        categories={categories}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      <h1>Lista de Productos</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
