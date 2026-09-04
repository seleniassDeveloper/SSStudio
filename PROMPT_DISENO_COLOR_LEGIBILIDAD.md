# Prompt para Antigravity — Mejoras de diseño: más color + mejor legibilidad (no invasivo)

> Pegá este bloque en el agente. Objetivo: que la landing de **SSSTudio (consultoría de IA B2B)** se vea más viva y con mejor lectura, **sin rediseñar**: mismo layout, mismas secciones, mismo copy. Solo color, contraste y detalles. Trabajá sobre el CSS/variables existentes; agregá markup mínimo solo donde se indique.

## Diagnóstico (lo que hay que corregir)
- El sitio es casi monocromo: fondo blanco, texto negro, botones negros. El violeta solo aparece en etiquetas y badges chicos. **Falta color de forma controlada.**
- La fila de servicios (AI Strategy & Audit, AI Agents & Automation, Custom AI Solutions, Data & Infrastructure, Training & Enablement) se ve como texto suelto: **sin íconos, sin tarjeta, sin color.**
- Hay vacíos grandes: lado derecho de la tarjeta "Adopting AI is no longer optional", de "Is your company ready for AI?" y la columna izquierda del contacto.
- El texto secundario es gris claro y algo chico: **mejorar contraste y tamaño.**

## Reglas
- No cambiar estructura, secciones ni textos. No tocar la lógica.
- Cambios sobre todo en CSS (y sus variables). Markup nuevo solo para los íconos de servicios.
- Mantener el violeta como acento principal; sumar 2–3 tonos de apoyo **solo** en acentos pequeños (badges, íconos, líneas). Nada de fondos saturados.
- Conservar look limpio y "premium". Respetar `prefers-reduced-motion`.
- Al final: `cd frontend && npx vite build` sin errores nuevos.

---

## 1) Sistema de color (agregar tokens)
Definí/añadí estas variables CSS en `:root` (ajustá el violeta al que ya usa la marca si difiere):

```css
:root {
  /* Acento principal (violeta/índigo de la marca) */
  --accent: #6C5CE7;
  --accent-strong: #5646D6;
  --accent-50: #F3F1FF;     /* tinte de fondo muy suave */
  --accent-100: #E7E3FF;
  --accent-border: rgba(108, 92, 231, 0.22);

  /* Acentos de apoyo (SOLO para badges/íconos, no fondos grandes) */
  --c-teal: #0E9F9A;   --c-teal-bg: #E6F7F6;
  --c-blue: #2F6BF2;   --c-blue-bg: #E8F0FF;
  --c-amber: #E08A1E;  --c-amber-bg: #FCF1E0;

  /* Texto con mejor contraste */
  --text: #14121A;          /* títulos */
  --text-body: #3B3650;     /* cuerpo: más oscuro que el gris actual */
  --muted: #6A6478;         /* terciario / labels */

  /* Superficies */
  --surface: #FFFFFF;
  --surface-tint: #FAFAFD;  /* fondo de sección alterna */
  --border: rgba(20,18,26,0.10);
  --shadow: 0 14px 40px rgba(20,18,26,0.07);
}
```

## 2) Legibilidad (aplicar global)
- Cuerpo de texto: usar `--text-body` (no negro puro ni gris claro). Subir descripciones de tarjetas/servicios a `font-size: 1rem; line-height: 1.6;`.
- Párrafos largos: `max-width: 60ch` para mejor lectura.
- Labels/etiquetas en mayúscula: `letter-spacing: 0.12em; font-size: 0.78rem;` y color `--accent` o `--muted` (no gris casi invisible).
- Placeholders de formulario: `color: #8A8598;` (legibles pero suaves). Labels del form a `--text` con `font-weight: 600`.
- Asegurar contraste AA: ningún texto informativo por debajo de `#6A6478` sobre blanco.

