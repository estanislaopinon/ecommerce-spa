import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo blanco.png";

function Header({ searchTerm, onSearchTermChange }) {
  const location = useLocation();
  const isProductDetail = location.pathname.startsWith("/product/");

  return (
    <header className="header">
      <div className="header__banner header__banner--left"></div>
      <div className="header__container">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Look&Tech" className="header__logo" />
          <span>Look&Tech</span>
        </Link>
        <div className="header__actions">
          {!isProductDetail && (
            <div className="header__search">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="header__search-input"
              />
            </div>
          )}
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
