// ESLint 9 in formato flat: `next lint` non esiste piu' da Next 16
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'test-results/**', 'playwright-report/**'] },
]

export default config
