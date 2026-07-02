/**
 * Google Ads Performance Report
 * Fetches the last 30 days of data and prints actionable insights.
 *
 * Prerequisites: run `node scripts/ads-auth.mjs` once to get credentials,
 * then add them to .env.local (see .env.example for the key names).
 *
 * Usage:
 *   node scripts/ads-report.mjs            # last 30 days
 *   node scripts/ads-report.mjs --days 14  # last 14 days
 *   node scripts/ads-report.mjs --json     # also write ads-report.json
 */

import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleAdsApi } from 'google-ads-api'

// ─── Load .env.local ────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function loadEnv() {
  try {
    const raw = readFileSync(path.join(root, '.env.local'), 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx < 0) continue
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {}
}
loadEnv()

// ─── Args ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const daysIdx = args.indexOf('--days')
const DAYS = daysIdx >= 0 ? parseInt(args[daysIdx + 1], 10) : 30
const SAVE_JSON = args.includes('--json')

// ─── Validate credentials ───────────────────────────────────────────────────
const required = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
]
const missing = required.filter((k) => !process.env[k])
if (missing.length) {
  console.error('\n❌ Missing environment variables:\n  ' + missing.join('\n  '))
  console.error('\nRun `node scripts/ads-auth.mjs` to obtain credentials.\n')
  process.exit(1)
}

const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')

// ─── Client ─────────────────────────────────────────────────────────────────
const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
})

const customer = client.Customer({
  customer_id: customerId,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
})

// ─── Helpers ─────────────────────────────────────────────────────────────────
const dateRange = `segments.date DURING LAST_${DAYS}_DAYS`
const micros = (v) => (Number(v) / 1_000_000).toFixed(2)
const pct = (v) => (Number(v) * 100).toFixed(2) + '%'
const fmt = (n, decimals = 0) => Number(n).toLocaleString('en-GB', { maximumFractionDigits: decimals })

function section(title) {
  const bar = '─'.repeat(60)
  console.log(`\n${bar}`)
  console.log(`  ${title}`)
  console.log(bar)
}

// ─── Queries ─────────────────────────────────────────────────────────────────

