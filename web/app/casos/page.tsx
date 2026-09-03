import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casos y sistemas construidos",
  description:
    "Credenciales técnicas y casos verificados de desarrollo de software a medida, automatizaciones con IA y plataformas corporativas adoptadas en 17 países.",
  alternates: {
    canonical: "/casos",
    languages: {
      "es-ES": "/casos",
      "en-US": "/en/casos",
    },
  },
};

export default function CasosPage() {
  const cases = [
    {
      title: "Plataforma de Gestión Empresarial (Reemplazo de Jira)",
      metrics: "820+ usuarios en 17 países | 100% de adopción",
      description:
        "Desarrollo integral de plataforma corporativa con 380+ flujos de trabajo configurables, estado dinámico y control RBAC para 9 roles. Eliminó el costo de licencias por usuario y optimizó la asignación de recursos.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "RBAC"],
    },
    {
      title: "Motor de Automatización de Licencias B2B",
      metrics: "~$300k+ ahorrados al eliminar ~$3k de licencia por cliente en 100+ empresas",
      description:
        "Implementación de arquitectura de ahorro operativo para 100+ clientes enterprise en 2 meses. Sustituyó suscripciones corporativas costosas por una solución propietaria autosostenible.",
      tags: ["n8n", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      title: "Plataforma Educativa de Alto Rendimiento",
      metrics: "+35% de finalización de cursos para 2.500+ profesionales en 50+ países",
      description:
        "Desarrollo de entorno educativo interactivo con seguimiento algorítmico del progreso del estudiante y baja latencia de carga en conexiones móviles globales.",
      tags: ["Next.js", "TypeScript", "Firebase", "PostgreSQL"],
    },
    {
      title: "AuraDash: ERP/CRM Multi-Tenant",
      metrics: "Gestión de agenda con zonas horarias, finanzas y control de inventario",
      description:
        "Arquitectura SaaS propia con aislamiento estricto por tenant, detección de conflictos de agenda en tiempo real, sincronización con Google Calendar e integración con MercadoPago.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "MercadoPago", "Google Calendar API"],
    },
    {
      title: "Más Repuestos: Marketplace Multi-Vendor",
      metrics: "Publicado en Google Play en 4 meses",
      description:
        "Desarrollo y lanzamiento móvil de plataforma multi-vendedor con catálogo dinámico, procesamiento de pagos y panel de administración para vendedores.",
      tags: ["React Native", "Node.js", "PostgreSQL", "Google Play"],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="studio-container" style={{ paddingTop: "6rem", maxWidth: "950px" }}>
        <header className="section-header">
          <span className="section-tag">Credenciales y Proyectos</span>
          <h1>Sistemas que ya construí</h1>
          <p className="section-description">
            5 años de experiencia comprobable construyendo plataformas SaaS, motores de flujos de trabajo, sistemas de reservas y herramientas empresariales con Inteligencia Artificial.
          </p>
        </header>

        <section className="casos-grid" style={{ display: "flex", flexDirection: "column", gap: "2.5rem", margin: "3rem 0" }}>
          {cases.map((c, idx) => (
            <article key={idx} style={{ padding: "2rem", borderRadius: "20px", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{c.title}</h2>
              <div style={{ fontWeight: 700, color: "var(--accent)", marginBottom: "1rem", fontSize: "1.1rem" }}>
                {c.metrics}
              </div>
              <p style={{ lineHeight: "1.65", color: "var(--text-body)", marginBottom: "1.5rem" }}>{c.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {c.tags.map((t, tIdx) => (
                  <span key={tIdx} style={{ fontSize: "0.8rem", padding: "0.25rem 0.75rem", borderRadius: "999px", background: "var(--accent-50)", color: "var(--accent-strong)", fontWeight: 600 }}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section style={{ margin: "5rem 0", textAlign: "center" }}>
          <h2>¿Querés construir un sistema con esta misma solvencia técnica?</h2>
          <p style={{ margin: "1rem 0 1.5rem 0" }}>Conversá directamente con Selenia Sánchez sobre el desafío de tu empresa.</p>
          <Link href="/contacto" className="btn btn-dark nav-book-btn" style={{ height: "46px", padding: "0 2rem" }}>
            Agendar Llamada →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
