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
      escapeValue: false, // React already escapes values
    },
    resources: {
      es: {
        translation: {
          meta: {
            title: "AURA | Estudio de Software y Co-creación",
          },
          nav: {
            products: "Productos",
            howWeWork: "Cómo colaboramos",
            philosophy: "Filosofía",
            cta: "Iniciar conversación",
          },
          hero: {
            titlePart1: "Diseñamos y construimos ",
            titleItalic: "tecnología",
            titlePart2: " con sensibilidad y propósito.",
            subtitle: "Damos vida a ideas extraordinarias. Diseñamos tu producto desde cero, co-creamos junto a tu equipo, o te ofrecemos nuestras soluciones SaaS listas para despegar.",
            ctaIdea: "Hablemos de tu idea",
            ctaProducts: "Nuestros productos",
          },
          products: {
            tag: "Skin in the game",
            title: "Nuestros productos",
            description: "No tomamos pedidos a ciegas. Construimos, operamos y escalamos nuestros propios productos todos los días. Esta es la tecnología que respalda nuestra experiencia:",
            dashboard: {
              tag: "Plataforma SaaS",
              title: "Dashboard Modular",
              desc: "Plataforma completa de gestión para negocios basados en citas y clientes (barberías, spas, clínicas). Foco en arquitectura limpia, UX responsiva y experiencia diaria sin fricciones.",
              status: "Lanzado",
            },
            ceromancia: {
              tag: "IA Visual / Visión Artificial",
              title: "Ceromancia",
              desc: "Aplicación premium que analiza patrones de velas mediante visión por computadora en tiempo real. Combina algoritmos heurísticos con UX mística de alta fidelidad.",
              cta: "Probar demo interactiva local →",
            },
            calorieVision: {
              tag: "Wearables & Edge AI",
              title: "CalorieVision",
              desc: "Análisis nutricional en tiempo real mediante visión por computadora. Diseñado para correr de manera ligera y eficiente en dispositivos vestibles como las Meta Ray-Ban.",
              status: "En desarrollo",
            },
          },
          collaboration: {
            tag: "Modelos de colaboración",
            title: "Cómo colaboramos",
            description: "No facturamos horas vacías ni vendemos «transformación digital». Nos asociamos para diseñar y construir productos reales. Elegí el formato que mejor se adapte a tu etapa:",
            fee: {
              badge: "Ejecución y Velocidad",
              title: "Build for Fee",
              desc: "Diseñamos y construimos tu producto de inicio a fin bajo un presupuesto y alcance claros. Es el modelo ideal para lanzar una V1 impecable al mercado o integrar modelos de IA visual sin desviar a tu equipo interno.",
            },
            equity: {
              badge: "Co-inversión Tecnológica",
              title: "Build for Equity",
              desc: "Invertimos nuestro equipo técnico y de diseño en tu visión. Si tu proyecto se alinea con nuestra tesis y vemos potencial a largo plazo, asumimos parte o la totalidad del costo a cambio de una participación (equity) en la compañía.",
            },
            hybrid: {
              badge: "Modelo Híbrido",
              title: "Build Together",
              desc: "El equilibrio perfecto para startups en etapa temprana. Combinamos una tarifa base mensual optimizada para cubrir costos operativos y un porcentaje menor de equity. Compartimos el riesgo y alineamos incentivos desde el primer día.",
            },
          },
          manifesto: {
            tag: "Filosofía",
            title: "El Manifiesto de Aura",
            item1: {
              title: "01 / Tu visión, nuestra ejecución",
              desc: "Construimos tu idea a medida. Si tienes un concepto claro o una startup en camino, nos convertimos en tu equipo de diseño y desarrollo de élite para hacerlo realidad con la máxima calidad técnica y estética.",
            },
            item2: {
              title: "02 / Co-creación activa",
              desc: "Definimos el producto juntos. Si tienes un problema de negocio pero no la especificación técnica, nos sentamos contigo a diseñar, estructurar y construir la solución ideal, compartiendo riesgo y visión.",
            },
            item3: {
              title: "03 / Soluciones listas para despegar",
              desc: "Adquiere nuestras ideas hechas. Si quieres lanzar rápido al mercado, puedes comprar o licenciar nuestros propios productos SaaS y plataformas de IA ya desarrollados y probados, adaptándolos a tu marca.",
            },
          },
          match: {
            tag: "Compatibilidad",
            title: "¿Hacemos match?",
            yesTitle: "Sí trabajamos juntos si:",
            yes1: "Buscas un socio técnico y de diseño de alto nivel para materializar tu idea.",
            yes2: "Quieres co-crear un producto interactivo y necesitas dirección estratégica.",
            yes3: "Quieres acelerar tu lanzamiento adoptando y personalizando uno de nuestros productos ya hechos.",
            yes4: "Valoras la sensibilidad estética y el software que se siente rápido y fluido.",
            noTitle: "No trabajamos juntos si:",
            no1: "Consideras el diseño como algo secundario o cosmético.",
            no2: "Buscas un desarrollo genérico de baja calidad sin propuesta de valor.",
            no3: "Prefieres un proveedor pasivo que solo reciba órdenes sin aportar valor.",
          },
          contact: {
            tag: "Iniciar contacto",
            title: "Hablemos de producto (no de presupuestos genéricos)",
            p1: "Solo co-creamos 2 o 3 proyectos al año para garantizar que cada uno reciba el mismo nivel de atención y obsesión por el detalle que nuestros propios productos.",
            p2: "Si estás construyendo algo en IA visual, SaaS o una interfaz interactiva de alta fidelidad, contanos de qué se trata. Si hay alineación, coordinamos un café virtual.",
            form: {
              name: "Tu nombre *",
              namePlaceholder: "Ej. Sofía Fernández",
              project: "Nombre del proyecto / startup",
              projectPlaceholder: "Ej. Aether AI",
              model: "Formato de colaboración preferido",
              optionFee: "Build for Fee (Presupuesto cerrado)",
              optionEquity: "Build for Equity (Participación accionaria)",
              optionHybrid: "Build Together (Modelo híbrido fee + equity)",
              desc: "¿Qué estás construyendo y cómo podemos ayudarte? *",
              descPlaceholder: "Contanos brevemente sobre tu producto, la IA visual que querés incorporar o la etapa actual del SaaS...",
              submit: "Iniciar conversación →",
            },
            success: {
              title: "¡Mensaje recibido!",
              msg: "Gracias, {{nombre}}. Nos interesa mucho lo que contás sobre {{proyecto}}. Vamos a analizar tu idea y te responderemos en las próximas 24 horas para coordinar la charla.",
              msgDefault: "Gracias, {{nombre}}. Nos interesa mucho lo que contás. Vamos a analizar tu idea y te responderemos en las próximas 24 horas para coordinar la charla.",
              button: "Enviar otro mensaje",
            },
            errorFields: "Por favor completá los campos principales para iniciar la conversación.",
          },
          footer: {
            rights: "© {{year}} AURA Studio. Todos los derechos reservados.",
            links: {
              products: "Productos",
              collab: "Colaboración",
              philosophy: "Filosofía",
            },
          },
          demo: {
            back: "← Volver al inicio del studio",
            badge: "Demo Interactiva",
            title: "Ceromancia asistida por visión",
            subtitle: "Subí una foto de una vela encendida. El backend combina métricas visuales interpretables con un modelo ligero de TensorFlow para devolver patrones simbólicos.",
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
          },
        },
      },
      en: {
        translation: {
          meta: {
            title: "AURA | Software & Co-creation Studio",
          },
          nav: {
            products: "Products",
            howWeWork: "How we collaborate",
            philosophy: "Philosophy",
            cta: "Start conversation",
          },
          hero: {
            titlePart1: "We design and build ",
            titleItalic: "technology",
            titlePart2: " with sensitivity and purpose.",
            subtitle: "We bring extraordinary ideas to life. We design your product from scratch, co-create alongside your team, or offer our own ready-to-deploy SaaS solutions.",
            ctaIdea: "Let's talk about your idea",
            ctaProducts: "Our products",
          },
          products: {
            tag: "Skin in the game",
            title: "Our products",
            description: "We don't take blind orders. We build, operate, and scale our own products every day. This is the technology that backs our expertise:",
            dashboard: {
              tag: "SaaS Platform",
              title: "Modular Dashboard",
              desc: "Comprehensive management platform for appointment and client-based businesses (barbershops, spas, clinics). Focused on clean architecture, responsive UX, and friction-free daily operations.",
              status: "Launched",
            },
            ceromancia: {
              tag: "Visual AI / Computer Vision",
              title: "Ceromancy",
              desc: "Premium application that analyzes candle patterns using computer vision in real time. Combines heuristic algorithms with a high-fidelity mystical UX.",
              cta: "Try local interactive demo →",
            },
            calorieVision: {
              tag: "Wearables & Edge AI",
              title: "CalorieVision",
              desc: "Real-time nutritional analysis via computer vision. Designed to run lightly and efficiently on wearable devices like Meta Ray-Ban.",
              status: "In development",
            },
          },
          collaboration: {
            tag: "Collaboration models",
            title: "How we collaborate",
            description: "We don't bill empty hours or sell \"digital transformation\". We partner to design and build real products. Choose the format that best fits your stage:",
            fee: {
              badge: "Execution & Speed",
              title: "Build for Fee",
              desc: "We design and build your product from start to finish under a clear budget and scope. It's the ideal model to launch an impeccable V1 to market or integrate visual AI models without distracting your internal team.",
            },
            equity: {
              badge: "Tech Co-investment",
              title: "Build for Equity",
              desc: "We invest our design and engineering team into your vision. If your project aligns with our thesis and we see long-term scale potential, we cover part or all of the development cost in exchange for equity in the company.",
            },
            hybrid: {
              badge: "Hybrid Model",
              title: "Build Together",
              desc: "The perfect balance for early-stage startups. We combine a monthly base fee optimized to cover operational costs with a minor percentage of equity. We share the risk and align incentives from day one.",
            },
          },
          manifesto: {
            tag: "Philosophy",
            title: "Aura's Manifesto",
            item1: {
              title: "01 / Your vision, our execution",
              desc: "We build your custom idea. If you have a clear concept or a startup on the way, we become your elite design and development team to make it a reality with the highest technical and aesthetic quality.",
            },
            item2: {
              title: "02 / Active co-creation",
              desc: "We define the product together. If you have a business problem but not the technical specification, we sit down with you to design, structure, and build the ideal solution, sharing risk and vision.",
            },
            item3: {
              title: "03 / Ready-to-deploy solutions",
              desc: "Acquire our pre-built ideas. If you want to go to market fast, you can buy or license our own SaaS products and AI platforms, fully developed and tested, and adapt them to your brand.",
            },
          },
          match: {
            tag: "Compatibility",
            title: "Is it a match?",
            yesTitle: "We do work together if:",
            yes1: "You seek a high-level technical and design partner to materialize your idea.",
            yes2: "You want to co-create an interactive product and need strategic direction.",
            yes3: "You want to accelerate your launch by adopting and customizing one of our pre-built products.",
            yes4: "You value aesthetic sensitivity and software that feels fast and smooth.",
            noTitle: "We don't work together if:",
            no1: "You consider design secondary or purely cosmetic.",
            no2: "You look for cheap generic templates or do not prioritize product quality.",
            no3: "You prefer a passive vendor who only takes orders without bringing value.",
          },
          contact: {
            tag: "Start contact",
            title: "Let's talk about product (not generic budgets)",
            p1: "We only co-create 2 or 3 client projects a year to ensure each one receives the same level of attention and design obsession as our own products.",
            p2: "If you are building something in visual AI, SaaS, or a high-fidelity interactive interface, tell us about it. If there is alignment, we'll coordinate a virtual coffee.",
            form: {
              name: "Your name *",
              namePlaceholder: "e.g. Sophia Smith",
              project: "Project / Startup name",
              projectPlaceholder: "e.g. Aether AI",
              model: "Preferred collaboration format",
              optionFee: "Build for Fee (Fixed budget)",
              optionEquity: "Build for Equity (Equity share)",
              optionHybrid: "Build Together (Hybrid fee + equity)",
              desc: "What are you building and how can we help? *",
              descPlaceholder: "Tell us briefly about your product, the visual AI you want to incorporate, or the current stage of your SaaS...",
              submit: "Start conversation →",
            },
            success: {
              title: "Message received!",
              msg: "Thank you, {{nombre}}. We are very interested in what you share about {{proyecto}}. We will analyze your idea and respond within the next 24 hours to coordinate a talk.",
              msgDefault: "Thank you, {{nombre}}. We are very interested in what you share. We will analyze your idea and respond within the next 24 hours to coordinate a talk.",
              button: "Send another message",
            },
            errorFields: "Please fill in the main fields to start the conversation.",
          },
          footer: {
            rights: "© {{year}} AURA Studio. All rights reserved.",
            links: {
              products: "Products",
              collab: "Collaboration",
              philosophy: "Philosophy",
            },
          },
          demo: {
            back: "← Back to studio home",
            badge: "Interactive Demo",
            title: "Vision-Assisted Ceromancy",
            subtitle: "Upload a photo of a burning candle. The backend combines interpretable visual metrics with a lightweight TensorFlow model to return symbolic patterns.",
            dropzone: "Drag an image of your burning candle here or choose a file.",
            choose: "Choose photo",
            errorType: "Please select an image file (JPEG, PNG or WebP).",
            interpret: "Interpretation",
            btnAnalyze: "Analyze image",
            btnAnalyzing: "Analyzing image...",
            promptAnalyze: "Click \"Analyze image\" to send the photo to the server.",
            metric: {
              flameAngle: "Flame tilt",
              waxAsym: "Wax asymmetry",
              darkResidue: "Dark residue",
              dripElongation: "Drip elongation",
              flameBrightness: "Flame brightness",
            },
            confidence: "Confidence",
            errorAnalyze: "Error during analysis.",
          },
        },
      },
    },
  });

export default i18n;
