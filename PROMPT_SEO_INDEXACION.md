# Prompt — Hacer que el sitio sea indexable y aparezca en búsquedas y en respuestas de IA

> Pegá este bloque en el agente (Antigravity / Cursor / Claude Code) con el repo abierto.
> Objetivo: que cada página exista como **HTML real servido por el servidor**, con su propio título, descripción y contenido, para poder rankear en Google y ser citada por asistentes de IA cuando alguien hace una pregunta.

---

## Contexto y diagnóstico (ya verificado sobre este repo — no hace falta revalidarlo)

El frontend es una SPA de **React 18 + Vite + TypeScript** en `frontend/`. Hoy es **imposible de indexar**, por estas razones concretas:

1. `vercel.json` reescribe **todas** las rutas a `/index.html` (`"source": "/(.*)"`). Y `frontend/public/_redirects` hace lo mismo (`/* /index.html 200`). Cualquier URL nueva devuelve el mismo HTML vacío.
2. `frontend/index.html` no tiene `meta description`, ni `canonical`, ni Open Graph, ni `hreflang`, ni JSON-LD. El `<title>` estático es `"SSSTudio | AI Product Studio"`.
3. El título real se inyecta por JavaScript después de hidratar (`frontend/src/App.tsx:57`, con `document.title = t("meta.title")`). Google lo ve tarde y de forma poco fiable; los asistentes de IA que leen HTML sin ejecutar JS **no lo ven nunca**.
4. El routing es un `pageFromPath` manual con 4 rutas (`frontend/src/App.tsx:24`) que no genera archivos HTML distintos.
5. No existen `robots.txt` ni `sitemap.xml` (verificado: `frontend/public/` solo tiene `_redirects` y `hero_stairs.png`).
6. `i18n` usa `LanguageDetector` sobre el navegador, sin rutas por idioma ni `hreflang`: el contenido que ve un crawler es indeterminado.
7. `frontend/public/hero_stairs.png` pesa **776 KB** sin optimizar — arruina el LCP, que es factor de ranking.

**Conclusión:** no alcanza con agregar meta tags. Hay que migrar a un framework que renderice en servidor. Se migra a **Next.js 15 (App Router)**, que ya se usa en otro proyecto propio, y que resuelve SSR/SSG, metadata por ruta, sitemap, robots e imágenes.

---

## Reglas del trabajo

- **No borres `frontend/` hasta el final.** Se construye la app nueva en paralelo y recién al final se cambia el deploy. Trabajá en una rama: `git checkout -b feat/seo-ssr`.
- **No pierdas el trabajo visual.** Los tokens CSS, temas claro/oscuro, tipografías, acento y animaciones existentes se conservan tal cual.
- Ejecutá las fases **en orden** y frená al final de cada una para verificar. No hagas las 4 de una sola pasada.
- Todo el contenido nuevo va en **español** como idioma por defecto e **inglés** bajo `/en`.
- **No inventes datos, clientes, testimonios ni cifras.** Usá exclusivamente los que están en la sección "Datos reales" de este documento.
- Al final de cada fase: `cd web && npm run build` sin errores.

### Variable a definir antes de empezar
Definí el dominio final en `web/.env.local` y usalo en todos lados como `NEXT_PUBLIC_SITE_URL`. Si todavía no está decidido, usá `https://iamselenia.com` como placeholder y dejalo en una sola constante (`web/lib/site.ts`) para cambiarlo en un solo lugar.

---

# FASE 1 — Esqueleto Next.js + infraestructura SEO

### 1.1 Crear la app

Creá `web/` con Next.js 15, App Router, TypeScript, sin Tailwind (se reutiliza el CSS existente). Copiá:

- `frontend/src/App.css` → `web/app/globals.css` (íntegro, sin tocar variables ni temas)
- `frontend/public/*` → `web/public/`
- Las fuentes: pasá el `<link>` de Google Fonts de `frontend/index.html` a `next/font` en `web/app/layout.tsx`.

