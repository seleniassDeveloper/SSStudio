import { useCallback, useState, useEffect, useRef } from "react";
// @ts-ignore
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundBlob from "./components/BackgroundBlob";

gsap.registerPlugin(ScrollTrigger);

type Metricas = {
  inclinacion_llama_grados: number;
  asimetria_cera: number;
  ratio_residuos_oscuros: number;
  elongacion_gotas_inferior: number;
  brillo_promedio_llama: number;
};

type PatternMatch = {
  pattern_id: string;
  nombre: string;
  confianza: number;
  interpretacion: string;
  detalles_visuales: string;
};

type AnalisisResponse = {
  resumen: string;
  metricas: Metricas;
  patrones: PatternMatch[];
  nota_metodo: string;
};

export default function App() {
  // Estado para la navegación
  // 'home' = Landing Page del Studio
  // 'ceromancia' = Demo interactiva de visión artificial
  const [currentPage, setCurrentPage] = useState<"home" | "ceromancia">("home");

  // Lenis Smooth Scroll Setup
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger when changing page to recalculate page height
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentPage]);

  // Estado para el formulario de contacto de la landing
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    nombre: "",
    proyecto: "",
    descripcion: "",
    modelo: "hibrido"
  });

  // Estado para la app de Ceromancia
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalisisResponse | null>(null);
  const [drag, setDrag] = useState(false);

  // Manejador de carga de archivos (Ceromancia)
  const onFile = useCallback((f: File | null) => {
    setError(null);
    setResult(null);
    if (!f) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen (JPEG, PNG o WebP).");
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }, []);

  // Simular llamada al backend de Ceromancia
  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/analizar", { method: "POST", body });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      const data: AnalisisResponse = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al analizar.");
    } finally {
      setLoading(false);
    }
  };

  // Manejador de submit del formulario de contacto
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nombre || !contactForm.descripcion) {
      alert("Por favor completá los campos principales para iniciar la conversación.");
      return;
    }
    setContactSubmitted(true);
  };

  // Renderizado Condicional de Páginas
  if (currentPage === "ceromancia") {
    return (
      <div className="studio-container" style={{ paddingTop: "2rem" }}>
        <div className="demo-header-bar">
          <button className="demo-back-btn" onClick={() => setCurrentPage("home")}>
            ← Volver al inicio del studio
          </button>
          <span className="product-badge" style={{ margin: 0 }}>Demo Interactiva</span>
        </div>

        <div className="demo-content-container">
          <div className="demo-title-container">
            <h1>Ceromancia asistida por visión</h1>
            <p className="demo-subtitle">
              Subí una foto de una vela encendida. El backend combina métricas visuales
              interpretables con un modelo ligero de TensorFlow para devolver patrones simbólicos.
            </p>
          </div>

          <div
            className={"dropzone" + (drag ? " drag" : "")}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              const f = e.dataTransfer.files?.[0];
              onFile(f ?? null);
            }}
            style={{ marginTop: "2rem" }}
          >
            <p>Arrastrá una imagen de tu vela encendida aquí o elegí un archivo.</p>
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="file">
              <button type="button" disabled={loading} onClick={() => document.getElementById("file")?.click()}>
                Elegir foto
              </button>
            </label>
          </div>

          {error ? <p className="error">{error}</p> : null}

          {previewUrl ? (
            <div className="preview-row">
              <div className="preview">
                <img src={previewUrl} alt="Vista previa de la vela" />
              </div>
              <div className="panel">
                <h2>Interpretación</h2>
                <button type="button" onClick={analyze} disabled={loading} style={{ marginBottom: "1rem" }}>
                  {loading ? "Analizando imagen..." : "Analizar imagen"}
                </button>
                {result ? (
                  <>
                    <p style={{ marginTop: "0.5rem", lineHeight: 1.5 }}>{result.resumen}</p>
                    <div className="metrics">
                      <div>
                        <span>Inclinación llama</span>
                        <strong>{result.metricas.inclinacion_llama_grados}°</strong>
                      </div>
                      <div>
                        <span>Asimetría cera</span>
                        <strong>{result.metricas.asimetria_cera}</strong>
                      </div>
                      <div>
                        <span>Residuos oscuros</span>
                        <strong>{(result.metricas.ratio_residuos_oscuros * 100).toFixed(1)}%</strong>
                      </div>
                      <div>
                        <span>Elongación inferior</span>
                        <strong>{result.metricas.elongacion_gotas_inferior}</strong>
                      </div>
                      <div>
                        <span>Brillo llama</span>
                        <strong>{result.metricas.brillo_promedio_llama}</strong>
                      </div>
                    </div>
                    <ul className="patterns">
                      {result.patrones.map((p) => (
                        <li key={p.pattern_id + p.nombre}>
                          <h3>{p.nombre}</h3>
                          <div className="conf">Confianza: {(p.confianza * 100).toFixed(1)}%</div>
                          <p>{p.interpretacion}</p>
                          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontStyle: "italic" }}>{p.detalles_visuales}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="note">{result.nota_metodo}</p>
                  </>
                ) : (
                  <p style={{ marginTop: "0.5rem", color: "var(--muted)", fontSize: "0.95rem" }}>
                    Hacé click en «Analizar imagen» para enviar la foto al servidor.
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // Render principal: Landing Page de AURA Studio
  return (
    <>
      <BackgroundBlob hide={currentPage === "ceromancia"} />
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#inicio" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          AURA<span>.</span>
        </a>
        <ul className="nav-links">
          <li><a href="#productos">Productos</a></li>
          <li><a href="#como-colaboramos">Cómo colaboramos</a></li>
          <li><a href="#filosofia">Filosofía</a></li>
          <li><a href="#contacto" className="nav-btn" style={{ marginLeft: "1rem" }}>Iniciar conversación</a></li>
        </ul>
      </nav>

      <div className="studio-container" id="inicio">
        {/* HERO SECTION */}
        <header className="hero-section">
          <div className="hero-bg">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
          <div className="hero-content">
            <h1>Creamos productos de IA visual y SaaS con obsesión por el diseño.</h1>
            <p>
              Somos un estudio híbrido. Desarrollamos tecnología propia y co-creamos software 
              excepcional junto a fundadores y empresas que buscan velocidad, criterio estético y 
              ejecución técnica sin rodeos.
            </p>
            <div className="hero-ctas">
              <a href="#contacto" className="btn btn-primary">Hablemos de tu idea</a>
              <a href="#productos" className="btn btn-secondary">Nuestros productos</a>
            </div>
          </div>
          <div className="hero-scroll">
            <span>SCROLL</span>
            <div className="hero-scroll-line"></div>
          </div>
        </header>

        {/* PRODUCTS SECTION (SKIN IN THE GAME) */}
        <section className="section" id="productos">
          <div className="section-header">
            <span className="section-tag">Skin in the game</span>
            <h2>Nuestros productos</h2>
            <p className="section-description">
              No tomamos pedidos a ciegas. Construimos, operamos y escalamos nuestros propios 
              productos todos los días. Esta es la tecnología que respalda nuestra experiencia:
            </p>
          </div>

          <div className="products-grid">
            {/* Dashboard Modular */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">Plataforma SaaS</span>
                <h3>Dashboard Modular</h3>
                <p>
                  Plataforma completa de gestión para negocios basados en citas y clientes (barberías, 
                  spas, clínicas). Foco en arquitectura limpia, UX responsiva y experiencia diaria sin fricciones.
                </p>
              </div>
              <span className="product-badge" style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.03)" }}>Lanzado</span>
            </div>

            {/* Ceromancia */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">IA Visual / Visión Artificial</span>
                <h3>Ceromancia</h3>
                <p>
                  Aplicación premium que analiza patrones de velas mediante visión por computadora en 
                  tiempo real. Combina algoritmos heurísticos con UX mística de alta fidelidad.
                </p>
              </div>
              <button 
                type="button" 
                className="product-action" 
                onClick={() => {
                  setCurrentPage("ceromancia");
                  window.scrollTo({top: 0});
                }}
              >
                Probar demo interactiva local →
              </button>
            </div>

            {/* CalorieVision */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">Wearables & Edge AI</span>
                <h3>CalorieVision</h3>
                <p>
                  Análisis nutricional en tiempo real mediante visión por computadora. Diseñado para 
                  correr de manera ligera y eficiente en dispositivos vestibles como las Meta Ray-Ban.
                </p>
              </div>
              <span className="product-badge" style={{ alignSelf: "flex-start", background: "rgba(212,175,55,0.1)", color: "var(--accent)" }}>En desarrollo</span>
            </div>
          </div>
        </section>

        {/* SERVICES / HOW WE WORK SECTION */}
        <section className="section" id="como-colaboramos">
          <div className="section-header">
            <span className="section-tag">Modelos de colaboración</span>
            <h2>Cómo colaboramos</h2>
            <p className="section-description">
              No facturamos horas vacías ni vendemos «transformación digital». Nos asociamos para diseñar 
              y construir productos reales. Elegí el formato que mejor se adapte a tu etapa:
            </p>
          </div>

          <div className="services-grid">
            {/* Build for Fee */}
            <div className="service-card">
              <div className="service-icon">⚙</div>
              <span className="service-badge">Ejecución y Velocidad</span>
              <h3>Build for Fee</h3>
              <p>
                Diseñamos y construimos tu producto de inicio a fin bajo un presupuesto y alcance claros. 
                Es el modelo ideal para lanzar una V1 impecable al mercado o integrar modelos de IA visual 
                sin desviar a tu equipo interno.
              </p>
            </div>

            {/* Build for Equity */}
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <span className="service-badge">Co-inversión Tecnológica</span>
              <h3>Build for Equity</h3>
              <p>
                Invertimos nuestro equipo técnico y de diseño en tu visión. Si tu proyecto se alinea con 
                nuestra tesis y vemos potencial a largo plazo, asumimos parte o la totalidad del costo a 
                cambio de una participación (equity) en la compañía.
              </p>
            </div>

            {/* Build Together */}
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <span className="service-badge">Modelo Híbrido</span>
              <h3>Build Together</h3>
              <p>
                El equilibrio perfecto para startups en etapa temprana. Combinamos una tarifa base mensual 
                optimizada para cubrir costos operativos y un porcentaje menor de equity. Compartimos el 
                riesgo y alineamos incentivos desde el primer día.
              </p>
            </div>
          </div>
        </section>

        {/* MANIFESTO & MATCH SECTION */}
        <section className="section" id="filosofia">
          <div className="split-grid">
            {/* Manifiesto */}
            <div>
              <div className="section-header" style={{ marginBottom: "2.5rem" }}>
                <span className="section-tag">Filosofía</span>
                <h2>El Manifiesto de Aura</h2>
              </div>
              <div className="manifesto-list">
                <div className="manifesto-item">
                  <h3><span>01 /</span> El diseño no es cosmética</h3>
                  <p>
                    El diseño define cómo funciona el producto, no solo cómo se ve. Creemos en flujos de 
                    trabajo limpios, transiciones fluidas y una velocidad de carga que se sienta instantánea.
                  </p>
                </div>
                <div className="manifesto-item">
                  <h3><span>02 /</span> IA útil, no hype</h3>
                  <p>
                    No metemos IA en un botón solo para sonar modernos. Usamos visión artificial para resolver 
                    problemas reales que aportan valor tangible y diferencian a tu negocio.
                  </p>
                </div>
                <div className="manifesto-item">
                  <h3><span>03 /</span> Sin rodeos corporativos</h3>
                  <p>
                    Hablamos y operamos como constructores de producto (ingenieros y diseñadores), no como 
                    ejecutivos de cuenta. Comunicación directa, sin burocracia ni jerga innecesaria.
                  </p>
                </div>
              </div>
            </div>

            {/* Criterios de Selección */}
            <div>
              <div className="section-header" style={{ marginBottom: "2.5rem" }}>
                <span className="section-tag">Compatibilidad</span>
                <h2>¿Hacemos match?</h2>
              </div>
              <div className="match-card">
                <h3>Sí trabajamos juntos si:</h3>
                <ul className="match-list match-list-yes" style={{ marginBottom: "2rem" }}>
                  <li>Tenés una idea clara de producto <span>(no buscás ideas de nuestra parte)</span></li>
                  <li>Valorás el diseño premium de interfaz <span>(buscás diferenciarte por UX)</span></li>
                  <li>Querés un socio que opine activamente <span>(no solo un tomador de pedidos)</span></li>
                </ul>

                <h3>No trabajamos juntos si:</h3>
                <ul className="match-list match-list-no">
                  <li>Buscás una plantilla barata <span>(nuestro foco es software a medida de alta calidad)</span></li>
                  <li>El diseño o la velocidad no son prioridad <span>(hacemos software pulido y rápido)</span></li>
                  <li>El producto no encaja en nuestra tesis de IA visual o SaaS</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / CONTACT FORM SECTION */}
        <section className="section" id="contacto" style={{ borderBottom: "none" }}>
          <div className="cta-container">
            <div className="cta-info">
              <span className="section-tag">Iniciar contacto</span>
              <h2>Hablemos de producto (no de presupuestos genéricos)</h2>
              <p>
                Solo co-creamos 2 o 3 proyectos al año para garantizar que cada uno reciba el mismo nivel 
                de atención y obsesión por el detalle que nuestros propios productos. 
              </p>
              <p>
                Si estás construyendo algo en IA visual, SaaS o una interfaz interactiva de alta fidelidad, 
                contanos de qué se trata. Si hay alineación, coordinamos un café virtual.
              </p>
            </div>

            <div>
              {contactSubmitted ? (
                <div className="form-success-msg">
                  <h3>¡Mensaje recibido!</h3>
                  <p style={{ marginTop: "0.5rem", color: "var(--text)", fontSize: "0.9rem" }}>
                    Gracias, {contactForm.nombre}. Nos interesa mucho lo que contás sobre {contactForm.proyecto || "tu proyecto"}. 
                    Vamos a analizar tu idea y te responderemos en las próximas 24 horas para coordinar la charla.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    style={{ marginTop: "1.5rem", fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ nombre: "", proyecto: "", descripcion: "", modelo: "hibrido" });
                    }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Tu nombre *</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      placeholder="Ej. Sofía Fernández" 
                      required
                      value={contactForm.nombre}
                      onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="proyecto">Nombre del proyecto / startup</label>
                    <input 
                      type="text" 
                      id="proyecto" 
                      placeholder="Ej. Aether AI"
                      value={contactForm.proyecto}
                      onChange={(e) => setContactForm({ ...contactForm, proyecto: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="modelo">Formato de colaboración preferido</label>
                    <select 
                      id="modelo"
                      value={contactForm.modelo}
                      onChange={(e) => setContactForm({ ...contactForm, modelo: e.target.value })}
                    >
                      <option value="fee">Build for Fee (Presupuesto cerrado)</option>
                      <option value="equity">Build for Equity (Participación accionaria)</option>
                      <option value="hibrido">Build Together (Modelo híbrido fee + equity)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="descripcion">¿Qué estás construyendo y cómo podemos ayudarte? *</label>
                    <textarea 
                      id="descripcion" 
                      placeholder="Contanos brevemente sobre tu producto, la IA visual que querés incorporar o la etapa actual del SaaS..." 
                      required
                      value={contactForm.descripcion}
                      onChange={(e) => setContactForm({ ...contactForm, descripcion: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                    Iniciar conversación →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} AURA Studio. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#productos">Productos</a>
            <a href="#como-colaboramos">Colaboración</a>
            <a href="#filosofia">Filosofía</a>
          </div>
        </footer>
      </div>
    </>
  );
}
