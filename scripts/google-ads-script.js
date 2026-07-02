/**
 * Victor Jazz — Google Ads Performance Script
 *
 * HOW TO RUN:
 *   1. In Google Ads → Tools → Scripts (or Bulk Actions → Scripts)
 *   2. Click + (New script), paste this entire file
 *   3. Set SPREADSHEET_URL below (create a blank Google Sheet and paste its URL)
 *      — or leave it empty to output to the console log only
 *   4. Click "Run" (you'll be asked to authorise once)
 *   5. Open the spreadsheet (or click "Logs") to see results
 *
 * WHAT IT ANALYSES (last 30 days):
 *   - Account overview (spend, CTR, CPA, conversion rate)
 *   - Campaign performance + impression share breakdown
 *   - Keyword performance + Quality Scores
 *   - Search terms with conversion data (new keyword ideas + negative candidates)
 *   - Ad performance (headline CTR ranking)
 *   - Device breakdown
 *   - Automated recommendations
 */

// ── CONFIG ──────────────────────────────────────────────────────────────────
var SPREADSHEET_URL = ''   // paste your Google Sheet URL here, or leave empty for console-only
var DAYS            = 30   // lookback window

// ── HELPERS ─────────────────────────────────────────────────────────────────
var START_DATE = _daysAgo(DAYS)
var END_DATE   = _daysAgo(1)
var DATE_RANGE = START_DATE + ',' + END_DATE

function _daysAgo(n) {
  var d = new Date()
  d.setDate(d.getDate() - n)
  return Utilities.formatDate(d, AdsApp.currentAccount().getTimeZone(), 'yyyyMMdd')
}

function fmt(n)    { return Number(n).toLocaleString() }
function pct(n)    { return (Number(n) * 100).toFixed(2) + '%' }
function gbp(n)    { return '£' + Number(n).toFixed(2) }
function micros(n) { return Number(n) / 1000000 }

function log(msg) { Logger.log(msg) }
function hr()     { log('─────────────────────────────────────────────────────') }

// ── SHEET HELPERS ────────────────────────────────────────────────────────────
var ss, sheets = {}

function initSheet() {
  if (!SPREADSHEET_URL) return
  ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL)
}

function getSheet(name) {
  if (!ss) return null
  if (!sheets[name]) {
    var s = ss.getSheetByName(name)
    if (!s) s = ss.insertSheet(name)
    s.clearContents()
    sheets[name] = s
  }
  return sheets[name]
}

function writeRows(sheetName, headers, rows) {
  var s = getSheet(sheetName)
  if (!s) return
  s.appendRow(headers)
  rows.forEach(function(r) { s.appendRow(r) })
  // Bold header row
  s.getRange(1, 1, 1, headers.length).setFontWeight('bold')
  s.setFrozenRows(1)
  s.autoResizeColumns(1, headers.length)
}

// ── 1. ACCOUNT OVERVIEW ─────────────────────────────────────────────────────
function accountOverview() {
  var stats = AdsApp.currentAccount().getStatsFor(START_DATE, END_DATE)
  var spend = stats.getCost()   // getStatsFor returns real currency, not micros
  var clicks = stats.getClicks()
  var impr   = stats.getImpressions()
  var conv   = stats.getConversions()
  var ctr    = clicks / (impr || 1)
  var cpa    = spend / (conv || 1)
  var convR  = conv  / (clicks || 1)

  hr()
  log('  ACCOUNT OVERVIEW — Last ' + DAYS + ' Days')
  log('  Account: ' + AdsApp.currentAccount().getName() + ' (' + AdsApp.currentAccount().getCustomerId() + ')')
  log('  Date: ' + START_DATE + ' → ' + END_DATE)
  hr()
  log('  Impressions    : ' + fmt(impr))
  log('  Clicks         : ' + fmt(clicks))
  log('  CTR            : ' + pct(ctr))
  log('  Total Spend    : ' + gbp(spend))
  log('  Avg CPC        : ' + gbp(spend / (clicks || 1)))
  log('  Conversions    : ' + conv.toFixed(1))
  log('  Conversion Rate: ' + pct(convR))
  log('  CPA            : ' + gbp(cpa))
  hr()

  writeRows('Overview', ['Metric', 'Value'], [
    ['Account', AdsApp.currentAccount().getName()],
    ['Date Range', START_DATE + ' → ' + END_DATE],
    ['Impressions', impr],
    ['Clicks', clicks],
    ['CTR', pct(ctr)],
    ['Total Spend £', spend.toFixed(2)],
    ['Avg CPC £', (spend / (clicks || 1)).toFixed(2)],
    ['Conversions', conv.toFixed(1)],
    ['Conversion Rate', pct(convR)],
    ['CPA £', cpa.toFixed(2)],
  ])
}

