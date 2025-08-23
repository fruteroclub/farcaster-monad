import { NextResponse } from 'next/server'
import { APP_URL as RAW_APP_URL } from '../../../lib/constants'

function getAppUrl() {  
  const fromEnv =
    process.env.NEXT_PUBLIC_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    ''
  const raw = (RAW_APP_URL || fromEnv || '').toString()
  return raw.replace(/\/$/, '') // sin slash final
}

export async function GET() {
  const appUrl = getAppUrl()  
  const v = process.env.MANIFEST_ASSET_VERSION || '4'

  const farcasterConfig = {
    accountAssociation: {
      header: process.env.FARCASTER_AA_HEADER || '',
      payload: process.env.FARCASTER_AA_PAYLOAD || '',
      signature: process.env.FARCASTER_AA_SIGNATURE || '',
    },
    frame: {
      version: '1',
      name: 'gMonad',
      iconUrl: `${appUrl}/images/icon.png?v=${v}`,          
      homeUrl: `${appUrl}`,                                 
      imageUrl: `${appUrl}/images/feed.png?v=${v}`,         
      screenshotUrls: [
        // Para agregar varias imágenes
        `${appUrl}/images/hero.png?v=${v}`,
      ],
      tags: ['monad', 'farcaster', 'miniapp', 'template'],
      primaryCategory: 'developer-tools',
      buttonTitle: 'Test Me',                               
      splashImageUrl: `${appUrl}/images/splash.png?v=${v}`, 
      splashBackgroundColor: '#2F0372',                     
      webhookUrl: `${appUrl}/api/webhook`,
    },
  }

  return NextResponse.json(farcasterConfig, {
    headers: {
      'content-type': 'application/json',      
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  })
}
