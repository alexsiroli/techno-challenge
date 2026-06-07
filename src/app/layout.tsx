import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Techno Challenge',
  description: 'Piattaforma di gamification per la classe!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
