# DARIAH-FI Website Migration

A Next.js + Payload CMS rebuild of the [DARIAH-FI](https://www.dariah.fi) website, migrated from WordPress. DARIAH-FI is Finland's national research infrastructure for data-intensive social sciences and humanities, connecting ten university and institutional nodes under the FIN-CLARIAH consortium.

This repository contains the full source for the public-facing site and its content management system, deployed on CSC's Rahti (OpenShift) platform.

---

## Project idea

The original DARIAH-FI website was built on WordPress, hosted on Rahti via a containerized WordPress instance. While functional, it carried the typical maintenance burden of a plugin-heavy CMS: a commercial theme, a third-party events plugin, scattered custom post types, and an editing experience that didn't map cleanly onto the site's actual content model (local offices, affiliated groups, tools and events all behaved like awkward variations of "blog post").

This rebuild re-implements the same public content as a typed, version-controlled content model in Payload CMS, rendered through a modern Next.js front end.

---

## Tech stack

- **Next.js 15** (App Router) — server-rendered frontend, file-based routing
- **Payload CMS 3** — embedded directly in the Next.js app (no separate backend service)
- **PostgreSQL** — content database
- **Tailwind CSS v4** — styling, with a custom design token layer matching DARIAH-FI's brand palette
- **Lexical** — Payload's rich text editor, used for all long-form content
- **Docker** — containerized deployment
- **CSC Rahti (OpenShift)** — hosting

---

## Why Payload instead of WordPress

**Content modeling that matches the actual data.** WordPress's core data model is built around a single `wp_posts` table with a `post_type` discriminator. Local offices, affiliated groups, tools, and events were all squeezed into this shape — pages doing double duty as listings, content scattered across custom fields with no schema validation, and a third-party events plugin bolted on for calendar functionality. In Payload, each of these is an independent schema-defined collection with typed fields, validated relationships (e.g. a tool's `developedBy` field can only point to a real local office), and no risk of a stray text field silently holding the wrong kind of data.

**The codebase and the CMS are one project.** Payload is an embedded Next.js application, not a separate PHP server talking to a REST/GraphQL API over HTTP. There's no plugin compatibility matrix to manage, no separate hosting stack for the CMS versus the frontend, and admin UI customizations are just React components living in the same repository as everything else.

**Performance and hosting flexibility.** The site renders through Next.js's App Router with server components, giving fine-grained control over what's statically generated versus rendered per-request. Hosting is a single containerized Node.js process plus Postgres, which deploys cleanly to CSC's Rahti (OpenShift) infrastructure without the PHP-FPM, MySQL, and plugin-update surface area WordPress requires.

**No plugin dependency risk.** The original site relied on a commercial theme and a third-party events calendar plugin, both of which represent ongoing license costs, update risk, and potential abandonment risk for a long-running research infrastructure project. Every piece of functionality in this rebuild — events, tabs, training listings, contact cards — is owned source code in this repository, not a black-box plugin.

**Editorial experience suited to a multi-institution team.** With ten institutional nodes each contributing content, a clear block-based page builder (rather than free-form WordPress blocks mixed with shortcodes and theme-specific meta boxes) makes it easier to maintain visual consistency across contributors without deep WordPress theme knowledge.

Trade-off: Payload requires a Node.js/TypeScript-literate maintainer rather than the broader skill set of a WordPress admin, and the initial migration — reflected in the scripts in this repo — required custom HTML parsing to handle WordPress's mixed formats. Nevertheless, this trade is reasonable for the gains in type safety, content integrity, and long-term maintainability.

---

## Project structure

