'use client'

import { UserWallet } from '@/components/Home/UserWallet'
import { JokeActions } from '@/components/Home/JokeActions'

export function Demo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
        Dad Jokes App
      </h1>
      <div className="w-full max-w-2xl space-y-6">
        <UserWallet />
        <JokeActions />
      </div>
    </div>
  )
}
