import { defineConfig, devices } from '@playwright/test'

// Smoke test sull'export statico: prima `npm run build`, poi `npm run test:e2e`
export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:4147', locale: 'it-IT' },
  webServer: { command: 'node scripts/serve.mjs 4147', url: 'http://localhost:4147', reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'telefono', use: { ...devices['Pixel 7'] } },
  ],
})
