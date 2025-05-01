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

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filtros</h2>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="filter-section">
          <h3>Categorías</h3>
          <div className="checkbox-group">
            {categories.map((category) => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h3>Rango de Precio</h3>
          <div className="price-range">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              placeholder="Mínimo"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              placeholder="Máximo"
              min="0"
            />
          </div>
        </div>
        <div className="filter-section">
          <h3>Ordenar por</h3>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="">Sin orden</option>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="apply-button" onClick={applyFilters}>
            Aplicar
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
