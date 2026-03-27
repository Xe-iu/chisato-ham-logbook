# Project Architecture

## Overview

This project is a static Astro site for a personal amateur radio homepage and profile hub.

Core characteristics:

- Static-first routing and rendering
- No client framework
- Small, targeted inline scripts only
- Local assets only for fonts, images, and icons
- Semantic `.astro` content modules instead of MDX or normalized JSON content
- Multi-language and multi-station support derived from discovered profile files

Current stations in the repo:

- `JL1HRE`: active station
- `BD4WXB`: archived station

Current locales:

- `en`
- `ja`
- `zh-cn`

## Stack

- Astro 6
- Tailwind CSS 4 via `@tailwindcss/vite`
- Font Awesome Free Solid, subsetted into a local SVG sprite
- Local `JuliaMono` font files from `public/fonts`
- System/CJK sans stacks defined in CSS variables

Key config files:

- [`package.json`](/E:/source/repos/chisato-ham-logbook/package.json)
- [`astro.config.mjs`](/E:/source/repos/chisato-ham-logbook/astro.config.mjs)
- [`src/styles/vars.css`](/E:/source/repos/chisato-ham-logbook/src/styles/vars.css)
- [`src/styles/global.css`](/E:/source/repos/chisato-ham-logbook/src/styles/global.css)

There is no MDX integration and no client UI framework.

## Routing

Routing is file-based:

- `/`
  - redirect page
  - uses a short inline script to resolve browser language and redirect to the main active station
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

Important routing helpers live in:

