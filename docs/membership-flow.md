# Membership flow (owner-side, in Urable)

The site does **not** collect payment. When someone clicks "Start [tier]" on the
memberships section, they fill out the standard booking form and we send a
lead to Urable with two signals you can spot at a glance:

- **`origin`** = `Website — Membership` (filter Urable's customer list on this)
- **`notes`** starts with `*** MEMBERSHIP INQUIRY — <Tier> ***`

Inside the note, the **Request** section lists the tier (Essential / Premium /
Elite) and the **Vehicle** section lists the size (Sedan / Midsize SUV / Large
SUV / Truck / 3-row) — together those determine the monthly price.

## The flow from there

1. **Membership lead arrives** in Urable with the signals above.
2. **Reach out** by the customer's preferred contact method (Text / Call /
   Email — listed in the note's Customer Info section). Confirm the tier,
   vehicle size, and address; quote any travel fee beyond 40 miles.
3. **Schedule the first detail** (the "Reset" — see [membershipRules](../components/content/site.ts)
   in `site.ts`: members start with a full Reset detail).
4. **Create a Quote in Urable** for the chosen tier × vehicle size. Send it to
   the customer; they accept and **add a card on file**.
5. **Perform the first detail.** Mark the service Complete in Urable — the
   first invoice generates automatically and the card-on-file is charged.
6. **Recurring schedule rolls forward.** Urable handles auto-pay, expired-card
   reminders, and branded receipts on the cadence you set (typically monthly).

## Tier prices (reference)

Source: [`memberships`](../components/content/site.ts) in `site.ts`.

| Tier      | Sedan      | SUV        |
| --------- | ---------- | ---------- |
| Essential | $99 / mo   | $119 / mo  |
| Premium   | $149 / mo  | $169 / mo  |
| Elite     | $199 / mo  | $229 / mo  |

## Why no payment integration on the site?

Urable already handles subscriptions natively (card-on-file, auto-pay, dunning)
via its Stripe or Square connection. Bolting Stripe Checkout onto the marketing
site would duplicate billing systems and split the customer record across two
tools. Lead-then-Quote keeps Urable as the single source of truth.

See:
- [Urable: How to manage subscriptions for recurring services](https://urable.com/2026/05/17/how-to-use-urable-to-manage-subscriptions-for-recurring-services/)
- [Urable: The quote-to-invoice workflow for detailing care plans](https://urable.com/2026/05/06/the-quote-to-invoice-workflow-for-detailing-care-plans/)
