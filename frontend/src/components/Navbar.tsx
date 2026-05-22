import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthNav } from "./AuthNav";

type NavbarProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${menuOpen ? "navbar--open" : ""}`}>
      <a
        href="#inicio"
        className="logo"
        onClick={(e) => {
          e.preventDefault();
          closeMenu();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        SSS<span>Studio</span>
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        aria-label={menuOpen ? t("nav.closeMenu", { defaultValue: "Cerrar menú" }) : t("nav.openMenu", { defaultValue: "Abrir menú" })}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-hidden
          tabIndex={-1}
          onClick={closeMenu}
        />
      ) : null}

      <ul id="main-nav" className="nav-links">
        <li>
          <a href="#servicios" onClick={closeMenu}>
            {t("nav.services")}
          </a>
        </li>
        <li>
          <a href="#productos" onClick={closeMenu}>
            {t("nav.products")}
          </a>
        </li>
        <li>
          <a href="#contacto" onClick={closeMenu}>
            {t("nav.workWithUs")}
          </a>
        </li>
        <li>
          <a href="#contacto" className="nav-btn" onClick={closeMenu}>
            {t("nav.cta")}
          </a>
        </li>
        <AuthNav onNavigate={closeMenu} />
        <li className="nav-actions-mobile">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
          >
            {theme === "dark" ? "☀" : "☽"}
          </button>
          <div className="lang-switcher">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("es")}
              className={`lang-btn ${i18n.language.startsWith("es") ? "active" : ""}`}
            >
              ES
            </button>
            <span className="lang-separator">/</span>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`lang-btn ${i18n.language.startsWith("en") ? "active" : ""}`}
            >
              EN
            </button>
          </div>
        </li>
      </ul>

      <div className="nav-actions-desktop">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
        >
          {theme === "dark" ? "☀" : "☽"}
        </button>
        <div className="lang-switcher">
          <button
            type="button"
            onClick={() => i18n.changeLanguage("es")}
            className={`lang-btn ${i18n.language.startsWith("es") ? "active" : ""}`}
          >
            ES
          </button>
          <span className="lang-separator">/</span>
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            className={`lang-btn ${i18n.language.startsWith("en") ? "active" : ""}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
