import Link from "next/link";
import { SITE } from "@/lib/site";

interface FooterProps {
  lang?: "es" | "en";
}

export function Footer({ lang = "es" }: FooterProps) {
  const isEn = lang === "en";

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {SITE.name} Software & Process Consulting. {isEn ? "All rights reserved." : "Todos los derechos reservados."}</p>
      <div className="footer-links">
        <Link href={isEn ? "/en/consultoria-ia" : "/consultoria-ia"}>
          {isEn ? "Consulting" : "Consultoría"}
        </Link>
        <Link href={isEn ? "/en/agentes-de-ia" : "/agentes-de-ia"}>
          {isEn ? "Automation" : "Automatizaciones"}
        </Link>
        <Link href={isEn ? "/en/casos" : "/casos"}>
          {isEn ? "Cases" : "Casos"}
        </Link>
        <Link href={isEn ? "/en/contacto" : "/contacto"}>
          {isEn ? "Contact" : "Contacto"}
        </Link>
      </div>
    </footer>
  );
}