// ── 2. CAMPAIGNS ────────────────────────────────────────────────────────────
function campaigns() {
  log('\n  CAMPAIGN PERFORMANCE')
  hr()

  var rows = []
  var iter = AdsApp.campaigns()
    .withCondition('campaign.status != REMOVED')
    .orderBy('metrics.cost_micros DESC')
    .forDateRange(START_DATE, END_DATE)
    .get()

  while (iter.hasNext()) {
    var c = iter.next()
    var s = c.getStatsFor(START_DATE, END_DATE)
    var spend = s.getCost()   // getStatsFor returns real currency, not micros
    var clicks = s.getClicks()
    var conv   = s.getConversions()
    var cpa    = spend / (conv || 1)
    var ctr    = s.getCtr()
    var is     = s.getSearchImpressionShare ? s.getSearchImpressionShare() : null
    var status = c.isEnabled() ? 'ENABLED' : 'PAUSED'

    log('  📢 ' + c.getName() + '  [' + status + ']')
    log('     Spend: ' + gbp(spend) + '  Clicks: ' + fmt(clicks) + '  CTR: ' + pct(ctr))
    log('     Conversions: ' + conv.toFixed(1) + '  CPA: ' + gbp(cpa))
    if (is !== null) log('     Search Impression Share: ' + pct(is))
    log('')

    rows.push([
      c.getName(),
      status,
      spend.toFixed(2),
      s.getImpressions(),
      clicks,
      pct(ctr),
      s.getAverageCpc().toFixed(2),
      conv.toFixed(1),
      cpa.toFixed(2),
      is !== null ? pct(is) : '',
    ])
  }

  writeRows('Campaigns',
    ['Campaign', 'Status', 'Spend £', 'Impressions', 'Clicks', 'CTR', 'Avg CPC £', 'Conversions', 'CPA £', 'Impression Share'],
    rows
  )
}

// ── 3. KEYWORDS ─────────────────────────────────────────────────────────────
function keywords() {
  log('\n  KEYWORD PERFORMANCE')
  hr()

  var rows = []
  var wastedRows = []

  var iter = AdsApp.keywords()
    .withCondition('ad_group.status = ENABLED')
    .withCondition('campaign.status = ENABLED')
    .orderBy('metrics.cost_micros DESC')
    .forDateRange(START_DATE, END_DATE)
    .withLimit(100)
    .get()

  var topConv = [], wasted = [], lowQS = []

  while (iter.hasNext()) {
    var kw = iter.next()
    var s  = kw.getStatsFor(START_DATE, END_DATE)
    var spend = s.getCost()   // getStatsFor returns real currency, not micros
    var conv  = s.getConversions()
    var clicks = s.getClicks()
    var qs    = kw.getQualityScore ? kw.getQualityScore() : null

    var row = [
      kw.getText(),
      kw.getMatchType(),
      kw.getAdGroup().getCampaign().getName(),
      kw.getAdGroup().getName(),
      spend.toFixed(2),
      s.getImpressions(),
      clicks,
      pct(s.getCtr()),
      s.getAverageCpc().toFixed(2),
      conv.toFixed(1),
      (spend / (conv || 1)).toFixed(2),
      qs || '',
    ]
    rows.push(row)

    if (conv > 0) topConv.push({ text: kw.getText(), match: kw.getMatchType(), conv: conv, cpa: spend / conv, qs: qs })
    if (conv === 0 && clicks > 5) wasted.push({ text: kw.getText(), match: kw.getMatchType(), spend: spend, clicks: clicks })
    if (qs !== null && qs <= 4) lowQS.push({ text: kw.getText(), qs: qs })
  }

  // Top converting
  topConv.sort(function(a,b){ return b.conv - a.conv })
  log('  ✅ Top Converting Keywords:')
  topConv.slice(0, 10).forEach(function(k) {
    log('     "' + k.text + '"  [' + k.match + ']  Conv: ' + k.conv.toFixed(1) + '  CPA: ' + gbp(k.cpa) + '  QS: ' + (k.qs || 'n/a'))
  })

  // Wasted spend
  wasted.sort(function(a,b){ return b.spend - a.spend })
  if (wasted.length) {
    log('\n  ⚠️  High Spend, Zero Conversions (review or pause):')
    wasted.slice(0, 10).forEach(function(k) {
      log('     "' + k.text + '"  [' + k.match + ']  Spend: ' + gbp(k.spend) + '  Clicks: ' + k.clicks)
    })
  }

  // Low QS
  lowQS.sort(function(a,b){ return a.qs - b.qs })
  if (lowQS.length) {
    log('\n  🔴 Low Quality Score Keywords (QS ≤ 4):')
    lowQS.forEach(function(k) {
      log('     "' + k.text + '"  QS: ' + k.qs)
    })
  }

  writeRows('Keywords',
    ['Keyword', 'Match Type', 'Campaign', 'Ad Group', 'Spend £', 'Impressions', 'Clicks', 'CTR', 'Avg CPC £', 'Conversions', 'CPA £', 'Quality Score'],
    rows
  )
}