### 1.2 Constante de sitio — `web/lib/site.ts`

```ts
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iamselenia.com",
  name: "…", // nombre de marca definitivo de la agencia
  legalName: "Selenia Sánchez",
  email: "seleniadeveloper@gmail.com",
  linkedin: "https://linkedin.com/in/selenia-sanchez",
  github: "https://github.com/seleniassDeveloper",
  locale: "es_ES",
} as const;
```

### 1.3 Metadata base — `web/app/layout.tsx`

Usá la Metadata API. Es obligatorio `metadataBase`, si no los `og:image` salen con URLs relativas y no se renderizan al compartir.

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Consultoría, automatización y software con IA para empresas",
    template: "%s | " + SITE.name,
  },
  description:
    "Analizamos tus procesos y construimos la tecnología que los resuelve: automatización, agentes de IA, integraciones y software a medida. 5 años construyendo plataformas usadas en 17 países.",
  alternates: {
    canonical: "/",
    languages: { "es-ES": "/", "en-US": "/en" },
  },
  openGraph: { type: "website", locale: "es_ES", siteName: SITE.name },
  robots: { index: true, follow: true },
};
```

Y en `<html lang="es">` — **fijo**, no detectado por navegador.

Cada página del sitio exporta su propio `metadata` (o `generateMetadata`) con `title`, `description` y `alternates.canonical` propios. **Ninguna página puede quedar sin description propia.**

### 1.4 `web/app/robots.ts`

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
```

No bloquees `GPTBot`, `ClaudeBot`, `PerplexityBot` ni `OAI-SearchBot`: son los que alimentan las respuestas de los asistentes de IA, que es justamente donde queremos aparecer.

### 1.5 `web/app/sitemap.ts`

Generá el sitemap desde un array central de rutas (`web/lib/routes.ts`), no a mano, para que no se desincronice. Incluí `lastModified` y `alternates.languages`.

### 1.6 `web/public/llms.txt`

Archivo de texto plano que describe qué es el sitio, qué servicios ofrece y qué páginas responden qué preguntas, para asistentes de IA. Formato: título, resumen en 3 líneas, y lista `- [Título](URL): descripción de una línea`.

### 1.7 JSON-LD global — `web/components/JsonLd.tsx`

En el layout, inyectá `Organization` + `Person` enlazados. Los datos salen de la sección "Datos reales".

**Checkpoint Fase 1:** `npm run build` limpio y `curl -s localhost:3000 | grep "<meta name=\"description\""` devuelve la description real.

---

# FASE 2 — Páginas que responden preguntas concretas

Esta es la fase que genera visibilidad. Dos bloques.

## 2.A — Páginas de servicio (búsquedas comerciales)

Una ruta por keyword. Slugs exactos (así los tienen los competidores que hoy rankean):

| Ruta | H1 | Title (≤60 car.) |
|---|---|---|
| `/consultoria-ia` | Consultoría de inteligencia artificial para empresas | Consultoría IA para empresas |
| `/automatizacion-de-procesos-con-ia` | Automatización de procesos empresariales con IA | Automatización de procesos con IA |
| `/agentes-de-ia` | Agentes de IA conectados a tus sistemas | Agentes de IA para empresas |
| `/software-a-medida` | Desarrollo de software a medida para empresas | Software a medida para empresas |
| `/integraciones-crm-erp` | Integración de CRM, ERP, APIs y bases de datos | Integraciones CRM, ERP y APIs |
| `/dashboards-y-reportes` | Dashboards y reportes automáticos | Dashboards y reportes automáticos |
| `/casos` | Sistemas que ya construí | Casos y sistemas construidos |
| `/contacto` | Contame qué proceso querés mejorar | Contacto |

**Estructura obligatoria de cada página de servicio** (en este orden, y el contenido tiene que estar en el HTML del servidor, no cargado por JS):

