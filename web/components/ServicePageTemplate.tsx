import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SITE } from "@/lib/site";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageProps {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  directAnswer: string;
  deliverables: string[];
  whenMakesSense: string[];
  whenDoesNotMakeSense: string[];
  caseStudy: {
    title: string;
    metrics: string;
    description: string;
  };
  faqs: FAQItem[];
  lang?: "es" | "en";
}

export function ServicePageTemplate(props: ServicePageProps) {
  const {
    slug,
    h1,
    metaDescription,
    directAnswer,
    deliverables,
    whenMakesSense,
    whenDoesNotMakeSense,
    caseStudy,
    faqs,
    lang = "es",
  } = props;

  const canonicalUrl = `${SITE.url}/${slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: h1,
    description: metaDescription,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: "Worldwide",
    url: canonicalUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: h1,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar lang={lang} />

      <main className="studio-container service-page" style={{ paddingTop: "5.5rem", paddingBottom: "3rem", maxWidth: "1100px", margin: "0 auto" }}>
        <header className="section-header" style={{ maxWidth: "850px" }}>
          <span className="section-tag">Servicio Especializado</span>
          <h1>{h1}</h1>
          <p className="direct-answer-box" style={{ fontSize: "1.15rem", lineHeight: "1.6", fontWeight: 500, margin: "1.5rem 0", color: "var(--text)" }}>
            {directAnswer}
          </p>
        </header>

        <section className="service-deliverables" style={{ margin: "3rem 0" }}>
          <h2>Qué incluye</h2>
          <ul className="match-list match-list-yes" style={{ marginTop: "1rem" }}>
            {deliverables.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="service-fit-analysis" style={{ margin: "3rem 0" }}>
          <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div className="fit-box sense" style={{ padding: "1.5rem", borderRadius: "16px", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h3 style={{ color: "var(--success)", marginBottom: "1rem" }}>✓ Cuándo tiene sentido</h3>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {whenMakesSense.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-box no-sense" style={{ padding: "1.5rem", borderRadius: "16px", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <h3 style={{ color: "var(--error)", marginBottom: "1rem" }}>✕ Cuándo NO tiene sentido</h3>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {whenDoesNotMakeSense.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="service-case-study" style={{ margin: "4rem 0", padding: "2rem", borderRadius: "20px", background: "var(--surface-tint)", border: "1px solid var(--border)" }}>
          <span className="section-tag">Caso Real Verificado</span>
          <h2 style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>{caseStudy.title}</h2>
          <div className="metric-badge" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--accent)", margin: "0.75rem 0" }}>
            {caseStudy.metrics}
          </div>
          <p style={{ lineHeight: "1.6" }}>{caseStudy.description}</p>
        </section>

        <section className="service-faqs" style={{ margin: "4rem 0" }}>
          <h2>Preguntas Frecuentes</h2>
          <div className="faqs-list" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
            {faqs.map((faq, idx) => (
              <article key={idx} className="faq-item" style={{ padding: "1.5rem", borderRadius: "14px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{faq.question}</h3>
                <p style={{ lineHeight: "1.6", color: "var(--text-body)" }}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-cta-block" style={{ margin: "5rem 0", textAlign: "center" }}>
          <div className="match-card-cta" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>¿Querés evaluar este servicio para tu empresa?</h2>
            <p style={{ margin: "1rem 0 1.5rem 0" }}>Agendá una llamada de descubrimiento de 30 minutos directamente con Selenia Sánchez.</p>
            <Link href="/contacto" className="btn btn-dark nav-book-btn" style={{ height: "46px", padding: "0 2rem", fontSize: "1rem" }}>
              Analizar mi proceso →
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
