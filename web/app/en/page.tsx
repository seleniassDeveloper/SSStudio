import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
      <Navbar lang="en" />
      <main className="studio-container" style={{ paddingTop: "6rem" }}>
        <header className="hero-section hero-centered">
          <h1 className="hero-h1-new">
            I replaced Jira for 820 users across 17 countries. Now I build those systems for your company.
          </h1>
          <p className="hero-p-new">
            AI consulting, process automation, and custom software. We analyze your operation first and choose the right technology second.
          </p>
        </header>
      </main>
      <Footer lang="en" />
    </>
  );
}
