import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Agentes de IA para empresas",
  description:
    "Desarrollamos agentes inteligentes de Inteligencia Artificial capaces de razonar, consultar bases de datos y ejecutar acciones en tus sistemas internos.",
  alternates: {
    canonical: "/agentes-de-ia",
    languages: {
      "es-ES": "/agentes-de-ia",
      "en-US": "/en/agentes-de-ia",
    },
  },
};

export default function AgentesIAPage() {
  return (
    <ServicePageTemplate
      slug="agentes-de-ia"
      h1="Agentes de IA conectados a tus sistemas"
      metaTitle="Agentes de IA para empresas"
      metaDescription="Desarrollamos agentes inteligentes de Inteligencia Artificial capaces de razonar, consultar bases de datos y ejecutar acciones en tus sistemas internos."
      directAnswer="Los agentes de IA son sistemas autónomos que no solo responden preguntas, sino que leen información de tus bases de datos, toman decisiones según reglas de negocio y ejecutan llamadas a APIs o herramientas internas para completar tareas complejas de extremo a extremo."
      deliverables={[
        "Arquitectura de agentes autónomos basados en modelos LLM y RAG.",
        "Conexión segura a bases de datos PostgreSQL, MySQL o motores NoSQL.",
        "Integración con APIs internas, CRM, ERP y canales de comunicación.",
        "Mecanismos de barandillas de seguridad (guardrails) y validación de respuestas.",
        "Dashboard de monitoreo de tokens, latencia y rendimiento por agente.",
      ]}
      whenMakesSense={[
        "Requerís respuestas avanzadas basadas en documentos o normativas internas actualizadas.",
        "Querés que la IA realice acciones concretas como calificar leads, crear tickets o agendar citas.",
        "Buscás brindar atención técnica o soporte interno 24/7 sin sumar personal administrativo adicional.",
      ]}
      whenDoesNotMakeSense={[
        "Solo necesitás enviar respuestas automáticas estáticas o predefinidas sin lógica avanzada.",
        "Tus datos de negocio no están digitalizados o están almacenados en papel sin escanear.",
        "Buscás un bot completamente descontrolado sin supervisión ni restricciones de seguridad.",
      ]}
      caseStudy={{
        title: "Agente de Calificación de Leads y Agendamiento Operativo",
        metrics: "Disponibilidad 24/7 en 50+ países con resolución inmediata",
        description:
          "Integración de agentes con lógica de negocio y arquitectura multi-tenant (AuraDash) para gestión automatizada de agenda, finanzas y asignación de recursos.",
      }}
      faqs={[
        {
          question: "¿Qué diferencia a un agente de IA de un chatbot tradicional?",
          answer:
            "Un chatbot tradicional sigue reglas rígidas de árbol de decisión. Un agente de IA posee capacidad de razonamiento con lenguaje natural, puede consultar herramientas externas mediante llamadas a funciones (function calling) y resuelve tareas dinámicas no programadas explícitamente.",
        },
        {
          question: "¿Cómo se evita que un agente alucine o invente información?",
          answer:
            "Implementamos arquitectura RAG (Retrieval-Augmented Generation) respaldada por validación estricta en base de conocimientos corporativa y capas de guardrails que fuerzan al agente a responder únicamente con datos verificables de la empresa.",
        },
        {
          question: "¿Con qué sistemas se puede conectar un agente de IA?",
          answer:
            "Se puede conectar a cualquier sistema que disponga de una API, webhooks o acceso a base de datos: HubSpot, Salesforce, WhatsApp Business, Google Calendar, PostgreSQL, MercadoPago, ERPs a medida y repositorios de documentos.",
        },
        {
          question: "¿Cuánto cuesta el mantenimiento de un agente de IA?",
          answer:
            "El costo operativo depende del consumo de tokens del proveedor de modelos (Anthropic, OpenAI) y el almacenamiento vectorial. Para la mayoría de las pymes, este consumo oscila entre $30 y $150 USD mensuales.",
        },
      ]}
    />
  );
}
