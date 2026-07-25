# Portfolio Projects and Responsive Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Rudo Quest and Indigo Accessories to the existing portfolio and provide a complete, accessible responsive navigation and layout across desktop, tablet, and mobile.

**Architecture:** Keep the static `index.html`, `style.css`, and `script.js` structure. Extend the existing project-card markup, add a progressively enhanced mobile navigation controlled by a small vanilla-JavaScript state function, and verify static content contracts plus real-browser behavior at the specified viewport widths.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, browser-based responsive verification

## Global Constraints

- Preserve the existing black, off-white, warm-gold palette and Syne/DM Sans/DM Mono typography.
- Keep the current project-card visual language and append cards `04` and `05`.
- Continue using static HTML, CSS, and vanilla JavaScript.
- Do not introduce a framework, build tool, package manager, or runtime dependency.
- Do not expose or mention `.agents`, `.codex`, AGENTS.md, CLAUDE.md, or other agent-specific/internal project files in the portfolio.
- Verify at 1440px, 1024px, 768px, 390px, and 360px widths.
- Preserve keyboard focus, reduced-motion behavior, semantic headings, skip navigation, and safe external links.

---

### Task 1: Add the portfolio content contract and two live projects

**Files:**
- Create: `tests/portfolio-contract.test.mjs`
- Modify: `index.html:38-448`

**Interfaces:**
- Consumes: the existing project-card HTML structure and hero statistic markup.
- Produces: five numbered project cards, exact live links for Rudo Quest and Indigo Accessories, and mobile-navigation hooks `mobileMenuButton`, `primaryNavLinks`, and `navContactLink`.

- [ ] **Step 1: Write the failing content contract**

