// Importación de React
import React from "react";

// Componente Footer: Muestra nombre de la tienda, ubicación, GitHub y derechos reservados
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
