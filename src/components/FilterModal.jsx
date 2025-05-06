// Importación de React
import React from "react";

// Componente FilterModal: Modal para aplicar filtros a los productos
function FilterModal({
  isOpen, // Estado para controlar si el modal está abierto
  onClose, // Función para cerrar el modal
  categories, // Lista de categorías disponibles
  selectedCategories, // Categorías seleccionadas por el usuario
  setSelectedCategories, // Función para actualizar las categorías seleccionadas
  priceRange, // Rango de precios (min y max)
  setPriceRange, // Función para actualizar el rango de precios
  sortOrder, // Ordenamiento seleccionado (asc/desc)
  setSortOrder, // Función para actualizar el ordenamiento
  applyFilters, // Función para aplicar los filtros
}) {
  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Botón para cerrar el modal */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Título del modal */}
        <h2>Filtros</h2>

        {/* Sección de filtro por categorías */}
        <div className="filter-section">
          <h3>Categorías</h3>
          <div className="checkbox-group">
            {categories.map((category) => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category)
                        ? prev.filter((cat) => cat !== category)
                        : [...prev, category]
                    );
                  }}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Sección de filtro por rango de precios */}
        <div className="filter-section">
          <h3>Rango de Precios</h3>
          <div className="price-range">
            <input
              type="number"
              placeholder="Mín"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Máx"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>
        </div>

        {/* Sección de ordenamiento por precio */}
        <div className="filter-section">
          <h3>Ordenar por Precio</h3>
          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>
        </div>

        {/* Botones de acción del modal */}
        <div className="modal-actions">
          <button className="apply-button" onClick={applyFilters}>
            Aplicar
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
