import React from "react";

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <h2>Categorías</h2>
      <ul className="category-list">
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
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
