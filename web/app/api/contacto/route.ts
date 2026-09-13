import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, desc } = body;

    if (!name || !desc) {
      return NextResponse.json(
        { error: "Por favor completa tu nombre y el desafío operativo." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = SITE.email || "seleniadeveloper@gmail.com";

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "SSStudio Contacto <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: email || undefined,
        subject: `📩 Nueva Consulta B2B: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; color: #3B1815; max-width: 600px; margin: 0 auto; border: 1px solid #F1D8D6; border-radius: 12px; background-color: #FAF5F1;">
            <h2 style="color: #B05357; margin-top: 0;">Nueva Consulta desde la Web de SSStudio</h2>
            <p style="font-size: 15px; line-height: 1.5;"><strong>Nombre y Empresa:</strong> ${name}</p>
            <p style="font-size: 15px; line-height: 1.5;"><strong>Email de contacto:</strong> ${email || "No especificado"}</p>
            <p style="font-size: 15px; line-height: 1.5;"><strong>Cargo:</strong> ${role || "No especificado"}</p>
            <hr style="border: none; border-top: 1px solid #EBDDCD; margin: 20px 0;" />
            <h3 style="color: #3B1815; font-size: 16px;">Desafío Operativo / Detalle de Consulta:</h3>
            <div style="background-color: #FFFFFF; padding: 18px; border-radius: 8px; border: 1px solid #EBDDCD; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${desc}</div>
            <p style="font-size: 12px; color: #8E6D6B; margin-top: 25px;">Enviado desde el formulario de contacto de SSStudio.</p>
          </div>
        `,
      });
    } else {
      // Si aún no está configurada la API KEY de Resend en el archivo .env, registrar en consola
      console.log("Mensaje de contacto recibido (configurar RESEND_API_KEY en .env):", {
        destinatario: recipientEmail,
        nombre: name,
        email: email || "no especificado",
        cargo: role || "no especificado",
        consulta: desc,
      });
    }

    return NextResponse.json({
      success: true,
      message: "¡Gracias! Tu consulta ha sido enviada con éxito.",
    });
  } catch (error) {
    console.error("Error al procesar el formulario de contacto:", error);
    return NextResponse.json(
      { error: "Ocurrió un inconveniente al enviar la consulta. Inténtalo nuevamente." },
      { status: 500 }
    );
  }
}
