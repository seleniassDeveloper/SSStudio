import { useCallback, useState, useEffect, useRef } from "react";
// @ts-ignore
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

  // Dynamic document title update based on current language
  useEffect(() => {
    document.title = t("meta.title");
  }, [i18n.language, t]);

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
      setError(t("demo.errorType"));
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }, [t]);

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
      setError(e instanceof Error ? e.message : t("demo.errorAnalyze"));
    } finally {
      setLoading(false);
    }
  };

  // Manejador de submit del formulario de contacto
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nombre || !contactForm.descripcion) {
      alert(t("contact.errorFields"));
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
            {t("demo.back")}
          </button>
          <span className="product-badge" style={{ margin: 0 }}>{t("demo.badge")}</span>
        </div>

        <div className="demo-content-container">
          <div className="demo-title-container">
            <h1>{t("demo.title")}</h1>
            <p className="demo-subtitle">
              {t("demo.subtitle")}
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
            <p>{t("demo.dropzone")}</p>
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="file">
              <button type="button" disabled={loading} onClick={() => document.getElementById("file")?.click()}>
                {t("demo.choose")}
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
                <h2>{t("demo.interpret")}</h2>
                <button type="button" onClick={analyze} disabled={loading} style={{ marginBottom: "1rem" }}>
                  {loading ? t("demo.btnAnalyzing") : t("demo.btnAnalyze")}
                </button>
                {result ? (
                  <>
                    <p style={{ marginTop: "0.5rem", lineHeight: 1.5 }}>{result.resumen}</p>
                    <div className="metrics">
                      <div>
                        <span>{t("demo.metric.flameAngle")}</span>
                        <strong>{result.metricas.inclinacion_llama_grados}°</strong>
                      </div>
                      <div>
                        <span>{t("demo.metric.waxAsym")}</span>
                        <strong>{result.metricas.asimetria_cera}</strong>
                      </div>
                      <div>
                        <span>{t("demo.metric.darkResidue")}</span>
                        <strong>{(result.metricas.ratio_residuos_oscuros * 100).toFixed(1)}%</strong>
                      </div>
                      <div>
                        <span>{t("demo.metric.dripElongation")}</span>
                        <strong>{result.metricas.elongacion_gotas_inferior}</strong>
                      </div>
                      <div>
                        <span>{t("demo.metric.flameBrightness")}</span>
                        <strong>{result.metricas.brillo_promedio_llama}</strong>
                      </div>
                    </div>
                    <ul className="patterns">
                      {result.patrones.map((p) => (
                        <li key={p.pattern_id + p.nombre}>
                          <h3>{p.nombre}</h3>
                          <div className="conf">{t("demo.confidence")}: {(p.confianza * 100).toFixed(1)}%</div>
                          <p>{p.interpretacion}</p>
                          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontStyle: "italic" }}>{p.detalles_visuales}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="note">{result.nota_metodo}</p>
                  </>
                ) : (
                  <p style={{ marginTop: "0.5rem", color: "var(--muted)", fontSize: "0.95rem" }}>
                    {t("demo.promptAnalyze")}
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
          <li><a href="#productos">{t("nav.products")}</a></li>
          <li><a href="#como-colaboramos">{t("nav.howWeWork")}</a></li>
          <li><a href="#filosofia">{t("nav.philosophy")}</a></li>
          <li><a href="#contacto" className="nav-btn">{t("nav.cta")}</a></li>
          <li className="lang-switcher">
            <button 
              onClick={() => i18n.changeLanguage("es")}
              className={`lang-btn ${i18n.language.startsWith("es") ? "active" : ""}`}
            >
              ES
            </button>
            <span className="lang-separator">/</span>
            <button 
              onClick={() => i18n.changeLanguage("en")}
              className={`lang-btn ${i18n.language.startsWith("en") ? "active" : ""}`}
            >
              EN
            </button>
          </li>
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
            <h1>
              {t("hero.titlePart1")}
              <span className="serif-italic">{t("hero.titleItalic")}</span>
              {t("hero.titlePart2")}
            </h1>
            <p>
              {t("hero.subtitle")}
            </p>
            <div className="hero-ctas">
              <a href="#contacto" className="btn btn-primary">{t("hero.ctaIdea")}</a>
              <a href="#productos" className="btn btn-secondary">{t("hero.ctaProducts")}</a>
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
            <span className="section-tag">{t("products.tag")}</span>
            <h2>{t("products.title")}</h2>
            <p className="section-description">
              {t("products.description")}
            </p>
          </div>

          <div className="products-grid">
            {/* Dashboard Modular */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">{t("products.dashboard.tag")}</span>
                <h3>{t("products.dashboard.title")}</h3>
                <p>
                  {t("products.dashboard.desc")}
                </p>
              </div>
              <span className="product-badge" style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.03)" }}>{t("products.dashboard.status")}</span>
            </div>

            {/* Ceromancia */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">{t("products.ceromancia.tag")}</span>
                <h3>{t("products.ceromancia.title")}</h3>
                <p>
                  {t("products.ceromancia.desc")}
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
                {t("products.ceromancia.cta")}
              </button>
            </div>

            {/* CalorieVision */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">{t("products.calorieVision.tag")}</span>
                <h3>{t("products.calorieVision.title")}</h3>
                <p>
                  {t("products.calorieVision.desc")}
                </p>
              </div>
              <span className="product-badge" style={{ alignSelf: "flex-start", background: "rgba(212,175,55,0.1)", color: "var(--accent)" }}>{t("products.calorieVision.status")}</span>
            </div>
          </div>
        </section>

        {/* SERVICES / HOW WE WORK SECTION */}
        <section className="section" id="como-colaboramos">
          <div className="section-header">
            <span className="section-tag">{t("collaboration.tag")}</span>
            <h2>{t("collaboration.title")}</h2>
            <p className="section-description">
              {t("collaboration.description")}
            </p>
          </div>

          <div className="services-grid">
            {/* Build for Fee */}
            <div className="service-card">
              <div className="service-icon">⚙</div>
              <span className="service-badge">{t("collaboration.fee.badge")}</span>
              <h3>{t("collaboration.fee.title")}</h3>
              <p>
                {t("collaboration.fee.desc")}
              </p>
            </div>

            {/* Build for Equity */}
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <span className="service-badge">{t("collaboration.equity.badge")}</span>
              <h3>{t("collaboration.equity.title")}</h3>
              <p>
                {t("collaboration.equity.desc")}
              </p>
            </div>

            {/* Build Together */}
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <span className="service-badge">{t("collaboration.hybrid.badge")}</span>
              <h3>{t("collaboration.hybrid.title")}</h3>
              <p>
                {t("collaboration.hybrid.desc")}
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
                <span className="section-tag">{t("manifesto.tag")}</span>
                <h2>{t("manifesto.title")}</h2>
              </div>
              <div className="manifesto-list">
                <div className="manifesto-item">
                  <h3>{t("manifesto.item1.title")}</h3>
                  <p>
                    {t("manifesto.item1.desc")}
                  </p>
                </div>
                <div className="manifesto-item">
                  <h3>{t("manifesto.item2.title")}</h3>
                  <p>
                    {t("manifesto.item2.desc")}
                  </p>
                </div>
                <div className="manifesto-item">
                  <h3>{t("manifesto.item3.title")}</h3>
                  <p>
                    {t("manifesto.item3.desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Criterios de Selección */}
            <div>
              <div className="section-header" style={{ marginBottom: "2.5rem" }}>
                <span className="section-tag">{t("match.tag")}</span>
                <h2>{t("match.title")}</h2>
              </div>
              <div className="match-card">
                <h3>{t("match.yesTitle")}</h3>
                <ul className="match-list match-list-yes" style={{ marginBottom: "2rem" }}>
                  <li>{t("match.yes1")}</li>
                  <li>{t("match.yes2")}</li>
                  <li>{t("match.yes3")}</li>
                  <li>{t("match.yes4")}</li>
                </ul>

                <h3>{t("match.noTitle")}</h3>
                <ul className="match-list match-list-no">
                  <li>{t("match.no1")}</li>
                  <li>{t("match.no2")}</li>
                  <li>{t("match.no3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / CONTACT FORM SECTION */}
        <section className="section" id="contacto" style={{ borderBottom: "none" }}>
          <div className="cta-container">
            <div className="cta-info">
              <span className="section-tag">{t("contact.tag")}</span>
              <h2>{t("contact.title")}</h2>
              <p>
                {t("contact.p1")}
              </p>
              <p>
                {t("contact.p2")}
              </p>
            </div>

            <div>
              {contactSubmitted ? (
                <div className="form-success-msg">
                  <h3>{t("contact.success.title")}</h3>
                  <p style={{ marginTop: "0.5rem", color: "var(--text)", fontSize: "0.9rem" }}>
                    {contactForm.proyecto 
                      ? t("contact.success.msg", { nombre: contactForm.nombre, proyecto: contactForm.proyecto })
                      : t("contact.success.msgDefault", { nombre: contactForm.nombre })}
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
                    {t("contact.success.button")}
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">{t("contact.form.name")}</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      placeholder={t("contact.form.namePlaceholder")} 
                      required
                      value={contactForm.nombre}
                      onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="proyecto">{t("contact.form.project")}</label>
                    <input 
                      type="text" 
                      id="proyecto" 
                      placeholder={t("contact.form.projectPlaceholder")}
                      value={contactForm.proyecto}
                      onChange={(e) => setContactForm({ ...contactForm, proyecto: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="modelo">{t("contact.form.model")}</label>
                    <select 
                      id="modelo"
                      value={contactForm.modelo}
                      onChange={(e) => setContactForm({ ...contactForm, modelo: e.target.value })}
                    >
                      <option value="fee">{t("contact.form.optionFee")}</option>
                      <option value="equity">{t("contact.form.optionEquity")}</option>
                      <option value="hibrido">{t("contact.form.optionHybrid")}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="descripcion">{t("contact.form.desc")}</label>
                    <textarea 
                      id="descripcion" 
                      placeholder={t("contact.form.descPlaceholder")} 
                      required
                      value={contactForm.descripcion}
                      onChange={(e) => setContactForm({ ...contactForm, descripcion: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                    {t("contact.form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <div className="footer-links">
            <a href="#productos">{t("footer.links.products")}</a>
            <a href="#como-colaboramos">{t("footer.links.collab")}</a>
            <a href="#filosofia">{t("footer.links.philosophy")}</a>
          </div>
        </footer>
      </div>
    </>
  );
}aboración</a>
            <a href="#filosofia">Filosofía</a>
          </div>
        </footer>
      </div>
    </>
  );
}
