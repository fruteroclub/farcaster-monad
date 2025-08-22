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
          {subtitleEs && <p className="text-zinc-200">{subtitleEs}</p>}
          {subtitleEn && <p className="text-zinc-400 text-sm italic">{subtitleEn}</p>}
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
          <p className="font-medium">
            Explora acciones nativas, comparte un cast y prueba wallet en testnet.
          </p>
          <p className="text-zinc-400 text-sm">
            Explore native actions, share a cast, and try wallet on testnet.
          </p>
        </header>

        {/* Perfil */}
        <Card
          title="Tu perfil · Your profile"
          subtitleEs="Esta es tu identidad en Farcaster."
          subtitleEn="This is your Farcaster identity."
        >
          <User />
        </Card>

        {/* Acciones Farcaster */}
        <Card
          title="Acciones Farcaster · Farcaster actions"
          subtitleEs="Crea un cast prellenado y abre perfiles sin salir de la Mini App."
          subtitleEn="Create a prefilled cast and view profiles without leaving the app."
        >
          <FarcasterActions />
        </Card>

        {/* Añadir/Notificaciones */}
        <Card
          title="Notificaciones · Notifications"
          subtitleEs="Agrega la app y habilita notificaciones para recibir avisos."
          subtitleEn="Add the app and enable notifications to receive updates."
        >
          <NotificationActions />
        </Card>

        {/* Wallet (Monad Testnet) */}
        <Card
          title="Wallet (Monad Testnet)"
          subtitleEs="Antes de enviar colocamos la red de Monad."
          subtitleEn="We switch to Monad testnet before sending."
        >
          <WalletActions />
        </Card>

        {/* Haptics */}
        <Card
          title="Haptics"
          subtitleEs="Vibraciones y feedback táctil (si tu cliente lo soporta)."
          subtitleEn="Haptic feedback, when supported by the client."
        >
          <Haptics />
        </Card>

        {/* OG Image */}
        <Card
          title="Imagen OG · OG Image"
          subtitleEs="Genera una imagen para compartir y probar metadatos sociales."
          subtitleEn="Generate a shareable image to test social metadata."
        >
          <CustomOGImageAction />
        </Card>
      </main>
    </div>
  )
}

