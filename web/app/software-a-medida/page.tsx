import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Software a medida para empresas",
  description:
    "Desarrollamos aplicaciones empresariales, plataformas SaaS y herramientas internas a medida sin licencias recurrentes por usuario.",
  alternates: {
    canonical: "/software-a-medida",
    languages: {
      "es-ES": "/software-a-medida",
      "en-US": "/en/software-a-medida",
    },
  },
};

export default function SoftwareAMedidaPage() {
  return (
    <ServicePageTemplate
      slug="software-a-medida"
      h1="Desarrollo de software a medida para empresas"
      metaTitle="Software a medida para empresas"
      metaDescription="Desarrollamos aplicaciones empresariales, plataformas SaaS y herramientas internas a medida sin licencias recurrentes por usuario."
      directAnswer="El desarrollo de software a medida reemplaza suscripciones costosas de SaaS comerciales por plataformas propietarias adaptadas 100% a la operativa de tu empresa. Sos dueño absoluto del código fuente y eliminás los costos recurrentes por cada usuario que sumás a la plantilla."
      deliverables={[
        "Arquitectura frontend y backend escalable en React, Next.js, Node.js y TypeScript.",
        "Diseño de base de datos relacional PostgreSQL con Prisma ORM.",
        "Control de acceso basado en roles (RBAC) y autenticación segura con Firebase.",
        "Integración nativa con pasarelas de pago (MercadoPago) y APIs de terceros.",
        "Código fuente propiedad 100% del cliente sin dependencias de licencias de alquiler.",
      ]}
      whenMakesSense={[
        "Pagás miles de dólares mensuales en licencias por usuario de plataformas rígidas que no se adaptan.",
        "Tus procesos comerciales o de gestión son únicos y constituyen tu ventaja competitiva.",
        "Querés lanzar un producto SaaS propio al mercado con arquitectura escalable desde el día uno.",
      ]}
      whenDoesNotMakeSense={[
        "Un software genérico comercial de $15/mes satisface el 100% de tus necesidades sin modificaciones.",
        "No contás con presupuesto para una inversión inicial en desarrollo tecnológico propio.",
        "Necesitás poner en marcha una solución estandarizada en menos de 48 horas.",
      ]}
      caseStudy={{
        title: "Reemplazo Total de Licencias Corporativas de Jira",
        metrics: "~$300k+ ahorrados al eliminar ~$3k por cliente en 100+ empresas",
        description:
          "Desarrollamos una plataforma de gestión a medida con 380+ flujos configurables y 9 roles de acceso, logrando 100% de adopción en 820+ usuarios distribuidos en 17 países.",
      }}
      faqs={[
        {
          question: "¿Quién es el propietario del código fuente creado?",
          answer:
            "El cliente es el propietario legal y exclusivo del 100% del código fuente, arquitectura y base de datos. No cobramos comisiones por usuario ni regalías de uso.",
        },
        {
          question: "¿Qué stack tecnológico utilizan para el desarrollo?",
          answer:
            "Utilizamos tecnologías de estándar industrial: React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma, Docker y servicios cloud en AWS/GCP o servidores propios.",
        },
        {
          question: "¿Cuánto tiempo requiere desarrollar una plataforma a medida?",
          answer:
            "Un Producto Mínimo Viable (MVP) funcional se entrega en un plazo de 6 a 12 semanas. Sistemas empresariales complejos se despliegan por fases operativas en plazos de 3 a 5 meses.",
        },
        {
          question: "¿Cómo se gestiona el mantenimiento del software tras la entrega?",
          answer:
            "Ofrecemos planes de soporte, monitoreo de infraestructura y mantenimiento evolutivo para asegurar que la plataforma continúe escalando junto a la empresa.",
        },
      ]}
    />
  );
}
