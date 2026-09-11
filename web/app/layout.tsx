import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Consultoría de Software y Automatización de Procesos | SSSTudio",
    template: `%s | ${SITE.name}`,
  },
  description:
    "Analizamos tus procesos y construimos la tecnología que los resuelve: automatización, integraciones, arquitectura de sistemas y software a medida. 5 años construyendo plataformas usadas en 17 países.",
  alternates: {
    canonical: "/",
    languages: { "es-ES": "/", "en-US": "/en" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE.name,
    title: "Consultoría de Software y Automatización de Procesos | SSSTudio",
    description:
      "Analizamos tus procesos y construimos la tecnología que los resuelve: automatización, integraciones y software a medida.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
