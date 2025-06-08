import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton"
import  "../core/validators/AfdValidator"

declare global {
  interface Window {
    validarArchivo: (lineas: string[]) => {
      validas: any[]
      invalidas: any[]
    }
  }
}


const AFDs = () => {
  const [originalContent, setOriginalContent] = useState<string>("")
  const [validResults, setValidResults] = useState<any[]>([])
  const [invalidResults, setInvalidResults] = useState<any[]>([])
  const [fileContent, setFileContent] = useState<string>("")
  const navigate = useNavigate()

  const handleBackFeatureSelection = () => {
    navigate("/features")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = function (event) {
      const content = event.target?.result as string
      setOriginalContent(content)
      setFileContent(content)
    }
    reader.readAsText(file)
  }

  const handleValidate = () => {
    const lines = fileContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "" && !line.startsWith("//"))

    const results = window.validarArchivo(lines)
    setValidResults(results.validas)
    setInvalidResults(results.invalidas)
  }

  return (
    <div>
      <div className="stars-background">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`distant-planet planet-${i}`}></div>
        ))}
        {[1, 2, 3].map((i) => (
          <div key={i} className={`nebula nebula-${i}`}></div>
        ))}
        {[1, 2, 3].map((i) => (
          <div key={i} className="shooting-star"></div>
        ))}
      </div>

      <BackButton text="Volver a selección de características" onClick={handleBackFeatureSelection} />

      <h2 className="map-title">Guardian de la gramática</h2>
      <p className="map-subtitle">Verifica cadenas de texto contra un AFD</p>

      <div className="simulation-button-container">
        <input type="file" className="fileInput" onChange={handleFileChange} />
      </div>

      <div className="simulation-button-container">
        <button className="card-button" onClick={handleValidate}>Validar</button>
      </div>

      <div className="results-container">
        <div className="results">
          <h2>Contenido Original del Archivo</h2>
          <div className="originalContent">
            <pre>{originalContent}</pre>
          </div>

          <h2>Cadenas Válidas</h2>
          <div className="valclassNameResults">
            {validResults.length > 0 ? (
              validResults.map((result, index) => (
                <div key={index} className="result-item valid">
                  <strong>✓ {result.original}</strong>
                  <br />
                  <span className="result-type">{result.tipo}</span>
                </div>
              ))
            ) : (
              <p className="no-results">No se encontraron cadenas válidas</p>
            )}
          </div>

          <h2>Cadenas Inválidas</h2>
          <div className="invalclassNameResults">
            {invalidResults.length > 0 ? (
              invalidResults.map((result, index) => (
                <div key={index} className="result-item invalid">
                  <strong>✗ {result.original}</strong>
                  <br />
                  <span className="result-type">{result.tipo}</span>
                  <br />
                  <span className="error-message">Error: {result.error}</span>
                  {result.errorPosicion !== undefined && (
                    <><br /><span className="error-position">Posición del error: {result.errorPosicion}</span></>
                  )}
                </div>
              ))
            ) : (
              <p className="no-results">No se encontraron cadenas inválidas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AFDs
