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
    default: "Consultoría en IA y software a medida para empresas | SSSTudio",
    template: `%s | ${SITE.name}`,
  },
  description:
    "Analizamos tus procesos y construimos la tecnología que los resuelve: automatización, agentes de IA, integraciones y software a medida. 5 años construyendo plataformas usadas en 17 países.",
  alternates: {
    canonical: "/",
    languages: { "es-ES": "/", "en-US": "/en" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE.name,
    title: "Consultoría en IA y software a medida para empresas | SSSTudio",
    description:
      "Analizamos tus procesos y construimos la tecnología que los resuelve: automatización, agentes de IA, integraciones y software a medida.",
  },
  robots: {
    index: true,
    follow: true,
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