```
src/
├── app/
│   ├── (frontend)/             # Public site routes
│   │   ├── page.tsx             # Home (delegates to [slug] with slug="home")
│   │   ├── [slug]/              # Catch-all for Pages collection documents
│   │   ├── posts/                # News & Blogs (list + detail)
│   │   ├── events/                # Events (list + detail, upcoming/past toggle)
│   │   ├── local-offices/          # Local Offices (list + detail)
│   │   ├── contacts/                # Contacts (derived from Local Offices)
│   │   └── search/
│   └── (payload)/                # Payload admin UI, mounted at /admin
├── collections/
│   ├── Pages/                    # Flexible block-based pages (About, Home, Training, etc.)
│   ├── Posts/                    # News & Blogs
│   ├── Events.ts                 # Conferences, workshops, webinars
│   ├── LocalOffices.ts            # The 10 DARIAH-FI nodes
│   ├── AffiliatedGroups.ts         # Research groups affiliated with each node
│   ├── Tools.ts                    # Datasets, software, and resources developed in the project
│   ├── Media.ts
│   ├── Categories.ts
│   └── Users.ts
├── blocks/                       # Page-builder blocks used inside the Pages collection
│   ├── Content/                   # Multi-column rich text
│   ├── TabsBlock/                  # Tabbed sections (About/FIN-CLARIAH/Development, Resources/Tools)
│   ├── TrainingSections/            # Structured course listings by university and level
│   ├── UpcomingEvents/               # Live query of upcoming events
│   ├── ContactsGrid/                  # (legacy) static contacts grid block
│   ├── CallToAction/, MediaBlock/, ArchiveBlock/, Form/, Banner/, Code/
├── components/
│   ├── EventCard/, OfficeContactCard/, ContactCard/
│   ├── Media/, RichText/
│   └── ui/                        # shadcn-derived primitives
├── Header/, Footer/                # Global navigation singletons
├── heros/                          # Hero section variants for Pages
├── scripts/                        # One-off content migration / seed scripts (see below)
└── payload.config.ts               # Central Payload configuration
```

---

## Content model

| Collection | Purpose | Notes |
|---|---|---|
| `pages` | Flexible, block-based pages | Home, About (tabs), Resources (tabs), Training & Teaching, Accessibility Statement |
| `posts` | News & Blogs | Migrated 1:1 from WordPress posts, full rich text preserved |
| `events` | Conferences, workshops, webinars | Upcoming/past status, registration links, related local office |
| `local-offices` | The 10 DARIAH-FI nodes (universities, CSC, national library/archives) | Holds contacts (array, supports multiple people per office), logo |
| `affiliated-groups` | Research groups affiliated with a node | Expertise tags, contact, linked to a `local-offices` record |
| `tools` | Datasets, software, and resources | Access links, tutorial links, developed-by / collaborator nodes |
| `media` | All uploaded images | Logos, photos, post images, illustrations |

Pages are composed from reusable blocks (`Content`, `TabsBlock`, `TrainingSections`, `UpcomingEvents`, etc.), so editors can rebuild page layouts without a developer, while structured collections (`events`, `local-offices`, `affiliated-groups`, `tools`) keep their data queryable and reusable across multiple views (e.g. a local office's detail page automatically lists its affiliated groups and tools via relationship queries, with no manual duplication).

---

## Migration scripts

The original WordPress content (XML export + CSV exports for events) was parsed and seeded into Payload via one-off scripts in `src/scripts/`. These are not part of the running application — they were run once against the production database during migration and are kept in the repo for reference and reproducibility:

- `seedLocalOffices.ts`, `seedLocalOfficesExtras.ts` — the 10 nodes, logos, contacts
- `seedAffiliatedGroups.ts`, `seedTools.ts` — affiliated groups and tools
- `seedEvents.ts`, `updateEventDescriptions.ts` — 62 events with full rich text descriptions parsed from WordPress's classic editor HTML
- `seedPosts.ts` — 43 blog posts with preserved paragraph structure, in-text images, and SEO metadata
- `seedAboutPage.ts`, `seedTrainingPage.ts`, `seedResourcesPage.ts`, `seedHomePage.ts`, `seedHeaderFooter.ts` — structural pages and global navigation
- `seedMediaRecords.ts` — bulk media import from a clean local source directory

---

## Local development

```bash
npm install
cp .env.example .env   # fill in DATABASE_URI and PAYLOAD_SECRET
npm run dev
```

Visit `http://localhost:3000/admin` to create the first admin user.

## Deployment

The site is deployed as a Docker container to CSC Rahti (OpenShift 4), with PostgreSQL running as a separate pod and media stored on a persistent volume claim. See `Dockerfile` and `rahti/deployment.yaml` for the full deployment configuration. Deployments are automated via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.
