import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/GuidePageTemplate";

export const metadata: Metadata = {
  title: "ERP a medida para Pymes de servicios",
  description:
    "Cómo estructurar un ERP a medida para pymes con gestión de agenda, finanzas, inventario, detección de conflictos de zonas horarias y cobros automatizados.",
  alternates: {
    canonical: "/guias/erp-a-medida-para-pymes-de-servicios",
  },
};

export default function GuiaErpPymesPage() {
  return (
    <GuidePageTemplate
      slug="erp-a-medida-para-pymes-de-servicios"
      h1Question="ERP a medida para Pymes de servicios"
      metaTitle="ERP a medida para Pymes de servicios"
      metaDescription="Cómo estructurar un ERP a medida para pymes con gestión de agenda, finanzas, inventario, detección de conflictos de zonas horarias y cobros automatizados."
      shortAnswer="Un ERP a medida para pymes de servicios integra en una sola plataforma la gestión de turnos y agendas, el control de inventario y la facturación, resolviendo automáticamente solapamientos de horarios y conversión de zonas horarias entre clientes e instructores."
      comparisonTable={{
        headers: ["Módulo", "ERP Tradicional Genérico", "ERP a Medida para Servicios"],
        rows: [
          ["Gestión de Agenda", "Estática sin detección de zona horaria", "Dinámica con prevención de solapamientos"],
          ["Cobros e Integración", "Requiere módulos de terceros costosos", "Nativa con MercadoPago y pasarelas locales"],
          ["Arquitectura Multi-Tenant", "No disponible o muy costosa", "Aislamiento nativo por sede o cliente"],
          ["Sincronización Calendar", "Manual o vía plugins inestables", "Bidireccional nativa con Google Calendar"],
        ],
      }}
      sections={[
        {
          h2Question: "¿Qué módulos esenciales debe tener un ERP de servicios?",
          content: (
            <p>
              Debe contar con tres pilares: módulo de agenda e itinerario con detección de conflictos horarios, módulo de finanzas con emisión de facturas/cobros automáticos y módulo de control de usuarios con roles y permisos específicos.
            </p>
          ),
        },
        {
          h2Question: "¿Cómo se gestionan las zonas horarias con clientes internacionales?",
          content: (
            <p>
              La base de datos almacena todas las marcas temporales en formato UTC estandarizado. La aplicación convierte automáticamente cada turno a la zona horaria local del cliente y del profesional al momento de agendar y enviar recordatorios.
            </p>
          ),
        },
      ]}
      caseStudy={{
        title: "AuraDash: Plataforma ERP/CRM Multi-Tenant",
        metrics: "Agenda automatizada + pagos integrados con MercadoPago",
        description:
          "Solución propia desarrollada con Next.js, Prisma, PostgreSQL y Docker para gestión integral de agenda, finanzas y control de acceso por tenant.",
      }}
    />
  );
}
