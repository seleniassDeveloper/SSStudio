# Prompt para Antigravity — Mejoras SSSTudio (diseño premium + contenido ES/EN/PT)

> Pegá todo este bloque en el agente de Antigravity. Está pensado para que lo ejecute él directamente sobre el repo abierto.

---

Sos un agente de código trabajando sobre el frontend de **SSSTudio**, una landing de un studio que construye **apps con inteligencia artificial**.

**Stack:** React 18 + Vite + TypeScript. Ya están configurados GSAP + ScrollTrigger y Lenis (scroll suave). Fuentes: Outfit (display), Inter (texto), Cormorant Garamond (itálica serif). Acento dorado y temas claro/oscuro mediante variables CSS (`--accent`, `--panel`, `--border`, `--muted`, `--text`, `--accent-soft`, `--accent-border`, etc.). No rompas las variables ni los temas.

**Archivos a editar:**
- `frontend/src/App.css`
- `frontend/src/App.tsx`
- `frontend/src/i18n.ts`
- `frontend/src/components/Navbar.tsx`

**Reglas:** mantené el mensaje de "apps con IA" (no agregar páginas web ni asesoramientos). No cambies las claves i18n existentes ni la estructura de secciones. Respetá `prefers-reduced-motion`. Al final, verificá que compila con `vite build`.

---

## PARTE A — Refinamiento visual premium (`App.css` + `App.tsx`)

**1. Base tipográfica y de lienzo (`body` en App.css)**
- Agregá `text-rendering: optimizeLegibility;`, `-moz-osx-font-smoothing: grayscale;` y `font-feature-settings: "ss01", "cv01", "cv11";`.
- Agregá un grano sutil global con `body::after`: `position: fixed; inset: 0; z-index: 9999; pointer-events: none; opacity: 0.025; mix-blend-mode: overlay;` y de fondo un ruido SVG `feTurbulence` (baseFrequency ~0.85, fractalNoise) embebido como data-URI.
- Agregá `::selection { background: var(--accent-soft); color: var(--text); }`.

**2. Hero**
- En `App.tsx`, dentro de `.hero-content` y antes del `<h1>`, agregá un eyebrow:
  ```tsx
  <span className="hero-eyebrow">
    {t("hero.eyebrow", { defaultValue: "Studio de producto con IA" })}
  </span>
  ```
- CSS `.hero-eyebrow`: chip `inline-flex`, `gap: 0.55rem`, `padding: 0.4rem 0.95rem`, `border-radius: 999px`, `border: 1px solid var(--accent-border)`, `background: var(--accent-soft-2)`, `backdrop-filter: blur(8px)`, color `var(--accent)`, `font-size: 0.78rem`, `font-weight: 600`. Con un punto (`::before`, 6px, redondo, `var(--accent)`) que pulsa vía `@keyframes heroPulse` (box-shadow expandiéndose de `rgba(var(--accent-rgb),0.5)` a transparente).
- `.hero-section h1`: `letter-spacing: -0.035em`, `line-height: 1.08`, `font-size: clamp(2.6rem, 6.5vw, 4.25rem)`. Mantené el gradiente con `background-clip: text`.
- `.hero-section p`: `max-width: 620px`, centrado (`margin: 0 auto 2.75rem`), `line-height: 1.65`.

**3. Botones (`.btn`, `.btn-primary`, `.btn-secondary`)**
- `.btn`: `position: relative; overflow: hidden; border-radius: 10px;` y transición con `cubic-bezier(0.16, 1, 0.3, 1)`.
- `.btn-primary`: al hover, `translateY(-2px)` + sombra más fuerte, y un brillo diagonal que recorre el botón usando un pseudo-elemento `::after` (gradiente blanco semitransparente, `transform: skewX(-18deg)`, que pasa de `left: -120%` a `left: 130%` en el hover, transición ~0.6s).
- `.btn-secondary`: glass (`backdrop-filter: blur(8px)`), borde que vira a `var(--accent-border)` al hover, `translateY(-2px)`.
- `.btn:active { transform: translateY(0); }`.

**4. Etiquetas y títulos de sección**
- `.section-tag`: `inline-flex; align-items: center; gap: 0.6rem; letter-spacing: 0.18em;` y una línea-acento antes del texto con `::before` (`width: 1.75rem; height: 1px; background: linear-gradient(to right, var(--accent), transparent);`).
- `.section h2`: `font-size: clamp(1.9rem, 3.5vw, 2.5rem); letter-spacing: -0.02em; line-height: 1.1;`.

