# Restaurant website platform

## Scope
A TypeScript, Next.js App Router restaurant frontend with server-rendered content and isolated interactive components. No database connection, payments, authentication, external ordering or WhatsApp integration. `/api/health` is a non-persistent status response only.

## Rebrand
1. Edit `config/restaurant.ts`: restaurant identity, logo, photography, location, verified links, services, story, and active theme.
2. Choose `traditional`, `modern`, or `fast-food` in the same config. Design tokens live in `config/theme.ts`. Footer theme controls are available in demo mode.
3. Replace tenant content in `data/menu.ts`, `data/categories.ts`, `data/reviews.ts`, and `data/promotions.ts`. Components never contain restaurant identity or dish data.
4. Put approved photos in `public/images/`. `FoodImage` wraps Next Image optimization, responsive sizing, and a broken-image fallback.
5. Set `demo: false` only after replacing sample testimonials, verifying hours/links/prices and removing inappropriate demo-only content. Demo mode deliberately disables search-engine indexing. Canonicals and sitemap use the existing `NEXT_PUBLIC_BASE_URL` environment variable; do not edit protected infrastructure values.

## Routes
`/`, `/menu`, `/menu?category=biryani`, `/about`, `/contact`, `/locations`, `/order`, `/robots.txt`, `/sitemap.xml`, and a config-generated `/icon` favicon. Unknown routes show a custom 404.

## Architecture
- `config/`: single identity, navigation, and theme sources
- `types/`: restaurant, menu, and provider/order contracts
- `data/`: clearly marked illustrative content
- `lib/catalog.ts`: static repository seam for future tenant-scoped database access
- `lib/ordering.ts`: abstract `OrderProvider` with a local preview adapter only
- `lib/seo.ts`: configuration-driven metadata and Restaurant/Menu/MenuItem structured data, never fake aggregate ratings
- `components/`: layout/navigation, hero, cards, menu, cart, sections
- `prisma/schema.prisma`: unused future PostgreSQL schema for all 10 requested entities, UUID keys and composite tenant-scoped foreign keys. No Prisma runtime or migration runs in this demo. This schema uses Prisma 6 datasource syntax; Prisma 7 configuration will require moving the datasource URL to `prisma.config.ts` when introducing a database

## Local ordering
Cart items and quantities persist in localStorage under a restaurant-scoped key. Unknown or invalid items are discarded. Deals are represented as fixed-price bundle lines so the advertised discount matches the bag. Customer information lives only in React memory and is neither saved nor submitted. The checkout creates a copyable, explicitly labeled preview; it never reports a successful restaurant order.

Verified phone, maps, review, and Instagram links are null initially. Clicking these actions opens explanatory accessible dialogs, not fake destinations. No API keys are needed.

## Quality
Run `yarn build` for the production compiler and type checking. Run `yarn tsc --noEmit` for an independent TypeScript check. Development service is managed by the provided supervisor. Interactive testing results are recorded in `test_result.md`.

Food photography source links: `public/images/CREDITS.md`. The neighborhood panel is an illustrative graphic, not an embedded map. Performance/accessibility Lighthouse scores are targets, not claimed measurements.
