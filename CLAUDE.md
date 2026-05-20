@AGENTS.md

# Shine Society Detailing — marketing site

Production Next.js build for **Shine Society Detailing**, a 1-year-old mobile car detailing business in Senoia, GA serving Central Georgia (40-mile radius). Owner: **706-938-8694**. The site is a single-page marketing site with mocked booking + membership flows; CMS / Stripe wiring is phase 2.

## Project structure

- **`./`** (this folder) — production Next.js 16 build. **Where dev happens.**
- **`../`** (the parent V-ShineSociety folder) — Claude Design HTML/JSX/CSS prototype + owner-content PDFs + raw assets. **Reference only — do not modify.**
- Plan + iteration log: `~/.claude/plans/users-rossmontgomery-library-containers-indexed-lagoon.md`
- Project memory: `~/.claude/projects/-Users-rossmontgomery-Desktop-V-ShineSociety/memory/`

## Stack

- Next.js **16.2.5** (App Router, Turbopack) · React 19.2 · TypeScript 5
- Tailwind v4 via `@tailwindcss/postcss` — design tokens in `app/globals.css` `@theme inline { … }` block, mapped from prototype CSS custom properties (`--bg`, `--ink`, `--accent` etc.)
- `next/font/google` for **Bebas Neue** (display), **Caveat** (script accent), **Inter** (body). Variables set on `<html>` in `app/layout.tsx`.
- No external state, no auth, no DB. All content is static.

## Conventions

- **All copy lives in `components/content/site.ts`** — services, memberships, FAQ, testimonials, hero copy, marquee items, contact info, vehicle sizes. Don't hardcode copy in component files; add a field here and import.
- **`app/prototype.css`** is the original Claude Design CSS, imported into `globals.css`. Treat it as the design system — tweaks for new components or overrides go in `globals.css` *after* the prototype import.
- **Cream tone** is applied by wrapping a section in `<div className="ss-tone ss-tone--cream">…</div>` in `app/page.tsx`. Currently wraps Services, Process, About.
- Sections use the `ss-*` class prefix (Shine Society Detailing — preserved from original prototype) from the prototype CSS — don't rename.
- Section order in `app/page.tsx` is the canonical layout. Adding a section means inserting a `<Component />` at the right slot, not a separate route.

## Intentionally mocked — do NOT wire a backend without asking

- **Memberships** "Start [tier]" tiles route to `#book?tier=…` — the booking form reads the hash, preselects the Membership service, and records the tier on the lead. **No Stripe checkout yet** — that comes in phase 2.
- **Testimonials** are placeholder text (Marcus T., Jenna R., Cole H.). Owner's Google Business share link 404'd; need real reviews.
- **EST. year** is hardcoded "2025" — owner is in year 1 of business as of 2026, hasn't confirmed exact founding date.

If you're tempted to "fix" these by wiring a real integration, stop and ask first.

## Lead capture (wired)

`BookingCTA` submits to `POST /api/lead` (`app/api/lead/route.ts`). The route validates with `lib/validate.ts`, then forwards to Urable via `lib/urable.ts`. The Urable access token is server-side only (`URABLE_ACCESS_TOKEN`) — **never** prefix it with `NEXT_PUBLIC_`. Note formatting lives in `formatNote(lead)`. Honeypot field `companyWebsite` is checked before validation; bot submissions get a silent 200. See `README.md` for env setup.

## Open content TODOs (need owner input before launch)

Search the codebase for `TODO:` to find them in context. The big ones:

- **Tiered service prices** per vehicle size × 4 services + add-ons. `services[]` in `site.ts` currently has "from $X" anchors only.
- **Time estimates** per service per vehicle size. Owner said the Menu PDF would include them but it didn't.
- **Real Google Reviews** — replace the 3 placeholders in `testimonials[]`.
- **BeforeAfter context copy** in `BeforeAfter.tsx` describes "recent details" generically; replace with the actual job context per photo pair.
- **Verify Urable endpoint + payload** in the client's Urable API Explorer before production. The placeholder in `lib/urable.ts` posts to `${base}/v1/customers` with `{name, phone, email, notes}` — adjust to match real spec.

## Owner facts that drive content + design decisions

- Phone **706-938-8694**. Hours **Mon–Fri 8a–7p, Sat 8a–4p** (closed Sun).
- 40-mile radius is free; **$0.60/mile beyond**. Lead time **24–48 hr**.
- **10% deposit** only on ceramic coating + paint correction. No deposit on standard details.
- Can't detail in active rain. Ceramic coatings need **50°F+** to apply.
- No formal cancellation policy yet — we drafted "24-hour notice; same-day cancellations may forfeit deposit on ceramic/PC work" but it isn't owner-approved.
- **Fleet/commercial = custom quote**, not a separate UI flow. FAQ acknowledges it.
- Service-area cities (in `cities[]`, ordered by distance from HQ): Senoia (HQ) · Peachtree City · Fayetteville · Newnan · Griffin · McDonough · LaGrange · Barnesville · Manchester. All within the 40-mile radius.

## Run

```bash
npm run dev    # http://localhost:3000 (3002 if 3000 is busy)
npm run build  # static build, must pass with zero TS / ESLint errors
```

## Workflow

When the user approves finished work and says **"ship it"** (or `/ship`), the flow is:

1. Commit pending changes on the current branch with a descriptive message and the standard `Co-Authored-By` trailer. Stage specific files — never `git add -A`.
2. Verify the branch is a fast-forward of `origin/main`. If `git log HEAD..origin/main` is non-empty, the branch has diverged — stop and rebase (`git rebase origin/main`); never force-push.
3. `git push -u origin <branch>` — push the feature branch to GitHub.
4. If working on a non-main branch: `git push origin <branch>:main` — fast-forward `origin/main` via refspec push. GitHub rejects non-fast-forwards, which is the safety net. **Never** add `--force` or `--force-with-lease`.
5. Update local `main`: `git fetch origin && git checkout main && git merge --ff-only origin/main` (or, from a worktree: `git -C <parent-repo> fetch origin && git -C <parent-repo> merge --ff-only origin/main`).
6. Offer to delete the remote feature branch (`git push origin --delete <branch>`) — requires explicit user approval.

**Hard rules:** never force-push, never amend a pushed commit, never bypass hooks (`--no-verify`), never blanket-allow `git push`. Linear history only — no merge commits on `main`.

## Known dev-server quirk

Turbopack occasionally caches CSS aggressively after edits to `globals.css` or `prototype.css`. If your CSS changes don't appear in the browser even after a hot-reload + hard browser refresh:

```bash
kill $(lsof -ti:3000 -ti:3002) 2>/dev/null
rm -rf .next .turbo
npm run dev
```

This has happened twice during development. Don't waste time debugging selector specificity until you've tried this.
