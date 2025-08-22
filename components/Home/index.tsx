'use client'

import { FarcasterActions } from '@/components/Home/FarcasterActions'
import { User } from '@/components/Home/User'
import { WalletActions } from '@/components/Home/WalletActions'
import { NotificationActions } from './NotificationActions'
import CustomOGImageAction from './CustomOGImageAction'
import { Haptics } from './Haptics'

function Card({
  title,
  subtitleEs,
  subtitleEn,
  children,
}: {
  title: string
  subtitleEs?: string
  subtitleEn?: string
  children: React.ReactNode
}) {
  return (
    <section className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/40">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {(subtitleEs || subtitleEn) && (
        <div className="mb-3 leading-snug">
          {/* Inglés primero */}
          {subtitleEn && <p className="text-zinc-200">{subtitleEn}</p>}
          {subtitleEs && <p className="text-zinc-400 text-sm italic">{subtitleEs}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export function Demo() {
  return (
    <div className="min-h-screen w-full">
      <main className="mx-auto max-w-2xl p-4 space-y-6">
        {/* Hero */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Monad Farcaster MiniApp Template</h1>
          {/* Inglés primero */}
          <p className="font-medium">
            Explore native actions, share a cast, and try wallet on testnet.
          </p>
          <p className="text-zinc-400 text-sm">
            Explora acciones nativas, comparte un cast y haz pruebas en testnet.
          </p>
        </header>

        {/* Perfil */}
        <Card
          title="Your profile"
          subtitleEn="This is your Farcaster identity."
          subtitleEs="Esta es tu identidad en Farcaster."
        >
          <User />
        </Card>

        {/* Acciones Farcaster */}
        <Card
          title="Farcaster actions"
          subtitleEn="Create a prefilled cast and view profiles without leaving the app."
          subtitleEs="Crea un cast rellenado y abre perfiles sin salir de la Mini App."
        >
          <FarcasterActions />
        </Card>

        {/* Añadir/Notificaciones */}
        <Card
          title="Notifications"
          subtitleEn="Add the app and enable notifications to receive updates."
          subtitleEs="Agrega la app y habilita notificaciones para recibir avisos."
        >
          <NotificationActions />
        </Card>

        {/* Wallet (Monad Testnet) */}
        <Card
          title="Wallet"
          subtitleEn="We switch to Monad testnet before sending."
          subtitleEs="Probando transacciones en la red de Monad."
        >
          <WalletActions />
        </Card>

        {/* Haptics */}
        <Card
          title="Haptics"
          subtitleEn="Haptic feedback, when supported by the client."
          subtitleEs="Vibraciones y feedback táctil (si tu cliente lo soporta)."
        >
          <Haptics />
        </Card>

        {/* OG Image */}
        <Card
          title="OG Image"
          subtitleEn="Generate a shareable image to test social metadata."
          subtitleEs="Genera una imagen para compartir y probar metadatos sociales."
        >
          <CustomOGImageAction />
        </Card>
      </main>
    </div>
  )
}