// ── 4. SEARCH TERMS ─────────────────────────────────────────────────────────
function searchTerms() {
  log('\n  SEARCH TERMS REPORT')
  hr()

  var rows = []

  var report = AdsApp.report(
    'SELECT search_term_view.search_term, search_term_view.status, ' +
    'campaign.name, ad_group.name, ' +
    'metrics.impressions, metrics.clicks, metrics.ctr, ' +
    'metrics.average_cpc, metrics.cost_micros, metrics.conversions ' +
    'FROM search_term_view ' +
    'WHERE metrics.impressions > 5 ' +
    'AND segments.date BETWEEN ' + START_DATE + ' AND ' + END_DATE + ' ' +
    'ORDER BY metrics.cost_micros DESC ' +
    'LIMIT 100'
  )

  var rowIter = report.rows()
  var newKw = [], negCandidates = []

  while (rowIter.hasNext()) {
    var row = rowIter.next()
    var term    = row['search_term_view.search_term']
    var status  = row['search_term_view.status']
    var clicks  = Number(row['metrics.clicks'])
    var conv    = Number(row['metrics.conversions'])
    var spend   = micros(Number(row['metrics.cost_micros']))

    var icon = status === 'ADDED' ? '✅' : status === 'EXCLUDED' ? '🚫' : '❓'
    rows.push([term, status, row['campaign.name'], row['ad_group.name'],
               Number(row['metrics.impressions']), clicks, row['metrics.ctr'],
               micros(Number(row['metrics.average_cpc'])).toFixed(2),
               spend.toFixed(2), conv.toFixed(1)])

    if (status !== 'ADDED' && conv > 0) newKw.push({ term: term, conv: conv, spend: spend })
    if (conv === 0 && clicks > 10)      negCandidates.push({ term: term, clicks: clicks, spend: spend })
  }

  log('  💡 Converting search terms not yet added as keywords:')
  newKw.sort(function(a,b){ return b.conv - a.conv })
  newKw.slice(0, 15).forEach(function(t) {
    log('     "' + t.term + '"  Conv: ' + t.conv.toFixed(1) + '  Spend: ' + gbp(t.spend))
  })

  log('\n  🚫 Expensive terms with no conversions — negative keyword candidates:')
  negCandidates.sort(function(a,b){ return b.spend - a.spend })
  negCandidates.slice(0, 15).forEach(function(t) {
    log('     "' + t.term + '"  Clicks: ' + t.clicks + '  Spend: ' + gbp(t.spend))
  })

  writeRows('Search Terms',
    ['Search Term', 'Status', 'Campaign', 'Ad Group', 'Impressions', 'Clicks', 'CTR', 'Avg CPC £', 'Spend £', 'Conversions'],
    rows
  )
}

