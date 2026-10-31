import { test, expect } from '@playwright/test'
import teams from '../src/data/teams.json'

// Smoke: le tre porte dell'app (home, lobby + PIN di avvio, pannello docente) si aprono e funzionano
test('home: marchio e quattro mondi', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('una parola magica')
  await expect(page.getByText('Techno Challenge').first()).toBeVisible()
  await expect(page.locator('#t-mondi + ul > li')).toHaveCount(4)
})

test('lobby e PIN di avvio: sbagliato rifiutato, giusto apre la prima prova', async ({ page }) => {
  const team = teams.magia.teams[0]
  await page.goto('/accademia-magia/')
  await page.getByRole('link', { name: team.name }).click()
  await expect(page).toHaveURL(`/accademia-magia/${team.id}/`)
  const pin = page.locator('input[type="password"]')
  await pin.fill('0000')
  await page.getByRole('button', { name: /avvia sfida/i }).click()
  await expect(page.getByText('Codice di avvio errato!')).toBeVisible()
  await pin.fill(teams.magia.pins[team.id][0])
  await page.getByRole('button', { name: /avvia sfida/i }).click()
  await expect(page.getByRole('button', { name: /avanza/i })).toBeVisible()
})

test('pannello docente: i PIN sono nascosti finche non si mostrano', async ({ page }) => {
  await page.goto('/teacher/')
  const first = teams.mario.teams[0]
  await expect(page.getByText(teams.mario.pins[first.id][0], { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: `Mostra il PIN di ${first.name}, step 1`, exact: true }).click()
  await expect(page.getByText(teams.mario.pins[first.id][0], { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Monitoraggio' }).click()
  await expect(page.getByText('Scegli tema, squadra e step')).toBeVisible()
})
