import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundBlobWrapper } from "@/components/BackgroundBlobWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroGraphic } from "@/components/HeroGraphic";

export const metadata: Metadata = {
  title: "Consultoría en IA y software a medida para empresas | SSSTudio",
  description:
    "Analizamos tus procesos y construimos la tecnología que los resuelve: automatización, agentes de IA, integraciones y software a medida. 5 años construyendo plataformas usadas en 17 países.",
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <BackgroundBlobWrapper />
      <Navbar />

      <main className="studio-container">
        {/* HERO SECTION */}
        <section id="inicio" className="hero-section hero-layout-split">
          <div className="hero-left">
            <div className="hero-pill-badge">
              <span className="pill-dot"></span>
              <span className="pill-text">AI Solution Architect & Software Engineering</span>
            </div>

            <h1 className="hero-h1-new">
              Software e IA a medida <span className="text-gradient-purple">para procesos que ya no dan más</span>
            </h1>

            <p className="hero-p-new">
              Reemplacé Jira para 820 personas en 17 países y ahorré ~$300k en licencias. Ahora construyo esos sistemas para tu empresa.
            </p>

            <div className="hero-ctas-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "2rem 0" }}>
              <Link href="/contacto" className="btn btn-primary" style={{ padding: "0.85rem 1.8rem", fontSize: "1.05rem" }}>
                Analizar mi proceso →
              </Link>
              <Link href="/casos" className="btn btn-light" style={{ padding: "0.85rem 1.5rem", fontSize: "1rem" }}>
                Ver casos reales
              </Link>
            </div>

            <div className="hero-metrics-row">
              <div>
                <strong style={{ fontSize: "1.55rem", color: "var(--accent)", display: "block" }}>820+</strong>
                <span>Usuarios en 17 países</span>
              </div>
              <div>
                <strong style={{ fontSize: "1.55rem", color: "var(--accent)", display: "block" }}>380+</strong>
                <span>Flujos configurados</span>
              </div>
              <div>
                <strong style={{ fontSize: "1.55rem", color: "var(--accent)", display: "block" }}>~$300k+</strong>
                <span>Ahorrados en licencias</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <HeroGraphic />
          </div>
        </section>

        {/* HERO IMAGE OPTIMIZED */}
        <section className="hero-image-banner" style={{ margin: "3rem auto" }}>
          <Image
            src="/paginassstudio.png"
            alt="Plataforma y Dashboard SSSTUDIO AI Consulting & Software Engineering"
            width={1400}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            style={{ width: "100%", height: "auto" }}
          />
        </section>

        {/* WHAT WE DO / SERVICES GRID */}
        <section id="servicios" className="section">
          <div className="section-header">
            <span className="section-tag">Nuestras Capacidades</span>
            <h2>Servicios Especializados B2B</h2>
            <p className="section-description">
              Soluciones diseñadas para resolver cuellos de botella reales en la operación de tu empresa.
            </p>
          </div>

          <div className="wwd-grid">
            <Link href="/consultoria-ia" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">🧠</div>
                <h3>Consultoría IA</h3>
              </div>
              <p>Auditoría de procesos y diseño de arquitectura técnica de IA con ROI medible.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/automatizacion-de-procesos-con-ia" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">⚡</div>
                <h3>Automatización de Procesos</h3>
              </div>
              <p>Sustitución de flujos manuales repetitivos por pipelines automatizados con n8n y LLMs.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/agentes-de-ia" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">🤖</div>
                <h3>Agentes de IA</h3>
              </div>
              <p>Agentes autónomos conectados a tus bases de datos y herramientas corporativas.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/software-a-medida" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">💻</div>
                <h3>Software a Medida</h3>
              </div>
              <p>Plataformas SaaS y software propio sin licencias recurrentes por usuario.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/integraciones-crm-erp" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">🔗</div>
                <h3>Integraciones CRM & ERP</h3>
              </div>
              <p>Conexión fluida de sistemas, APIs, pasarelas de pago y sincronización de datos.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/dashboards-y-reportes" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">📊</div>
                <h3>Dashboards & Reportes</h3>
              </div>
              <p>Business Intelligence en tiempo real con detección algorítmica de anomalías.</p>
              <div className="wwd-line"></div>
            </Link>
          </div>
        </section>

        {/* REASONING / VISION SECTION */}
        <section id="vision" className="section" style={{ margin: "5rem 0" }}>
          <div className="section-header">
            <span className="section-tag">Metodología de Trabajo</span>
            <h2>Analizamos el proceso primero. Elegimos la tecnología después.</h2>
            <p className="section-description">
              No aplicamos soluciones prefabricadas. Evaluamos la estructura operativa de tu empresa y construimos herramientas a medida que escalan.
            </p>
          </div>

          <div className="vision-stats">
            <div className="v-stat">
              <strong>5 Años</strong>
              <span>Construyendo software SaaS y motores de IA</span>
            </div>
            <div className="v-stat">
              <strong>17 Países</strong>
              <span>Donde operan nuestros sistemas</span>
            </div>
            <div className="v-stat">
              <strong>100+ Empresas</strong>
              <span>Beneficiadas con ahorro operativo</span>
            </div>
          </div>
        </section>

        {/* DIRECT GUIDES SECTION */}
        <section className="section" style={{ margin: "5rem 0" }}>
          <div className="section-header">
            <span className="section-tag">Recursos & Guías Técnicas</span>
            <h2>Respuestas Directas para Toma de Decisiones</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <Link href="/guias/cuanto-cuesta-un-agente-de-ia-para-una-empresa" style={{ textDecoration: "none", padding: "1.5rem", borderRadius: "14px", background: "var(--surface)", border: "1px solid var(--border)", display: "block" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>¿Cuánto cuesta un agente de IA?</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Desglose transparente de costos de desarrollo, tokens e infraestructura.</p>
            </Link>
            <Link href="/guias/software-a-medida-o-licencias-saas-como-decidir" style={{ textDecoration: "none", padding: "1.5rem", borderRadius: "14px", background: "var(--surface)", border: "1px solid var(--border)", display: "block" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Software a medida vs SaaS</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Criterios financieros para decidir cuándo dejar de pagar licencias.</p>
            </Link>
            <Link href="/guias/reemplazar-jira-con-una-plataforma-propia" style={{ textDecoration: "none", padding: "1.5rem", borderRadius: "14px", background: "var(--surface)", border: "1px solid var(--border)", display: "block" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Reemplazar Jira con software propio</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Caso real de 820+ usuarios en 17 países con 100% de adopción.</p>
            </Link>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contacto" className="section" style={{ margin: "5rem 0", textAlign: "center" }}>
          <div className="match-card-cta" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2>¿Listo para optimizar los procesos de tu empresa?</h2>
            <p style={{ margin: "1rem 0 2rem 0", fontSize: "1.1rem" }}>
              Agendá una llamada de descubrimiento de 30 minutos con Selenia Sánchez para analizar tu operación y calcular el retorno de inversión.
            </p>
            <Link href="/contacto" className="btn btn-primary" style={{ padding: "0.9rem 2.2rem", fontSize: "1.1rem" }}>
              Analizar mi proceso →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
