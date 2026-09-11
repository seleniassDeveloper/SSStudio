import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
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
      <Navbar lang="en" />
      <main className="studio-container" style={{ paddingTop: "5.5rem", paddingBottom: "3rem", maxWidth: "1100px", margin: "0 auto" }}>
        <header className="section-header">
          <span className="section-tag">Direct B2B Contact</span>
          <h1>Tell us which process you want to optimize</h1>
          <p className="section-description">
            Book a 30-minute discovery call with our team of Software Engineering & Process Automation consultants.
          </p>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", margin: "3rem 0" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>What can you expect from the call?</h2>
            <ul className="match-list match-list-yes" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li>Direct audit of your operational bottlenecks without sales pitches.</li>
              <li>Clear technical feasibility and development timeline estimate.</li>
              <li>Initial Return on Investment (ROI) calculator.</li>
              <li>Architecture recommendation (custom vs SaaS integrations).</li>
            </ul>

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "14px", background: "var(--surface-tint)", border: "1px solid var(--border)" }}>
              <strong>Direct Email:</strong>
              <div style={{ margin: "0.5rem 0", color: "var(--accent)" }}>{SITE.email}</div>
              <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Response within 24 business hours.</div>
            </div>
          </div>

          <div style={{ padding: "2rem", borderRadius: "20px", background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Send a Direct Message</h2>
            <form action={`mailto:${SITE.email}`} method="post" encType="text/plain" className="contact-form">
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Name & Company *</label>
                <input type="text" id="name" name="name" required placeholder="Ex. Sophia - Tech Corp" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="role" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Role</label>
                <input type="text" id="role" name="role" placeholder="Ex. CTO / Head of Ops" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)" }} />
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="desc" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Operational Challenge *</label>
                <textarea id="desc" name="desc" required rows={4} placeholder="What process do you want to automate or software do you need to build?" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)" }}></textarea>
              </div>
              <button type="submit" className="btn btn-dark nav-book-btn" style={{ width: "100%", height: "46px", fontSize: "1rem" }}>
                Send Inquiry →
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}
