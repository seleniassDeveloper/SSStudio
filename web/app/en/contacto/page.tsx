import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundBlobWrapper } from "@/components/BackgroundBlobWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Book Tech Audit",
  description:
    "Book a 30-minute discovery session with our software consultants to analyze your workflows and evaluate feasibility and ROI.",
  alternates: {
    canonical: "/en/contacto",
    languages: {
      "es-ES": "/contacto",
      "en-US": "/en/contacto",
    },
  },
};

export default function EnContactoPage() {
  return (
    <>
      <SmoothScroll />
      <BackgroundBlobWrapper />
      <Navbar lang="en" />

      <main className="studio-container" style={{ paddingTop: "4rem", paddingBottom: "5rem", maxWidth: "1150px", margin: "0 auto" }}>
        <header className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-tag">Direct B2B Contact</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: "1rem", lineHeight: 1.15 }}>
            Tell us which process you want to optimize
          </h1>
          <p className="section-description" style={{ fontSize: "1.1rem", color: "var(--muted)", maxWidth: "700px" }}>
            Book a 30-minute discovery call with our team of Software Engineering & Process Automation consultants.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          {/* Left Column: What to expect */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid var(--border)", borderRadius: "24px", padding: "2.5rem", boxShadow: "0 14px 38px -6px rgba(59, 24, 21, 0.08)" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: "1.5rem" }}>
              What can you expect from the call?
            </h2>

            <ul className="match-list match-list-yes">
              <li>
                <strong>Direct audit:</strong> Identification of operational bottlenecks without sales pitches.
              </li>
              <li>
                <strong>Clear estimate:</strong> Technical feasibility and estimated development timeline.
              </li>
              <li>
                <strong>ROI calculator:</strong> Initial Return on Investment estimate for your project.
              </li>
              <li>
                <strong>Architecture advice:</strong> Custom software models vs. SaaS integrations.
              </li>
            </ul>

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "16px", background: "var(--surface-tint)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.3rem" }}>
                Target Email
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: "0.3rem" }}>
                {SITE.email}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                Inquiries sent through this form are delivered directly here within 24 business hours.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Component */}
          <ContactForm lang="en" />
        </div>
      </main>

      <Footer lang="en" />
    </>
  );
}
