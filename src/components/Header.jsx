import React from "react";

function Header({ searchTerm, onSearchTermChange, balance }) {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo-link">
          <img src="/logo.png" alt="Look&Tech Logo" className="header__logo" />
          <span>Look&Tech</span>
        </a>
        <div className="header__actions">
          <div className="header__search">
            <input
              type="text"
              className="header__search-input"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
          <div className="header__user">
            <span>Juan Pérez</span>
            <span className="header__balance">
              Saldo: ${balance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="header__banner header__banner--left"></div>
      <div className="header__banner header__banner--right"></div>
    </header>
  );
}

export default Header;
