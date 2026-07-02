/**
 * One-time Google Ads OAuth2 setup helper.
 * Run once to get a refresh_token, then add it to .env.local.
 *
 * Usage:
 *   node scripts/ads-auth.mjs
 */

import http from 'http'
import { createInterface } from 'readline'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// Load existing .env.local if present
let clientId = process.env.GOOGLE_ADS_CLIENT_ID
let clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET

try {
  const env = readFileSync(path.join(root, '.env.local'), 'utf-8')
  for (const line of env.split('\n')) {
    const [k, ...v] = line.split('=')
    if (k?.trim() === 'GOOGLE_ADS_CLIENT_ID' && !clientId) clientId = v.join('=').trim()
    if (k?.trim() === 'GOOGLE_ADS_CLIENT_SECRET' && !clientSecret) clientSecret = v.join('=').trim()
  }
} catch {}

const rl = createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise((r) => rl.question(q, r))

async function main() {
  console.log('\n=== Google Ads OAuth2 Setup ===\n')
  console.log('You need a Google Cloud project with the Google Ads API enabled.')
  console.log('Go to: https://console.cloud.google.com/apis/credentials\n')

  if (!clientId) clientId = await ask('Google OAuth2 Client ID: ')
  else console.log(`Using Client ID from .env.local: ${clientId.slice(0, 20)}...`)

  if (!clientSecret) clientSecret = await ask('Google OAuth2 Client Secret: ')
  else console.log(`Using Client Secret from .env.local: ****`)

  clientId = clientId.trim()
  clientSecret = clientSecret.trim()

  const SCOPES = 'https://www.googleapis.com/auth/adwords'
  const REDIRECT = 'http://localhost:9876'

  const authUrl =
    `https://accounts.google.com/o/oauth2/auth` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(SCOPES)}` +
    `&access_type=offline` +
    `&prompt=consent`

  console.log('\n1. Open this URL in your browser and grant access:')
  console.log('\n   ' + authUrl + '\n')
  console.log('2. Waiting for the OAuth2 callback on http://localhost:9876 ...\n')

  // Start a temporary local server to catch the redirect
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:9876')
      const code = url.searchParams.get('code')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('<h2>✅ Authorised! You can close this tab.</h2>')
      server.close()
      code ? resolve(code) : reject(new Error('No code in callback'))
    })
    server.listen(9876)
    server.on('error', reject)
  })

  console.log('✅ Got authorisation code. Exchanging for refresh token...\n')

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT,
      grant_type: 'authorization_code',
    }),
  })

  const tokens = await tokenRes.json()
  if (tokens.error) throw new Error(`Token exchange failed: ${tokens.error_description}`)

  console.log('=== Add these to your .env.local ===\n')
  console.log(`GOOGLE_ADS_CLIENT_ID=${clientId}`)
  console.log(`GOOGLE_ADS_CLIENT_SECRET=${clientSecret}`)
  console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}`)
  console.log('\nAlso add:')
  console.log('GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token_from_google_ads_manager')
  console.log('GOOGLE_ADS_CUSTOMER_ID=123-456-7890  # your Google Ads account number\n')

  rl.close()
}

main().catch((e) => {
  console.error('Error:', e.message)
  process.exit(1)
})
