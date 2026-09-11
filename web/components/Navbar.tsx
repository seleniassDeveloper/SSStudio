"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  lang?: "es" | "en";
}

export function Navbar({ lang = "es" }: NavbarProps) {
  const isEn = lang === "en";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`navbar ${isOpen ? "navbar--open" : ""}`}>
        <div className="navbar-left">
          <Link href={isEn ? "/en" : "/"} className="logo-new" onClick={() => setIsOpen(false)}>
            <span className="logo-main-text">SSSTUDIO</span>
            <span className="logo-sub-text desktop-only-sub">
              {isEn ? "SOFTWARE & PROCESS CONSULTING" : "CONSULTORÍA DE SOFTWARE Y PROCESOS"}
            </span>
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="nav-links-center">
            <li>
              <Link href={isEn ? "/en/consultoria-ia" : "/consultoria-ia"}>
                {isEn ? "Consulting" : "Consultoría"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/agentes-de-ia" : "/agentes-de-ia"}>
                {isEn ? "Automation" : "Automatizaciones"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/software-a-medida" : "/software-a-medida"}>
                {isEn ? "Custom Software" : "Software a medida"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/casos" : "/casos"}>
                {isEn ? "Case Studies" : "Casos"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/contacto" : "/contacto"}>
                {isEn ? "Contact" : "Contacto"}
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="lang-switcher desktop-lang" style={{ marginRight: "0.75rem" }}>
            <Link
              href="/"
              className={`lang-btn ${!isEn ? "active" : ""}`}
            >
              ES
            </Link>
            <span>/</span>
            <Link
              href="/en"
              className={`lang-btn ${isEn ? "active" : ""}`}
            >
              EN
            </Link>
          </div>

          <Link href={isEn ? "/en/contacto" : "/contacto"} className="btn btn-dark nav-book-btn">
            <span className="btn-text-desktop">{isEn ? "Book Tech Audit →" : "Agendar Auditoría →"}</span>
            <span className="btn-text-mobile">{isEn ? "Audit →" : "Auditoría →"}</span>
          </Link>

          <button
            className={`nav-hamburger-btn ${isOpen ? "is-active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            type="button"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="mobile-menu-overlay">
          <ul className="mobile-nav-links">
            <li>
              <Link href={isEn ? "/en/consultoria-ia" : "/consultoria-ia"} onClick={() => setIsOpen(false)}>
                {isEn ? "Consulting" : "Consultoría"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/agentes-de-ia" : "/agentes-de-ia"} onClick={() => setIsOpen(false)}>
                {isEn ? "Automation" : "Automatizaciones"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/software-a-medida" : "/software-a-medida"} onClick={() => setIsOpen(false)}>
                {isEn ? "Custom Software" : "Software a medida"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/casos" : "/casos"} onClick={() => setIsOpen(false)}>
                {isEn ? "Case Studies" : "Casos"}
              </Link>
            </li>
            <li>
              <Link href={isEn ? "/en/contacto" : "/contacto"} onClick={() => setIsOpen(false)}>
                {isEn ? "Contact" : "Contacto"}
              </Link>
            </li>
          </ul>

          <div className="mobile-menu-footer">
            <div className="lang-switcher" style={{ justifyContent: "center" }}>
              <Link href="/" className={`lang-btn ${!isEn ? "active" : ""}`} onClick={() => setIsOpen(false)}>
                ES
              </Link>
              <span>/</span>
              <Link href="/en" className={`lang-btn ${isEn ? "active" : ""}`} onClick={() => setIsOpen(false)}>
                EN
              </Link>
            </div>

            <Link
              href={isEn ? "/en/contacto" : "/contacto"}
              className="btn btn-dark mobile-book-btn"
              onClick={() => setIsOpen(false)}
            >
              {isEn ? "Book Tech Audit →" : "Agendar Auditoría →"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
