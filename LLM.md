# Project Architecture

## Overview

This project is a static Astro site for a personal amateur radio homepage and station logbook.

Core characteristics:

- Static-first routing and rendering
- No client framework
- Small inline scripts only where interaction is unavoidable
- Semantic `.astro` content modules instead of MDX or generic data-driven rendering
- Multi-language and multi-station support derived from discovered profile files
- Local assets for fonts, icons, and images

Current stations:

- `JL1HRE`: active
- `BD4WXB`: archive

Current locales:

- `en`
- `ja`
- `zh-cn`

## Stack

- Astro 6
- Tailwind CSS 4 via `@tailwindcss/vite`
- Font Awesome Free Solid, subsetted into a local SVG sprite
- Local `JuliaMono` font files from `public/fonts`
- System sans stacks plus local CSS tokens in `vars.css`

Key config files:

- [`package.json`](/E:/source/repos/chisato-ham-logbook/package.json)
- [`astro.config.mjs`](/E:/source/repos/chisato-ham-logbook/astro.config.mjs)
- [`src/styles/vars.css`](/E:/source/repos/chisato-ham-logbook/src/styles/vars.css)
- [`src/styles/global.css`](/E:/source/repos/chisato-ham-logbook/src/styles/global.css)
- [`src/styles/logbook.css`](/E:/source/repos/chisato-ham-logbook/src/styles/logbook.css)

## Routing

Routes are file-based:

- `/`
  - redirect page
  - uses a small inline script to resolve browser language and redirect to the main active station
- `/[lang]`
  - redirect page
  - redirects to the main station for that locale
- `/[lang]/[station]`
  - main profile page
  - statically generated from discovered profile modules

Key route files:

- [`src/pages/index.astro`](/E:/source/repos/chisato-ham-logbook/src/pages/index.astro)
- [`src/pages/[lang]/index.astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/index.astro)
- [`src/pages/[lang]/[station].astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/[station].astro)

Routing helpers live in:

- [`src/lib/routing.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/routing.ts)

Current routing behavior:

- Profile modules are discovered with `import.meta.glob("../content/*/*.astro", { eager: true })`
- `availableProfiles` is derived from those modules
- `getStationsOrdered()` sorts active stations first, then de-duplicates by `stationId`
- `getMainStationId()` picks the first active station and falls back to the first discovered station

Important constraints:

- Language and station switching stay plain `<a>` links
- Section navigation stays fragment-based
- Route generation stays derived from discovered profile modules, not a duplicated registry

## Localization

Locale data lives in:

- [`src/lib/i18n.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/i18n.ts)

`i18n.ts` owns:

- locale IDs and language tags
- visible header labels
- accessible labels for nav and switches
- localized site titles
- localized footer copy
- station status labels
- logbook UI strings
- logbook no-JS warning text

Do not hardcode UI strings in templates when a locale-level definition is appropriate.

## Content Model

Profiles live as semantic Astro modules:

- `src/content/en/JL1HRE.astro`
- `src/content/en/BD4WXB.astro`
- `src/content/ja/JL1HRE.astro`
- `src/content/ja/BD4WXB.astro`
- `src/content/zh-cn/JL1HRE.astro`
- `src/content/zh-cn/BD4WXB.astro`

Each profile module exports:

1. `profile`
   - typed by `ProfileMeta`
2. `sections`
   - typed by `ProfileSection[]`
3. default Astro markup
   - the actual page body content

Shared profile typing lives in:

- [`src/lib/profile.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/profile.ts)

Current `ProfileMeta` shape:

- `lang`
- `stationId`
- `callsign`
- `status`
- `pageTitle`
- `description`
- `hero.quote`
- optional `hero.quoteSource`

Important authoring rule:

- `profile.description` is a short plain-text metadata description for the HTML head
- the visible intro prose is not stored in `profile`
- each profile file starts its body with a top-level `<Prose>...</Prose>` block for the visible introduction

Do not reintroduce:

- MDX for profile authoring
- generic JSON content rendering
- long HTML blobs inside `profile`
- hardcoded station unions or duplicated station registries

## Render Flow

The main station page is assembled in:

- [`src/pages/[lang]/[station].astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/[station].astro)

Current render flow:

1. resolve the requested profile module from `availableProfileModules`
2. build locale switch links for the current station
3. build station switch links for the current locale
4. pass `profile`, `locale`, `locales`, `stations`, and `sections` into the layout
5. render:
   - `MorseHero`
   - the imported profile Astro content body

There is no separate profile wrapper component.

## Layout

Main layout:

- [`src/layouts/Layout.astro`](/E:/source/repos/chisato-ham-logbook/src/layouts/Layout.astro)

Responsibilities:

