// Importación de React
import React from "react";

// Componente Header: Muestra el logo, buscador y saldo del usuario
function Header({ searchTerm, onSearchTermChange, balance }) {
  return (
    <header className="header">
      {/* Contenedor principal del header */}
      <div className="header__container">
        {/* Enlace al home con el logo y el nombre */}
        <a href="/" className="header__logo-link">
          <img src="/logo.png" alt="Look&Tech Logo" className="header__logo" />
          <span>Look&Tech</span>
        </a>

        {/* Contenedor del buscador */}
        <div className="header__search-wrapper">
          <div className="header__search">
            {/* Campo de búsqueda con placeholder y manejo de eventos */}
            <input
              type="text"
              className="header__search-input"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
            {/* Ícono de lupa para el buscador */}
            <span className="header__search-icon">🔍</span>
          </div>
        </div>

        {/* Información del usuario y saldo */}
        <div className="header__user">
          <span>Juan Pérez</span>
          <span className="header__balance">Saldo: ${balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Banners decorativos a los lados */}
      <div className="header__banner header__banner--left"></div>
      <div className="header__banner header__banner--right"></div>
    </header>
  );
}

export default Header;
