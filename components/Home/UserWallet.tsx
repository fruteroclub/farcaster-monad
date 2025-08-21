'use client'

import { useState, useEffect } from 'react'
import { useFrame } from '@/components/farcaster-provider'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import toast from 'react-hot-toast'

export function UserWallet() {
  const { context } = useFrame()
  const { isConnected, address, isConnecting, isDisconnected } = useAccount()
  const { connect, error: connectError } = useConnect({
    connector: farcasterMiniApp(),
  })
  const { disconnect } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false)

  // Log connection status changes
  useEffect(() => {
    console.log('Connection status:', { isConnected, isConnecting, isDisconnected })
  }, [isConnected, isConnecting, isDisconnected])

  // Log any connection errors
  useEffect(() => {
    if (connectError) {
      console.error('Wallet connection error:', connectError)
      toast.error(`Connection failed: ${connectError.message}`)
    }
  }, [connectError])

  const handleConnectWallet = async () => {
    console.log('Connect wallet button clicked')
    if (isConnected) {
      console.log('Wallet already connected:', address)
      return
    }

    setIsLoading(true)
    console.log('Attempting to connect wallet...')
    
    try {
      await connect(undefined, { throwForError: true })
      console.log('Wallet connection successful')
      toast.success('¡Billetera conectada con éxito!')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      toast.error('Failed to connect wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!context?.user) {
    return <p className="text-sm text-left">User context not available</p>
  }

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <div className="flex flex-row space-x-4 justify-start items-start">
        {context.user.pfpUrl && (
          <img
            src={context.user.pfpUrl}
            className="w-14 h-14 rounded-full"
            alt="User Profile"
            width={56}
            height={56}
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-left">Bienvenido a Dad Jokes!</h2>
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-semibold">Nombre:</span>{' '}
              <span className="bg-white font-mono text-black rounded-md px-2 py-1">
                {context.user.displayName}
              </span>
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Usuario:</span>{' '}
              <span className="bg-white font-mono text-black rounded-md px-2 py-1">
                @{context.user.username}
              </span>
            </p>
            
            {isConnected ? (
              <div className="mt-3 p-4 bg-gray-100 rounded-md">
                <p className="text-sm font-semibold mb-2">
                  Billetera Conectada ✅
                </p>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs font-mono text-gray-700 break-all">
                    {address}
                  </p>
                </div>
                <button
                  onClick={() => {
                    console.log('Disconnecting wallet...')
                    disconnect()
                    toast.success('Wallet disconnected')
                  }}
                  className="mt-3 w-full px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🔌</span>
                  <span>Desconectar Billetera</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isLoading || isConnecting}
                className={`mt-3 w-full px-4 py-3 text-white rounded-md transition-colors flex items-center justify-center space-x-2 ${
                  isLoading || isConnecting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLoading || isConnecting ? (
                  <>
                    <span className="animate-spin">🔄</span>
                    <span>Conectando...</span>
                  </>
                ) : (
                  <>
                    <span>🔗</span>
                    <span>Conectar Billetera para Empezar</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