- global HTML shell
- metadata and page title
- icon sprite injection
- top header
- language switcher
- callsign switcher
- desktop section sidebar
- mobile bottom section navigation
- skip link
- footer

Layout notes:

- the header is not sticky
- mobile section shortcuts intentionally omit `overview`
- the desktop and mobile section navs have distinct accessible labels
- layout owns the global navigation chrome; profile modules only provide station content
- the home/logo link uses an explicit localized accessible name

## Hero

Hero component:

- [`src/components/MorseHero.astro`](/E:/source/repos/chisato-ham-logbook/src/components/MorseHero.astro)

Morse helpers:

- [`src/lib/morse.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/morse.ts)

Current behavior:

- renders the `overview` section
- animates `CQCQ DE` and the callsign on load
- server-renders the completed terminal text so no-JS still shows the final state
- falls back cleanly for reduced-motion users
- exposes a print-visible `h1` so printed pages still show the callsign
- renders the quote source when present

The overview label is localized in `i18n.ts` and passed in as a prop. Do not hardcode it in the component.

## Shared Components

Components live directly in:

- [`src/components`](/E:/source/repos/chisato-ham-logbook/src/components)

Current profile-facing components:

- `Cards.astro`
  - responsive grid wrapper
- `GalleryCard.astro`
  - title, prose, then image
- `InfoCard.astro`
  - generic bordered content container
  - uses the default slot for the main title/value
  - uses the named `description` slot for the smaller secondary content
- `LogbookCard.astro`
  - searchable, virtualized logbook viewer with modal detail dialog
- `MorseHero.astro`
  - hero/overview block
- `Prose.astro`
  - bordered prose block for intro/QSL-policy style text
- `SectionBlock.astro`
  - section wrapper with anchor target and heading
- `SectionCluster.astro`
  - subsection grouping within a section

Supporting shared components:

- `Icon.astro`
  - local SVG sprite consumer
- `IconSprite.astro`
  - inline sprite sheet

Legacy layout helpers still present in the repo:

- `Stack.astro`
- `TwoPane.astro`

They are not part of the current profile composition flow. Do not introduce them casually unless there is a clear layout need.

Content authoring guidance:

- Prefer direct `InfoCard` usage over thin wrapper components
- Put visible prose into `Prose` or plain markup, not into profile metadata
- Keep section and subsection structure explicit in the profile files

## Logbook

Logbook UI component:

- [`src/components/LogbookCard.astro`](/E:/source/repos/chisato-ham-logbook/src/components/LogbookCard.astro)

Supporting stylesheet:

- [`src/styles/logbook.css`](/E:/source/repos/chisato-ham-logbook/src/styles/logbook.css)

Data files:

- [`public/logdata.json`](/E:/source/repos/chisato-ham-logbook/public/logdata.json)
- [`public/logdata.callsign-3gram-index.json`](/E:/source/repos/chisato-ham-logbook/public/logdata.callsign-3gram-index.json)

Index generation:

- [`scripts/generate-logbook-callsign-index.mjs`](/E:/source/repos/chisato-ham-logbook/scripts/generate-logbook-callsign-index.mjs)
- `pnpm run logbook:index`

Current behavior:

- fetches `/logdata.json`
- filters records by `station_callsign.startsWith(currentProfile.callsign)`
- tolerates missing ADIF fields and leaves them blank
- searches only the other station callsign field
- uses the trigram index for 3+ character queries and falls back to direct substring matching for shorter queries
- virtualizes table rows
- uses a global body-level modal dialog for row details
- uses roving `tabindex` for table row buttons so keyboard users can leave the table with `Tab`
- renders a no-JS warning and hides the interactive logbook UI when scripting is unavailable
- when printing with a logbook dialog open, does not print the live modal
- instead renders a dedicated print-only detail sheet, hides the rest of the page for print, then restores the dialog after print

Keep the logbook client code framework-free. Do not replace it with a client UI library.

## Icons

Icon data lives in:

- [`src/lib/icons.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/icons.ts)

Sprite generation/rendering lives in:

- [`src/components/IconSprite.astro`](/E:/source/repos/chisato-ham-logbook/src/components/IconSprite.astro)

Constraints:

- icons are local
- icons are subsetted
- icon usage goes through shared components
- the sprite should remain hidden and sane even when CSS fails to load
- do not switch this to a webfont or CDN

## Styling System

Styling is split into:

1. design tokens and font setup
   - [`src/styles/vars.css`](/E:/source/repos/chisato-ham-logbook/src/styles/vars.css)
2. global defaults plus a small set of reused primitives
   - [`src/styles/global.css`](/E:/source/repos/chisato-ham-logbook/src/styles/global.css)
3. logbook-only shared rules
   - [`src/styles/logbook.css`](/E:/source/repos/chisato-ham-logbook/src/styles/logbook.css)