- [`src/lib/routing.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/routing.ts)

Current routing behavior:

- Profile modules are discovered with `import.meta.glob("../content/profiles/*/*.astro", { eager: true })`
- `availableProfiles` is derived from the loaded modules
- `getStationsOrdered()` sorts active stations before archived stations and de-duplicates by `stationId`
- `getMainStationId()` picks the first active station, falling back to the first discovered station if needed

Important constraints:

- Language and station switching must stay plain `<a>` links
- Section navigation must stay anchor-based with fragment links such as `#overview`
- Route generation should continue to derive from the discovered profile modules, not a duplicated registry

## Localization

Locale definitions live in:

- [`src/lib/i18n.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/i18n.ts)

`i18n.ts` currently owns:

- locale IDs and language tags
- language switch labels
- localized site title strings
- localized footer copy
- localized station status labels

Do not hardcode these strings in page templates when a locale-level definition is more appropriate.

## Content Model

Profiles live as semantic Astro modules:

- `src/content/profiles/en/JL1HRE.astro`
- `src/content/profiles/en/BD4WXB.astro`
- `src/content/profiles/ja/JL1HRE.astro`
- `src/content/profiles/ja/BD4WXB.astro`
- `src/content/profiles/zh-cn/JL1HRE.astro`
- `src/content/profiles/zh-cn/BD4WXB.astro`

Each profile module exports:

1. `profile`
   - typed by `ProfileMeta`
2. `sections`
   - typed by `ProfileSection[]`
3. default Astro markup
   - the actual page body content

Shared profile typing lives in:

- [`src/lib/profile.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/profile.ts)

Important current facts:

- `stationId` is a string
- section IDs are currently:
  - `overview`
  - `basic-info`
  - `gear`
  - `qsl`
  - `showcase`
- `profile.hero` currently contains:
  - `title`
  - `blurb`

Do not reintroduce:

- MDX for profile authoring
- JSON blobs plus a generic renderer
- hardcoded station unions or manually duplicated station registries

The intended authoring model is semantic `.astro` content with light metadata and reusable presentation components.

## Render Flow

The main profile page is assembled in:

- [`src/pages/[lang]/[station].astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/[station].astro)

Current render flow:

1. resolve the requested profile module from `availableProfileModules`
2. derive locale switch links for the current station
3. derive station switch links for the current locale
4. pass `profile`, `locale`, `locales`, `stations`, and `sections` into the layout
5. render:
   - `MorseHero`
   - the imported profile Astro content body

There is no separate profile wrapper component anymore.

## Layout

Main layout:

- [`src/layouts/Layout.astro`](/E:/source/repos/chisato-ham-logbook/src/layouts/Layout.astro)

Responsibilities:

- global HTML shell
- metadata and page title
- icon sprite injection
- sticky header
- language switcher
- callsign switcher
- desktop section sidebar
- mobile bottom section navigation
- footer

Layout notes:

- mobile section shortcuts intentionally omit `overview`
- the layout owns the global navigation chrome, not the content files
- profile content is rendered through the default slot

## Hero

Hero component:

- [`src/components/MorseHero.astro`](/E:/source/repos/chisato-ham-logbook/src/components/MorseHero.astro)

Morse helpers:

- [`src/lib/morse.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/morse.ts)

Current behavior:

- renders the `overview` section
- animates `CQCQ DE` and the callsign as morse text on load
- falls back cleanly for reduced-motion users
- keeps a printable non-animated representation

Do not move this into a framework runtime or a global page state system.

## Reusable Content Components

Content components live in:

- [`src/components/content`](/E:/source/repos/chisato-ham-logbook/src/components/content)

Current shared content primitives:

- `Cards.astro`
  - responsive grid wrapper
  - current column variants are `2`, `3`, and `4`
- `InfoCard.astro`
  - main generic content card
  - optional label, value, link, and icon
- `DescriptionListCard.astro`
  - card shell for grouped labeled rows
  - currently reuses `InfoCard`
- `DescriptionListItem.astro`
  - labeled row with optional value or link
- `GalleryCard.astro`
  - image plus descriptive content
- `SectionBlock.astro`
  - section wrapper with anchor ID and heading
- `SectionCluster.astro`
  - subsection grouping inside a section
- `Stack.astro`
  - vertical spacing wrapper
- `TwoPane.astro`
  - two-column composition wrapper
- `Icon.astro`
  - local SVG sprite consumer

Supporting shared components outside `content/`:

- [`src/components/SectionHeading.astro`](/E:/source/repos/chisato-ham-logbook/src/components/SectionHeading.astro)
- [`src/components/IconSprite.astro`](/E:/source/repos/chisato-ham-logbook/src/components/IconSprite.astro)

Content authoring guidance:

- Prefer direct `InfoCard` usage over thin one-off wrappers
- Use `DescriptionListCard` + `DescriptionListItem` for compact labeled route/policy blocks
- Use plain paragraph content inside `InfoCard` for prose notes
- Keep section structure explicit in the profile files

## Icons

Icon definitions live in:

- [`src/lib/icons.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/icons.ts)

Sprite generation lives in:

- [`src/components/IconSprite.astro`](/E:/source/repos/chisato-ham-logbook/src/components/IconSprite.astro)

Important constraints:

- icons are local
- icons are subsetted
- icon usage should go through the shared icon components
- do not switch this to a webfont or external CDN

## Styling System

Styling is intentionally split into:

1. design tokens and font setup
   - [`src/styles/vars.css`](/E:/source/repos/chisato-ham-logbook/src/styles/vars.css)
2. reusable global classes and print rules
   - [`src/styles/global.css`](/E:/source/repos/chisato-ham-logbook/src/styles/global.css)

Important existing reusable classes:

- `panel-shell`
- `info-card`
- `meta-label`
- `meta-label-accent`
- `meta-label-large`
- `body-copy`
- `text-link`
- `header-row`
- `icon-chip`
- `switch-pill`
- `status-pill`

Important style constraints:

- keep repeated visual patterns in the shared CSS files rather than duplicating utility strings everywhere
- preserve the current print styles unless there is a specific reason to change them
- keep the local font and color token setup in `vars.css`

## Accessibility and UX Constraints

Expected constraints from the current implementation:

- navigation is link-based and crawlable
- reduced-motion users get a non-animated hero
- keyboard focus states are defined globally
- desktop uses a sidebar for section navigation
- mobile uses a bottom navigation bar for section navigation
- print mode is explicitly supported
- all major assets are local rather than CDN-hosted

## Conventions to Preserve

- Prefer semantic Astro content modules over abstract data-driven rendering
- Prefer static route generation over client-only page state
- Keep routing derived from discovered profile modules
- Keep locale data centralized in `i18n.ts`
- Keep icons local and subsetted
- Keep section IDs aligned with the `ProfileSectionId` type
- Avoid reintroducing removed wrapper components when `InfoCard` or the page file is enough

## Practical Entry Points

If you need to change:

- routing and discovery:
  - [`src/pages/index.astro`](/E:/source/repos/chisato-ham-logbook/src/pages/index.astro)
  - [`src/pages/[lang]/index.astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/index.astro)
  - [`src/pages/[lang]/[station].astro`](/E:/source/repos/chisato-ham-logbook/src/pages/[lang]/[station].astro)
  - [`src/lib/routing.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/routing.ts)
- locale strings:
  - [`src/lib/i18n.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/i18n.ts)
- profile metadata typing:
  - [`src/lib/profile.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/profile.ts)
- profile content authoring:
  - [`src/content/profiles`](/E:/source/repos/chisato-ham-logbook/src/content/profiles)
- layout and navigation chrome:
  - [`src/layouts/Layout.astro`](/E:/source/repos/chisato-ham-logbook/src/layouts/Layout.astro)
- hero behavior:
  - [`src/components/MorseHero.astro`](/E:/source/repos/chisato-ham-logbook/src/components/MorseHero.astro)
  - [`src/lib/morse.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/morse.ts)
- shared content visuals:
  - [`src/components/content`](/E:/source/repos/chisato-ham-logbook/src/components/content)
- icons:
  - [`src/lib/icons.ts`](/E:/source/repos/chisato-ham-logbook/src/lib/icons.ts)
  - [`src/components/IconSprite.astro`](/E:/source/repos/chisato-ham-logbook/src/components/IconSprite.astro)
- design tokens and global styles:
  - [`src/styles/vars.css`](/E:/source/repos/chisato-ham-logbook/src/styles/vars.css)
  - [`src/styles/global.css`](/E:/source/repos/chisato-ham-logbook/src/styles/global.css)