1. `<h1>` exacto de la tabla.
2. Párrafo de respuesta directa, **máximo 2 frases**, que defina el servicio. Los asistentes de IA extraen este párrafo: tiene que responder solo, sin contexto previo.
3. "Qué incluye" — lista de 4 a 6 entregables concretos.
4. "Cuándo tiene sentido / cuándo no." Incluí el "cuándo no". Es lo que ninguna agencia escribe y es lo que genera confianza y citas.
5. Un caso real relacionado, con cifra (ver "Datos reales").
6. FAQ de 4 a 6 preguntas, cada una redactada **como la escribiría una persona en el buscador**, con `<h3>` + respuesta de 40-60 palabras.
7. CTA a `/contacto`.
8. JSON-LD: `Service` + `FAQPage` + `BreadcrumbList`.

## 2.B — Páginas de respuesta (búsquedas de pregunta) — `/guias/...`

Acá es donde realmente se puede ganar, porque son consultas de baja competencia donde la experiencia propia **es** la respuesta:

- `/guias/cuanto-cuesta-un-agente-de-ia-para-una-empresa`
- `/guias/software-a-medida-o-licencias-saas-como-decidir`
- `/guias/reemplazar-jira-con-una-plataforma-propia`
- `/guias/erp-a-medida-para-pymes-de-servicios`
- `/guias/como-automatizar-agenda-cobros-y-clientes`
- `/guias/como-conectar-crm-whatsapp-y-email-sin-trabajo-manual`

**Formato obligatorio de cada guía (answer-first):**

- `<h1>` = la pregunta literal.
- Inmediatamente después, un bloque `.respuesta-corta` con la respuesta **completa en 2-3 frases**, incluyendo rango de números cuando aplique. Sin introducción, sin "en este artículo veremos".
- Después el desarrollo, con `<h2>` que también son preguntas ("¿De qué depende el precio?", "¿Qué pasa si el proceso cambia?").
- Tablas HTML reales (`<table>`) para comparaciones — se citan mucho mejor que las listas.
- Cierre con el caso propio que respalda la respuesta.
- JSON-LD `FAQPage` + `Article` con `author` apuntando al `Person` del layout.

**Regla de escritura para toda la Fase 2:** frases cortas, sujeto-verbo-objeto, cada párrafo autocontenido. Cero relleno de marketing ("transformamos negocios", "soluciones innovadoras", "revolucionar"). Un asistente de IA cita párrafos que se sostienen solos.

**Checkpoint Fase 2:** `curl -s localhost:3000/agentes-de-ia | grep -c "<h2"` devuelve > 0, y el texto de la FAQ aparece en el HTML crudo.

---

# FASE 3 — Portar la home animada sin perder el SEO

La home tiene GSAP + ScrollTrigger + Lenis + three.js + Firebase (`frontend/src/App.tsx`, 783 líneas). Nada de eso corre en servidor.

Regla: **el texto se renderiza en servidor, la animación se hidrata en cliente.**

- Todos los `<h1>`, `<h2>`, párrafos y CTAs son Server Components con el texto en el HTML.
- GSAP, Lenis, three.js y el `HeroGraphic` van en Client Components (`"use client"`) montados con `useEffect`, o con `dynamic(() => import(...), { ssr: false })` cuando toquen `window`.
- **Nunca** condiciones el texto a que la animación haya cargado.
- Firebase Auth y las demos (`/demo/ceromancia`, `/demo/emociones`, `/demo/calorias`) van con `noindex` y **fuera de la navegación principal**. Son demos de visión computacional que no aportan al posicionamiento B2B y confunden al visitante comercial.
- `hero_stairs.png` (776 KB) → `next/image` con `priority`, `sizes` correcto y salida AVIF/WebP.

**H1 de la home** — la credencial va arriba, no una promesa genérica:

> **Reemplacé Jira para 820 personas en 17 países.**
> Ahora construyo esos sistemas para tu empresa.

Subtítulo: "Consultoría, automatización y software a medida con IA. Analizamos el proceso primero y después elegimos la tecnología."
CTA primario: "Analizar mi proceso".

**Checkpoint Fase 3:** con JavaScript deshabilitado en el navegador, la home muestra H1, subtítulo, servicios y contacto legibles.

