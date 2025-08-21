'use client'

import { useState, useEffect } from 'react'
import { useFrame } from '@/components/farcaster-provider'
import { APP_URL } from '@/lib/constants'

// Array of dad jokes to display
const DAD_JOKES = [
  "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
  "¿Qué hace una abeja en el gimnasio? Zumba.",
  "¿Qué le dice un techo a otro? Techo de menos.",
  "¿Qué hace una taza en el gimnasio? Ejercicios de taz-adas.",
  "¿Por qué los esqueletos no pelean? Porque no tienen agallas.",
  "¿Qué hace una impresora en el gimnasio? Hace click.",
  "¿Qué le dice un gusano a otro? Voy a dar una vuelta a la manzana.",
  "¿Qué hace un perro con un taladro? Haciendo tala-dro.",
  "¿Qué hace una tetera en una fiesta? El té-mate.",
  "¿Qué le dice un huevo a una sartén? Me tienes frito."
]

export function JokeActions() {
  const { actions } = useFrame()
  const [currentJoke, setCurrentJoke] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load a random joke when component mounts
  useEffect(() => {
    getNewJoke()
  }, [])

  const getNewJoke = () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DAD_JOKES.length)
      setCurrentJoke(DAD_JOKES[randomIndex])
      setIsLoading(false)
    }, 500)
  }

  const handleShareJoke = () => {
    if (!currentJoke || !actions) return
    
    actions.composeCast({
      text: `${currentJoke} #DadJokes`,
      embeds: [`${APP_URL}/images/dad.jpg`],
    })
  }

  const handleGenerateImage = () => {
    if (!currentJoke || !actions) return
    
    const ogImageUrl = `${APP_URL}/api/og?text=${encodeURIComponent(currentJoke)}`
    actions.composeCast({
      text: `¡Mira este chiste que encontré! #DadJokes`,
      embeds: [ogImageUrl],
    })
  }

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-6 bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-4">Chiste del Día</h2>
      
      <div className="min-h-32 p-4 bg-gray-800 rounded-md flex items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse text-gray-400">Cargando chiste...</div>
        ) : (
          <p className="text-xl text-center italic">"{currentJoke}"</p>
        )}
      </div>

      <div className="flex flex-col space-y-3 mt-6">
        <button
          onClick={getNewJoke}
          disabled={isLoading}
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span>🎲</span>
          <span>Nuevo Chiste</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleShareJoke}
            disabled={!currentJoke || isLoading}
            className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>📢</span>
            <span>Compartir Chiste</span>
          </button>

          <button
            onClick={handleGenerateImage}
            disabled={!currentJoke || isLoading}
            className="px-4 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>🖼️</span>
            <span>Generar Imagen</span>
          </button>
        </div>
      </div>
    </div>
  )
}
