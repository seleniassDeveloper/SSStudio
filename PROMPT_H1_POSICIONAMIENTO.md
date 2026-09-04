# Prompt — Reposicionar el H1 del home: de credencial a promesa

> Pegá este bloque en el agente (Antigravity / Cursor / Claude Code) con el repo abierto.
> Objetivo: que el titular del home diga **qué problema resolvemos** en vez de **quién soy**, y que la credencial de Jira baje a la línea de prueba, donde rinde más.

---

## Contexto y diagnóstico (ya verificado sobre este repo — no hace falta revalidarlo)

El sitio es **Next.js 15 (App Router)** en `web/`, español por defecto e inglés bajo `/en`.

Hoy el H1 del home es una **credencial**, no una promesa:

- `web/app/page.tsx:39` → `Reemplacé Jira para 820 personas en 17 países. Ahora construyo esos sistemas para tu empresa.`
- `web/app/en/page.tsx:38` → misma frase en inglés.

Problemas concretos de ese H1:

1. **Encierra la oferta.** El sitio vende 6 servicios (consultoría IA, automatización, agentes, software a medida, integraciones CRM/ERP, dashboards) pero el H1 solo habla de reemplazar SaaS. Quien llega con dolor de "quiero automatizar facturación" no se ve reflejado.
2. **Responde la pregunta equivocada.** Dice "quién soy". La primera pregunta del visitante es "¿resolvés mi problema?". El orden correcto es promesa → prueba.
3. **Ancla en precio.** "Reemplacé Jira" ancla en ahorro de licencias y atrae compradores sensibles al precio en vez de compradores por valor.
4. **SEO: cero keywords.** El H1 pesa como señal de ranking y "Jira" no es una keyword por la que queramos rankear como consultora.

La credencial **no se tira**: es el mejor activo del sitio. Se mueve al subtítulo, donde funciona como prueba de la promesa.

---

## Reglas del trabajo

- **No toques diseño, CSS, ni estructura de componentes.** Es un cambio de copy y de metadata, nada más. No agregues clases nuevas ni modifiques `globals.css`.
- **Conservá el patrón visual del H1**: la segunda mitad de la frase va dentro de `<span className="text-gradient-purple">`, igual que hoy.
- **No inventes datos, clientes, cifras ni testimonios.** Usá exclusivamente los textos literales de este documento.
- Cambios en **español e inglés**, en paralelo. No dejes `/en` desactualizado.
- Al terminar: `cd web && npm run build` sin errores, y `npm run lint` limpio.

---

## Cambio 1 — H1 y subtítulo del home en español

**Archivo:** `web/app/page.tsx`

Reemplazá el H1 actual (línea ~39) por:

```tsx
<h1 className="hero-h1-new">
  Software e IA a medida <span className="text-gradient-purple">para procesos que ya no dan más</span>
</h1>
```

Reemplazá el párrafo del hero (línea ~43) por:

```tsx
<p className="hero-p-new">
  Reemplacé Jira para 820 personas en 17 países y ahorré ~$300k en licencias. Ahora construyo esos sistemas para tu empresa.
</p>
```

**Nota:** la frase de método que estaba ahí ("Analizamos el proceso primero y después elegimos la tecnología") **sale del hero** para no saturarlo. Ya vive en la `description` de la metadata; no la dupliques en el hero.

No toques el pill badge, los CTAs, ni la fila de métricas: quedan igual.

---

## Cambio 2 — H1 y subtítulo del home en inglés

**Archivo:** `web/app/en/page.tsx`

H1 (línea ~38):

```tsx
<h1 className="hero-h1-new">
  Custom software and AI <span className="text-gradient-purple">for processes that can&apos;t keep up</span>
</h1>
```

Párrafo del hero (línea ~42):

```tsx
<p className="hero-p-new">
  I replaced Jira for 820 users across 17 countries and saved ~$300k in licensing. Now I build those systems for your company.
</p>
```

---

## Cambio 3 — Title tag (SEO)

**Ojo con la duplicación de marca.** `web/app/layout.tsx:18` define `template: "%s | SSSTudio"`. Eso significa que el sufijo ` | SSSTudio` **se agrega solo**. Escribí el título **sin** la marca; si la incluís, va a salir `... | SSSTudio | SSSTudio`.

### 3.1 `web/app/layout.tsx`

El `title.default` (línea 17) **no** recibe el template, así que ahí sí va la marca completa:

```ts
title: {
  default: "Consultoría en IA y software a medida para empresas | SSSTudio",
  template: `%s | ${SITE.name}`,
},
```

Y el `openGraph.title` (línea 30), que tampoco recibe template:

```ts
title: "Consultoría en IA y software a medida para empresas | SSSTudio",
```

### 3.2 `web/app/page.tsx`

El `title` de la metadata del home (línea 11) **sí** recibe el template. Va sin marca:

```ts
title: "Consultoría en IA y software a medida para empresas",
```

Resultado renderizado esperado: `Consultoría en IA y software a medida para empresas | SSSTudio` (61 caracteres, entra completo en Google).

### 3.3 `web/app/en/page.tsx`

Mismo criterio, sin marca (línea 10):

```ts
title: "AI Consulting & Custom Software for Companies",
```

---

## Cambio 4 — Coherencia de voz (chequeo, no reescritura masiva)

El subtítulo nuevo usa primera persona singular ("Reemplacé", "construyo") y varias secciones del sitio usan plural ("Analizamos", "Construimos"). **No unifiques todo el sitio en esta tarea.** Solo verificá que dentro del hero del home no convivan las dos personas en frases contiguas. Si aparece un choque, dejalo anotado en la respuesta final; no lo arregles por tu cuenta.

---

## Verificación final

1. `cd web && npm run build` → sin errores ni warnings nuevos.
2. `cd web && npm run start` y revisá con el HTML servido (no con el DOM hidratado):
   - `curl -s http://localhost:3000 | grep -o '<title>[^<]*</title>'` → debe devolver `Consultoría en IA y software a medida para empresas | SSSTudio`, **una sola vez la marca**.
   - `curl -s http://localhost:3000 | grep -o '<h1[^>]*>.*</h1>' | head -1` → debe contener "Software e IA a medida para procesos que ya no dan más".
   - Lo mismo en `http://localhost:3000/en`.
3. Confirmá visualmente que el gradiente violeta sigue aplicado a la segunda mitad del H1 y que el titular no rompe el layout en móvil (375px) ni desborda en desktop.

## Al terminar, reportá

- Los archivos y líneas modificados.
- El `<title>` real renderizado en `/` y en `/en`, copiado del HTML servido.
- Cualquier choque de voz singular/plural que hayas detectado y no tocado.
