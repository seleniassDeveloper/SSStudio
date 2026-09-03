import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/GuidePageTemplate";

export const metadata: Metadata = {
  title: "Reemplazar Jira con una plataforma propia",
  description:
    "Caso real de desarrollo de plataforma de gestión de proyectos y procesos que reemplazó a Jira para 820+ usuarios en 17 países.",
  alternates: {
    canonical: "/guias/reemplazar-jira-con-una-plataforma-propia",
  },
};

export default function GuiaReemplazarJiraPage() {
  return (
    <GuidePageTemplate
      slug="reemplazar-jira-con-una-plataforma-propia"
      h1Question="Reemplazar Jira con una plataforma propia"
      metaTitle="Reemplazar Jira con una plataforma propia"
      metaDescription="Caso real de desarrollo de plataforma de gestión de proyectos y procesos que reemplazó a Jira para 820+ usuarios en 17 países."
      shortAnswer="Reemplazar Jira por una plataforma propia permitió eliminar más de $300k USD en costos de licencias acumulados en 100+ empresas, logrando un 100% de adopción en 820+ usuarios distribuidos en 17 países gracias a una interfaz personalizada con 380+ flujos configurables y 9 roles de acceso RBAC."
      comparisonTable={{
        headers: ["Métrica / Función", "Jira Comercial", "Plataforma Propia Desarrollada"],
        rows: [
          ["Costo por usuario", "~$7 - $15 USD / usuario / mes", "$0 (Infraestructura propia de servidor)"],
          ["Flujos de trabajo", "Configuración compleja por plugins", "380+ flujos dinámicos nativos"],
          ["Roles de acceso (RBAC)", "Limitado a esquema predeterminado", "9 roles a medida con aislamiento estricto"],
          ["Adopción de usuarios", "Fricción por curva de aprendizaje", "100% de adopción en 17 países"],
        ],
      }}
      sections={[
        {
          h2Question: "¿Por qué las empresas buscan sustituir Jira?",
          content: (
            <p>
              Las principales razones son el costo creciente del licenciamiento anual al escalar la plantilla, la lentitud percibida en la interfaz por exceso de campos no utilizados y la complejidad de configurar flujos que involucren a equipos no técnicos.
            </p>
          ),
        },
        {
          h2Question: "¿Cómo se asegura una migración sin interrupción operativa?",
          content: (
            <p>
              La migración se ejecutó mapeando primero los 380+ flujos de trabajo existentes y migrando la base de datos relacional PostgreSQL con Prisma ORM, manteniendo una ventana de sincronización dual durante 14 días.
            </p>
          ),
        },
      ]}
      caseStudy={{
        title: "Credencial Real de Implementación",
        metrics: "820+ usuarios | 17 países | 380+ flujos | RBAC 9 roles",
        description:
          "Desarrollo completo con React, TypeScript, Node.js y PostgreSQL, alcanzando el 100% de adopción operativa en menos de 60 días.",
      }}
    />
  );
}