`global.css` should stay narrow. It is for:

- document-wide behavior
- base-layer element defaults
- accessibility defaults such as focus treatment
- a small number of repeated primitives reused across components
- print and reduced-motion behavior

Current base-layer defaults include:

- `html`
- `body`
- `body::before`
- `body::after`
- global `a`
- `main p`
- `pre`
- `[hidden]`
- `:focus-visible`
- reduced-motion element defaults
- print element defaults

Current reusable global classes:

- `meta-label`
- `meta-label-large`
- `icon-chip`
- `switch-pill`
- `.section .section-count::before`
- `.is-typing::after`

Important styling conventions:

- global prose/reference link styling lives on base `a`
- navigation and other chrome links opt out locally with utility classes
- one-off layout or component-only styling should stay inline in the component via Tailwind utility classes
- do not create style-only `data-*` hooks
- if a selector exists only for logbook internals, prefer `logbook.css`

`logbook.css` is the place for repeated logbook-only selectors such as:

- `logbook-table`
- `logbook-th`
- `logbook-cell`
- `logbook-row`
- `logbook-row-button`
- `logbook-detail-row`
- `logbook-print-sheet`

## Accessibility And UX Constraints

Current implementation expectations:

- navigation stays link-based and crawlable
- skip link remains present
- reduced-motion users get a non-animated hero
- keyboard focus states are visible
- desktop uses a sidebar for section navigation
- mobile uses a bottom navigation bar for section navigation
- print mode is explicitly supported
- no-JS users still see the completed hero terminal and a clear logbook limitation message

Do not regress:

- dialog focus trapping and focus restoration
- roving `tabindex` behavior in the logbook table
- localized visible and accessible labels
- print-visible callsign in the hero
- print-only logbook detail sheet behavior when printing an open dialog

## Conventions To Preserve

- Prefer semantic Astro content modules over abstract data-driven rendering
- Prefer static route generation over client-only page state
- Keep routing derived from discovered profile modules
- Keep locale data centralized in `i18n.ts`
- Keep icons local and subsetted
- Keep `global.css` limited to actual global defaults and small reused primitives
- Inline one-off visual styling in component markup instead of inventing global classes
- Avoid reintroducing removed wrapper components when `InfoCard` or the page file is enough
- Do not use style-only `data-*` attributes

## Practical Entry Points

If you need to change:

- routing and profile discovery:
  - [`src/pages/index.astro`](/E:/source/repos/chisato-ham-logbook/src/pages/index.astro)
  - [`src/pages/[lang]/index.astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/index.astro)
  - [`src/pages/[lang]/[station].astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/[station].astro)
  - [`src/lib/routing.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/routing.ts)
- locale strings:
  - [`src/lib/i18n.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/i18n.ts)
- profile metadata typing:
  - [`src/lib/profile.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/profile.ts)
- profile content authoring:
  - [`src/content`](/E:/source/repos/chisato-ham-logbook/src/content)
- layout and navigation chrome:
  - [`src/layouts/Layout.astro`](/E:/source/repos/chisato-ham-logbook/src/layouts/Layout.astro)
- hero behavior:
  - [`src/components/MorseHero.astro`](/E:/source/repos/chisato-ham-logbook/src/components/MorseHero.astro)
  - [`src/lib/morse.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/morse.ts)
- shared prose/card/section authoring:
  - [`src/components/Prose.astro`](/E:/source/repos/chisato-ham-logbook/src/components/Prose.astro)
  - [`src/components/InfoCard.astro`](/E:/source/repos/chisato-ham-logbook/src/components/InfoCard.astro)
  - [`src/components/GalleryCard.astro`](/E:/source/repos/chisato-ham-logbook/src/components/GalleryCard.astro)
  - [`src/components/SectionBlock.astro`](/E:/source/repos/chisato-ham-logbook/src/components/SectionBlock.astro)
  - [`src/components/SectionCluster.astro`](/E:/source/repos/chisato-ham-logbook/src/components/SectionCluster.astro)
- logbook behavior:
  - [`src/components/LogbookCard.astro`](/E:/source/repos/chisato-ham-logbook/src/components/LogbookCard.astro)
  - [`src/styles/logbook.css`](/E:/source/repos/chisato-ham-logbook/src/styles/logbook.css)
  - [`scripts/generate-logbook-callsign-index.mjs`](/E:/source/repos/chisato-ham-logbook/scripts/generate-logbook-callsign-index.mjs)
- shared design tokens and cross-cutting styles:
  - [`src/styles/vars.css`](/E:/source/repos/chisato-ham-logbook/src/styles/vars.css)
  - [`src/styles/global.css`](/E:/source/repos/chisato-ham-logbook/src/styles/global.css)
