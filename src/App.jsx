// Importaciones de dependencias y componentes
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import FilterModal from "./components/FilterModal";
import "./App.css";

// Componente Home: Muestra la lista de productos con filtros y búsqueda
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
      {/* Barra de control con título y botón de filtro */}
      <div className="control-bar">
        <h1>Lista de Productos</h1>
        <button
          className="filter-button"
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filtrar
        </button>
      </div>

      {/* Contenedor de productos */}
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

      {/* Modal de filtros */}
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

// Componente principal de la aplicación
function App() {
  // Estados para manejar los datos y filtros
  const [products, setProducts] = useState([]); // Lista completa de productos
  const [categories, setCategories] = useState([]); // Categorías de productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [selectedCategories, setSelectedCategories] = useState([]); // Categorías seleccionadas
  const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // Rango de precios
  const [sortOrder, setSortOrder] = useState(""); // Ordenamiento (asc/desc)
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    priceRange: { min: "", max: "" },
    sortOrder: "",
  }); // Filtros aplicados
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Estado del modal de filtros
  const [error, setError] = useState(null); // Mensaje de error
  const [stocks, setStocks] = useState({}); // Stock de productos
  const [balance, setBalance] = useState(500); // Saldo del usuario
  const location = useLocation(); // Hook para obtener la ruta actual

  // useEffect para cargar productos y categorías al iniciar
  useEffect(() => {
    async function fetchData() {
      try {
        // Realiza dos peticiones simultáneas: productos y categorías
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories"),
        ]);

        // Actualiza los estados con los datos obtenidos
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(categoriesResponse.data);

        // Inicializa el stock de cada producto a 50 unidades
        const initialStocks = productsResponse.data.reduce((acc, product) => {
          acc[product.id] = 50;
          return acc;
        }, {});
        setStocks(initialStocks);
      } catch (err) {
        // Manejo de errores en caso de fallo en las peticiones
        setError("Error al cargar los datos. Intenta de nuevo más tarde.");
        console.error(err);
      }
    }
    fetchData();
  }, []); // Dependencia vacía para ejecutarse solo al montar el componente

  // useEffect para aplicar filtros y búsqueda a los productos
  useEffect(() => {
    let filtered = products;

    // Filtra por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtra por categorías seleccionadas
    if (appliedFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.categories.includes(product.category)
      );
    }

    // Filtra por precio mínimo
    if (appliedFilters.priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(appliedFilters.priceRange.min)
      );
    }

    // Filtra por precio máximo
    if (appliedFilters.priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(appliedFilters.priceRange.max)
      );
    }

    // Ordena los productos según el criterio seleccionado
    if (appliedFilters.sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (appliedFilters.sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    // Actualiza la lista de productos filtrados
    setFilteredProducts(filtered);
  }, [searchTerm, appliedFilters, products]); // Dependencias para re-filtrar

  // useEffect para reiniciar saldo y stock al volver a la página principal
  useEffect(() => {
    if (location.pathname === "/") {
      // Reinicia el stock de cada producto a 50
      const resetStocks = products.reduce((acc, product) => {
        acc[product.id] = 50;
        return acc;
      }, {});
      setStocks(resetStocks);
      setBalance(500); // Reinicia el saldo a 500
    }
  }, [location.pathname, products]); // Dependencias para re-ejecutar

  // Función para manejar cambios en el término de búsqueda
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  // Función para aplicar los filtros seleccionados
  const applyFilters = () => {
    setAppliedFilters({
      categories: selectedCategories,
      priceRange: { min: priceRange.min, max: priceRange.max },
      sortOrder: sortOrder,
    });
    setIsFilterModalOpen(false); // Cierra el modal de filtros
  };

  // Función para actualizar el stock de un producto tras una compra
  const updateStock = (productId, quantity) => {
    setStocks((prev) => {
      const newStock = Math.max(0, prev[productId] - quantity);
      return { ...prev, [productId]: newStock };
    });
  };

  // Función para actualizar el saldo del usuario tras una compra
  const updateBalance = (cost) => {
    setBalance((prev) => Math.max(0, prev - cost));
  };

  return (
    <div className="app">
      {/* Componente Header: Incluye logo, buscador y saldo */}
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        balance={balance}
      />

      {/* Rutas de la aplicación */}
      <Routes>
        {/* Ruta para la página principal (Home) */}
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
        {/* Ruta para la página de detalle de producto */}
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

      {/* Componente Footer: Pie de página */}
      <Footer />
    </div>
  );
}

export default App;
