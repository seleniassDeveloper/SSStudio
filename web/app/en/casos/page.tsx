import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Case Studies & Built Systems",
  description:
    "Verified technical credentials and case studies of custom software development, AI automation, and enterprise platforms used in 17 countries.",
  alternates: {
    canonical: "/en/casos",
    languages: {
      "es-ES": "/casos",
      "en-US": "/en/casos",
    },
  },
};

export default function EnCasosPage() {
  const cases = [
    {
      title: "Enterprise Management Platform (Jira Replacement)",
      metrics: "820+ active users across 17 countries | 100% adoption",
      description:
        "Full development of a corporate platform with 380+ configurable workflows and RBAC access control for 9 roles. Eliminated per-user licensing costs.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "RBAC"],
    },
    {
      title: "Enterprise License Automation Engine",
      metrics: "~$300k+ saved by eliminating ~$3k license per client across 100+ companies",
      description:
        "Operational savings architecture for 100+ enterprise clients in 2 months. Replaced expensive SaaS subscriptions with proprietary solutions.",
      tags: ["n8n", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      title: "High Performance Educational Platform",
      metrics: "+35% course completion rate for 2,500+ professionals across 50+ countries",
      description:
        "Interactive learning environment with algorithmic student progress tracking and low latency on mobile global connections.",
      tags: ["Next.js", "TypeScript", "Firebase", "PostgreSQL"],
    },
  ];

  return (
    <>
      <Navbar lang="en" />
      <main className="studio-container" style={{ paddingTop: "5.5rem", paddingBottom: "3rem", maxWidth: "1000px", margin: "0 auto" }}>
        <header className="section-header">
          <span className="section-tag">Credentials & Projects</span>
          <h1>Systems I Have Built</h1>
          <p className="section-description">
            5 years of proven experience building SaaS platforms, workflow engines, reservation systems, and enterprise AI tools.
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
          <h2>Want to build a system with this technical standard?</h2>
          <p style={{ margin: "1rem 0 1.5rem 0" }}>Talk directly with Selenia Sánchez about your company's challenge.</p>
          <Link href="/en/contacto" className="btn btn-dark nav-book-btn" style={{ height: "46px", padding: "0 2rem" }}>
            Schedule Call →
          </Link>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}