**5. Tarjetas (`.product-card` y `.service-card`)**
- `.product-card`: `border-radius: 18px; backdrop-filter: blur(16px) saturate(120%);` Hover: `translateY(-6px)`, borde `var(--accent-border)`, `box-shadow: 0 20px 50px var(--card-shadow), 0 0 0 1px var(--accent-shadow);`. Agregá un glow radial dorado en `::before` (aparece al hover) y una hairline dorada superior en `::after` (`linear-gradient(to right, transparent, var(--accent), transparent)`, aparece al hover). Asegurá que `.product-meta` y `.product-action` tengan `position: relative; z-index: 1;`.
- `.product-badge`: tono dorado suave (`background: var(--accent-soft-2); border: 1px solid var(--accent-border); color: var(--accent);`).
- `.service-card`: `border-radius: 18px; overflow: hidden;` Hover: `translateY(-5px)` + sombra. `.service-icon`: fondo `linear-gradient(140deg, var(--accent-soft), var(--accent-soft-3))`, borde dorado, y al hover `transform: scale(1.08) rotate(-3deg)`.

**6. Formulario (`.form-group input/select/textarea`)**
- `border-radius: 10px;` y al `:focus`, además del borde dorado, `box-shadow: 0 0 0 3px var(--accent-soft-2);`.

**7. Reveal al hacer scroll (`App.tsx`)**
- Agregá un `useEffect` que corra solo cuando `currentPage === "home"` y que salga temprano si `matchMedia("(prefers-reduced-motion: reduce)").matches`.
- Usá `gsap.context(...)`:
  - Para `.services-grid` y `.products-grid`, animá sus hijos (`> *`) con `gsap.from({ opacity: 0, y: 32, duration: 0.85, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: grid, start: "top 85%", once: true } })`.
  - Para `.section-header`, `.vision-body`, `.match-card`, `.cta-container`, animá cada elemento con `gsap.from({ opacity: 0, y: 28, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } })`.
  - Llamá `ScrollTrigger.refresh()` tras montar (con un pequeño timeout) y `ctx.revert()` en el cleanup.
- Dependencia del effect: `[currentPage]`.

---

## PARTE B — Mejora de contenido + portugués (`i18n.ts` + `Navbar.tsx`)

**Objetivo:** mejorar el copy (más premium, claro y conciso) en español e inglés, agregar la clave `hero.eyebrow` en cada idioma, y crear un bloque **`pt`** (portugués) completo con las mismas claves. Luego sumar el botón **PT** al selector de idioma.

**1. En `i18n.ts`** — reemplazá los textos de los bloques `es` y `en` por los de abajo (manteniendo claves), agregá `hero.eyebrow`, y agregá un tercer bloque `pt` dentro de `resources` con la misma estructura.

### Español (es) — textos clave a usar
- `meta.title`: `SSSTudio · Studio de apps con inteligencia artificial`
- `meta.description`: `Diseñamos y desarrollamos apps con IA real en el núcleo. Productos en producción, diseño con propósito y de la idea al lanzamiento en semanas.`
- `hero.eyebrow`: `Studio de producto con IA`
- `hero.titlePart1`: `Tu idea, convertida en ` · `hero.titleItalic`: `una app real con inteligencia artificial` · `hero.titlePart2`: `` (vacío)
- `hero.subtitle`: `Diseño, desarrollo e IA integrada en una sola entrega. No hacemos sitios web genéricos: construimos productos que la gente usa.`
- `vision.title`: `Apps con IA que la gente realmente usa`
- `vision.body`: `Diseñamos productos donde la inteligencia artificial no es un adorno: resuelve algo concreto. Llegás con una idea y salís con algo funcional, pulido y listo para usar. No vendemos horas ni plantillas — construimos con el mismo nivel con que hacemos nuestros propios productos.`
- `products.description`: `No son mockups de portfolio: son productos reales con IA en el núcleo. Esto es lo que sabemos hacer — ahora imaginá la tuya.`
- `services.title`: `Apps con IA, de punta a punta`
- (El resto de claves de productos/servicios/match/contacto/footer/demo: mantené los textos actuales o aplicá versiones más cortas equivalentes; no cambies nombres de claves ni las variables `{{nombre}}` / `{{proyecto}}`.)

### Inglés (en) — textos clave a usar
- `meta.title`: `SSSTudio · AI app development studio`
- `hero.eyebrow`: `AI product studio`
- `hero.titlePart1`: `Your idea, turned into ` · `hero.titleItalic`: `a real AI-powered app`
- `hero.subtitle`: `Design, development, and integrated AI in a single delivery. We don't build generic websites — we build products people actually use.`
- `vision.title`: `AI apps people actually use`
- `services.title`: `End-to-end AI apps`

