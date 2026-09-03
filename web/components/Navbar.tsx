"use client";

import Link from "next/link";

interface NavbarProps {
  lang?: "es" | "en";
}

export function Navbar({ lang = "es" }: NavbarProps) {
  const isEn = lang === "en";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href={isEn ? "/en" : "/"} className="logo-new">
          <span className="logo-main-text">SSSTUDIO</span>
          <span className="logo-sub-text">
            {isEn ? "AI CONSULTING AGENCY" : "AGENCIA DE CONSULTORÍA IA"}
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
              {isEn ? "AI Agents" : "Agentes IA"}
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
          {isEn ? "Book AI Audit →" : "Agendar Auditoría IA →"}
        </Link>
      </div>
    </nav>
  );
}
