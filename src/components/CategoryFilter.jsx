// Importación de React
import React from "react";

// Componente CategoryFilter: Muestra una lista de categorías para filtrar productos
function CategoryFilter({
  categories, // Lista de categorías disponibles
  selectedCategory, // Categoría actualmente seleccionada
  onCategoryChange, // Función para manejar el cambio de categoría
}) {
  return (
    <div className="category-filter">
      {/* Título de la sección de categorías */}
      <h2>Categorías</h2>

      {/* Lista de categorías */}
      <ul className="category-list">
        {/* Opción para mostrar todas las categorías */}
        <li>
          <button
            className={`category-button ${
              selectedCategory === "" ? "active" : ""
            }`}
            onClick={() => onCategoryChange("")}
          >
            Todas
          </button>
        </li>

        {/* Lista dinámica de categorías */}
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {/* Capitaliza la primera letra de cada categoría */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
