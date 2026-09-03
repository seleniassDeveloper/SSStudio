import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/GuidePageTemplate";

export const metadata: Metadata = {
  title: "Cómo automatizar agenda, cobros y clientes",
  description:
    "Pasos y arquitectura técnica para integrar reserva de citas, pasarelas de pago y gestión de clientes sin tareas manuales.",
  alternates: {
    canonical: "/guias/como-automatizar-agenda-cobros-y-clientes",
  },
};

export default function GuiaAutomatizarAgendaPage() {
  return (
    <GuidePageTemplate
      slug="como-automatizar-agenda-cobros-y-clientes"
      h1Question="Cómo automatizar agenda, cobros y clientes"
      metaTitle="Cómo automatizar agenda, cobros y clientes"
      metaDescription="Pasos y arquitectura técnica para integrar reserva de citas, pasarelas de pago y gestión de clientes sin tareas manuales."
      shortAnswer="Para automatizar agenda, cobros y clientes se requiere conectar un calendario interactivo con detección de disponibilidad en tiempo real a una pasarela de pagos (como MercadoPago) mediante webhooks que confirman el turno e ingresan el lead al CRM solo tras recibir el pago exitoso."
      comparisonTable={{
        headers: ["Paso del Flujo", "Proceso Manual Tradicional", "Flujo Automatizado de Extremo a Extremo"],
        rows: [
          ["Selección de Turno", "Intercambio de mensajes de disponibilidad", "Selección en calendario con reserva instantánea"],
          ["Procesamiento de Pago", "Envío manual de datos bancarios", "Link de cobro dinámico con MercadoPago"],
          ["Confirmación de Cita", "Confirmación manual por WhatsApp", "Envío automático de evento a Google Calendar"],
          ["Registro en CRM", "Carga manual de datos al finalizar el día", "Registro automático e instantáneo en la base de datos"],
        ],
      }}
      sections={[
        {
          h2Question: "¿Cómo se evitan los turnos duplicados o sobre-reservas?",
          content: (
            <p>
              Se utiliza un bloqueo temporal atómico en la base de datos (PostgreSQL) durante el proceso de pago. El turno seleccionado queda reservado por 10 minutos; si el pago no se concreta, el sistema libera automáticamente la disponibilidad.
            </p>
          ),
        },
        {
          h2Question: "¿Qué pasa si un cliente cancela o reprograma la cita?",
          content: (
            <p>
              El usuario accede a un enlace único de autogestión donde puede reprogramar respetando las políticas de anticipación de la empresa, liberando el slot anterior sin intervención de coordinadores.
            </p>
          ),
        },
      ]}
      caseStudy={{
        title: "Sistema de Reservas y Pagos AuraDash",
        metrics: "Cero ausencias por falta de confirmación y cobros 100% integrados",
        description:
          "Integración nativa de pasarelas de pago con sincronización inmediata a Google Calendar y recordatorios automáticos por WhatsApp/Email.",
      }}
    />
  );
}
