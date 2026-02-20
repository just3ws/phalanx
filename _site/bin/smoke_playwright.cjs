#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = process.cwd();
const siteDir = path.join(root, '_site');
const sitemapPath = path.join(siteDir, 'sitemap.xml');
const configPath = path.join(root, '_config.yml');
const baseUrl = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4173';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readBaseurl() {
  if (!fs.existsSync(configPath)) return '';
  const raw = fs.readFileSync(configPath, 'utf8');
  const match = raw.match(/^baseurl:\s*(.*)$/m);
  if (!match) return '';
  const value = match[1].trim().replace(/^['"]|['"]$/g, '');
  return value === '/' ? '' : value;
}

function getRoutes(baseurl) {
  if (!fs.existsSync(sitemapPath)) fail(`Missing sitemap at ${sitemapPath}`);
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('No routes found in sitemap.xml');

  const routes = locs.map((loc) => {
    const pathname = new URL(loc).pathname;
    let route = pathname;
    if (baseurl && route.startsWith(baseurl)) {
      route = route.slice(baseurl.length) || '/';
    }
    if (!route.startsWith('/')) route = `/${route}`;
    if (!route.endsWith('/')) route = `${route}/`;
    return route;
  });

  return [...new Set(routes)].sort();
}

async function assertRoute(page, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const title = (document.title || '').trim();
    const h1 = (document.querySelector('h1')?.textContent || '').trim();
    const skip = document.querySelector('a.skip-link');
    return {
      hasTitle: title.length > 0,
      hasH1: h1.length > 0,
      hasSkip: Boolean(skip),
    };
  });

  if (!result.hasTitle) throw new Error(`${route}: missing <title>`);
  if (!result.hasH1) throw new Error(`${route}: missing non-empty <h1>`);
  if (!result.hasSkip) throw new Error(`${route}: missing .skip-link`);
}

async function main() {
  if (!fs.existsSync(siteDir)) fail('Missing _site directory. Run ./bin/pipeline build first.');

  const baseurl = readBaseurl();
  const routes = getRoutes(baseurl);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const route of routes) {
      await assertRoute(page, route);
    }
    console.log(`Playwright smoke passed for ${routes.length} route(s).`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