Create a Node built-in test that reads `index.html` and asserts:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('portfolio presents five live projects', () => {
  assert.match(html, /<div class="stat-num">5<\/div>/);
  assert.equal((html.match(/class="project-card reveal-scale/g) ?? []).length, 5);
  assert.match(html, /https:\/\/rudo-quest\.vercel\.app\//);
  assert.match(html, /https:\/\/indigo-accessories\.vercel\.app\//);
});

test('new project content names verified technologies', () => {
  for (const label of ['Rudo Quest', 'Indigo Accessories', 'Drizzle', 'Sentry', 'Vite', 'Supabase', 'Vitest']) {
    assert.ok(html.includes(label), `Missing ${label}`);
  }
});

test('mobile navigation has accessible state hooks', () => {
  assert.match(html, /id="mobileMenuButton"/);
  assert.match(html, /aria-controls="primaryNavLinks"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /id="primaryNavLinks"/);
});
```

- [ ] **Step 2: Run the contract and verify it fails**

Run: `node --test tests/portfolio-contract.test.mjs`

Expected: failures for the five-project statistic, new URLs, new technology labels, and mobile-navigation hooks.

- [ ] **Step 3: Add semantic navigation hooks and project content**

Modify `index.html` to:

- Add a `button#mobileMenuButton.mobile-menu-button` with `aria-controls="primaryNavLinks"` and `aria-expanded="false"`.
- Add `id="primaryNavLinks"` to the current navigation list.
- Add `id="navContactLink"` to the navigation contact link.
- Change the live-project statistic from `3` to `5`.
- Update the Projects introduction to cover five live products.
- Append full cards `04` and `05` using the approved descriptions, features, tags, and live URLs from the design specification.

- [ ] **Step 4: Run the contract and verify content passes**

Run: `node --test tests/portfolio-contract.test.mjs`

Expected: all three tests pass.

- [ ] **Step 5: Commit the content unit**

```powershell
git add -- index.html tests/portfolio-contract.test.mjs
git commit -m "feat: add Rudo Quest and Indigo projects"
```

### Task 2: Build the responsive and accessible mobile navigation

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `style.css:140-190,1131-1260`
- Modify: `script.js:1-130`

**Interfaces:**
- Consumes: `button#mobileMenuButton`, `ul#primaryNavLinks`, `a#navContactLink`, and `nav#nav`.
- Produces: `setMobileMenu(open: boolean): void`, an `.is-open` navigation state, and an `.is-menu-open` body scroll-lock state.

- [ ] **Step 1: Extend the static contract for CSS and JavaScript hooks**

Read `style.css` and `script.js` in the test and assert:

```js
const css = await readFile(new URL('../style.css', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('responsive menu implementation is wired', () => {
  assert.match(css, /\.mobile-menu-button/);
  assert.match(css, /nav\.is-open \.nav-links/);
  assert.match(css, /body\.is-menu-open/);
  assert.match(script, /function setMobileMenu\(open\)/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /Escape/);
});
```

- [ ] **Step 2: Run the contract and verify the new test fails**

Run: `node --test tests/portfolio-contract.test.mjs`

Expected: the responsive-menu test fails because the new CSS and JavaScript hooks do not exist.

- [ ] **Step 3: Implement mobile navigation styling**

Add a desktop-hidden `.mobile-menu-button` with three-line icon styling and visible `:focus-visible` treatment. Within `@media (max-width: 900px)`, convert `.nav-links` and `.nav-cta` into an off-canvas/full-width menu panel shown by `nav.is-open`, keep touch targets at least 44px high, and lock background scrolling with `body.is-menu-open`.

- [ ] **Step 4: Implement the menu state**

Add the following state contract to `script.js`:

```js
const mobileMenuButton = document.getElementById('mobileMenuButton');
const navContactLink = document.getElementById('navContactLink');

function setMobileMenu(open) {
  nav?.classList.toggle('is-open', open);
  document.body.classList.toggle('is-menu-open', open);
  mobileMenuButton?.setAttribute('aria-expanded', String(open));
  mobileMenuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
```

Wire the button click, close on navigation-link selection, close on `Escape`, and close when resizing above 900px.

- [ ] **Step 5: Run syntax and contract checks**

Run:

```powershell
node --check script.js
node --test tests/portfolio-contract.test.mjs
```

Expected: JavaScript syntax succeeds and all contract tests pass.

- [ ] **Step 6: Commit the navigation unit**

```powershell
git add -- style.css script.js tests/portfolio-contract.test.mjs
git commit -m "feat: add accessible mobile navigation"
```

### Task 3: Harden page-wide responsive layouts

**Files:**
- Modify: `style.css:1-1260`
- Modify: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Consumes: existing hero, about, experience, skills, project, contact, and footer classes.
- Produces: overflow-safe layouts at 1440px, 1024px, 768px, 390px, and 360px.

- [ ] **Step 1: Add an overflow contract**

Extend `tests/portfolio-contract.test.mjs` to assert the stylesheet includes:

```js
test('narrow layouts contain long content safely', () => {
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /@media \(max-width: 380px\)/);
  assert.match(css, /\.project-card-inner/);
});
```

- [ ] **Step 2: Run the contract and verify it fails**

Run: `node --test tests/portfolio-contract.test.mjs`

Expected: failure because the narrow-layout safeguards have not been added.

- [ ] **Step 3: Add responsive safeguards**

Modify `style.css` to:

- Apply `min-width: 0` to grid/flex children that contain long text.
- Apply `overflow-wrap: anywhere` to URLs and contact values.
- Keep project domains visible and wrapping instead of hiding them at 560px.
- Tighten project card, contact, hero, and footer spacing at 560px.
- Add a 380px breakpoint for narrow hero type, project padding, link layout, and technology tags.
- Preserve the existing desktop composition and current reduced-motion rules.

- [ ] **Step 4: Run contract checks**

Run: `node --test tests/portfolio-contract.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit responsive safeguards**

```powershell
git add -- style.css tests/portfolio-contract.test.mjs
git commit -m "fix: harden portfolio layouts for narrow screens"
```

### Task 4: Verify the full experience in a real browser

**Files:**
- Verify: `index.html`
- Verify: `style.css`
- Verify: `script.js`
- Verify: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Consumes: the completed static portfolio.
- Produces: fresh evidence that content, behavior, accessibility basics, and responsive layouts work.

- [ ] **Step 1: Run complete automated verification**

Run:

```powershell
node --check script.js
node --test tests/portfolio-contract.test.mjs
git diff --check
```

Expected: syntax exit code 0, all tests pass, and `git diff --check` reports no whitespace errors.

- [ ] **Step 2: Verify desktop and tablet viewports**

Load the local page at 1440px, 1024px, and 768px. At each width, confirm:

- no horizontal overflow;
- all five project cards render;
- typography and project-card borders remain consistent;
- desktop navigation remains visible at 1024px;
- mobile navigation appears and opens at 768px.

- [ ] **Step 3: Verify mobile viewports**

Load at 390px and 360px. At each width, confirm:

- the hero, portrait, stats, information rows, skills, projects, and contact sections remain within the viewport;
- project URLs wrap and remain readable;
- the menu opens, closes from its button, closes after selecting a section, and closes with `Escape`;
- controls have comfortable touch sizes.

- [ ] **Step 4: Verify accessibility and runtime state**

Confirm:

- the mobile button updates `aria-expanded`;
- keyboard focus remains visible;
- reduced-motion rules still expose content;
- the browser console contains no errors;
- every external project link uses `target="_blank"` and `rel="noopener noreferrer"`.

- [ ] **Step 5: Record final repository state**

Run:

```powershell
git status --short
git log -5 --oneline
```

Expected: only intentionally uncommitted plan/checklist updates remain, and the three implementation commits are present.
