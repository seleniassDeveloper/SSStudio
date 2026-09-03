import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundBlobWrapper } from "@/components/BackgroundBlobWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroGraphic } from "@/components/HeroGraphic";

export const metadata: Metadata = {
  title: "AI Consulting, Process Automation & Custom Software for Companies",
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
          <div className="hero-left">
            <div className="hero-pill-badge">
              <span className="pill-dot"></span>
              <span className="pill-text">AI Solution Architect & Software Engineering</span>
            </div>

            <h1 className="hero-h1-new">
              I replaced Jira for 820 users across 17 countries. <span className="text-gradient-purple">Now I build those systems for your company.</span>
            </h1>

            <p className="hero-p-new">
              AI consulting, process automation, and custom software. We analyze your operation first and choose the right technology second.
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
            src="/ssstudio_dashboard_real.png"
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
              <div className="wwd-item-header">
                <div className="wwd-icon">🧠</div>
                <h3>AI Consulting</h3>
              </div>
              <p>Process auditing and technical AI architecture design with measurable ROI.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/en/automatizacion-de-procesos-con-ia" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">⚡</div>
                <h3>Process Automation</h3>
              </div>
              <p>Replacing repetitive manual workflows with automated n8n & LLM pipelines.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/en/agentes-de-ia" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">🤖</div>
                <h3>AI Agents</h3>
              </div>
              <p>Autonomous agents connected to your databases and corporate tools.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/en/software-a-medida" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">💻</div>
                <h3>Custom Software</h3>
              </div>
              <p>Proprietary SaaS platforms without recurring per-user licensing fees.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/en/integraciones-crm-erp" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">🔗</div>
                <h3>CRM & ERP Integrations</h3>
              </div>
              <p>Seamless connection of systems, APIs, payment gateways, and data sync.</p>
              <div className="wwd-line"></div>
            </Link>

            <Link href="/en/dashboards-y-reportes" className="wwd-item">
              <div className="wwd-item-header">
                <div className="wwd-icon">📊</div>
                <h3>Dashboards & Reporting</h3>
              </div>
              <p>Real-time Business Intelligence with algorithmic anomaly detection.</p>
              <div className="wwd-line"></div>
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