// ── 5. ADS ──────────────────────────────────────────────────────────────────
function ads() {
  log('\n  AD PERFORMANCE')
  hr()

  var rows = []

  var iter = AdsApp.ads()
    .withCondition('ad_group.status = ENABLED')
    .withCondition('campaign.status = ENABLED')
    .orderBy('metrics.clicks DESC')
    .forDateRange(START_DATE, END_DATE)
    .withLimit(30)
    .get()

  while (iter.hasNext()) {
    var ad     = iter.next()
    var s      = ad.getStatsFor(START_DATE, END_DATE)
    var spend  = s.getCost()   // getStatsFor returns real currency, not micros
    var clicks = s.getClicks()
    var conv   = s.getConversions()
    var type   = ad.getType()
    var headline = ''

    if (type === 'RESPONSIVE_SEARCH_AD') {
      try {
        var rsa = ad.asType().responsiveSearchAd()
        var hl  = rsa.getHeadlines()
        headline = hl && hl.length ? hl[0].text : '(RSA)'
      } catch(e) {
        headline = '(RSA ad)'
      }
    } else if (type === 'EXPANDED_TEXT_AD') {
      var eta = ad.asType().expandedTextAd()
      headline = eta.getHeadlinePart1() + ' | ' + eta.getHeadlinePart2()
    } else {
      headline = type
    }

    var urls = ad.urls()
    var url  = urls && urls.getFinalUrl ? urls.getFinalUrl() : ''

    log('  📄 ' + headline)
    log('     Campaign: ' + ad.getAdGroup().getCampaign().getName())
    log('     CTR: ' + pct(s.getCtr()) + '  Clicks: ' + fmt(clicks) + '  Conv: ' + conv.toFixed(1) + '  Spend: ' + gbp(spend))
    log('')

    rows.push([headline, ad.getAdGroup().getCampaign().getName(), ad.getAdGroup().getName(),
               type, url, s.getImpressions(), clicks, pct(s.getCtr()),
               conv.toFixed(1), spend.toFixed(2)])
  }

  writeRows('Ads',
    ['Headline', 'Campaign', 'Ad Group', 'Type', 'URL', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Spend £'],
    rows
  )
}

// ── 6. DEVICE BREAKDOWN ──────────────────────────────────────────────────────
function deviceBreakdown() {
  log('\n  DEVICE PERFORMANCE')
  hr()

  var report = AdsApp.report(
    'SELECT segments.device, ' +
    'metrics.impressions, metrics.clicks, metrics.ctr, ' +
    'metrics.average_cpc, metrics.cost_micros, metrics.conversions, metrics.cost_per_conversion ' +
    'FROM campaign ' +
    'WHERE campaign.status = ENABLED ' +
    'AND segments.date BETWEEN ' + START_DATE + ' AND ' + END_DATE
  )

  var deviceMap = {}
  var rowIter = report.rows()
  while (rowIter.hasNext()) {
    var row = rowIter.next()
    var dev = row['segments.device']
    if (!deviceMap[dev]) deviceMap[dev] = { impr: 0, clicks: 0, cost: 0, conv: 0 }
    deviceMap[dev].impr   += Number(row['metrics.impressions'])
    deviceMap[dev].clicks += Number(row['metrics.clicks'])
    deviceMap[dev].cost   += micros(Number(row['metrics.cost_micros']))
    deviceMap[dev].conv   += Number(row['metrics.conversions'])
  }

  var rows = []
  for (var dev in deviceMap) {
    var m   = deviceMap[dev]
    var ctr = m.clicks / (m.impr || 1)
    var cpa = m.cost   / (m.conv  || 1)
    log('  ' + dev + '  Clicks: ' + fmt(m.clicks) + '  CTR: ' + pct(ctr) + '  Conv: ' + m.conv.toFixed(1) + '  CPA: ' + gbp(cpa))
    rows.push([dev, m.impr, m.clicks, pct(ctr), m.cost.toFixed(2), m.conv.toFixed(1), cpa.toFixed(2)])
  }

  writeRows('Devices',
    ['Device', 'Impressions', 'Clicks', 'CTR', 'Spend £', 'Conversions', 'CPA £'],
    rows
  )
}

// ── 7. RECOMMENDATIONS ──────────────────────────────────────────────────────
function recommendations() {
  log('\n  RECOMMENDATIONS')
  hr()

  var recs = []

  // Budget loss check
  var campIter = AdsApp.campaigns()
    .withCondition('campaign.status = ENABLED')
    .forDateRange(START_DATE, END_DATE)
    .get()

  while (campIter.hasNext()) {
    var c = campIter.next()
    var s = c.getStatsFor(START_DATE, END_DATE)
    var is = typeof s.getSearchImpressionShare === 'function' ? s.getSearchImpressionShare() : 0
    // Note: budget/rank lost impression share not always available via script stats
    // Check if IS < 0.5 as a proxy for potential issues
    if (is > 0 && is < 0.5) {
      recs.push('📉 Campaign "' + c.getName() + '" has only ' + pct(is) + ' impression share. Review budget or bids.')
    }
  }

  // Overall CTR
  var acct  = AdsApp.currentAccount().getStatsFor(START_DATE, END_DATE)
  var ctr   = acct.getCtr()
  var spend = acct.getCost()   // getStatsFor returns real currency, not micros
  var conv  = acct.getConversions()
  var cpa   = spend / (conv || 1)

  if (ctr < 0.03) recs.push('⚠️  Overall CTR is ' + pct(ctr) + ' — below 3%. Review ad copy and keyword match types.')
  if (conv === 0 && spend > 50) recs.push('🚨 £' + spend.toFixed(2) + ' spent with zero conversions. Check conversion tracking and landing page.')
  if (conv > 0 && cpa > 200) recs.push('💰 CPA is £' + cpa.toFixed(2) + ' — consider tightening match types or pausing low-quality keywords.')

  if (recs.length === 0) {
    log('  ✅ No critical issues detected. Keep monitoring weekly.')
  } else {
    recs.forEach(function(r) { log('  ' + r) })
  }

  if (SPREADSHEET_URL) {
    writeRows('Recommendations', ['Recommendation'], recs.map(function(r){ return [r] }))
  }
}

// ── MAIN ────────────────────────────────────────────────────────────────────
function main() {
  initSheet()
  accountOverview()
  campaigns()
  keywords()
  searchTerms()
  ads()
  deviceBreakdown()
  recommendations()

  log('\n  ✅ Report complete.')
  if (SPREADSHEET_URL) log('  📊 Spreadsheet updated: ' + SPREADSHEET_URL)
}
