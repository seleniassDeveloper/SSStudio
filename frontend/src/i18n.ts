import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          meta: {
            title: "SSSTudio | Studio de apps con inteligencia artificial",
            description:
              "SSSTudio diseña y desarrolla aplicaciones con IA integrada. Apps en producción, diseño con propósito y ejecución rápida. Contanos tu idea y empezamos.",
          },
          nav: {
            products: "Productos",
            services: "Cómo trabajamos",
            workWithUs: "Trabajá con nosotros",
            cta: "Empezar mi app",
          },
          theme: {
            toLight: "Modo claro",
            toDark: "Modo oscuro",
          },
          hero: {
            titlePart1: "Studio que construye ",
            titleItalic: "aplicaciones con inteligencia artificial",
            titlePart2: "",
            subtitle:
              "Convertimos tu idea en una app real — visual, funcional y con IA donde importa. No somos una agencia de sitios web: desarrollamos productos con inteligencia artificial integrada.",
            ctaIdea: "Empezar mi app",
            ctaHow: "Ver apps en producción",
          },
          vision: {
            tag: "Enfoque",
            title: "Construimos apps con IA que la gente usa",
            subtitle: "Tu idea, una app real con IA",
            body: "En SSSTudio diseñamos aplicaciones donde la inteligencia artificial no es un adorno: es parte del producto. Cualquier persona o empresa puede llegar con una idea y salir con algo funcional, visual y listo para usar. No vendemos horas ni plantillas — construimos apps con propósito, las mismas que usamos en nuestros propios productos.",
          },
          products: {
            tag: "En producción",
            title: "Apps que ya construimos",
            description:
              "No son mockups de portfolio. Son productos reales con IA en el núcleo. Esto es lo que sabemos hacer — ahora imagina la tuya:",
            problemLabel: "Problema",
            aiLabel: "IA",
            closing: "¿Tenés otra idea? La construimos con el mismo nivel de detalle.",
            dashboard: {
              tag: "SaaS · Gestión",
              title: "Dashboard inteligente",
              desc: "Plataforma SaaS para negocios basados en citas y clientes. Centraliza agenda, clientes y métricas con insights que ayudan a decidir sin perder tiempo.",
              problem:
                "Dueños de negocios con muchas citas pierden control entre planillas, WhatsApp y herramientas sueltas.",
              ai: "Análisis de patrones, sugerencias de horarios y alertas predictivas de demanda y retención.",
              cta: "Probar dashboard →",
            },
            ceromancia: {
              tag: "IA Visual",
              title: "Lectura de vela con IA",
              desc: "Subís una foto de tu vela y recibís una interpretación visual basada en forma, color y patrones. Experiencia guiada, clara y pensada para el usuario final.",
              problem:
                "La interpretación manual es subjetiva y difícil de escalar; los usuarios quieren una lectura inmediata y consistente.",
              ai: "Visión por computadora + clasificación de patrones e interpretación simbólica estructurada.",
              cta: "Probar demo interactiva →",
            },
            emotions: {
              tag: "IA Visual · Tiempo real",
              title: "Análisis emocional por lenguaje corporal",
              desc: "Detecta estados emocionales en tiempo real a partir de lenguaje corporal y expresión. Pensado para coaching, educación e interfaces interactivas.",
              problem:
                "Medir emociones en vivo sin encuestas ni fricción; convertir señales visuales en datos accionables.",
              ai: "Detección facial y corporal en tiempo real + clasificación emocional.",
              cta: "Probar análisis en vivo →",
            },
            calorieVision: {
              tag: "IA Visual · Nutrición",
              title: "Cuenta calorías con IA",
              desc: "Estimación nutricional en tiempo real a partir de imágenes de comida. Pensado para uso móvil y wearables, sin fricción en el día a día.",
              problem:
                "Registrar calorías manualmente es lento e impreciso; el usuario quiere una respuesta rápida al mirar el plato.",
              ai: "Visión por computadora para reconocimiento de alimentos y estimación nutricional en tiempo real.",
              cta: "Probar escáner de comida →",
            },
          },
          services: {
            tag: "Cómo trabajamos",
            title: "Desarrollo de apps con IA, de punta a punta",
            description:
              "Diseño, desarrollo e integración de inteligencia artificial en una sola entrega. Aplicaciones con IA a medida para quien tiene una idea clara o un problema que resolver.",
            ai: {
              badge: "IA integrada",
              title: "Apps con inteligencia artificial",
              desc: "Visión artificial, análisis en tiempo real y automatización donde importa — no chatbots pegados a un sitio.",
            },
            design: {
              badge: "Diseño con propósito",
              title: "Producto visual y funcional",
              desc: "Interfaces modernas, rápidas y pensadas para el usuario final — no plantillas genéricas.",
            },
            speed: {
              badge: "Velocidad real",
              title: "De idea a producción",
              desc: "Ciclos cortos y una V1 lista para probar con usuarios reales, sin meses de especificaciones que no se usan.",
            },
            production: {
              badge: "Productos reales",
              title: "Lo que ves, funciona",
              desc: "Las apps de esta página están en producción. Ese mismo nivel de detalle lo llevamos a tu proyecto.",
            },
            ideas: {
              badge: "Tu proyecto",
              title: "Para cualquier idea seria",
              desc: "Startup, negocio local o proyecto personal: si tiene sentido, lo construimos.",
            },
          },
          match: {
            tag: "Trabajá con nosotros",
            title: "¿Trabajamos juntos?",
            yes1: "Tenés una idea de app y necesitás un equipo que la diseñe y construya con IA.",
            yes2: "Querés integrar inteligencia artificial en un producto que ya existe.",
            yes3: "Buscás calidad de producto real — no un sitio web genérico ni un mockup.",
            yes4: "Valorás diseño moderno, ejecución rápida y software que se siente fluido.",
          },
          contact: {
            tag: "Empezar",
            title: "¿Tenés una app en mente?",
            p1: "Contanos tu idea y te respondemos en menos de 24 horas con los próximos pasos — sin compromiso.",
            p2: "Creamos apps personalizadas con inteligencia artificial para startups, negocios y proyectos personales.",
            form: {
              name: "Tu nombre *",
              namePlaceholder: "Ej. Sofía Fernández",
              project: "Nombre del proyecto",
              projectPlaceholder: "Ej. Mi app de fitness con IA",
              type: "¿Qué necesitás?",
              optionNew: "App nueva con IA",
              optionIntegrate: "Integrar IA en producto existente",
              optionImprove: "Mejorar o escalar app en producción",
              optionOther: "Consulta general",
              desc: "Contanos tu idea *",
              descPlaceholder:
                "¿Qué problema resuelve? ¿Qué tipo de IA necesitás (visión, análisis, automatización)? ¿En qué etapa estás?",
              submit: "Empezar mi app →",
            },
            success: {
              title: "¡Mensaje recibido!",
              msg: "Gracias, {{nombre}}. Vamos a revisar lo que contás sobre {{proyecto}} y te respondemos en las próximas 24 horas.",
              msgDefault:
                "Gracias, {{nombre}}. Vamos a revisar tu idea y te respondemos en las próximas 24 horas.",
              button: "Enviar otro mensaje",
            },
            errorFields: "Completá tu nombre y una descripción de tu idea para continuar.",
          },
          footer: {
            rights: "© {{year}} SSSTudio. Todos los derechos reservados.",
            links: {
              products: "Productos",
              services: "Cómo trabajamos",
              contact: "Contacto",
            },
          },
          demo: {
            back: "← Volver al inicio",
            badge: "Demo interactiva",
            title: "Lectura de vela con IA",
            subtitle:
              "Subí una foto de una vela encendida. El backend combina métricas visuales con un modelo de IA para devolver patrones e interpretación simbólica.",
            dropzone: "Arrastrá una imagen de tu vela encendida aquí o elegí un archivo.",
            choose: "Elegir foto",
            errorType: "Selecciona un archivo de imagen (JPEG, PNG o WebP).",
            interpret: "Interpretación",
            btnAnalyze: "Analizar imagen",
            btnAnalyzing: "Analizando imagen...",
            promptAnalyze: "Hacé click en «Analizar imagen» para enviar la foto al servidor.",
            metric: {
              flameAngle: "Inclinación llama",
              waxAsym: "Asimetría cera",
              darkResidue: "Residuos oscuros",
              dripElongation: "Elongación inferior",
              flameBrightness: "Brillo llama",
            },
            confidence: "Confianza",
            errorAnalyze: "Error al analizar.",
            embedHint:
              "Si la demo no carga, asegurate de tener el proyecto en ejecución en local (ver README del studio).",
          },
        },
      },
      en: {
        translation: {
          meta: {
            title: "SSSTudio | AI app development studio",
            description:
              "SSSTudio designs and builds applications with integrated AI. Live products, purposeful design, fast execution. Tell us your idea and let's start.",
          },
          nav: {
            products: "Products",
            services: "How we work",
            workWithUs: "Work with us",
            cta: "Start my app",
          },
          theme: {
            toLight: "Light mode",
            toDark: "Dark mode",
          },
          hero: {
            titlePart1: "A studio that builds ",
            titleItalic: "AI-powered applications",
            titlePart2: "",
            subtitle:
              "We turn your idea into a real app — visual, functional, and with AI where it matters. We're not a generic website agency: we develop products with integrated artificial intelligence.",
            ctaIdea: "Start my app",
            ctaHow: "See live apps",
          },
          vision: {
            tag: "Approach",
            title: "We build AI apps people actually use",
            subtitle: "Your idea, a real AI app",
            body: "At SSSTudio we design applications where artificial intelligence isn't decoration — it's part of the product. Anyone or any company can come with an idea and leave with something functional, visual, and ready to use. We don't sell hours or templates — we build purposeful apps, the same ones we use in our own products.",
          },
          products: {
            tag: "In production",
            title: "Apps we've already built",
            description:
              "Not portfolio mockups. Real products with AI at the core. This is what we do — now imagine yours:",
            problemLabel: "Problem",
            aiLabel: "AI",
            closing: "Have another idea? We'll build it with the same level of detail.",
            dashboard: {
              tag: "SaaS · Management",
              title: "Smart dashboard",
              desc: "SaaS platform for appointment and client-based businesses. Centralizes scheduling, clients, and metrics with insights that save time.",
              problem:
                "Business owners with many appointments lose control across spreadsheets, WhatsApp, and scattered tools.",
              ai: "Pattern analysis, schedule suggestions, and predictive alerts for demand and retention.",
              cta: "Try dashboard →",
            },
            ceromancia: {
              tag: "Visual AI",
              title: "AI candle reading",
              desc: "Upload a photo of your candle and get a visual interpretation based on shape, color, and patterns. A clear, guided experience for end users.",
              problem:
                "Manual interpretation is subjective and hard to scale; users want immediate, consistent readings.",
              ai: "Computer vision + pattern classification and structured symbolic interpretation.",
              cta: "Try interactive demo →",
            },
            emotions: {
              tag: "Visual AI · Real-time",
              title: "Emotional analysis via body language",
              desc: "Detects emotional states in real time from body language and expression. Built for coaching, education, and interactive experiences.",
              problem:
                "Measuring emotions live without surveys or friction; turning visual signals into actionable data.",
              ai: "Real-time facial and body detection + emotional classification.",
              cta: "Try live analysis →",
            },
            calorieVision: {
              tag: "Visual AI · Nutrition",
              title: "AI calorie counter",
              desc: "Real-time nutritional estimation from food images. Built for mobile and wearables with zero daily friction.",
              problem:
                "Manual calorie tracking is slow and inaccurate; users want a quick answer when they look at their plate.",
              ai: "Computer vision for food recognition and real-time nutritional estimation.",
              cta: "Try food scanner →",
            },
          },
          services: {
            tag: "How we work",
            title: "End-to-end AI app development",
            description:
              "Design, development, and AI integration in one delivery. Custom AI applications for anyone with a clear idea or a problem to solve.",
            ai: {
              badge: "Integrated AI",
              title: "Apps with artificial intelligence",
              desc: "Computer vision, real-time analysis, and automation where it matters — not chatbots bolted onto a website.",
            },
            design: {
              badge: "Purposeful design",
              title: "Visual, functional product",
              desc: "Modern, fast interfaces built for end users — not generic templates.",
            },
            speed: {
              badge: "Real speed",
              title: "From idea to production",
              desc: "Short cycles and a V1 ready to test with real users — no months of unused specs.",
            },
            production: {
              badge: "Real products",
              title: "What you see, works",
              desc: "The apps on this page are live in production. We bring that same level of detail to your project.",
            },
            ideas: {
              badge: "Your project",
              title: "For any serious idea",
              desc: "Startup, local business, or personal project: if it makes sense, we'll build it.",
            },
          },
          match: {
            tag: "Work with us",
            title: "Do we work together?",
            yes1: "You have an app idea and need a team to design and build it with AI.",
            yes2: "You want to integrate artificial intelligence into an existing product.",
            yes3: "You want real product quality — not a generic website or a mockup.",
            yes4: "You value modern design, fast execution, and software that feels smooth.",
          },
          contact: {
            tag: "Get started",
            title: "Got an app in mind?",
            p1: "Tell us your idea and we'll respond within 24 hours with next steps — no commitment.",
            p2: "We build custom apps with artificial intelligence for startups, businesses, and personal projects.",
            form: {
              name: "Your name *",
              namePlaceholder: "e.g. Sophia Smith",
              project: "Project name",
              projectPlaceholder: "e.g. My AI fitness app",
              type: "What do you need?",
              optionNew: "New AI app",
              optionIntegrate: "Integrate AI into existing product",
              optionImprove: "Improve or scale app in production",
              optionOther: "General inquiry",
              desc: "Tell us your idea *",
              descPlaceholder:
                "What problem does it solve? What kind of AI do you need (vision, analysis, automation)? What stage are you at?",
              submit: "Start my app →",
            },
            success: {
              title: "Message received!",
              msg: "Thanks, {{nombre}}. We'll review what you shared about {{proyecto}} and respond within 24 hours.",
              msgDefault:
                "Thanks, {{nombre}}. We'll review your idea and respond within 24 hours.",
              button: "Send another message",
            },
            errorFields: "Please fill in your name and a description of your idea.",
          },
          footer: {
            rights: "© {{year}} SSSTudio. All rights reserved.",
            links: {
              products: "Products",
              services: "How we work",
              contact: "Contact",
            },
          },
          demo: {
            back: "← Back to home",
            badge: "Interactive demo",
            title: "AI candle reading",
            subtitle:
              "Upload a photo of a burning candle. The backend combines visual metrics with an AI model to return patterns and symbolic interpretation.",
            dropzone: "Drag an image of your burning candle here or choose a file.",
            choose: "Choose photo",
            errorType: "Please select an image file (JPEG, PNG or WebP).",
            interpret: "Interpretation",
            btnAnalyze: "Analyze image",
            btnAnalyzing: "Analyzing image...",
            promptAnalyze: 'Click "Analyze image" to send the photo to the server.',
            metric: {
              flameAngle: "Flame tilt",
              waxAsym: "Wax asymmetry",
              darkResidue: "Dark residue",
              dripElongation: "Drip elongation",
              flameBrightness: "Flame brightness",
            },
            confidence: "Confidence",
            errorAnalyze: "Error during analysis.",
            embedHint:
              "If the demo does not load, make sure the project is running locally (see studio README).",
          },
        },
      },
    },
  });

export default i18n;