## 3) Hero
- Fondo: en lugar de blanco plano, un gradiente suave: `radial-gradient(1200px 500px at 80% -10%, var(--accent-50), transparent 60%)` sobre `--surface`.
- Detrás del mockup del dashboard, un **glow** de color: `filter: blur(60px)` con `background: radial-gradient(circle, rgba(108,92,231,0.18), transparent 70%)`, posicionado detrás de la imagen.
- El eyebrow ("AI Consulting Agency") como pill con `background: var(--accent-50); color: var(--accent-strong); border: 1px solid var(--accent-border); border-radius: 999px;`.
- Mantener "business outcomes." en violeta (ya está) — opcional: aplicarle un gradiente `--accent → --c-blue` con `background-clip: text`.
- Botón primario "Book AI Audit": en vez de negro plano, `background: linear-gradient(135deg, var(--accent), var(--accent-strong)); color:#fff;` con sombra `0 8px 24px rgba(108,92,231,0.35)`. El secundario "Explore Solutions": borde y texto violeta, fondo `--accent-50` al hover.

## 4) Fila de servicios (la más floja → darle estructura y color)
Para cada uno de los 5 servicios, envolver en una tarjeta con ícono de color:
- Tarjeta: `padding: 1.5rem; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); transition: .3s;` Hover: `transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--accent-border);`
- Ícono (chip 44×44, `border-radius: 12px`, emoji o SVG simple) con un color de apoyo distinto por servicio para dar vida controlada:
  - AI Strategy & Audit → fondo `--accent-50`, ícono `--accent`
  - AI Agents & Automation → fondo `--c-teal-bg`, ícono `--c-teal`
  - Custom AI Solutions → fondo `--c-blue-bg`, ícono `--c-blue`
  - Data & Infrastructure → fondo `--accent-50`, ícono `--accent-strong`
  - Training & Enablement → fondo `--c-amber-bg`, ícono `--c-amber`
- Título del servicio a `--text` (peso 600) y descripción a `--text-body`.

## 5) Tarjeta "Methodology" (Adopting AI is no longer optional)
- Fondo con tinte: `background: linear-gradient(135deg, var(--accent-50), var(--surface));` y borde `--accent-border`.
- Llenar el vacío de la derecha con 3 mini-stats o pilares (ej. "−40% costos operativos", "24/7 monitoreo", "ROI medible") en chips/columnas con número en `--accent` grande. Si no hay datos reales, usar etiquetas cualitativas, no inventes cifras concretas como verdaderas.
- Barra/acento lateral izquierdo del bloque de título en `--accent` (2–3px).

## 6) Tarjetas de casos de uso (ya son las mejores → solo realzar)
- Variar el color del badge de categoría por tipo (mismo mapeo de la sección 4): Business Intelligence=violeta, B2B Computer Vision=teal, Real-time AI=azul, Edge AI (Mobile)=ámbar. Cada badge con su `*-bg` y color.
- Hover: línea superior de 2px en el color del badge + `box-shadow: var(--shadow)`.
- Labels "OPERATIONAL CHALLENGE / AI SOLUTION" mantener en violeta pero subir contraste del texto debajo a `--text-body`.

## 7) "Is your company ready for AI?" (match)
- Checks: reemplazar el ✓ gris por un círculo relleno `--accent` (o verde `#16A34A`) de 22px con ✓ blanco. Texto a `--text-body`.
- Tarjeta con `background: var(--surface-tint); border:1px solid var(--border);`.
- Rellenar el vacío de la derecha con un panel de color (CTA): bloque `background: linear-gradient(160deg, var(--accent), var(--accent-strong)); color:#fff; border-radius:20px;` con un título corto ("Auditoría gratuita", "30 min", sin costo) y un botón blanco. Esto agrega color fuerte en UN punto, equilibrando el resto.

## 8) Contacto
- Sección con fondo `--surface-tint` para separarla visualmente.
- Form: inputs `border-radius: 12px`, foco con `border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-100);`.
- Botón "Request Consultation": mismo gradiente violeta del hero (no negro).
- Rellenar la columna izquierda (hoy vacía) con 2–3 bullets de confianza ("Respuesta en 24 h", "Sin compromiso", "Arquitectos senior") con íconos en color.

## 9) Detalles finales
- Links del footer y nav: hover en `--accent`.
- Alternar fondo de secciones: blanco / `--surface-tint` / blanco… para dar ritmo sin saturar.
- Separadores (hr) muy tenues: `border-color: var(--border)`.
- Sombras suaves y coherentes (`--shadow`) en todas las tarjetas para profundidad.

## Verificación
`cd frontend && npx vite build` debe transformar todos los módulos sin errores nuevos. Revisar contraste de texto (AA) y que el color se sienta presente pero elegante: acentos y tarjetas con vida, fondos mayormente claros.
