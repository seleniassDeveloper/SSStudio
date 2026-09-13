import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundBlobWrapper } from "@/components/BackgroundBlobWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto & Agendar Auditoría",
  description:
    "Agendá una sesión de descubrimiento de 30 minutos sin compromiso con nuestros consultores de software para analizar tus procesos y evaluar viabilidad y ROI.",
  alternates: {
    canonical: "/contacto",
    languages: {
      "es-ES": "/contacto",
      "en-US": "/en/contacto",
    },
  },
};

export default function ContactoPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto con SSSTudio",
    url: `${SITE.url}/contacto`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      email: SITE.email,
      url: SITE.url,
    },
  };

  return (
    <>
      <SmoothScroll />
      <BackgroundBlobWrapper />
      <Navbar lang="es" />

      <main className="studio-container" style={{ paddingTop: "4rem", paddingBottom: "5rem", maxWidth: "1150px", margin: "0 auto" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />

        <header className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-tag">Contacto Directo B2B</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: "1rem", lineHeight: 1.15 }}>
            Contanos qué proceso querés mejorar
          </h1>
          <p className="section-description" style={{ fontSize: "1.1rem", color: "var(--muted)", maxWidth: "700px" }}>
            Reserva una llamada de 30 minutos sin compromiso con nuestro equipo de consultores (Software Engineering & Process Automation).
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.75rem", alignItems: "start" }}>
          {/* Left Column: What to expect */}
          <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5F1 100%)", border: "1.5px solid rgba(59, 24, 21, 0.14)", borderRadius: "24px", padding: "2.75rem", boxShadow: "0 20px 48px -10px rgba(59, 24, 21, 0.09), 0 4px 14px rgba(176, 83, 87, 0.04)" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: "1.5rem" }}>
              ¿Qué podés esperar de la llamada?
            </h2>

            <ul className="match-list match-list-yes">
              <li>
                <strong>Análisis directo:</strong> Identificación de cuellos de botella operativos sin discursos de venta.
              </li>
              <li>
                <strong>Estimación clara:</strong> Viabilidad técnica y cronograma de desarrollo aproximado.
              </li>
              <li>
                <strong>Calculadora de ROI:</strong> Estimación inicial del retorno de inversión para tu proyecto.
              </li>
              <li>
                <strong>Arquitectura recomendada:</strong> Modelos y desarrollos propios vs. integraciones SaaS.
              </li>
            </ul>

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "16px", background: "var(--surface-tint)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.3rem" }}>
                Email Destino
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: "0.3rem" }}>
                {SITE.email}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                Las consultas enviadas por el formulario se entregan directamente aquí en menos de 24 horas hábiles.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Component */}
          <ContactForm lang="es" />
        </div>
      </main>

      <Footer lang="es" />
    </>
  );
}
