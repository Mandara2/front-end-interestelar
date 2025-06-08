import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UniverMapService } from '../services/UniverseMapService'
import UniverseMap from '../data/UniverseMap.json'
import  BackButton from './BackButton'	

const UniverseMapSimulation = () => {
    const [simulationResult, setSimulationResult] = useState<any>(null)
    const [shipPosition, setShipPosition] = useState<[number, number] | null>(null)


    const navigate = useNavigate()
    const handleBackFeatureSelection = () => {
        navigate('/features')
    }

    const handleStartSimulation = () => {
  UniverMapService.startSimulation(UniverseMap)
    .then((response) => {
      const path = response.camino
      let delay = 200 // milisegundos entre pasos, personalizable

      path.forEach((coord, index) => {
        setTimeout(() => {
          setShipPosition(coord)
        }, index * delay)
      })
    })
    .catch((error: any) => {
      console.error('Error al iniciar la simulación:', error)
    })
}


  return (
    <div>
        <div className="stars-background">
        {/* Multiple layers of stars */}
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        
        {/* Distant planets */}
        <div className="distant-planet planet-1"></div>
        <div className="distant-planet planet-2"></div>
        <div className="distant-planet planet-3"></div>
        <div className="distant-planet planet-4"></div>
        <div className="distant-planet planet-5"></div>
        
        {/* Nebula effects */}
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
        <BackButton text="Volver a selección de características" onClick={handleBackFeatureSelection} />

        <h2 className="map-title">Mapa Interestelar</h2>
<h4 className="map-subtitle">
Visualiza los elementos cósmicos clave como agujeros negros, estrellas gigantes y zonas estratégicas de recarga
</h4>

    <div className="simulation-button-container">
    <button className="card-button" onClick={handleStartSimulation}>
              <span>Iniciar simulación</span>
              <div className="button-glow"></div>
            </button>
    </div>


        <div className="map-container">
  <div className="glass-box">
        <div className="universe-map">
  {UniverseMap.matrizInicial.map((row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((cellValue, colIndex) => {
        const isShipHere = shipPosition && shipPosition[0] === rowIndex && shipPosition[1] === colIndex
        const isBlackHole = UniverseMap.agujerosNegros.some(([r, c]) => r === rowIndex && c === colIndex)
        const isWormhole = UniverseMap.agujerosGusano.some(
              (g) =>
                (g.entrada[0] === rowIndex && g.entrada[1] === colIndex) ||
                (g.salida[0] === rowIndex && g.salida[1] === colIndex)
            )
        const isStar = UniverseMap.estrellasGigantes.some(([r, c]) => r === rowIndex && c === colIndex)
        const isOrigin = UniverseMap.origen[0] === rowIndex && UniverseMap.origen[1] === colIndex
        const isDestination = UniverseMap.destino[0] === rowIndex && UniverseMap.destino[1] === colIndex

        let cellClass = 'cell'
        if (isBlackHole) cellClass += ' black-hole'
        if (isWormhole) cellClass += ' wormhole'
        else if (isStar) cellClass += ' giant-star'
        else if (isOrigin) cellClass += ' origin'

        else if (isDestination) cellClass += ' destination'

        return (
          <div key={colIndex} className={cellClass} title={`(${rowIndex}, ${colIndex}) = ${cellValue}`}>
            {isBlackHole ? (
  <img src="../../public/icons/agujero.png" alt="Black Hole" className="cell-icon" />
) : isStar ? (
  <img src="../../public/icons/estrella.png" alt="Giant Star" className="cell-icon" />
) : isWormhole ? (
    <img src="../../public/icons/gusano.png" alt="Wormhole" className="cell-icon" />
) : isShipHere ? (
  <img src="../../public/icons/nave.png" alt="Ship" className="cell-icon" />
) : (
  cellValue
)}
          </div>
        )
      })}
    </div>
  ))}
</div>
    </div>
    </div>
    </div>
  )
}

export default UniverseMapSimulation