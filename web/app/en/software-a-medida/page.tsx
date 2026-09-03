import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom Software Development for Companies",
  description:
    "We build enterprise applications, SaaS platforms, and internal tools without recurring per-user licensing fees.",
  alternates: {
    canonical: "/en/software-a-medida",
    languages: {
      "es-ES": "/software-a-medida",
      "en-US": "/en/software-a-medida",
    },
  },
};

export default function EnSoftwareAMedidaPage() {
  return (
    <ServicePageTemplate
      lang="en"
      slug="en/software-a-medida"
      h1="Custom Software Development for Companies"
      metaTitle="Custom Software Development for Companies"
      metaDescription="We build enterprise applications, SaaS platforms, and internal tools without recurring per-user licensing fees."
      directAnswer="Custom software development replaces expensive SaaS subscriptions with proprietary platforms 100% tailored to your operations. You retain 100% ownership of the source code and eliminate recurring per-user fees."
      deliverables={[
        "Frontend & backend architecture in React, Next.js, Node.js, and TypeScript.",
        "Relational PostgreSQL database design with Prisma ORM.",
        "Role-based access control (RBAC) and authentication.",
        "Native integrations with payment gateways (MercadoPago) and 3rd party APIs.",
        "100% client source code ownership.",
      ]}
      whenMakesSense={[
        "You pay thousands monthly in per-user licenses for rigid platforms.",
        "Your business processes are unique competitive advantages.",
        "You want to launch your own SaaS product with scalable architecture.",
      ]}
      whenDoesNotMakeSense={[
        "Generic off-the-shelf software covers 100% of your needs.",
        "You have no budget for initial technological investment.",
        "You need a solution deployed in less than 48 hours.",
      ]}
      caseStudy={{
        title: "Enterprise Jira Replacement Platform",
        metrics: "~$300k+ saved across 100+ enterprise clients",
        description:
          "Custom platform with 380+ workflows and 9 access roles, reaching 100% adoption across 820+ users in 17 countries.",
      }}
      faqs={[
        {
          question: "Who owns the source code?",
          answer:
            "The client retains 100% legal ownership of all source code, architecture, and database schemas. We charge zero per-user royalties.",
        },
      ]}
    />
  );
}
