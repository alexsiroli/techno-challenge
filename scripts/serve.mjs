// Serve l'export statico (out/) in locale, come Netlify: cartella -> index.html, altrimenti 404.html.
// Uso: node scripts/serve.mjs [porta]  (default 4147)
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve('out')
const PORT = Number(process.argv[2] ?? 4147)
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain' }

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let file = path.join(ROOT, url)
  if (!file.startsWith(ROOT)) return res.writeHead(403).end()
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html')
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' }).end(await readFile(file))
  } catch {
    res.writeHead(404, { 'content-type': TYPES['.html'] }).end(await readFile(path.join(ROOT, '404.html')).catch(() => 'Not found'))
  }
}).listen(PORT, () => console.log(`out/ su http://localhost:${PORT}`))