### Portugués (pt) — bloque nuevo completo (usá exactamente estos valores)
```ts
pt: {
  translation: {
    meta: {
      title: "SSSTudio · Studio de apps com inteligência artificial",
      description: "Desenhamos e desenvolvemos apps com IA real no núcleo. Produtos em produção, design com propósito e da ideia ao lançamento em semanas.",
    },
    nav: { products: "Produtos", services: "Como trabalhamos", workWithUs: "Trabalhe conosco", cta: "Começar meu app" },
    theme: { toLight: "Modo claro", toDark: "Modo escuro" },
    hero: {
      eyebrow: "Studio de produto com IA",
      titlePart1: "Sua ideia, transformada em ",
      titleItalic: "um app real com inteligência artificial",
      titlePart2: "",
      subtitle: "Design, desenvolvimento e IA integrada em uma única entrega. Não fazemos sites genéricos — construímos produtos que as pessoas usam.",
      ctaIdea: "Começar meu app",
      ctaHow: "Ver apps em produção",
    },
    vision: {
      tag: "Abordagem",
      title: "Apps com IA que as pessoas realmente usam",
      subtitle: "Sua ideia, um app real com IA",
      body: "Desenhamos produtos onde a inteligência artificial não é enfeite: resolve algo concreto. Você chega com uma ideia e sai com algo funcional, polido e pronto para usar. Não vendemos horas nem templates — construímos no mesmo nível dos nossos próprios produtos.",
    },
    products: {
      tag: "Em produção",
      title: "Apps que já construímos",
      description: "Não são mockups de portfólio: são produtos reais com IA no núcleo. É isto que sabemos fazer — agora imagine o seu.",
      problemLabel: "Problema",
      aiLabel: "IA",
      closing: "Tem outra ideia? Construímos com o mesmo nível de detalhe.",
      dashboard: {
        tag: "SaaS · Gestão",
        title: "Dashboard inteligente",
        desc: "Plataforma SaaS para negócios de agendamentos e clientes. Agenda, clientes e métricas em um só lugar, com insights para decidir rápido.",
        problem: "Entre planilhas, WhatsApp e ferramentas soltas, perde-se o controle do negócio.",
        ai: "Detecção de padrões, sugestões de horários e alertas preditivos de demanda e retenção.",
        cta: "Testar dashboard →",
      },
      ceromancia: {
        tag: "IA Visual",
        title: "Leitura de vela com IA",
        desc: "Você envia a foto da sua vela e recebe uma leitura visual por forma, cor e padrões. Uma experiência guiada e clara para o usuário final.",
        problem: "A interpretação manual é subjetiva e não escala; o usuário quer uma leitura imediata e consistente.",
        ai: "Visão computacional + classificação de padrões e interpretação simbólica estruturada.",
        cta: "Testar demo interativa →",
      },
      emotions: {
        tag: "IA Visual · Tempo real",
        title: "Análise emocional por linguagem corporal",
        desc: "Detecta estados emocionais em tempo real a partir da linguagem corporal e da expressão. Para coaching, educação e interfaces interativas.",
        problem: "Medir emoções ao vivo, sem pesquisas nem fricção, e transformá-las em dados acionáveis.",
        ai: "Detecção facial e corporal em tempo real + classificação emocional.",
        cta: "Testar análise ao vivo →",
      },
      calorieVision: {
        tag: "IA Visual · Nutrição",
        title: "Contador de calorias com IA",
        desc: "Estimativa nutricional em tempo real a partir de uma foto do prato. Pensado para mobile e wearables, sem fricção no dia a dia.",
        problem: "Registrar calorias na mão é lento e impreciso; o usuário quer uma resposta na hora.",
        ai: "Visão computacional para reconhecer alimentos e estimar nutrição em tempo real.",
        cta: "Testar scanner de comida →",
      },
    },
    services: {
      tag: "Como trabalhamos",
      title: "Apps com IA, de ponta a ponta",
      description: "Design, desenvolvimento e integração de IA em uma única entrega. Produtos sob medida para quem tem uma ideia clara ou um problema a resolver.",
      ai: { badge: "IA integrada", title: "Apps com inteligência artificial", desc: "Visão computacional, análise em tempo real e automação onde importa — não um chatbot colado a um site." },
      design: { badge: "Design com propósito", title: "Produto visual e funcional", desc: "Interfaces modernas, rápidas e pensadas para o usuário final — não templates genéricos." },
      speed: { badge: "Velocidade real", title: "Da ideia à produção", desc: "Ciclos curtos e uma V1 pronta para testar com usuários reais, sem meses de specs que ninguém usa." },
      production: { badge: "Produtos reais", title: "O que você vê, funciona", desc: "Os apps desta página estão em produção. Levamos esse mesmo nível ao seu projeto." },
      ideas: { badge: "Seu projeto", title: "Para qualquer ideia séria", desc: "Startup, negócio local ou projeto pessoal: se faz sentido, a gente constrói." },
    },
    match: {
      tag: "Trabalhe conosco",
      title: "Trabalhamos juntos?",
      yes1: "Você tem uma ideia de app e precisa de um time que a desenhe e construa com IA.",
      yes2: "Você quer integrar inteligência artificial em um produto que já existe.",
      yes3: "Você busca qualidade de produto real — não um site genérico nem um mockup.",
      yes4: "Você valoriza design moderno, execução rápida e software que parece fluido.",
    },
    contact: {
      tag: "Começar",
      title: "Tem um app em mente?",
      p1: "Conte sua ideia e respondemos em menos de 24 horas com os próximos passos — sem compromisso.",
      p2: "Criamos apps sob medida com inteligência artificial para startups, negócios e projetos pessoais.",
      form: {
        name: "Seu nome *",
        namePlaceholder: "Ex. Sofia Fernandes",
        project: "Nome do projeto",
        projectPlaceholder: "Ex. Meu app de fitness com IA",
        type: "Do que você precisa?",
        optionNew: "App novo com IA",
        optionIntegrate: "Integrar IA em produto existente",
        optionImprove: "Melhorar ou escalar app em produção",
        optionOther: "Consulta geral",
        desc: "Conte sua ideia *",
        descPlaceholder: "Que problema resolve? Que tipo de IA você precisa (visão, análise, automação)? Em que etapa está?",
        submit: "Começar meu app →",
      },
      success: {
        title: "Mensagem recebida!",
        msg: "Obrigado, {{nombre}}. Vamos analisar o que você contou sobre {{proyecto}} e respondemos nas próximas 24 horas.",
        msgDefault: "Obrigado, {{nombre}}. Vamos analisar sua ideia e respondemos nas próximas 24 horas.",
        button: "Enviar outra mensagem",
      },
      errorFields: "Preencha seu nome e uma descrição da sua ideia para continuar.",
    },
    footer: {
      rights: "© {{year}} SSSTudio. Todos os direitos reservados.",
      links: { products: "Produtos", services: "Como trabalhamos", contact: "Contato" },
    },
    demo: {
      back: "← Voltar ao início",
      badge: "Demo interativa",
      title: "Leitura de vela com IA",
      subtitle: "Envie uma foto de uma vela acesa. O backend combina métricas visuais com um modelo de IA para devolver padrões e interpretação simbólica.",
      dropzone: "Arraste uma imagem da sua vela acesa aqui ou escolha um arquivo.",
      choose: "Escolher foto",
      errorType: "Selecione um arquivo de imagem (JPEG, PNG ou WebP).",
      interpret: "Interpretação",
      btnAnalyze: "Analisar imagem",
      btnAnalyzing: "Analisando imagem...",
      promptAnalyze: "Clique em «Analisar imagem» para enviar a foto ao servidor.",
      metric: { flameAngle: "Inclinação da chama", waxAsym: "Assimetria da cera", darkResidue: "Resíduos escuros", dripElongation: "Elongação inferior", flameBrightness: "Brilho da chama" },
      confidence: "Confiança",
      errorAnalyze: "Erro ao analisar.",
      embedHint: "Se a demo não carregar, verifique se o projeto está em execução localmente (ver README do studio).",
    },
  },
},
```

**Importante:** las variables de interpolación deben quedar como `{{nombre}}` y `{{proyecto}}` (así las pasa `App.tsx`); no las renombres.

**2. En `Navbar.tsx`** — en los DOS selectores de idioma (el de `.nav-actions-mobile` y el de `.nav-actions-desktop`), agregá después del botón EN:
```tsx
<span className="lang-separator">/</span>
<button
  type="button"
  onClick={() => i18n.changeLanguage("pt")}
  className={`lang-btn ${i18n.language.startsWith("pt") ? "active" : ""}`}
>
  PT
</button>
```

---

## Verificación final
Ejecutá `cd frontend && npx vite build` y confirmá que transforma todos los módulos sin errores nuevos. (Errores preexistentes de `tsc` en el proxy de Lenis dentro de `App.tsx` y en `BackgroundBlob.tsx` no son parte de este cambio.)