---

# FASE 4 — Cambiar el deploy y verificar

1. `vercel.json`: `buildCommand` → `npm run build -w web`, `outputDirectory` → `web/.next`, `framework` → `nextjs`. **Eliminá el bloque `rewrites` catch-all** — es lo que rompía todo.
2. Borrá `frontend/public/_redirects`.
3. Redirects 301 en `web/next.config.ts` desde cualquier URL vieja que ya esté indexada.
4. `<html lang>` correcto por idioma y `hreflang` recíproco entre `/` y `/en`.
5. Recién ahí, borrá `frontend/` en un commit aparte.
6. Limpiá los archivos basura del repo: `frontend/vite.config.ts.timestamp-*.mjs` (hay 4) y agregá `*.timestamp-*.mjs` al `.gitignore`.

### Verificación final (obligatoria, pegá la salida)

```bash
cd web && npm run build && npm run start &
sleep 3
for r in "" consultoria-ia agentes-de-ia software-a-medida guias/cuanto-cuesta-un-agente-de-ia-para-una-empresa; do
  echo "--- /$r"
  curl -s "http://localhost:3000/$r" | grep -o '<title>[^<]*' | head -1
  curl -s "http://localhost:3000/$r" | grep -o 'name="description" content="[^"]\{0,80\}'
  curl -s "http://localhost:3000/$r" | grep -c 'application/ld+json'
done
curl -s http://localhost:3000/sitemap.xml | head -5
curl -s http://localhost:3000/robots.txt
```

Criterio de aceptación: **cada ruta devuelve un `<title>` distinto, una `description` distinta y al menos un bloque JSON-LD, todo en el HTML crudo sin ejecutar JavaScript.**

---

## Después del deploy (esto lo hace la persona, no el agente)

1. Google Search Console: verificar dominio, enviar `sitemap.xml`, usar "Inspección de URL" → "Solicitar indexación" en cada página nueva.
2. Bing Webmaster Tools: importa desde GSC en un clic y alimenta a Copilot.
3. Crear el perfil de Google Business si hay ubicación, y enlazar LinkedIn y GitHub desde el sitio (`sameAs` del JSON-LD ya lo declara; los enlaces recíprocos lo confirman).

---

## Datos reales (única fuente permitida para cifras y casos)

Verificables en el CV. **No agregues ni redondees nada más.**

- 5 años construyendo plataformas SaaS, motores de flujos de trabajo, sistemas de reservas, CRMs y herramientas de negocio con IA.
- Plataforma de gestión empresarial que reemplazó a Jira: **820+ usuarios en 17 países, 100% de adopción**.
- **380+ flujos de trabajo configurables**, estado dinámico y RBAC para **9 roles**.
- **~$300k+ ahorrados** al eliminar ~$3k de licencia por cliente en 100+ empresas, en 2 meses.
- Producto adoptado por **100+ clientes enterprise**.
- Plataforma educativa: **+35% de finalización de cursos** para 2.500+ profesionales, operando en 50+ países.
- **AuraDash**: ERP/CRM multi-tenant propio — agenda con detección de conflictos y zonas horarias, finanzas, inventario, RBAC con aislamiento por tenant, sincronización con Google Calendar, pagos con MercadoPago.
- **Más Repuestos**: marketplace multi-vendor publicado en Google Play en 4 meses.
- Stack: React · Next.js · TypeScript · Node.js · Prisma · PostgreSQL · Docker · Firebase · Anthropic API · n8n.

**Dos advertencias:**
- Antes de nombrar a un ex-empleador o a sus clientes en el sitio público, confirmá que podés hacerlo. Si hay dudas, describí el sistema sin nombrar la empresa ("una plataforma de gestión empresarial adoptada por 100+ clientes enterprise"). Las cifras se sostienen igual.
- AuraDash se mantiene como **producto separado**, no como la marca de la agencia. En el sitio de la agencia aparece como caso que demuestra capacidad técnica.
