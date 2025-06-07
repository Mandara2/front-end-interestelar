import React from 'react'
import { useNavigate } from 'react-router-dom'

const FeatureSelection: React.FC = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate('/')
  }

  return (
    <div className="feature-selection">
      <div className="stars-background">
        {/* Capas de estrellas */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div className="star" key={i}></div>
        ))}

        {/* Planetas distantes */}
        <div className="distant-planet planet-1"></div>
        <div className="distant-planet planet-2"></div>
        <div className="distant-planet planet-3"></div>
        <div className="distant-planet planet-4"></div>
        <div className="distant-planet planet-5"></div>

        {/* Nebulosas */}
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>

        {/* Estrellas fugaces */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <div className="feature-header">
        <button className="back-button" onClick={handleBackHome}>
          ← Volver al inicio
        </button>
        <h1 className="feature-title">Elige tu misión</h1>
        <p className="feature-subtitle">Selecciona la herramienta cósmica que se ajusta a tus objetivos de exploración</p>
      </div>

      <div className="feature-cards">
        <div className="feature-card-large">
          <div className="card-background universe-bg"></div>
          <div className="card-content">
            <div className="card-icon">🌌</div>
            <h2 className="card-title">Explorador del Universo</h2>
            <p className="card-description">
              Emprende un viaje cósmico utilizando algoritmos avanzados de backtracking
              Navega por sistemas estelares, descubre nuevas galaxias y traza rutas por territorios desconocidos del espacio
            </p>
            <div className="card-features">
              <span className="feature-tag">Algoritmo Backtracking</span>
              <span className="feature-tag">Navegación Espacial</span>
              <span className="feature-tag">Mapeo Cósmico</span>
            </div>
            <button className="card-button">
              <span>Iniciar exploración</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>

        <div className="feature-card-large">
          <div className="card-background grammar-bg"></div>
          <div className="card-content">
            <div className="card-icon">🔬</div>
            <h2 className="card-title">Guardian de la Gramática</h2>
            <p className="card-description">
              Utiliza la potencia de un autómata finito para verificar archivos de texto
              Asegura que tus comunicaciones cósmicas cumplan con las reglas universales de sintaxis y estructura
            </p>
            <div className="card-features">
              <span className="feature-tag">Autómata Finito</span>
              <span className="feature-tag">Verificación Gramatical</span>
              <span className="feature-tag">Análisis de Texto</span>
            </div>
            <button className="card-button">
              <span>Iniciar verificación</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSelection
