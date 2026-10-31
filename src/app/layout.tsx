import type { Metadata, Viewport } from 'next'
import { fontVars } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Techno Challenge', template: '%s · Techno Challenge' },
  description: "Missioni di informatica a squadre per la primaria: ogni prova si apre con la parola magica dell'insegnante.",
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1A1033',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={fontVars}>
      <body className="min-h-screen bg-notte font-sans text-luna antialiased">{children}</body>
    </html>
  )
}
