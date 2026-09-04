import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundBlobWrapper } from "@/components/BackgroundBlobWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroGraphic } from "@/components/HeroGraphic";

export const metadata: Metadata = {
  title: "AI Consulting & Custom Software for Companies",
  description:
    "We analyze your business operations and build tailored AI solutions: process automation, AI agents, API integrations, and custom software. 5 years building platforms used in 17 countries.",
  alternates: {
    canonical: "/en",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
};

export default function EnHomePage() {
  return (
    <>
      <SmoothScroll />
      <BackgroundBlobWrapper />
      <Navbar lang="en" />

      <main className="studio-container">
        {/* HERO SECTION */}
        <section id="inicio" className="hero-section hero-layout-split">
          <div className="hero-bg">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>

          <div className="hero-left">
            <div className="hero-pill-badge">
              <span className="pill-dot"></span>
              <span className="pill-text">AI Solution Architect & Software Engineering</span>
            </div>

            <h1 className="hero-h1-new">
              Custom software and AI <span className="text-gradient-purple">for processes that can&apos;t keep up</span>
            </h1>

            <p className="hero-p-new">
              I replaced Jira for 820 users across 17 countries and saved ~$300k in licensing. Now I build those systems for your company.
            </p>

            <div className="hero-ctas-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "2rem 0" }}>
              <Link href="/en/contacto" className="btn btn-primary" style={{ padding: "0.85rem 1.8rem", fontSize: "1.05rem" }}>
                Analyze my process →
              </Link>
              <Link href="/en/casos" className="btn btn-light" style={{ padding: "0.85rem 1.5rem", fontSize: "1rem" }}>
                View case studies
              </Link>
            </div>

            <div className="hero-metrics-row" style={{ display: "flex", gap: "2rem", marginTop: "2.5rem" }}>
              <div>
                <strong style={{ fontSize: "1.8rem", color: "var(--accent)", display: "block" }}>820+</strong>
                <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Users in 17 countries</span>
              </div>
              <div>
                <strong style={{ fontSize: "1.8rem", color: "var(--accent)", display: "block" }}>380+</strong>
                <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Configured workflows</span>
              </div>
              <div>
                <strong style={{ fontSize: "1.8rem", color: "var(--accent)", display: "block" }}>~$300k+</strong>
                <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Saved in license fees</span>
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
            alt="SSSTUDIO AI Consulting & Software Engineering Platform Dashboard"
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
            <span className="section-tag">Our Capabilities</span>
            <h2>Specialized B2B Services</h2>
            <p className="section-description">
              Solutions designed to eliminate operational bottlenecks in your business.
            </p>
          </div>

          <div className="wwd-grid">
            <Link href="/en/consultoria-ia" className="wwd-item">
              <div className="wwd-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
              </div>
              <span className="wwd-kicker">Integrated AI</span>
              <h3>AI Consulting</h3>
              <p>Process auditing and technical AI architecture design with measurable ROI.</p>
            </Link>

            <Link href="/en/automatizacion-de-procesos-con-ia" className="wwd-item">
              <div className="wwd-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="3" transform="rotate(45 12 12)" />
                </svg>
              </div>
              <span className="wwd-kicker">Purposeful Design</span>
              <h3>Process Automation</h3>
              <p>Replacing repetitive manual workflows with automated n8n & LLM pipelines.</p>
            </Link>

            <Link href="/en/agentes-de-ia" className="wwd-item">
              <div className="wwd-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="wwd-kicker">Real Velocity</span>
              <h3>AI Agents</h3>
              <p>Autonomous agents connected to your databases and corporate tools.</p>
            </Link>

            <Link href="/en/software-a-medida" className="wwd-item">
              <div className="wwd-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
                </svg>
              </div>
              <span className="wwd-kicker">Real Products</span>
              <h3>Custom Software</h3>
              <p>Proprietary SaaS platforms without recurring per-user licensing fees.</p>
            </Link>

            <Link href="/en/integraciones-crm-erp" className="wwd-item">
              <div className="wwd-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="wwd-kicker">Your Project</span>
              <h3>CRM & ERP Integrations</h3>
              <p>Seamless connection of systems, APIs, payment gateways, and data sync.</p>
            </Link>

            <Link href="/en/dashboards-y-reportes" className="wwd-item">
              <div className="wwd-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </div>
              <span className="wwd-kicker">Business Intelligence</span>
              <h3>Dashboards & Reporting</h3>
              <p>Real-time Business Intelligence with algorithmic anomaly detection.</p>
            </Link>
          </div>
        </section>

        {/* VISION / METHODOLOGY */}
        <section id="vision" className="section" style={{ margin: "5rem 0" }}>
          <div className="section-header">
            <span className="section-tag">Working Methodology</span>
            <h2>We analyze the process first. We choose the technology second.</h2>
            <p className="section-description">
              We do not sell cookie-cutter solutions. We evaluate your operational structure and build tailored tools that scale.
            </p>
          </div>

          <div className="vision-stats">
            <div className="v-stat">
              <strong>5 Years</strong>
              <span>Building SaaS platforms & AI engines</span>
            </div>
            <div className="v-stat">
              <strong>17 Countries</strong>
              <span>Where our software runs</span>
            </div>
            <div className="v-stat">
              <strong>100+ Companies</strong>
              <span>Benefiting from operational savings</span>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contacto" className="section" style={{ margin: "5rem 0", textAlign: "center" }}>
          <div className="match-card-cta" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2>Ready to optimize your company's processes?</h2>
            <p style={{ margin: "1rem 0 2rem 0", fontSize: "1.1rem" }}>
              Book a 30-minute discovery call with Selenia Sánchez to analyze your operations and calculate ROI.
            </p>
            <Link href="/en/contacto" className="btn btn-primary" style={{ padding: "0.9rem 2.2rem", fontSize: "1.1rem" }}>
              Analyze my process →
            </Link>
          </div>
        </section>
      </main>

      <Footer lang="en" />
    </>
  );
}
