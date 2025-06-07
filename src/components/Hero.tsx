import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero: React.FC = () => {
  const navigate = useNavigate()

  const handleStartJourney = () => {
    navigate('/features')
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="cosmic-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <h1 className="hero-title">
          <span className="title-line">Inicia tu</span>
          <span className="title-line">Viaje Cósmico</span>
          <span className="title-line">Hacia lo Desconocido</span>
        </h1>

        <p className="hero-subtitle">
          Explora las infinitas posibilidades del espacio mediante algoritmos avanzados
          y herramientas de exploración computacional
        </p>

        <button
          className="cta-button"
          onClick={handleStartJourney}
        >
          <span className="button-text">Comenzar la simulación</span>
          <div className="button-glow"></div>
        </button>
      </div>

      <div className="hero-visual">
        <div className="planet"></div>
        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>
        <div className="orbit orbit-3"></div>
      </div>
    </section>
  )
}

export default Hero
