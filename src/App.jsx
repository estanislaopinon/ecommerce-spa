import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
      <div className="control-bar">
        <h1>Lista de Productos</h1>
        <button
          className="filter-button"
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filtrar
        </button>
      </div>
      <div className="products-container">
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
  const [stocks, setStocks] = useState({});
  const [balance, setBalance] = useState(500);
  const location = useLocation();

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
        const initialStocks = productsResponse.data.reduce((acc, product) => {
          acc[product.id] = 50;
          return acc;
        }, {});
        setStocks(initialStocks);
      } catch (err) {
        setError("Error al cargar los datos. Intenta de nuevo más tarde.");
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (appliedFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.categories.includes(product.category)
      );
    }

    if (appliedFilters.priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(appliedFilters.priceRange.min)
      );
    }

    if (appliedFilters.priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(appliedFilters.priceRange.max)
      );
    }

    if (appliedFilters.sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (appliedFilters.sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, appliedFilters, products]);

  useEffect(() => {
    if (location.pathname === "/") {
      const resetStocks = products.reduce((acc, product) => {
        acc[product.id] = 50;
        return acc;
      }, {});
      setStocks(resetStocks);
      setBalance(500);
    }
  }, [location.pathname, products]);

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
  };

  const updateStock = (productId, quantity) => {
    setStocks((prev) => {
      const newStock = Math.max(0, prev[productId] - quantity);
      return { ...prev, [productId]: newStock };
    });
  };

  const updateBalance = (cost) => {
    setBalance((prev) => Math.max(0, prev - cost));
  };

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        balance={balance}
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
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              stocks={stocks}
              updateStock={updateStock}
              balance={balance}
              updateBalance={updateBalance}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
