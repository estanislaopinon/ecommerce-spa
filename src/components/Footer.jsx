// Importación de React y Link para navegación interna
import React from "react";
import { Link } from "react-router-dom";

// Componente Footer: Muestra información de la tienda, ubicación, GitHub, derechos y enlace a Quiénes Somos
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Nombre de la tienda y ubicación */}
        <p className="footer__info">
          Look&Tech - Concepción del Uruguay, Entre Ríos
        </p>

        {/* Enlace al perfil de GitHub */}
        <a
          href="https://github.com/estanislaopinon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          GitHub
        </a>

        {/* Texto de derechos reservados */}
        <p className="footer__copyright">
          Todos los derechos reservados © 2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;
