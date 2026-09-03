import { SITE } from "@/lib/site";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    founder: {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.legalName,
      jobTitle: "AI Solution Architect & Software Engineer",
      email: SITE.email,
      sameAs: [SITE.linkedin, SITE.github],
    },
    sameAs: [SITE.linkedin, SITE.github],
    knowsAbout: [
      "Artificial Intelligence",
      "Process Automation",
      "AI Agents",
      "Custom Software Development",
      "LLM Integration",
      "RAG Systems",
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    jobTitle: "Founder & AI Solution Architect",
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
    },
    sameAs: [SITE.linkedin, SITE.github],
    description:
      "5 años construyendo plataformas SaaS, motores de flujos de trabajo, sistemas de reservas, CRMs y herramientas de negocio con IA.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
