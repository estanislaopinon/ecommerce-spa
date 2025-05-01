import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import FilterModal from "./components/FilterModal";
import "./App.css";

function Home({
  products,
  filteredProducts,
  error,
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  isFilterModalOpen,
  setIsFilterModalOpen,
  applyFilters,
}) {
  return (
    <div className="home-container">
      <div className="products-container">
        <div className="filter-button-container">
          <button
            className="filter-button"
            onClick={() => setIsFilterModalOpen(true)}
          >
            Filtrar
          </button>
        </div>
        <h1>Lista de Productos</h1>
        {error ? (
          <p className="error">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="error">No se encontraron productos.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        applyFilters={applyFilters}
      />
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setSortOrder] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    priceRange: { min: "", max: "" },
    sortOrder: "",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = products;

    // Aplicar filtro de búsqueda (en tiempo real)
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(
        "Búsqueda activa:",
        searchTerm,
        "Productos filtrados:",
        filtered
      );
    }

    // Aplicar filtros de la modal (solo cuando se hace clic en "Aplicar")
    if (appliedFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.categories.includes(product.category)
      );
      console.log(
        "Categorías aplicadas:",
        appliedFilters.categories,
        "Productos filtrados:",
        filtered
      );
    }

    if (appliedFilters.priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(appliedFilters.priceRange.min)
      );
      console.log(
        "Precio mínimo aplicado:",
        appliedFilters.priceRange.min,
        "Productos filtrados:",
        filtered
      );
    }

    if (appliedFilters.priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(appliedFilters.priceRange.max)
      );
      console.log(
        "Precio máximo aplicado:",
        appliedFilters.priceRange.max,
        "Productos filtrados:",
        filtered
      );
    }

    // Aplicar ordenamiento
    if (appliedFilters.sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (appliedFilters.sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      console.log(
        "Orden aplicado:",
        appliedFilters.sortOrder,
        "Productos ordenados:",
        filtered
      );
    }

    setFilteredProducts(filtered);
    console.log("Estado final de filteredProducts:", filtered);
  }, [searchTerm, appliedFilters, products]);

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const applyFilters = () => {
    setAppliedFilters({
      categories: selectedCategories,
      priceRange: { min: priceRange.min, max: priceRange.max },
      sortOrder: sortOrder,
    });
    setIsFilterModalOpen(false);
    console.log("Filtros aplicados:", {
      selectedCategories,
      priceRange,
      sortOrder,
    });
  };

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              filteredProducts={filteredProducts}
              error={error}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              isFilterModalOpen={isFilterModalOpen}
              setIsFilterModalOpen={setIsFilterModalOpen}
              applyFilters={applyFilters}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
