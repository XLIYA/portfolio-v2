import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('portfolio presents five live projects', () => {
  assert.match(html, /<div class="stat-num">5<\/div>/);
  assert.equal((html.match(/class="project-card reveal-scale/g) ?? []).length, 5);
  assert.match(html, /href="https:\/\/rudo-quest\.vercel\.app\/"/);
  assert.match(html, /href="https:\/\/indigo-accessories\.vercel\.app\/"/);
});

test('new project cards present the verified product names and technologies', () => {
  for (const label of [
    'Rudo Quest',
    'Indigo Accessories',
    'Drizzle',
    'Sentry',
    'Vite',
    'Supabase',
    'Vitest',
  ]) {
    assert.ok(html.includes(label), `Missing ${label}`);
  }
});

test('mobile navigation exposes an accessible disclosure control', () => {
  assert.match(html, /id="mobileMenuButton"/);
  assert.match(html, /aria-controls="primaryNavLinks"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /id="primaryNavLinks"/);
});
