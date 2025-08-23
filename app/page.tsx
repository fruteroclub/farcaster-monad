import App from '@/components/pages/app'
import { APP_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const frame = {
  version: 'next',
  imageUrl: `${APP_URL}/images/feed.png`,
  button: {
    title: 'Test Me',
    action: {
      type: 'launch_frame',
      name: 'gMonad',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: '#2F0372',
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'gMonad',
    openGraph: {
      title: 'gMonad',
      description: 'A miniapp for Monad',
      url: APP_URL,
      images: [`${APP_URL}/images/og.png`], // 
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  }
}

export default function Home() {
  return <App />
}
