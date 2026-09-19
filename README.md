# ModestFrames - Photography Studio Website

A production-quality website for a photographer covering Weddings, Pre-Wedding,
Post-Wedding, Engagement, Baby Shower, Maternity, Newborn, Family, and Events
photography. Three parts in one app:

1. **Public portfolio** - a premium, dark, editorial marketing site built to
   attract new clients.
2. **Private client gallery** - an access-code-protected proofing gallery
   where clients select their final images.
3. **Admin dashboard** - where the photographer creates projects, uploads
   proofs, and reviews client selections and enquiries.

Built to run entirely on free-tier infrastructure: no database to provision,
no paid API keys required to get started.

---

## Tech stack

Everything here is on the current stable release as of this build:

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-based `@theme`, no `tailwind.config.js`) |
| Animation | Motion (the current package name for what was `framer-motion`) |
| Icons | lucide-react |
| Fonts | Self-hosted via `@fontsource` (Instrument Serif + Manrope) - no runtime dependency on Google Fonts |
| Data | A JSON-file store (`lib/db.ts`) - zero-config, free-tier friendly |
| Auth | Lightweight HMAC-signed cookies via Web Crypto (`lib/session.ts`) - no external auth service required |
| Language | TypeScript 5.9, strict mode |

No deprecated packages, no abandoned libraries. `middleware.ts` uses the
current Next.js 16 `proxy.ts` convention.

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then edit ADMIN_PASSWORD and SESSION_SECRET
npm run seed                   # creates a demo project (access code: ANIKA26)
npm run dev
```

Visit:
- `http://localhost:3000` - the public site
- `http://localhost:3000/gallery` - client gallery (demo code: `ANIKA26`)
- `http://localhost:3000/admin/login` - admin dashboard (password: value of `ADMIN_PASSWORD`, defaults to `modestframes-admin`)

For a production build:

```bash
npm run build
npm run start
```

---

## Environment variables

Set these in `.env.local` (see `.env.example`):

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Password for `/admin/login`. **Change before deploying.** |
| `SESSION_SECRET` | Signing key for session cookies. Generate a real one with `openssl rand -hex 32` before deploying. |

---

## Replacing the placeholder imagery

There are no real photographs bundled with this project - every image on
the public site and in the demo gallery is a generated placeholder "plate"
(`public/placeholders/plate-*.svg`), styled to match the studio's tone so
the layout, spacing, and grid rhythm are exactly what they'll be with real
photography dropped in.

To go live:
- Replace calls to `<Plate index={n} />` (in `components/Plate.tsx` and
  its usages across `app/`) with real images - either swap the `src` in
  `PlateBySrc`, or drop real files into `public/` and reference them.
- Real client shoot images are handled separately, through the admin
  **Upload proofs** flow - those are never placeholders; they're written to
  `public/uploads/<projectId>/` and served directly.

---

## Architecture notes

### Data layer

`lib/db.ts` reads and writes a single `data/projects.json` file. This is a
deliberate choice: it means the entire app - portfolio, private galleries,
admin dashboard, image uploads, enquiries - runs with **zero external
services**. Clone it, `npm install`, and it works.

The trade-off: on serverless hosts (Vercel, Netlify) the filesystem is
read-only/ephemeral in production, so writes made through the admin
dashboard won't persist between deployments there. This is fine for local
use, a self-hosted box, or a small always-on VPS (a $4–6/mo instance is
plenty for a single photographer's traffic).

**To deploy on Vercel with persistent data**, swap the data layer for
[Supabase](https://supabase.com) (free tier covers this comfortably):

1. Create a `projects` table and an `inquiries` table matching the shapes
   in `lib/types.ts`.
2. Replace the function bodies in `lib/db.ts` (`getProjects`, `saveProject`,
   `deleteProject`, `getInquiries`, `addInquiry`, etc.) with calls to
   `supabase.from('projects')...` - the function signatures are the
   contract; nothing outside this file needs to change.
3. Replace the upload route (`app/api/admin/projects/[id]/upload/route.ts`)
   so it writes to **Supabase Storage** instead of `public/uploads/`, and
   store the returned public URL on the image record instead of a local
   path.

### Auth

There's no third-party auth provider wired in - sessions are a small
HMAC-signed cookie (`lib/session.ts`, built on Web Crypto so it runs
identically in the Node runtime and in `proxy.ts`'s runtime). This keeps
the app dependency-free out of the box. For a real studio handling
multiple clients, swapping in Supabase Auth or NextAuth is a reasonable
next step, but isn't required for the app to function correctly and
securely as shipped - passwords/codes are never logged, cookies are
`httpOnly` and `secure` in production, and access codes are validated with
a constant-time comparison equivalent via the signed-token structure.

### Gallery access model

Each project gets a random 6-character access code (e.g. `ANIKA26`) that
the photographer shares with the client. Entering it on `/gallery` grants
a signed, `httpOnly` cookie scoped to that project for 30 days - multiple
family members can use the same code from different devices. Selections
autosave on every click; nothing is lost if the tab closes before
"Submit selection."

---

## Project structure

```
app/
  page.tsx                    Homepage
  portfolio/                  Portfolio index + /portfolio/[category]
  studio/, process/, contact/ Marketing pages
  gallery/                    Client gallery (access gate + /[slug])
  admin/
    login/                    Admin login
    dashboard/                Protected dashboard (overview, projects, inquiries)
  api/
    contact/                  Public contact form submission
    gallery/                  Access-code verification + selection save/submit
    admin/                    Project CRUD, image upload/delete, inquiry status
components/                   Shared UI (Nav, Footer, GalleryView, admin widgets, …)
lib/                          Data layer, types, session/auth, site copy
data/projects.json            The JSON "database" (git-ignored in practice; seeded by scripts/seed.mjs)
public/placeholders/          Generated placeholder plates (swap for real photography)
public/uploads/<projectId>/   Real client shoot images, written by the admin upload flow
scripts/
  seed.mjs                    Seeds one demo project
  gen-placeholders.mjs        Regenerates the placeholder plate set
proxy.ts                      Route protection for /admin/dashboard and /api/admin (Next.js 16 proxy convention)
```

---

## Security notes for going live

- Set a real `SESSION_SECRET` and a strong `ADMIN_PASSWORD` before
  deploying - the defaults in `.env.example` are for local development
  only.
- Cookies are `httpOnly`, `sameSite=lax`, and `secure` in production.
- Uploaded file types are restricted to common image formats, capped at
  25MB per file, and stored under a generated ID (never the client's
  original filename) to avoid path traversal.
- The contact form and gallery selection endpoints validate and cap input
  length server-side.
