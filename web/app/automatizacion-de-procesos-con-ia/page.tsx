import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Automatización de procesos con IA",
  description:
    "Reemplazamos tareas manuales y repetitivas por flujos automatizados con modelos de Inteligencia Artificial integrados a tus herramientas de gestión.",
  alternates: {
    canonical: "/automatizacion-de-procesos-con-ia",
    languages: {
      "es-ES": "/automatizacion-de-procesos-con-ia",
      "en-US": "/en/automatizacion-de-procesos-con-ia",
    },
  },
};

export default function AutomatizacionProcesosPage() {
  return (
    <ServicePageTemplate
      slug="automatizacion-de-procesos-con-ia"
      h1="Automatización de procesos empresariales con IA"
      metaTitle="Automatización de procesos con IA"
      metaDescription="Reemplazamos tareas manuales y repetitivas por flujos automatizados con modelos de Inteligencia Artificial integrados a tus herramientas de gestión."
      directAnswer="La automatización de procesos empresariales con IA sustituye el trabajo manual repetitivo por flujos algorítmicos capaces de clasificar información, procesar documentos y ejecutar acciones en tus sistemas 24/7. Reducimos errores de carga manual y liberamos tiempo de tu equipo clave."
      deliverables={[
        "Mapeo e ingesta automatizada de documentos, facturas y correos.",
        "Flujos de trabajo ejecutados con n8n, Python y modelos LLM.",
        "Validación automática de datos contra bases de datos PostgreSQL o CRM.",
        "Notificaciones y alertas en tiempo real vía Slack, WhatsApp o email.",
        "Panel de control para supervisión de ejecuciones y logs de auditoría.",
      ]}
      whenMakesSense={[
        "Tus empleados dedican más de 10 horas semanales a copiar y pegar datos entre sistemas.",
        "Procesás documentos con formatos variables que las herramientas tradicionales no entienden.",
        "Requerís sincronización continua entre tus canales de venta y tu sistema de facturación.",
      ]}
      whenDoesNotMakeSense={[
        "Buscás automatizar un proceso que requiere juicio ético o negociación directa con clientes.",
        "El volumen mensual de tareas manuales es inferior a 50 transacciones.",
        "No existe una API o acceso directo a los sistemas donde querés volcar la información.",
      ]}
      caseStudy={{
        title: "Motor de 380+ Flujos de Trabajo Configurables",
        metrics: "100+ empresas beneficiadas con automatización total",
        description:
          "Construimos un motor de flujos con estado dinámico y asignación automática por roles, eliminando tareas manuales y ahorrando ~$300k+ en licencias corporativas.",
      }}
      faqs={[
        {
          question: "¿Qué tecnologías utilizan para automatizar procesos?",
          answer:
            "Utilizamos n8n, Python, Node.js, PostgreSQL y APIs de modelos LLM como Anthropic Claude y OpenAI. Integramos las herramientas directamente con tus sistemas existentes sin interrumpir la operación.",
        },
        {
          question: "¿Qué ocurre si una tarea falla en el flujo automatizado?",
          answer:
            "Implementamos manejo estricto de excepciones y fallback manual. Si un documento no cumple el umbral de confianza algorítmico, el sistema lo deriva automáticamente a revisión humana con una alerta detallada.",
        },
        {
          question: "¿Cuánto tiempo toma implementar una automatización?",
          answer:
            "Una automatización puntual de proceso (por ejemplo, procesamiento de facturas o enriquecimiento de leads) toma entre 2 y 3 semanas desde la especificación hasta el despliegue en producción.",
        },
        {
          question: "¿Cómo se calcula el ahorro económico de la automatización?",
          answer:
            "El ahorro se calcula multiplicando el número de horas de trabajo manual ahorradas por el costo hora del personal especializado, sumado a la eliminación de errores operativos y multas por demora.",
        },
      ]}
    />
  );
}
