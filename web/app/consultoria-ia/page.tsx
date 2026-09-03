import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Consultoría IA para empresas",
  description:
    "Analizamos tus procesos operativos, identificamos oportunidades de Inteligencia Artificial con alto ROI y diseñamos la arquitectura técnica adecuada.",
  alternates: {
    canonical: "/consultoria-ia",
    languages: {
      "es-ES": "/consultoria-ia",
      "en-US": "/en/consultoria-ia",
    },
  },
};

export default function ConsultoriaIAPage() {
  return (
    <ServicePageTemplate
      slug="consultoria-ia"
      h1="Consultoría de inteligencia artificial para empresas"
      metaTitle="Consultoría IA para empresas"
      metaDescription="Analizamos tus procesos operativos, identificamos oportunidades de Inteligencia Artificial con alto ROI y diseñamos la arquitectura técnica adecuada."
      directAnswer="Nuestra consultoría de Inteligencia Artificial analiza la operación de tu empresa para identificar cuellos de botella y diseñar soluciones tecnológicas con impacto financiero directo. Evaluamos viabilidad técnica, retorno de inversión estimado y arquitectura necesaria antes de escribir una sola línea de código."
      deliverables={[
        "Auditoría integral de flujos operativos y silos de información.",
        "Mapa de oportunidades de IA jerarquizado por impacto financiero y complejidad.",
        "Documento de arquitectura técnica, privacidad de datos y seguridad.",
        "Prototipo conceptual de viabilidad para validar hipótesis.",
        "Plan de implementación por fases con estimación precisa de plazos y ROI.",
      ]}
      whenMakesSense={[
        "Tenés equipos dedicados a tareas repetitivas de procesamiento de datos o documentos.",
        "Manejás grandes volúmenes de datos dispersos sin explotación algorítmica.",
        "Querés integrar LLMs de forma privada sin exponer información corporativa confidencial.",
      ]}
      whenDoesNotMakeSense={[
        "Buscás instalar un chatbot genérico sin integración a tus bases de datos.",
        "Tus procesos internos cambian a diario y carecen de cualquier estructura o regla previa.",
        "El volumen de transacciones o consultas es tan bajo que la automatización no cubre sus costos.",
      ]}
      caseStudy={{
        title: "Plataforma de Gestión Empresarial que reemplazó a Jira",
        metrics: "820+ usuarios en 17 países con 100% de adopción",
        description:
          "Diseñamos y construimos una plataforma integral con 380+ flujos de trabajo configurables y control de acceso para 9 roles, eliminando cuellos de botella operativos corporativos.",
      }}
      faqs={[
        {
          question: "¿Cuánto dura una consultoría de IA para empresas?",
          answer:
            "Una consultoría inicial de evaluación dura entre 2 y 4 semanas. Durante este periodo analizamos los procesos, entrevistamos a los líderes operativos y entregamos el informe técnico con la hoja de ruta y la arquitectura del sistema.",
        },
        {
          question: "¿Cómo garantizan la privacidad de los datos de mi empresa?",
          answer:
            "Diseñamos arquitecturas con modelos privados alojados en infraestructura propia o VPC dedicadas. Los datos corporativos no se utilizan para entrenar modelos públicos de terceros ni salen de tu entorno seguro.",
        },
        {
          question: "¿Qué diferencia a su consultoría de una agencia tradicional?",
          answer:
            "No vendemos horas de desarrollo sin análisis previo. Somos arquitectos de software con 5 años de experiencia real construyendo sistemas adoptados en 17 países. Analizamos la operación primero y elegimos la tecnología después.",
        },
        {
          question: "¿Qué retorno de inversión (ROI) se puede esperar?",
          answer:
            "El ROI típico se traduce en reducción de horas operativas manuales y eliminación de licencias de software por usuario. En proyectos similares hemos alcanzado ahorros de ~$300k+ al eliminar licencias costosas.",
        },
      ]}
    />
  );
}
