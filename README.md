# Shine Society Detailing — marketing site

Next.js 16 (App Router, Turbopack) single-page marketing site for Shine Society Detailing in Senoia, GA.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass with zero TS / ESLint errors
npm run start   # serve the production build
```

## Environment

Copy `.env.example` to `.env.local` and fill in the Urable CRM credentials.

| Variable               | Required | Used by                  | Notes                                                                 |
| ---------------------- | -------- | ------------------------ | --------------------------------------------------------------------- |
| `URABLE_ACCESS_TOKEN`  | yes      | `app/api/lead/route.ts`  | Server-side only. **Never** prefix with `NEXT_PUBLIC_`.               |
| `URABLE_API_BASE_URL`  | yes      | `app/api/lead/route.ts`  | e.g. `https://api.urable.com`. The route appends `/v1/customers`.     |
| `NEXT_PUBLIC_SITE_URL` | no       | `app/layout.tsx`         | Used as `metadataBase` for OG tags. Falls back to `http://localhost:3000`. |

On Vercel: **Project → Settings → Environment Variables**. Add the two Urable vars for Production and Preview scopes. After saving, redeploy so the new values take effect.

> **Before launch:** the Urable endpoint in `lib/urable.ts` is a placeholder. Verify the exact endpoint and payload shape in the client's Urable API Explorer and adjust that one file. No other code needs to change.

## Memberships

The site does not collect payment. Monthly subscriptions are handled inside Urable via its native quote → card-on-file → recurring-billing flow. Membership leads arrive with `origin: "Website — Membership"` and a `*** MEMBERSHIP INQUIRY ***` header at the top of the customer note so the owner can spot them and create a Quote. Full owner-side workflow: [docs/membership-flow.md](docs/membership-flow.md).

## Structure

- `app/page.tsx` — section order (single-page site).
- `app/api/lead/route.ts` — server-side proxy that forwards form submissions to Urable.
- `components/sections/` — section components rendered in `page.tsx`.
- `components/content/site.ts` — all copy (services, memberships, FAQ, form labels, etc.). Don't hardcode strings in JSX.
- `lib/validate.ts` — server-side lead validation.
- `lib/urable.ts` — Urable CRM client + note formatter.
- `lib/analytics.ts` — SSR-safe gtag wrapper.
- `app/prototype.css` — design-system CSS (do not modify).
- `app/globals.css` — additions / overrides layered on top of the prototype.

See `CLAUDE.md` for conventions and the ship workflow.