async function getCampaigns() {
  return customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.bidding_strategy_type,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.cost_per_conversion,
      metrics.search_impression_share,
      metrics.search_top_impression_share,
      metrics.search_absolute_top_impression_share,
      metrics.search_budget_lost_impression_share,
      metrics.search_rank_lost_impression_share
    FROM campaign
    WHERE ${dateRange}
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `)
}

async function getAdGroups() {
  return customer.query(`
    SELECT
      campaign.name,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.cost_per_conversion
    FROM ad_group
    WHERE ${dateRange}
      AND ad_group.status != 'REMOVED'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 20
  `)
}

async function getKeywords() {
  return customer.query(`
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.quality_info.quality_score,
      ad_group_criterion.quality_info.search_predicted_ctr,
      ad_group_criterion.quality_info.ad_relevance,
      ad_group_criterion.quality_info.landing_page_experience,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.cost_per_conversion
    FROM keyword_view
    WHERE ${dateRange}
      AND ad_group_criterion.status != 'REMOVED'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 50
  `)
}

async function getSearchTerms() {
  return customer.query(`
    SELECT
      campaign.name,
      ad_group.name,
      search_term_view.search_term,
      search_term_view.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE ${dateRange}
      AND metrics.impressions > 10
    ORDER BY metrics.cost_micros DESC
    LIMIT 50
  `)
}

async function getAds() {
  return customer.query(`
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_ad.ad.id,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      ad_group_ad.ad.final_urls,
      ad_group_ad.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.cost_micros
    FROM ad_group_ad
    WHERE ${dateRange}
      AND ad_group_ad.status != 'REMOVED'
      AND metrics.impressions > 0
    ORDER BY metrics.clicks DESC
    LIMIT 20
  `)
}

async function getDevicePerformance() {
  return customer.query(`
    SELECT
      segments.device,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.cost_per_conversion
    FROM campaign
    WHERE ${dateRange}
      AND campaign.status = 'ENABLED'
  `)
}

async function getGeoPerformance() {
  return customer.query(`
    SELECT
      geographic_view.country_criterion_id,
      geographic_view.location_type,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM geographic_view
    WHERE ${dateRange}
      AND metrics.clicks > 5
    ORDER BY metrics.cost_micros DESC
    LIMIT 15
  `)
}

// ─── Report ──────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  Google Ads Performance Report — Last ${DAYS} Days`)
  console.log(`  Account: ${customerId}`)
  console.log(`  Generated: ${new Date().toLocaleString('en-GB')}`)
  console.log('═'.repeat(60))

  const [campaigns, adGroups, keywords, searchTerms, ads, devices, geo] =
    await Promise.all([
      getCampaigns(),
      getAdGroups(),
      getKeywords(),
      getSearchTerms(),
      getAds(),
      getDevicePerformance(),
      getGeoPerformance(),
    ])

  // ── 1. Account Summary ───────────────────────────────────────────────────
  section('1. ACCOUNT SUMMARY')

  const totals = campaigns.reduce(
    (acc, r) => {
      acc.impressions += Number(r.metrics.impressions)
      acc.clicks += Number(r.metrics.clicks)
      acc.cost += Number(r.metrics.cost_micros)
      acc.conversions += Number(r.metrics.conversions)
      return acc
    },
    { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
  )

  const totalCTR = totals.clicks / (totals.impressions || 1)
  const avgCPC = totals.cost / (totals.clicks || 1) / 1_000_000
  const totalCPA = totals.cost / (totals.conversions || 1) / 1_000_000
  const convRate = totals.conversions / (totals.clicks || 1)

  console.log(`  Impressions : ${fmt(totals.impressions)}`)
  console.log(`  Clicks      : ${fmt(totals.clicks)}`)
  console.log(`  CTR         : ${pct(totalCTR)}`)
  console.log(`  Avg CPC     : £${(avgCPC).toFixed(2)}`)
  console.log(`  Total Spend : £${micros(totals.cost)}`)
  console.log(`  Conversions : ${fmt(totals.conversions, 1)}`)
  console.log(`  Conv. Rate  : ${pct(convRate)}`)
  console.log(`  CPA         : £${totalCPA.toFixed(2)}`)

  // ── 2. Campaign Performance ──────────────────────────────────────────────
  section('2. CAMPAIGN PERFORMANCE')

  for (const r of campaigns) {
    const c = r.campaign
    const m = r.metrics
    const spend = Number(m.cost_micros) / 1_000_000
    const impressionShare = m.search_impression_share
      ? `IS: ${pct(m.search_impression_share)}`
      : ''
    const lostBudget = m.search_budget_lost_impression_share
      ? `Lost(Budget): ${pct(m.search_budget_lost_impression_share)}`
      : ''
    const lostRank = m.search_rank_lost_impression_share
      ? `Lost(Rank): ${pct(m.search_rank_lost_impression_share)}`
      : ''

    console.log(`\n  📢 ${c.name}  [${c.status}]`)
    console.log(`     Bidding   : ${c.bidding_strategy_type}`)
    console.log(`     Spend     : £${spend.toFixed(2)} | Impressions: ${fmt(m.impressions)} | Clicks: ${fmt(m.clicks)}`)
    console.log(`     CTR       : ${pct(m.ctr)} | Avg CPC: £${micros(m.average_cpc)}`)
    console.log(`     Conversions: ${Number(m.conversions).toFixed(1)} | CPA: £${micros(m.cost_per_conversion)}`)
    if (impressionShare) console.log(`     ${impressionShare}  ${lostBudget}  ${lostRank}`)
  }

  // ── 3. Ad Group Performance ──────────────────────────────────────────────
  section('3. TOP AD GROUPS (by spend)')

  for (const r of adGroups.slice(0, 10)) {
    const m = r.metrics
    const spend = Number(m.cost_micros) / 1_000_000
    console.log(
      `  ${r.campaign.name} › ${r.ad_group.name}` +
      `  |  £${spend.toFixed(2)}  |  ${fmt(m.clicks)} clicks  |  CTR: ${pct(m.ctr)}` +
      `  |  Conv: ${Number(m.conversions).toFixed(1)}`
    )
  }

  // ── 4. Keyword Performance ───────────────────────────────────────────────
  section('4. KEYWORD PERFORMANCE')

  const kws = keywords.filter((r) => Number(r.metrics.impressions) > 0)

  // Top converters
  const topConverting = [...kws]
    .sort((a, b) => Number(b.metrics.conversions) - Number(a.metrics.conversions))
    .slice(0, 10)

  console.log('\n  ✅ Top Converting Keywords:')
  for (const r of topConverting) {
    const kw = r.ad_group_criterion.keyword
    const m = r.metrics
    const qs = r.ad_group_criterion.quality_info?.quality_score
    console.log(
      `     "${kw.text}"  [${kw.match_type}]` +
      `  Conv: ${Number(m.conversions).toFixed(1)}` +
      `  CPA: £${micros(m.cost_per_conversion)}` +
      `  QS: ${qs ?? 'n/a'}` +
      `  CTR: ${pct(m.ctr)}`
    )
  }

  // High spend, zero conversions — wasted budget
  const wasted = kws
    .filter((r) => Number(r.metrics.conversions) === 0 && Number(r.metrics.cost_micros) > 0)
    .sort((a, b) => Number(b.metrics.cost_micros) - Number(a.metrics.cost_micros))
    .slice(0, 10)

  if (wasted.length) {
    console.log('\n  ⚠️  High Spend, Zero Conversions (review or pause):')
    for (const r of wasted) {
      const kw = r.ad_group_criterion.keyword
      const m = r.metrics
      console.log(
        `     "${kw.text}"  [${kw.match_type}]` +
        `  Spend: £${micros(m.cost_micros)}  Clicks: ${fmt(m.clicks)}  CTR: ${pct(m.ctr)}`
      )
    }
  }

  // Low Quality Score keywords
  const lowQS = kws
    .filter((r) => {
      const qs = r.ad_group_criterion.quality_info?.quality_score
      return qs && Number(qs) <= 4
    })
    .sort((a, b) => {
      const qa = a.ad_group_criterion.quality_info?.quality_score ?? 10
      const qb = b.ad_group_criterion.quality_info?.quality_score ?? 10
      return Number(qa) - Number(qb)
    })
    .slice(0, 10)

  if (lowQS.length) {
    console.log('\n  🔴 Low Quality Score Keywords (improve ad relevance or landing page):')
    for (const r of lowQS) {
      const kw = r.ad_group_criterion.keyword
      const qi = r.ad_group_criterion.quality_info
      console.log(
        `     "${kw.text}"  QS: ${qi.quality_score}` +
        `  CTR signal: ${qi.search_predicted_ctr}` +
        `  Ad relevance: ${qi.ad_relevance}` +
        `  Landing page: ${qi.landing_page_experience}`
      )
    }
  }

  // ── 5. Search Terms Report ───────────────────────────────────────────────
  section('5. SEARCH TERMS (what users actually searched)')

  const addedTerms = searchTerms.filter((r) => r.search_term_view.status === 'ADDED')
  const unknownTerms = searchTerms.filter((r) => r.search_term_view.status === 'EXCLUDED' || r.search_term_view.status === 'NONE')

  console.log('\n  🔍 Top search terms (by spend):')
  for (const r of searchTerms.slice(0, 15)) {
    const m = r.metrics
    const status = r.search_term_view.status === 'ADDED' ? '✅' :
                   r.search_term_view.status === 'EXCLUDED' ? '🚫' : '❓'
    console.log(
      `     ${status} "${r.search_term_view.search_term}"` +
      `  Clicks: ${fmt(m.clicks)}  Conv: ${Number(m.conversions).toFixed(1)}` +
      `  Spend: £${micros(m.cost_micros)}`
    )
  }

  // Valuable terms not yet added as keywords
  const potentialKeywords = searchTerms
    .filter((r) => r.search_term_view.status !== 'ADDED' && Number(r.metrics.conversions) > 0)
    .sort((a, b) => Number(b.metrics.conversions) - Number(a.metrics.conversions))

  if (potentialKeywords.length) {
    console.log('\n  💡 Search terms with conversions — consider adding as keywords:')
    for (const r of potentialKeywords) {
      const m = r.metrics
      console.log(
        `     "${r.search_term_view.search_term}"` +
        `  Conv: ${Number(m.conversions).toFixed(1)}  Spend: £${micros(m.cost_micros)}`
      )
    }
  }

  // Expensive terms with no conversions — potential negatives
  const negatives = searchTerms
    .filter((r) => Number(r.metrics.conversions) === 0 && Number(r.metrics.clicks) > 5)
    .sort((a, b) => Number(b.metrics.cost_micros) - Number(a.metrics.cost_micros))
    .slice(0, 10)

  if (negatives.length) {
    console.log('\n  🚫 Expensive irrelevant terms — add as negative keywords:')
    for (const r of negatives) {
      const m = r.metrics
      console.log(
        `     "${r.search_term_view.search_term}"` +
        `  Clicks: ${fmt(m.clicks)}  Spend: £${micros(m.cost_micros)}`
      )
    }
  }

  // ── 6. Ad Performance ───────────────────────────────────────────────────
  section('6. AD PERFORMANCE')

  for (const r of ads.slice(0, 10)) {
    const m = r.metrics
    const rsa = r.ad_group_ad.ad.responsive_search_ad
    const headline = rsa?.headlines?.[0]?.text ?? '(no headline)'
    const url = r.ad_group_ad.ad.final_urls?.[0] ?? ''

    console.log(`\n  📄 ${headline}...`)
    console.log(`     Campaign  : ${r.campaign.name} › ${r.ad_group.name}`)
    console.log(`     URL       : ${url}`)
    console.log(`     Impressions: ${fmt(m.impressions)} | Clicks: ${fmt(m.clicks)} | CTR: ${pct(m.ctr)}`)
    console.log(`     Conversions: ${Number(m.conversions).toFixed(1)} | Spend: £${micros(m.cost_micros)}`)
  }

  // ── 7. Device Breakdown ──────────────────────────────────────────────────
  section('7. DEVICE PERFORMANCE')

  const deviceMap = {}
  for (const r of devices) {
    const dev = r.segments.device
    if (!deviceMap[dev]) deviceMap[dev] = { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
    deviceMap[dev].impressions += Number(r.metrics.impressions)
    deviceMap[dev].clicks += Number(r.metrics.clicks)
    deviceMap[dev].cost += Number(r.metrics.cost_micros)
    deviceMap[dev].conversions += Number(r.metrics.conversions)
  }

  for (const [dev, m] of Object.entries(deviceMap)) {
    const ctr = m.clicks / (m.impressions || 1)
    const cpa = m.cost / (m.conversions || 1) / 1_000_000
    console.log(
      `  ${dev.padEnd(12)}` +
      `  Clicks: ${String(fmt(m.clicks)).padStart(6)}` +
      `  CTR: ${pct(ctr).padStart(7)}` +
      `  Conv: ${m.conversions.toFixed(1).padStart(5)}` +
      `  CPA: £${cpa.toFixed(2).padStart(7)}`
    )
  }

  // ── 8. Actionable Recommendations ────────────────────────────────────────
  section('8. RECOMMENDATIONS')

  const recs = []

  // Check impression share loss
  for (const r of campaigns) {
    const m = r.metrics
    const budgetLost = Number(m.search_budget_lost_impression_share || 0)
    const rankLost = Number(m.search_rank_lost_impression_share || 0)
    if (budgetLost > 0.2)
      recs.push(`💰 Campaign "${r.campaign.name}" is losing ${pct(budgetLost)} of impressions due to budget. Consider increasing budget.`)
    if (rankLost > 0.2)
      recs.push(`📈 Campaign "${r.campaign.name}" is losing ${pct(rankLost)} of impressions due to low Ad Rank. Improve QS or raise bids.`)
  }

  // Check overall CTR
  if (totalCTR < 0.03)
    recs.push(`⚠️  Overall CTR is ${pct(totalCTR)} (below 3%). Review ad copy and keyword match types.`)

  // Check for wasted spend
  const totalWasted = wasted.reduce((s, r) => s + Number(r.metrics.cost_micros), 0)
  if (totalWasted > 0)
    recs.push(`🗑️  £${micros(totalWasted)} spent on keywords with zero conversions. Review and pause them.`)

  // Quality score issues
  if (lowQS.length > 0)
    recs.push(`🔴 ${lowQS.length} keywords have Quality Score ≤ 4. Fix ad-to-keyword relevance and improve landing page experience.`)

  // Negative keywords opportunity
  if (negatives.length > 0)
    recs.push(`🚫 ${negatives.length} search terms triggered clicks but no conversions. Add as negative keywords.`)

  // New keyword opportunities
  if (potentialKeywords.length > 0)
    recs.push(`💡 ${potentialKeywords.length} converting search terms not yet added as exact-match keywords.`)

  // Device CPA check
  for (const [dev, m] of Object.entries(deviceMap)) {
    if (m.conversions > 0) {
      const cpa = m.cost / m.conversions / 1_000_000
      const avgCPA = totals.cost / (totals.conversions || 1) / 1_000_000
      if (cpa > avgCPA * 2)
        recs.push(`📱 Device "${dev}" has CPA £${cpa.toFixed(2)} vs avg £${avgCPA.toFixed(2)}. Consider bid adjustment.`)
    }
  }

  if (recs.length === 0) {
    console.log('\n  ✅ No major issues detected. Keep monitoring.\n')
  } else {
    for (const rec of recs) console.log(`\n  ${rec}`)
    console.log()
  }

  // ── Save JSON ─────────────────────────────────────────────────────────────
  if (SAVE_JSON) {
    const jsonPath = path.join(root, 'ads-report.json')
    writeFileSync(
      jsonPath,
      JSON.stringify({ generatedAt: new Date().toISOString(), days: DAYS, campaigns, adGroups, keywords, searchTerms, ads, devices, geo }, null, 2)
    )
    console.log(`  📄 Raw data saved to ads-report.json\n`)
  }
}

main().catch((e) => {
  console.error('\n❌ Error:', e.message)
  if (e.errors) console.error(JSON.stringify(e.errors, null, 2))
  process.exit(1)
})
