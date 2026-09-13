"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

interface ContactFormProps {
  lang?: "es" | "en";
}

export function ContactForm({ lang = "es" }: ContactFormProps) {
  const isEn = lang === "en";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    desc: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // 1. Enviar vía API /contacto
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (isEn ? "Failed to send message" : "Error al enviar el mensaje"));
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(isEn ? "An unexpected error occurred." : "Ocurrió un error inesperado.");
      }
    }
  };

  const mailtoUrl = `mailto:seleniadeveloper@gmail.com?subject=${encodeURIComponent(
    `📩 Consulta / Cita de ${formData.name || "Cliente"}`
  )}&body=${encodeURIComponent(
    `Nombre y Empresa: ${formData.name}\nEmail de contacto: ${formData.email}\nCargo: ${formData.role}\n\nConsulta:\n${formData.desc}`
  )}`;

  return (
    <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5F1 100%)", border: "1.5px solid rgba(59, 24, 21, 0.14)", borderRadius: "24px", padding: "2.75rem", boxShadow: "0 20px 48px -10px rgba(59, 24, 21, 0.09), 0 4px 14px rgba(176, 83, 87, 0.04)" }}>
      <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
        {isEn ? "Send a Direct Message / Book Audit" : "Enviar mensaje o Agendar Cita"}
      </h2>
      <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1.75rem" }}>
        {isEn
          ? "Fill in your details to send a direct inquiry to seleniadeveloper@gmail.com."
          : "Completá tus datos para enviar tu consulta o agendar tu sesión de consultoría."}
      </p>

      {status === "success" ? (
        <div style={{ padding: "1.75rem", borderRadius: "16px", background: "var(--accent-50)", border: "1.5px solid var(--accent-border)", textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", margin: "0 auto 1rem auto" }}>
            ✓
          </div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
            {isEn ? "Inquiry Processed!" : "¡Consulta Procesada con Éxito!"}
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-body)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
            {isEn
              ? `Your message is directed to ${SITE.email}. You can also open your mail app to confirm directly.`
              : `Tu mensaje se ha derivado a ${SITE.email}. También podés enviarlo directamente desde tu cliente de correo:`}
          </p>

          <a
            href={mailtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: "inline-flex", padding: "0.75rem 1.25rem", fontSize: "0.9rem", width: "100%", justifyContent: "center", marginBottom: "1rem" }}
          >
            ✉️ {isEn ? "Send via your Email App (Gmail/Mail)" : "Abrir y Enviar desde mi Email (Gmail/Mail)"}
          </a>

          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormData({ name: "", email: "", role: "", desc: "" });
            }}
            className="btn btn-secondary"
            style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}
          >
            {isEn ? "Send another message" : "Enviar otra consulta"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {status === "error" && (
            <div style={{ padding: "0.85rem 1rem", borderRadius: "10px", background: "var(--error-bg)", border: "1px solid var(--error)", color: "var(--error)", fontSize: "0.9rem" }}>
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">{isEn ? "Name & Company *" : "Nombre y Empresa *"}</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={isEn ? "Ex. Sophia - Tech Corp" : "Ej. Sofía - Empresa Tech"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{isEn ? "Email Address *" : "Email de contacto *"}</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={isEn ? "sophia@company.com" : "tuemail@empresa.com"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">{isEn ? "Role" : "Cargo"}</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder={isEn ? "Ex. CTO / Head of Ops" : "Ej. CTO / Director de Operaciones"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc">{isEn ? "Operational Challenge *" : "Desafío operativo / Consulta *"}</label>
            <textarea
              id="desc"
              name="desc"
              required
              rows={4}
              value={formData.desc}
              onChange={handleChange}
              placeholder={
                isEn
                  ? "What process do you want to automate or software do you need to build?"
                  : "¿Qué proceso querés automatizar o qué software necesitás construir?"
              }
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary"
            style={{ width: "100%", padding: "0.95rem 1.5rem", fontSize: "1rem", marginTop: "0.5rem", opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading"
              ? (isEn ? "Sending inquiry..." : "Enviando consulta...")
              : (isEn ? "Enviar Consulta / Programar Cita →" : "Enviar Consulta / Programar Cita →")}
          </button>

          <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            {isEn ? "Or write directly to:" : "O escribinos directamente a:"}{" "}
            <a
              href="mailto:seleniadeveloper@gmail.com?subject=Consulta%20o%20Cita%20SSStudio"
              style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "underline" }}
            >
              seleniadeveloper@gmail.com
            </a>
          </div>
        </form>
      )}
    </div>
  );
}


