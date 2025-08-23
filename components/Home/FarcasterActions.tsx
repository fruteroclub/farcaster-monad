'use client'

import { useFrame } from '@/components/farcaster-provider'
import { APP_URL } from '@/lib/constants'

export function FarcasterActions() {
  const { actions } = useFrame()

  
  const HOME_URL = (APP_URL || '').replace(/\/$/, '')

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left">sdk.actions</h2>

      <div className="flex flex-row space-x-4 justify-start items-start">
        {actions ? (
          <div className="flex flex-col space-y-3 justify-start w-full">
            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
              onClick={() => actions?.addMiniApp?.() ?? actions?.addFrame?.()}
            >
              Add this app to your home screen
            </button>

            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
              onClick={() => actions?.close?.()}
            >
              Close
            </button>

            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
              onClick={() =>
                actions?.composeCast?.({
                  text: 'Check out this Monad Farcaster MiniApp Template!',                  
                  embeds: [HOME_URL],
                })
              }
            >
              Share with your friends
            </button>

            
            {/* 
            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
              onClick={() => actions?.openUrl?.('https://docs.monad.xyz')}
            >
              openUrl
            </button>
            */}
            {/*
            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
              onClick={() => actions?.viewProfile?.({ fid: 17979 })}
            >
              viewProfile
            </button>
            */}
          </div>
        ) : (
          <p className="text-sm text-left">Actions not available</p>
        )}
      </div>
    </div>
  )
}
