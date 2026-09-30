import type { Config } from 'tailwindcss'

// I colori del marchio vivono come canali RGB in src/app/globals.css (:root), qui solo i nomi.
const tok = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        notte: tok('notte'),
        velluto: tok('velluto'),
        viola: tok('viola'),
        accademia: tok('accademia'),
        oro: { DEFAULT: tok('oro'), scuro: tok('oro-scuro') },
        luce: tok('luce'),
        luna: tok('luna'),
        muto: tok('muto'),
      },
      fontFamily: {
        // marchio e lettura
        brand: ['var(--font-brand)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        // temi (invariati)
        pixel: ['var(--font-pixel)', 'monospace'],
        serif: ['var(--font-magic)', 'Georgia', 'serif'],
        mono: ['var(--font-terminal)', 'Courier New', 'monospace'],
        tech: ['var(--font-tech)', 'sans-serif'],
      },
      transitionTimingFunction: {
        // ease-out deciso per entrate e risposte (il default di Tailwind resta ai temi)
        uscita: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
export default config
