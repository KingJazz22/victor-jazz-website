/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.victorjazz.com',
  // robots.txt is hand-written in public/: next-sitemap always appends a non-standard
  // `Host:` line that Google ignores and SEO validators flag as invalid syntax.
  generateRobotsTxt: false,
  exclude: ['/icon'],
  changefreq: 'monthly',
  priority: 1.0,
}
