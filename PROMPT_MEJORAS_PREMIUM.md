# Prompt — Refinamiento premium de SSSTudio

> Copialo y pegalo tal cual para reaplicar (o repetir) las mejoras visuales de esta sesión.
> Pensado para una IA con acceso al código del frontend (React + Vite + TypeScript, GSAP/ScrollTrigger + Lenis ya configurados, fuentes Outfit/Inter/Cormorant Garamond, acento dorado, temas claro/oscuro con variables CSS).

---

## Objetivo

Hacer que toda la landing de **SSSTudio** se vea lo más **premium** posible, manteniendo el mensaje actual de **"apps con IA"** (no agregar páginas web ni asesoramientos) y trabajando **sobre la base existente** (mejoras, no rediseño). Todo debe quedar limpio y corto: el usuario no debe saturarse de información, pero sí tener una experiencia visual cuidada. No tocar el contenido ni la estructura de secciones.

## Reglas

- Refinar `frontend/src/App.css` y `frontend/src/App.tsx` sin romper la base ni los textos i18n.
- Respetar las variables CSS y los temas claro/oscuro existentes (`--accent`, `--panel`, `--border`, etc.).
- Respetar `prefers-reduced-motion`.
- Verificar al final que compila (`vite build`).

## Cambios a aplicar

**1. Base tipográfica y de lienzo**
- Activar `text-rendering: optimizeLegibility`, `-moz-osx-font-smoothing: grayscale` y `font-feature-settings` en `body`.
- Agregar un **grano sutil** sobre todo el lienzo (`body::after`, ruido SVG, `opacity ~0.025`, `mix-blend-mode: overlay`, `pointer-events: none`).
- Estilo de selección de texto con el acento dorado (`::selection`).

**2. Hero**
- Agregar un **eyebrow** arriba del título: chip redondeado con borde dorado, blur y un punto que pulsa (`@keyframes`). Texto vía i18n `hero.eyebrow` con `defaultValue: "Studio de producto con IA"`.
- Título más apretado y elegante: `letter-spacing` más negativo, `line-height` ~1.08, escala `clamp` un poco mayor.
- Subtítulo centrado, con `max-width` ~620px para mejor lectura.

**3. Botones**
- Primario: sombra refinada + un **brillo diagonal que recorre el botón** al hover (pseudo-elemento que se desplaza), `translateY(-2px)`.
- Secundario: glass (`backdrop-filter: blur`), borde que vira a dorado al hover.
- Estado `:active` que vuelve a `translateY(0)`. Bordes ~10px.

**4. Etiquetas de sección**
- `.section-tag` como `inline-flex` con una **línea-acento degradada** antes del texto y más `letter-spacing`.
- Títulos `h2` con escala `clamp`, `letter-spacing` más negativo y `line-height` ajustado.

**5. Tarjetas (servicios y productos)**
- Glass: `backdrop-filter: blur(16px) saturate(120%)`, radios ~18px.
- Hover: elevación mayor, borde dorado, **sombra más profunda + hairline dorada superior** y glow radial suave (pseudo-elementos `::before`/`::after`).
- Iconos de servicios con fondo degradado, borde dorado y leve `scale + rotate` al hover.
- Badges en tono dorado suave.
- Transiciones con `cubic-bezier(0.16, 1, 0.3, 1)`.

**6. Formulario**
- Inputs con radios ~10px y **glow de foco** (`box-shadow: 0 0 0 3px` del acento suave).

**7. Animaciones de entrada (scroll reveal)**
- En `App.tsx`, solo en la home, un `useEffect` con `gsap.context`:
  - Revelar `.section-header`, `.vision-body`, `.match-card`, `.cta-container` con fade + `y` (`power3.out`, `start: "top 88%"`, `once: true`).
  - Revelar las tarjetas de `.services-grid` y `.products-grid` con **stagger** (~0.08).
  - Llamar `ScrollTrigger.refresh()` tras montar y `ctx.revert()` en el cleanup.
  - Saltar todo si `prefers-reduced-motion: reduce`.

## Verificación

Ejecutar `vite build` y confirmar que transforma todos los módulos sin errores nuevos. (Los errores de `tsc` en el proxy de Lenis y en `BackgroundBlob.tsx` son preexistentes.)
