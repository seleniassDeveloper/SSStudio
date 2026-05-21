import { useCallback, useState, useEffect, useRef } from "react";
// @ts-ignore
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import BackgroundBlob from "./components/BackgroundBlob";
import DemoEmbed from "./components/DemoEmbed";
import {
  productDemos,
  isExternalDemo,
  type DemoKind,
} from "./config/productDemos";
import { useTheme } from "./hooks/useTheme";
import { submitLead, trackEvent, analyzeCandleImage } from "./lib/api";
import { getIdToken } from "./lib/firebase";
import { AuthNav } from "./components/AuthNav";

gsap.registerPlugin(ScrollTrigger);

type AppPage = "home" | "ceromancia" | "emociones" | "calorias";

function pageFromPath(pathname: string): AppPage {
  if (pathname === "/demo/ceromancia") return "ceromancia";
  if (pathname === "/demo/emociones") return "emociones";
  if (pathname === "/demo/calorias") return "calorias";
  return "home";
}

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
  const { theme, toggleTheme } = useTheme();

  // Dynamic document title update based on current language
  useEffect(() => {
    document.title = t("meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));
  }, [i18n.language, t]);

  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    pageFromPath(window.location.pathname)
  );

  const goHome = useCallback(() => {
    window.history.pushState({}, "", "/");
    setCurrentPage("home");
  }, []);

  const openProductDemo = useCallback((kind: DemoKind) => {
    const url = productDemos[kind];

    if (kind === "dashboard" || isExternalDemo(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const path =
      kind === "ceromancia"
        ? "/demo/ceromancia"
        : kind === "emotions"
          ? "/demo/emociones"
          : "/demo/calorias";

    window.history.pushState({}, "", path);
    setCurrentPage(pageFromPath(path));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const lenisRef = useRef<any>(null);
  const pageRef = useRef(currentPage);
  pageRef.current = currentPage;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!link || pageRef.current !== "home") return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
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
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    nombre: "",
    proyecto: "",
    descripcion: "",
    tipo: "app-nueva"
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

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = (await analyzeCandleImage(file)) as AnalisisResponse;
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("demo.errorAnalyze"));
    } finally {
      setLoading(false);
    }
  };

  // Manejador de submit del formulario de contacto
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nombre.trim() || !contactForm.descripcion.trim()) {
      alert(t("contact.errorFields"));
      return;
    }
    if (contactForm.descripcion.trim().length < 5) {
      alert(t("contact.errorDescMin", { defaultValue: "La descripción debe tener al menos 5 caracteres." }));
      return;
    }
    setContactSubmitting(true);
    try {
      const token = await getIdToken();
      await submitLead(
        {
          nombre: contactForm.nombre.trim(),
          proyecto: contactForm.proyecto.trim() || undefined,
          tipo: contactForm.tipo,
          descripcion: contactForm.descripcion.trim(),
        },
        token
      );
      await trackEvent("contact_form_submit", { tipo: contactForm.tipo }, token);
      setContactSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : t("contact.errorSend", { defaultValue: "No se pudo enviar. ¿Está la API en marcha?" }));
    } finally {
      setContactSubmitting(false);
    }
  };

  if (currentPage === "emociones") {
    return (
      <DemoEmbed
        title={t("products.emotions.title")}
        iframeSrc={productDemos.emotions}
        onBack={goHome}
      />
    );
  }

  if (currentPage === "calorias") {
    return (
      <DemoEmbed
        title={t("products.calorieVision.title")}
        iframeSrc={productDemos.calories}
        onBack={goHome}
      />
    );
  }

  if (currentPage === "ceromancia") {
    return (
      <div className="studio-container" style={{ paddingTop: "2rem" }}>
        <div className="demo-header-bar">
          <button type="button" className="demo-back-btn" onClick={goHome}>
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

  // Render principal: Landing Page de SSSTudio
  return (
    <>
      <BackgroundBlob hide={currentPage !== "home"} theme={theme} />
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#inicio" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          SSS<span>Studio</span>
        </a>
        <ul className="nav-links">
          <li><a href="#servicios">{t("nav.services")}</a></li>
          <li><a href="#productos">{t("nav.products")}</a></li>
          <li><a href="#contacto">{t("nav.workWithUs")}</a></li>
          <li><a href="#contacto" className="nav-btn">{t("nav.cta")}</a></li>
          <AuthNav />
          <li>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
              title={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
            >
              {theme === "dark" ? "☀" : "☽"}
            </button>
          </li>
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
              {t("hero.titlePart2") ? t("hero.titlePart2") : null}
            </h1>
            <p>
              {t("hero.subtitle")}
            </p>
            <div className="hero-ctas">
              <a href="#contacto" className="btn btn-primary">{t("hero.ctaIdea")}</a>
              <a href="#productos" className="btn btn-secondary">{t("hero.ctaHow")}</a>
            </div>
          </div>
          <div className="hero-scroll">
            <span>SCROLL</span>
            <div className="hero-scroll-line"></div>
          </div>
        </header>

        {/* SERVICES — Cómo trabajamos */}
        <section className="section" id="servicios">
          <div className="section-header">
            <span className="section-tag">{t("services.tag")}</span>
            <h2>{t("services.title")}</h2>
            <p className="section-description">
              {t("services.description")}
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">◈</div>
              <span className="service-badge">{t("services.ai.badge")}</span>
              <h3>{t("services.ai.title")}</h3>
              <p>{t("services.ai.desc")}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">◇</div>
              <span className="service-badge">{t("services.design.badge")}</span>
              <h3>{t("services.design.title")}</h3>
              <p>{t("services.design.desc")}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">⚡</div>
              <span className="service-badge">{t("services.speed.badge")}</span>
              <h3>{t("services.speed.title")}</h3>
              <p>{t("services.speed.desc")}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">✦</div>
              <span className="service-badge">{t("services.production.badge")}</span>
              <h3>{t("services.production.title")}</h3>
              <p>{t("services.production.desc")}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">◎</div>
              <span className="service-badge">{t("services.ideas.badge")}</span>
              <h3>{t("services.ideas.title")}</h3>
              <p>{t("services.ideas.desc")}</p>
            </div>
          </div>
        </section>

        {/* VISIÓN */}
        <section className="section" id="vision">
          <div className="section-header">
            <span className="section-tag">{t("vision.tag")}</span>
            <h2>{t("vision.title")}</h2>
            <p className="section-description vision-subtitle">{t("vision.subtitle")}</p>
          </div>
          <p className="vision-body">{t("vision.body")}</p>
        </section>

        {/* PRODUCTS — Apps del studio */}
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
                <p>{t("products.dashboard.desc")}</p>
                <dl className="product-details">
                  <div>
                    <dt>{t("products.problemLabel")}</dt>
                    <dd>{t("products.dashboard.problem")}</dd>
                  </div>
                  <div>
                    <dt>{t("products.aiLabel")}</dt>
                    <dd>{t("products.dashboard.ai")}</dd>
                  </div>
                </dl>
              </div>
              <button
                type="button"
                className="product-action"
                onClick={() => openProductDemo("dashboard")}
              >
                {t("products.dashboard.cta")}
              </button>
            </div>

            {/* Ceromancia */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">{t("products.ceromancia.tag")}</span>
                <h3>{t("products.ceromancia.title")}</h3>
                <p>{t("products.ceromancia.desc")}</p>
                <dl className="product-details">
                  <div>
                    <dt>{t("products.problemLabel")}</dt>
                    <dd>{t("products.ceromancia.problem")}</dd>
                  </div>
                  <div>
                    <dt>{t("products.aiLabel")}</dt>
                    <dd>{t("products.ceromancia.ai")}</dd>
                  </div>
                </dl>
              </div>
              <button
                type="button"
                className="product-action"
                onClick={() => openProductDemo("ceromancia")}
              >
                {t("products.ceromancia.cta")}
              </button>
            </div>

            {/* Análisis emocional */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">{t("products.emotions.tag")}</span>
                <h3>{t("products.emotions.title")}</h3>
                <p>{t("products.emotions.desc")}</p>
                <dl className="product-details">
                  <div>
                    <dt>{t("products.problemLabel")}</dt>
                    <dd>{t("products.emotions.problem")}</dd>
                  </div>
                  <div>
                    <dt>{t("products.aiLabel")}</dt>
                    <dd>{t("products.emotions.ai")}</dd>
                  </div>
                </dl>
              </div>
              <button
                type="button"
                className="product-action"
                onClick={() => openProductDemo("emotions")}
              >
                {t("products.emotions.cta")}
              </button>
            </div>

            {/* Cuenta calorías */}
            <div className="product-card">
              <div className="product-meta">
                <span className="product-badge">{t("products.calorieVision.tag")}</span>
                <h3>{t("products.calorieVision.title")}</h3>
                <p>{t("products.calorieVision.desc")}</p>
                <dl className="product-details">
                  <div>
                    <dt>{t("products.problemLabel")}</dt>
                    <dd>{t("products.calorieVision.problem")}</dd>
                  </div>
                  <div>
                    <dt>{t("products.aiLabel")}</dt>
                    <dd>{t("products.calorieVision.ai")}</dd>
                  </div>
                </dl>
              </div>
              <button
                type="button"
                className="product-action"
                onClick={() => openProductDemo("calories")}
              >
                {t("products.calorieVision.cta")}
              </button>
            </div>
          </div>
          <p className="products-closing">{t("products.closing")}</p>
        </section>

        {/* MATCH — ¿Trabajamos juntos? */}
        <section className="section" id="trabajar">
          <div className="section-header">
            <span className="section-tag">{t("match.tag")}</span>
            <h2>{t("match.title")}</h2>
          </div>
          <div className="match-card" style={{ maxWidth: "720px" }}>
            <ul className="match-list match-list-yes">
              <li>{t("match.yes1")}</li>
              <li>{t("match.yes2")}</li>
              <li>{t("match.yes3")}</li>
              <li>{t("match.yes4")}</li>
            </ul>
          </div>
        </section>

        {/* CONTACT */}
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
                      setContactForm({ nombre: "", proyecto: "", descripcion: "", tipo: "app-nueva" });
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
                    <label htmlFor="tipo">{t("contact.form.type")}</label>
                    <select 
                      id="tipo"
                      value={contactForm.tipo}
                      onChange={(e) => setContactForm({ ...contactForm, tipo: e.target.value })}
                    >
                      <option value="app-nueva">{t("contact.form.optionNew")}</option>
                      <option value="integrar">{t("contact.form.optionIntegrate")}</option>
                      <option value="mejorar">{t("contact.form.optionImprove")}</option>
                      <option value="otro">{t("contact.form.optionOther")}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="descripcion">{t("contact.form.desc")}</label>
                    <textarea 
                      id="descripcion" 
                      placeholder={t("contact.form.descPlaceholder")} 
                      required
                      minLength={5}
                      value={contactForm.descripcion}
                      onChange={(e) => setContactForm({ ...contactForm, descripcion: e.target.value })}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: "0.5rem" }}
                    disabled={contactSubmitting}
                  >
                    {contactSubmitting ? t("contact.form.sending", { defaultValue: "Enviando…" }) : t("contact.form.submit")}
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
            <a href="#servicios">{t("footer.links.services")}</a>
            <a href="#productos">{t("footer.links.products")}</a>
            <a href="#contacto">{t("footer.links.contact")}</a>
          </div>
        </footer>
      </div>
    </>
  );
}
