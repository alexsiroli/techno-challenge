import localFont from 'next/font/local'

// Tutti i font sono self-host (OFL, sottoinsieme latin): niente Google Fonts a runtime, che nelle
// reti delle scuole e' spesso bloccato e manda dati a terzi.

// Marchio: Texturina per i titoli (la pergamena dell'accademia), Lexend per leggere
export const brand = localFont({
  src: '../fonts/texturina-display-600-900.woff2',
  weight: '600 900',
  variable: '--font-brand',
  display: 'swap',
})
export const body = localFont({
  src: '../fonts/lexend-300-700.woff2',
  weight: '300 700',
  variable: '--font-body',
  display: 'swap',
})

// I caratteri dei quattro temi, invariati
export const pixel = localFont({
  src: '../fonts/press-start-2p-400.woff2',
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
  preload: false,
})
export const magic = localFont({
  src: [
    { path: '../fonts/cinzel-decorative-400.woff2', weight: '400' },
    { path: '../fonts/cinzel-decorative-700.woff2', weight: '700' },
    { path: '../fonts/cinzel-decorative-900.woff2', weight: '900' },
  ],
  variable: '--font-magic',
  display: 'swap',
  preload: false,
})
export const terminal = localFont({
  src: '../fonts/share-tech-mono-400.woff2',
  weight: '400',
  variable: '--font-terminal',
  display: 'swap',
  preload: false,
})
export const tech = localFont({
  src: '../fonts/orbitron-400-900.woff2',
  weight: '400 900',
  variable: '--font-tech',
  display: 'swap',
  preload: false,
})

export const fontVars = [brand, body, pixel, magic, terminal, tech].map((f) => f.variable).join(' ')
