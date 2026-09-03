import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Dashboards y reportes automáticos",
  description:
    "Desarrollamos paneles de Business Intelligence que unifican métricas operativas, generan reportes automáticos y emiten alertas de demanda.",
  alternates: {
    canonical: "/dashboards-y-reportes",
    languages: {
      "es-ES": "/dashboards-y-reportes",
      "en-US": "/en/dashboards-y-reportes",
    },
  },
};

export default function DashboardsReportesPage() {
  return (
    <ServicePageTemplate
      slug="dashboards-y-reportes"
      h1="Dashboards y reportes automáticos"
      metaTitle="Dashboards y reportes automáticos"
      metaDescription="Desarrollamos paneles de Business Intelligence que unifican métricas operativas, generan reportes automáticos y emiten alertas de demanda."
      directAnswer="Nuestros dashboards y reportes automáticos consolidan la información dispersa de tus operaciones en una única pantalla en tiempo real. Eliminamos la confección manual de planillas en Excel y enviamos alertas predictivas antes de que ocurran desviaciones críticas."
      deliverables={[
        "Panel interactivo web con KPIs consolidados en tiempo real.",
        "Generación y envío automático de reportes semanales o mensuales en PDF/Excel.",
        "Modelos algorítmicos para detección de anomalías y predicción de demanda.",
        "Filtros avanzados por unidad de negocio, fechas, canales y roles.",
        "Integración directa con bases de datos PostgreSQL, APIs y CRMs.",
      ]}
      whenMakesSense={[
        "Tus ejecutivos esperan días para recibir el reporte mensual consolidado en Excel.",
        "Existen discrepancias entre las cifras informadas por distintos departamentos.",
        "Querés automatizar el envío de reportes periódicos a clientes o inversores.",
      ]}
      whenDoesNotMakeSense={[
        "No contás con datos históricos guardados para alimentar indicadores visuales.",
        "Los indicadores que querés medir cambian arbitrariamente todas las semanas.",
        "Solo buscás una planilla estática de uso ocasional.",
      ]}
      caseStudy={{
        title: "AuraDash: Panel de Control Multi-Tenant e Inventarios",
        metrics: "Consolidación de finanzas, turnos y alertas en tiempo real",
        description:
          "Desarrollamos una interfaz ejecutiva con aislamiento por tenant y métricas financieras consolidadas para la toma de decisiones basada en datos.",
      }}
      faqs={[
        {
          question: "¿Con qué frecuencia se actualizan los datos en el dashboard?",
          answer:
            "Los datos pueden actualizarse en tiempo real (vía webSockets/webhooks) o en intervalos programados (por ejemplo, cada 15 minutos o una vez al día según la necesidad operativa).",
        },
        {
          question: "¿Pueden enviar reportes automáticos por WhatsApp o email?",
          answer:
            "Sí, programamos el envío de resúmenes ejecutivos en PDF o texto directamente a grupos de WhatsApp, canales de Slack o correos de los directivos.",
        },
        {
          question: "¿Se pueden restringir las métricas según el rol del usuario?",
          answer:
            "Implementamos control de acceso basado en roles (RBAC). Cada perfil (gerente, supervisor, cliente) visualiza únicamente los datos e indicadores autorizados para su rango.",
        },
        {
          question: "¿Es necesario cambiar de base de datos para implementar el dashboard?",
          answer:
            "No. El dashboard se conecta mediante conectores de lectura a tus bases de datos o servicios actuales sin alterar la infraestructura existente.",
        },
      ]}
    />
  );
}
