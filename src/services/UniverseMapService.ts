// src/services/solverService.ts

export interface SolveResponse {
  camino: [number, number][]
  exito: boolean
  mensaje: string
}

const API_URL = import.meta.env.VITE_BACKEND_URL

export const solveUniverse = async (inputData: any): Promise<SolveResponse> => {
  const response = await fetch(`${API_URL}/resolver`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })

  if (!response.ok) {
    throw new Error('Error al llamar al backend')
  }

  const data: SolveResponse = await response.json()
  return data
}


export const UniverMapService = {
  startSimulation: async (inputData: any): Promise<SolveResponse> => {
    try {
      const result = await solveUniverse(inputData)
      return result
    } catch (error) {
      console.error('Error en la simulación del mapa del universo:', error)
      throw error
    }
  }
    }