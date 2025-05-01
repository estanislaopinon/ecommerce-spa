import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo blanco.png";

function Header({
  categories,
  onSearch,
  onCategoryChange,
  selectedCategory,
  searchTerm,
  onSearchTermChange,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="header__banner header__banner--left"></div>
      <div className="header__container">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Look&Tech" className="header__logo" />
          <span>Look&Tech</span>
        </Link>
        <div className="header__actions">
          <div className="header__search">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="header__search-input"
            />
            <span
              className="header__search-icon"
              onClick={handleSearchClick}
              role="button"
              tabIndex={0}
            >
              🔍
            </span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="header__categories"
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <Link to="/account" className="header__account">
            <span>👤</span>
            <span>Cuenta</span>
          </Link>
        </div>
      </div>
      <div className="header__banner header__banner--right"></div>
    </header>
  );
}

export default Header;
