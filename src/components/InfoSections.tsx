import React, { useEffect, useRef, useState } from 'react'

const InfoSections: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.3 }
    )

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el
  }

  return (
    <div className="info-sections">
      <section 
        id="features" 
        ref={setSectionRef('features')}
        className={`info-section ${visibleSections.has('features') ? 'visible' : ''}`}
      >
        <div className="section-container">
          <h2 className="section-title">¿Qué hace Interestelar?</h2>
          <div className="section-content">
            <p className="section-text">
              Interestelar es una plataforma que combina la exploración espacial con algoritmos computacionales avanzados
              Nuestra aplicación ofrece dos herramientas principales: un algoritmo de backtracking para la exploración del universo
              y un autómata finito para la verificación gramatical de archivos
            </p>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🌌</div>
                <h3>Exploración del Universo</h3>
                <p>Navega paisajes cósmicos usando algoritmos de backtracking</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔬</div>
                <h3>Verificación Gramatical</h3>
                <p>Valida archivos de texto usando autómatas finitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="about" 
        ref={setSectionRef('about')}
        className={`info-section ${visibleSections.has('about') ? 'visible' : ''}`}
      >
        <div className="section-container">
          <h2 className="section-title">¿Por qué usar Interestelar?</h2>
          <div className="section-content">
            <p className="section-text">
              Vive la combinación perfecta entre la maravilla del espacio y el poder computacional
              Ya seas estudiante, investigador o simplemente curioso, Interestelar ofrece una forma divertida de explorar algoritmos complejos
            </p>
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-number">01</span>
                <div className="benefit-content">
                  <h4>Valor Educativo</h4>
                  <p>Aprende algoritmos avanzados de forma interactiva con temática espacial</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-number">02</span>
                <div className="benefit-content">
                  <h4>Aprendizaje Visual</h4>
                  <p>Conceptos complejos explicados con representaciones visuales impactantes</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-number">03</span>
                <div className="benefit-content">
                  <h4>Aplicación Práctica</h4>
                  <p>Resolución de problemas reales basada en fundamentos teóricos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="team" 
        ref={setSectionRef('team')}
        className={`info-section ${visibleSections.has('team') ? 'visible' : ''}`}
      >
        <div className="section-container">
          <h2 className="section-title">¿Quién creó Interestelar?</h2>
          <div className="section-content">
            <p className="section-text">
              Interestelar fue creado por un equipo apasionado de estudiantes de ciencias de la computación y entusiastas del espacio
              Nuestra misión es hacer que los algoritmos complejos sean accesibles y entretenidos para todos
            </p>
            <div className="team-stats">
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Miembros del equipo</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Algoritmos clave</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Posibilidades</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InfoSections
