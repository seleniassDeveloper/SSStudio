import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Agents for Enterprise Companies",
  description:
    "We build intelligent AI agents capable of reasoning, querying databases, and executing actions in internal systems.",
  alternates: {
    canonical: "/en/agentes-de-ia",
    languages: {
      "es-ES": "/agentes-de-ia",
      "en-US": "/en/agentes-de-ia",
    },
  },
};

export default function EnAgentesIAPage() {
  return (
    <ServicePageTemplate
      lang="en"
      slug="en/agentes-de-ia"
      h1="AI Agents Connected to Your Internal Systems"
      metaTitle="AI Agents for Enterprise Companies"
      metaDescription="We build intelligent AI agents capable of reasoning, querying databases, and executing actions in internal systems."
      directAnswer="AI agents are autonomous systems that reason using natural language, query internal databases, and make API calls to execute complex tasks end-to-end according to strict business logic."
      deliverables={[
        "Autonomous agent architecture based on LLMs and vector RAG.",
        "Secure database connections to PostgreSQL, MySQL, and NoSQL engines.",
        "Integration with internal APIs, CRM, ERP, and communication channels.",
        "Guardrails and response verification layers to prevent hallucinations.",
        "Monitoring dashboard for token consumption, latency, and performance.",
      ]}
      whenMakesSense={[
        "You need accurate answers based on constantly updated internal knowledge bases.",
        "You want AI to execute actions like qualifying leads or scheduling appointments.",
        "You need 24/7 technical support without expanding support staff.",
      ]}
      whenDoesNotMakeSense={[
        "You only need static auto-responders without advanced logic.",
        "Your business data is not digitized.",
        "You want an uncontrolled bot without safety restrictions.",
      ]}
      caseStudy={{
        title: "Lead Qualification & Scheduling Agent",
        metrics: "24/7 Availability across 50+ countries",
        description:
          "Integration of AI agents with multi-tenant architecture for automated scheduling, financial tracking, and resource allocation.",
      }}
      faqs={[
        {
          question: "What is the difference between an AI agent and a traditional chatbot?",
          answer:
            "A traditional chatbot follows rigid decision trees. An AI agent possesses natural language reasoning, function calling capabilities, and dynamic problem-solving.",
        },
      ]}
    />
  );
}
