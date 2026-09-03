import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agendá una sesión de descubrimiento de 30 minutos con un arquitecto de IA para analizar tus procesos y evaluar viabilidad y ROI.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />
      <main className="studio-container" style={{ paddingTop: "8.5rem", paddingBottom: "4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <header className="section-header">
          <span className="section-tag">Contacto Directo B2B</span>
          <h1>Contame qué proceso querés mejorar</h1>
          <p className="section-description">
            Reserva una llamada de 30 minutos sin compromiso directamente con Selenia Sánchez (Founder & AI Solution Architect).
          </p>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", margin: "3rem 0" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>¿Qué podés esperar de la llamada?</h2>
            <ul className="match-list match-list-yes" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li>Análisis directo de tus cuellos de botella operativos sin discursos de venta.</li>
              <li>Estimación clara de viabilidad técnica y tiempo de desarrollo.</li>
              <li>Calculadora inicial de retorno de inversión (ROI) estimado.</li>
              <li>Recomendación de arquitectura (modelos propios vs integraciones SaaS).</li>
            </ul>

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "14px", background: "var(--surface-tint)", border: "1px solid var(--border)" }}>
              <strong>Contacto directo:</strong>
              <div style={{ margin: "0.5rem 0", color: "var(--accent)" }}>{SITE.email}</div>
              <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Respuesta en menos de 24 horas hábiles.</div>
            </div>
          </div>

          <div style={{ padding: "2rem", borderRadius: "20px", background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Enviar mensaje directo</h2>
            <form action={`mailto:${SITE.email}`} method="post" encType="text/plain" className="contact-form">
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Nombre y Empresa *</label>
                <input type="text" id="name" name="name" required placeholder="Ej. Sofía - Empresa Tech" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="role" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Cargo</label>
                <input type="text" id="role" name="role" placeholder="Ej. CTO / Director de Operaciones" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="desc" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Desafío operativo *</label>
                <textarea id="desc" name="desc" required rows={4} placeholder="¿Qué proceso querés automatizar o qué software necesitás construir?" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)" }}></textarea>
              </div>
              <button type="submit" className="btn btn-dark nav-book-btn" style={{ width: "100%", height: "46px", fontSize: "1rem" }}>
                Enviar Consulta →
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
