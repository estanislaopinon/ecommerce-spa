import React from "react";

function FilterModal({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  applyFilters,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2>Filtros</h2>

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
