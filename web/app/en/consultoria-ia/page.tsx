import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Consulting for Companies",
  description:
    "We audit operational workflows, identify high-ROI AI opportunities, and design custom technical architecture.",
  alternates: {
    canonical: "/en/consultoria-ia",
    languages: {
      "es-ES": "/consultoria-ia",
      "en-US": "/en/consultoria-ia",
    },
  },
};

export default function EnConsultoriaIAPage() {
  return (
    <ServicePageTemplate
      lang="en"
      slug="en/consultoria-ia"
      h1="AI Consulting for Enterprise Companies"
      metaTitle="AI Consulting for Companies"
      metaDescription="We audit operational workflows, identify high-ROI AI opportunities, and design custom technical architecture."
      directAnswer="Our AI consulting analyzes your company's operational bottlenecks to design technology solutions with direct financial impact. We evaluate technical feasibility, estimated ROI, and architecture before writing a single line of code."
      deliverables={[
        "Comprehensive audit of operational workflows and information silos.",
        "Map of AI opportunities prioritized by financial impact and complexity.",
        "Technical architecture, data privacy, and security documentation.",
        "Proof-of-concept prototype to validate operational hypotheses.",
        "Phased implementation plan with precise timeline and ROI estimates.",
      ]}
      whenMakesSense={[
        "Your teams spend hours on repetitive document processing or data entry.",
        "You manage large volumes of scattered data without algorithmic intelligence.",
        "You want to integrate LLMs privately without exposing confidential corporate data.",
      ]}
      whenDoesNotMakeSense={[
        "You want a generic chatbot without integration into your core databases.",
        "Your internal processes lack any structure, rules, or documentation.",
        "Your transaction volume is too low for automation to cover its cost.",
      ]}
      caseStudy={{
        title: "Enterprise Management Platform replacing Jira",
        metrics: "820+ users across 17 countries with 100% adoption",
        description:
          "We designed and built an end-to-end platform with 380+ configurable workflows and RBAC for 9 roles, eliminating corporate bottlenecks.",
      }}
      faqs={[
        {
          question: "How long does an AI consulting engagement take?",
          answer:
            "An initial evaluation engagement takes between 2 and 4 weeks. During this period, we audit processes, interview key stakeholders, and deliver the technical blueprint and roadmap.",
        },
        {
          question: "How do you guarantee company data privacy?",
          answer:
            "We design architectures using private models hosted in isolated VPCs or proprietary infrastructure. Your corporate data is never used to train public models.",
        },
      ]}
    />
  );
}
