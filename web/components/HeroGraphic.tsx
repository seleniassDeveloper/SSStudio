"use client";

import Link from "next/link";

export function HeroGraphic() {
  return (
    <div className="hero-graphic-container">
      {/* Left Column: Flow Nodes */}
      <div className="flow-nodes-col">
        <div className="flow-node">
          <div className="node-icon bg-light-purple">📄</div>
          <div className="node-text">
            <strong>Datos & Documentos</strong>
            <span>Ingesta automatizada</span>
          </div>
        </div>
        <div className="flow-node">
          <div className="node-icon bg-light-purple">⚙️</div>
          <div className="node-text">
            <strong>Procesamiento Inteligente</strong>
            <span>Reglas y validación segura</span>
          </div>
        </div>
        <div className="flow-node">
          <div className="node-icon bg-light-purple">⚡</div>
          <div className="node-text">
            <strong>n8n & APIs</strong>
            <span>Flujos automatizados</span>
          </div>
        </div>
        <div className="flow-node">
          <div className="node-icon bg-light-green">📈</div>
          <div className="node-text">
            <strong>Métricas & ROI</strong>
            <span>Impacto en producción</span>
          </div>
        </div>

        {/* The dashed connection lines SVG overlay */}
        <svg className="flow-lines-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 120 40 L 260 40 L 260 200 L 300 200" stroke="#A29BFE" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 120 120 L 260 120" stroke="#A29BFE" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 120 200 L 300 200" stroke="#A29BFE" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 120 280 L 260 280 L 260 200" stroke="#A29BFE" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Right Column: Dark Dashboard Panel */}
      <div className="dashboard-panel">
        <div className="dash-sidebar">
          <div className="dash-logo">S</div>
          <div className="dash-menu">
            <div className="dash-icon active">⊞</div>
            <div className="dash-icon">⚡</div>
            <div className="dash-icon">👥</div>
            <div className="dash-icon">📊</div>
            <div className="dash-icon">⚙</div>
          </div>
        </div>
        
        <div className="dash-main">
          <div className="dash-header">
            <h3>Panel de Operaciones & Automatización</h3>
          </div>
          
          <div className="dash-stats-grid">
            <div className="dash-stat-box">
              <span className="stat-label">Flujos Activos</span>
              <strong className="stat-value">380+</strong>
              <span className="stat-delta positive">+24% este mes</span>
            </div>
            <div className="dash-stat-box">
              <span className="stat-label">Hs Ahorradas</span>
              <strong className="stat-value">320h</strong>
              <span className="stat-delta positive">por cliente</span>
            </div>
            <div className="dash-stat-box">
              <span className="stat-label">Países</span>
              <strong className="stat-value">17</strong>
              <span className="stat-delta neutral">global</span>
            </div>
            <div className="dash-stat-box">
              <span className="stat-label">Adopción</span>
              <strong className="stat-value">100%</strong>
              <span className="stat-delta positive">verificado</span>
            </div>
          </div>

          <div className="dash-bottom-grid">
            <div className="dash-chart-box">
              <div className="chart-header">
                <h4>Rendimiento Operativo</h4>
              </div>
              <div className="chart-body" style={{ position: "relative" }}>
                <svg viewBox="0 0 400 150" className="mock-chart-svg">
                  <path d="M 0 130 C 50 130, 80 110, 100 100 C 130 80, 160 90, 200 60 C 230 40, 270 50, 300 30 C 330 10, 370 20, 400 0" 
                        fill="none" stroke="#6C5CE7" strokeWidth="3" />
                  <circle cx="100" cy="100" r="4" fill="#6C5CE7" />
                  <circle cx="200" cy="60" r="4" fill="#6C5CE7" />
                  <circle cx="300" cy="30" r="4" fill="#6C5CE7" />
                  <circle cx="400" cy="0" r="4" fill="#6C5CE7" />
                </svg>
                <div className="chart-tooltip" style={{ position: "absolute", left: "280px", top: "10px" }}>
                  <span>2026</span>
                  <strong>+34% ROI</strong>
                </div>
                <div className="chart-x-axis">
                  <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
                </div>
              </div>
            </div>

            <div className="dash-list-box">
              <div className="chart-header">
                <h4>Sistemas Clave</h4>
              </div>
              <ul className="auto-list">
                <li>
                  <span className="auto-name">Reemplazo Jira</span>
                  <span className="auto-status">Activo</span>
                </li>
                <li>
                  <span className="auto-name">AuraDash ERP</span>
                  <span className="auto-status">Activo</span>
                </li>
                <li>
                  <span className="auto-name">Motor de Flujos</span>
                  <span className="auto-status">Activo</span>
                </li>
                <li>
                  <span className="auto-name">n8n Pipeline</span>
                  <span className="auto-status">Activo</span>
                </li>
              </ul>
              <Link href="/casos" className="view-all-link">Ver todos los casos →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
