import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Look&Tech. Todos los derechos reservados.
        </p>
        <div className="footer__links">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Instagram
          </a>
          <a href="mailto:contacto@lookandtech.com" className="footer__link">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
