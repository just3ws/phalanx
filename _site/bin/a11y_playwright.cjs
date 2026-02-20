#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

const root = process.cwd();
const siteDir = path.join(root, '_site');
const sitemapPath = path.join(siteDir, 'sitemap.xml');
const cssPath = path.join(root, 'assets', 'css', 'site.css');
const configPath = path.join(root, '_config.yml');

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
  if (!value || value === '/') return '';
  return value;
}

function extractRoutes(baseurl) {
  if (!fs.existsSync(sitemapPath)) fail(`Missing sitemap at ${sitemapPath}`);
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('No routes found in sitemap.xml');

  const routes = locs.map((loc) => {
    const url = new URL(loc);
    let route = url.pathname;
    if (baseurl && route.startsWith(baseurl)) {
      route = route.slice(baseurl.length) || '/';
    }
    if (!route.startsWith('/')) route = `/${route}`;
    if (!route.endsWith('/')) route = `${route}/`;
    return route;
  });

  return [...new Set(routes)].sort();
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function luminance({ r, g, b }) {
  const channel = (value) => {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a, b) {
  const l1 = luminance(hexToRgb(a));
  const l2 = luminance(hexToRgb(b));
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

function checkCssContracts() {
  if (!fs.existsSync(cssPath)) fail(`Missing CSS file: ${cssPath}`);
  const css = fs.readFileSync(cssPath, 'utf8');

  if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css)) {
    fail('A11y contract failed: missing prefers-reduced-motion reduce block in assets/css/site.css');
  }

  const rootBlockMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootBlockMatch) fail('A11y contract failed: missing :root CSS variables block');

  const vars = {};
  for (const m of rootBlockMatch[1].matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    vars[m[1]] = m[2];
  }

  const requiredVars = ['bg', 'surface', 'text', 'muted'];
  for (const key of requiredVars) {
    if (!vars[key]) fail(`A11y contract failed: missing --${key} in :root`);
  }

  const checks = [
    { fg: vars.text, bg: vars.bg, min: 7, label: '--text on --bg' },
    { fg: vars.text, bg: vars.surface, min: 4.5, label: '--text on --surface' },
    { fg: vars.muted, bg: vars.bg, min: 4.5, label: '--muted on --bg' },
  ];

  for (const check of checks) {
    const ratio = contrastRatio(check.fg, check.bg);
    if (ratio < check.min) {
      fail(`A11y contrast failed: ${check.label} ratio ${ratio.toFixed(2)} < ${check.min}`);
    }
  }
}

async function runBrowserA11yAudit(routes) {
  const baseUrl = process.env.A11Y_BASE_URL || 'http://127.0.0.1:4173';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const axeFailures = [];
  const contractFailures = [];

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });

    const contract = await page.evaluate(() => {
      const errors = [];
      const title = (document.title || '').trim();
      if (!title) errors.push('missing <title>');

      const h1s = Array.from(document.querySelectorAll('h1'))
        .map((h) => (h.textContent || '').trim())
        .filter(Boolean);
      if (h1s.length !== 1) errors.push(`expected one non-empty h1, got ${h1s.length}`);

      const main = document.querySelectorAll('main#main');
      if (main.length !== 1) errors.push(`expected one main#main, got ${main.length}`);

      const nav = document.querySelector('nav');
      if (!nav) {
        errors.push('missing nav');
      } else {
        const label = (nav.getAttribute('aria-label') || '').trim();
        const labelledBy = (nav.getAttribute('aria-labelledby') || '').trim();
        if (!label && !labelledBy) errors.push('nav missing aria-label/aria-labelledby');
      }

      if (!document.querySelector('header')) errors.push('missing header');
      if (!document.querySelector('footer')) errors.push('missing footer');

      const badImages = Array.from(document.querySelectorAll('img')).filter((img) => !img.hasAttribute('alt'));
      if (badImages.length > 0) errors.push(`found ${badImages.length} image(s) missing alt`);

      return errors;
    });

    if (contract.length > 0) {
      contractFailures.push({ route, errors: contract });
    }

    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const skipState = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active || !active.classList.contains('skip-link')) return 'skip-link was not first focus target';
      const rect = active.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return 'skip-link is not visibly rendered when focused';
      return null;
    });

    if (skipState) {
      contractFailures.push({ route, errors: [skipState] });
    }

    await page.keyboard.press('Enter');
    const hash = new URL(page.url()).hash;
    if (hash !== '#main') {
      contractFailures.push({ route, errors: [`skip-link Enter should set hash #main, got ${hash || '(none)'}`] });
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    const seriousOrCritical = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    if (seriousOrCritical.length > 0) {
      axeFailures.push({
        route,
        violations: seriousOrCritical.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        })),
      });
    }
  }

  await context.close();
  await browser.close();

  if (contractFailures.length > 0 || axeFailures.length > 0) {
    if (contractFailures.length > 0) {
      console.error('Contract failures:');
      for (const failure of contractFailures) {
        console.error(`- ${failure.route}: ${failure.errors.join('; ')}`);
      }
    }

    if (axeFailures.length > 0) {
      console.error('Axe serious/critical failures:');
      for (const failure of axeFailures) {
        for (const v of failure.violations) {
          console.error(`- ${failure.route}: [${v.impact}] ${v.id} (${v.nodes} node(s)) - ${v.description}`);
        }
      }
    }

    process.exit(1);
  }

  console.log(`A11y browser audit passed for ${routes.length} route(s).`);
}

async function main() {
  if (!fs.existsSync(siteDir)) fail('Missing _site directory. Run ./bin/pipeline build first.');

  checkCssContracts();
  const baseurl = readBaseurl();
  const routes = extractRoutes(baseurl);
  await runBrowserA11yAudit(routes);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
