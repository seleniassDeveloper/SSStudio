import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/GuidePageTemplate";

export const metadata: Metadata = {
  title: "Software a medida o licencias SaaS: cómo decidir",
  description:
    "Criterios de decisión financiera y técnica entre pagar licencias comerciales por usuario o desarrollar software empresarial a medida.",
  alternates: {
    canonical: "/guias/software-a-medida-o-licencias-saas-como-decidir",
  },
};

export default function GuiaSoftwareVsSaasPage() {
  return (
    <GuidePageTemplate
      slug="software-a-medida-o-licencias-saas-como-decidir"
      h1Question="Software a medida o licencias SaaS: cómo decidir"
      metaTitle="Software a medida o licencias SaaS: cómo decidir"
      metaDescription="Criterios de decisión financiera y técnica entre pagar licencias comerciales por usuario o desarrollar software empresarial a medida."
      shortAnswer="Conviene elegir software a medida cuando el costo anual acumulado de licencias SaaS supera los $10.000 USD, la plantilla supera los 20 usuarios activos o el proceso operativo constituye una ventaja competitiva única que el software comercial no soporta sin adaptaciones costosas."
      comparisonTable={{
        headers: ["Criterio", "SaaS Comercial", "Software a Medida"],
        rows: [
          ["Modelo de Costos", "Licencia recurrente por usuario/mes", "Inversión inicial + servidor propio"],
          ["Propiedad Intelectual", "Alquiler (propiedad del proveedor)", "100% propiedad legal del cliente"],
          ["Adaptabilidad", "Rígida según roadmap de terceros", "100% personalizada a tu operación"],
          ["Punto de Equilibrio (ROI)", "Económico solo en startups muy pequeñas", "Rentable a partir del mes 6-12 en empresas"],
        ],
      }}
      sections={[
        {
          h2Question: "¿Cuándo el costo por usuario de un SaaS se vuelve inviable?",
          content: (
            <p>
              Plataformas comerciales populares cobran entre $30 y $150 USD mensuales por usuario. Para una empresa con 50 empleados, esto representa entre $18.000 y $90.000 USD anuales en costos fijos recurrentes sin acumular ningún activo tecnológico propio.
            </p>
          ),
        },
        {
          h2Question: "¿Qué riesgos existen al depender 100% de SaaS comerciales?",
          content: (
            <p>
              Los principales riesgos son aumentos unilaterales de tarifas, cambios en las condiciones de API, discontinuación de funciones críticas e imposibilidad de integrar flujos propios de IA o bases de datos internas privadas.
            </p>
          ),
        },
      ]}
      caseStudy={{
        title: "Caso de Análisis: Reemplazo de Licencias Jira",
        metrics: "Ahorro directo de ~$300k+ en 100+ empresas",
        description:
          "Sustitución exitosa de licencias de software comercial por una solución a medida para 820+ usuarios en 17 países con 100% de adopción operativa.",
      }}
    />
  );
}
