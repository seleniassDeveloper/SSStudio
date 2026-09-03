import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SITE } from "@/lib/site";

export interface GuideSection {
  h2Question: string;
  content: React.ReactNode;
}

export interface GuidePageProps {
  slug: string;
  h1Question: string;
  metaTitle: string;
  metaDescription: string;
  shortAnswer: string;
  sections: GuideSection[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  caseStudy: {
    title: string;
    metrics: string;
    description: string;
  };
  lang?: "es" | "en";
}

export function GuidePageTemplate(props: GuidePageProps) {
  const {
    slug,
    h1Question,
    metaDescription,
    shortAnswer,
    sections,
    comparisonTable,
    caseStudy,
    lang = "es",
  } = props;

  const canonicalUrl = `${SITE.url}/guias/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1Question,
    description: metaDescription,
    author: {
      "@type": "Person",
      name: SITE.legalName,
      url: `${SITE.url}/#person`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: canonicalUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: h1Question,
        acceptedAnswer: {
          "@type": "Answer",
          text: shortAnswer,
        },
      },
      ...sections.map((sec) => ({
        "@type": "Question",
        name: sec.h2Question,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof sec.content === "string" ? sec.content : metaDescription,
        },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar lang={lang} />

      <main className="studio-container guide-page" style={{ paddingTop: "5.5rem", paddingBottom: "3rem", maxWidth: "950px", margin: "0 auto" }}>
        <header className="section-header">
          <span className="section-tag">Guía de Respuesta Directa</span>
          <h1>{h1Question}</h1>

          <div className="respuesta-corta" style={{ margin: "2rem 0", padding: "1.5rem 2rem", borderRadius: "16px", background: "var(--accent-50)", border: "1px solid var(--accent-border)" }}>
            <strong style={{ display: "block", color: "var(--accent-strong)", marginBottom: "0.5rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Respuesta Directa
            </strong>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.65", color: "var(--text)", margin: 0 }}>
              {shortAnswer}
            </p>
          </div>
        </header>

        {comparisonTable && (
          <section className="guide-table-section" style={{ margin: "3rem 0" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px" }}>
                <thead>
                  <tr style={{ background: "var(--surface-tint)" }}>
                    {comparisonTable.headers.map((head, idx) => (
                      <th key={idx} style={{ padding: "1rem", textAlign: "left", borderBottom: "1px solid var(--border)", fontWeight: 700 }}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: "1px solid var(--border)" }}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} style={{ padding: "1rem", lineHeight: "1.5" }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="guide-sections" style={{ display: "flex", flexDirection: "column", gap: "2.5rem", margin: "3rem 0" }}>
          {sections.map((sec, idx) => (
            <article key={idx} className="guide-sec-item">
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "var(--text)" }}>{sec.h2Question}</h2>
              <div style={{ lineHeight: "1.7", color: "var(--text-body)" }}>{sec.content}</div>
            </article>
          ))}
        </section>

        <section className="guide-case-proof" style={{ margin: "4rem 0", padding: "2rem", borderRadius: "20px", background: "var(--surface-tint)", border: "1px solid var(--border)" }}>
          <span className="section-tag">Caso Propio de Respaldo</span>
          <h3 style={{ fontSize: "1.3rem", marginTop: "0.5rem" }}>{caseStudy.title}</h3>
          <div style={{ fontWeight: 700, color: "var(--accent)", margin: "0.5rem 0" }}>{caseStudy.metrics}</div>
          <p style={{ lineHeight: "1.6" }}>{caseStudy.description}</p>
        </section>

        <section className="guide-cta" style={{ margin: "4rem 0", textAlign: "center" }}>
          <h3>¿Querés implementar una solución similar en tu empresa?</h3>
          <p style={{ margin: "0.75rem 0 1.5rem 0" }}>Analizamos tus procesos actuales y diseñamos la arquitectura técnica con ROI claro.</p>
          <Link href="/contacto" className="btn btn-dark nav-book-btn" style={{ height: "46px", padding: "0 2rem" }}>
            Agendar Sesión de Descubrimiento →
          </Link>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
