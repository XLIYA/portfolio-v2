# Portfolio Projects and Responsive Update

## Goal

Update Ilya Aghaei's existing portfolio without changing its established dark, editorial visual identity. Add Rudo Quest and Indigo Accessories as live projects, keep the resume-based professional content, and make the complete page dependable on mobile devices.

## Scope

- Preserve the current single-page HTML, CSS, and JavaScript architecture.
- Preserve the existing black, off-white, and warm-gold palette, Syne/DM Sans/DM Mono typography, borders, motion language, and project-card structure.
- Add two project cards after the three existing resume projects:
  - `04` - Rudo Quest
  - `05` - Indigo Accessories
- Update the hero's live-project count from 3 to 5.
- Update the Projects introduction so it describes five live products rather than only the three projects from the resume.
- Improve navigation and layouts across mobile and tablet sizes.
- Do not expose or mention `.agents`, `.codex`, AGENTS.md, CLAUDE.md, or other agent-specific/internal project files.

## Project Content

### Rudo Quest

Positioning: a compact collaborative weekly task-management PWA for small teams.

Description: present Rudo Quest as a calm task planner that makes today's work, the current week, project ownership, and team responsibilities easy to understand without heavy workflows.

Visible product capabilities:

- Account creation and sign-in
- Weekly planning
- Team collaboration
- Project ownership
- Task visibility across today and the week

Technology tags:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Drizzle
- Sentry
- Playwright
- Vitest

Live URL: `https://rudo-quest.vercel.app/`

### Indigo Accessories

Positioning: a Persian-language accessories storefront with a distinctive mood-led shopping experience.

Description: present Indigo as a responsive e-commerce experience with product discovery, mood-based categories, product pages, favorites, profile access, reviews, and Persian right-to-left content.

Visible product capabilities:

- Product catalog and categories
- Search
- Favorites
- Customer profile
- Product detail pages
- Ratings and reviews
- Responsive Persian/RTL interface

Technology tags:

- React
- TypeScript
- Vite
- Supabase
- Vitest

Live URL: `https://indigo-accessories.vercel.app/`

## Visual and Interaction Design

The two new projects use the existing detailed project-card component and remain visually equal to the three current projects. They are appended as cards 04 and 05 so the resume-based ordering stays intact.

Each card contains:

- Product category/positioning label
- Clear project title
- Concise product description
- Outcome statement
- Technology tags
- Four key capabilities
- External live-project link

The current visual signature remains the contrast between oversized project numbering, thin structural borders, restrained gold accents, and dense product detail. No unrelated redesign or decorative asset is added.

## Responsive Behavior

### Navigation

- Keep the full desktop navigation above the tablet breakpoint.
- Replace the currently hidden mobile navigation with an accessible menu button and collapsible menu.
- Expose the main section links and contact action on mobile.
- Support keyboard operation, visible focus, `aria-expanded`, and closing after a navigation choice.

### Layout

- Keep the current two-column hero on desktop and a single-column hero on mobile.
- Ensure the portrait, hero name, buttons, stats, contact details, skill columns, and project cards never create horizontal overflow.
- Stack project-card content into one column at tablet/mobile widths.
- Keep live links readable even when domain names are long.
- Maintain comfortable touch targets and spacing at narrow widths.

### Target Viewports

Verify at:

- 1440px desktop
- 1024px small desktop/tablet landscape
- 768px tablet
- 390px common mobile
- 360px narrow mobile

## Accessibility and Motion

- Preserve the skip link and semantic section headings.
- Add an accessible mobile navigation control.
- Keep external-link safety attributes.
- Maintain visible keyboard focus.
- Respect `prefers-reduced-motion`.
- Keep all interactive controls usable without the custom cursor.

## Implementation Boundaries

- Continue using static HTML, CSS, and vanilla JavaScript.
- Do not introduce a framework, build tool, package manager, or new runtime dependency.
- Do not add screenshots or thumbnails to the project cards; the existing typographic card system remains the source of visual consistency.
- Do not change contact information, work history, education, or resume-derived project claims unless required for consistency with the new live-project count.

## Verification

- Validate HTML structure and confirm all five project links are present.
- Run JavaScript syntax checking.
- Load the page locally and check for console errors.
- Test the mobile menu with pointer and keyboard input.
- Inspect desktop, tablet, and mobile layouts at all target widths.
- Check for horizontal overflow at each viewport.
- Confirm reduced-motion behavior remains intact.
- Confirm project descriptions and technology tags match this specification.
