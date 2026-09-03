import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Integraciones CRM, ERP y APIs",
  description:
    "Conectamos tus sistemas dispersos mediante APIs, automatizaciones en n8n, sincronización de bases de datos y pasarelas de pago.",
  alternates: {
    canonical: "/integraciones-crm-erp",
    languages: {
      "es-ES": "/integraciones-crm-erp",
      "en-US": "/en/integraciones-crm-erp",
    },
  },
};

export default function IntegracionesCrmErpPage() {
  return (
    <ServicePageTemplate
      slug="integraciones-crm-erp"
      h1="Integración de CRM, ERP, APIs y bases de datos"
      metaTitle="Integraciones CRM, ERP y APIs"
      metaDescription="Conectamos tus sistemas dispersos mediante APIs, automatizaciones en n8n, sincronización de bases de datos y pasarelas de pago."
      directAnswer="La integración de sistemas elimina las islas de información conectando tu CRM, ERP, plataformas de e-commerce y canales de venta mediante APIs seguras. Garantizamos que cada dato se registre una sola vez y se propague automáticamente en tiempo real."
      deliverables={[
        "Conexión bidireccional entre CRM (HubSpot, Salesforce) y ERP corporativo.",
        "Sincronización de inventario, pedidos y facturación con e-commerce o pasarelas.",
        "Integración de pasarelas de pago como MercadoPago y sincronización con Google Calendar.",
        "Pipelines de datos resilientes construidos con n8n, Node.js y webhooks.",
        "Manejo de reintentos automáticos y monitoreo de fallos de red o API.",
      ]}
      whenMakesSense={[
        "Tus vendedores registran ventas en un sistema y contabilidad debe reingresarlas manualmente.",
        "Usás múltiples herramientas SaaS desconectadas que generan reportes inconsistentes.",
        "Necesitás conectar tu canal de WhatsApp o email con tu CRM sin intervención humana.",
      ]}
      whenDoesNotMakeSense={[
        "Uno de los sistemas a conectar es de código cerrado, antiguo y no posee API ni acceso a base de datos.",
        "Buscás una migración única de datos en lugar de una sincronización continua.",
        "Tus datos de origen están corruptos y requieren limpieza manual antes de cualquier integración.",
      ]}
      caseStudy={{
        title: "AuraDash: ERP/CRM Multi-Tenant Integrado",
        metrics: "Sincronización fluida con Google Calendar, MercadoPago e inventario",
        description:
          "Diseñamos un núcleo de integración multi-tenant con detección automática de zonas horarias y gestión de conflictos de agenda para transacciones seguras.",
      }}
      faqs={[
        {
          question: "¿Qué ocurre si una de las APIs externas se cae?",
          answer:
            "Nuestras integraciones cuentan con colas de mensajes y colas de reintento con tiempo de espera exponencial. Si un servicio externo no responde, el evento se encola y se procesa automáticamente al restablecerse la conexión sin pérdida de datos.",
        },
        {
          question: "¿Se pueden integrar sistemas legados o antiguos?",
          answer:
            "Sí, siempre que exista acceso a la base de datos subyacente (SQL Server, MySQL, PostgreSQL) o soporte para exportaciones/lecturas automatizadas vía agentes intermedios.",
        },
        {
          question: "¿Cuánto tiempo toma conectar dos plataformas principales?",
          answer:
            "Una integración estándar entre un CRM y un ERP o pasarela de pagos toma típicamente entre 1 y 3 semanas, incluyendo pruebas de esfuerzo y seguridad.",
        },
        {
          question: "¿Utilizan herramientas no-code como Zapier o código a medida?",
          answer:
            "Priorizamos arquitecturas robustas con n8n auto-alojado, Node.js y TypeScript. Esto evita límites arbitrarios de tareas y costos desmedidos de suscripciones externas.",
        },
      ]}
    />
  );
}
