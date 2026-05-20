import { memberships } from "@/components/content/site";
import type { Lead } from "@/lib/validate";

export class UrableError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`Urable ${status}`);
    this.name = "UrableError";
  }
}

function tierName(tier: Lead["tier"]): string | undefined {
  if (!tier) return undefined;
  return memberships.find((m) => m.id === tier)?.name;
}

function vehicleYMM(lead: Lead): string | undefined {
  const parts = [lead.vehicleYear, lead.vehicleMake, lead.vehicleModel]
    .map((s) => s?.trim())
    .filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}

/**
 * Split a full name into firstName / lastName.
 *
 * - Single token → firstName only, lastName is empty string.
 * - Two tokens → firstName, lastName.
 * - Three+ tokens → first token is firstName, the rest joined with spaces is
 *   lastName (so "Mary Jane Smith" → "Mary" / "Jane Smith"). This favors the
 *   common case where a multi-word last name is more likely than a multi-word
 *   first name.
 *
 * `validateLead` already guarantees a non-empty trimmed `lead.name`, so we
 * won't hit the empty case in practice; the fallback exists only for safety.
 */
function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  const [first, ...rest] = parts;
  return { firstName: first, lastName: rest.join(" ") };
}

type Section = { heading: string; lines: string[] };

function buildSections(lead: Lead): Section[] {
  const lines = (entries: Array<[string, string | undefined]>): string[] =>
    entries
      .filter(([, v]) => Boolean(v && v.trim()))
      .map(([k, v]) => `${k}: ${v!.trim()}`);

  const ymm = vehicleYMM(lead);
  const t = tierName(lead.tier);

  const sections: Section[] = [
    { heading: "Website Lead - Shine Society", lines: [] },
    {
      heading: "Customer Info:",
      lines: lines([
        ["Name", lead.name],
        ["Phone", lead.phone],
        ["Email", lead.email],
        ["Preferred contact", lead.contactMethod],
        ["City/ZIP", lead.city],
      ]),
    },
    {
      heading: "Vehicle:",
      lines: lines([
        ["Size", lead.vehicleSize],
        ["Vehicle", ymm],
      ]),
    },
    {
      heading: "Request:",
      lines: lines([
        ["Service", lead.service],
        ["Preferred timing", lead.day],
        ["Tier", t],
        ["Message", lead.notes],
      ]),
    },
    {
      heading: "Marketing Attribution:",
      lines: lines([
        ["Source", "Website form"],
        ["Landing page", lead.attribution.landing_page],
        ["Referrer", lead.attribution.referrer],
        ["UTM Source", lead.attribution.utm_source],
        ["UTM Medium", lead.attribution.utm_medium],
        ["UTM Campaign", lead.attribution.utm_campaign],
        ["UTM Content", lead.attribution.utm_content],
        ["UTM Term", lead.attribution.utm_term],
        ["GCLID", lead.attribution.gclid],
        ["FBCLID", lead.attribution.fbclid],
      ]),
    },
    {
      heading: "Submitted At:",
      lines: [lead.submittedAt],
    },
  ];

  return sections.filter((s, i) => i === 0 || s.lines.length > 0);
}

export function formatNote(lead: Lead): string {
  const body = buildSections(lead)
    .map((s) => (s.lines.length ? [s.heading, ...s.lines].join("\n") : s.heading))
    .join("\n\n");

  const t = tierName(lead.tier);
  if (!t) return body;

  // Surface membership intent at the very top of the note so the owner spots
  // it the instant they open the customer in Urable and knows to create a
  // Quote (not just schedule a one-off detail).
  return `*** MEMBERSHIP INQUIRY — ${t} ***\n\n${body}`;
}

function buildUrablePayload(lead: Lead): Record<string, unknown> {
  const { firstName, lastName } = splitName(lead.name);
  const payload: Record<string, unknown> = {
    type: "person",
    status: "new",
    firstName,
    lastName,
    phoneNumbers: [{ label: "Mobile", value: lead.phone }],
    origin: lead.tier ? "Website — Membership" : "Website",
    notes: formatNote(lead),
  };
  if (lead.email) {
    payload.emails = [{ label: "Home", value: lead.email }];
  }
  return payload;
}

export async function createOrUpdateUrableCustomer(
  lead: Lead,
): Promise<{ id?: string; raw: unknown }> {
  const base = process.env.URABLE_API_BASE_URL;
  const token = process.env.URABLE_ACCESS_TOKEN;
  if (!base || !token) {
    // Production: hard-fail loudly so a deploy misconfiguration is visible.
    // Non-production (dev / preview without creds): log the would-be payload
    // and return a fake success so the UI can be exercised end-to-end
    // without a live Urable token.
    if (process.env.NODE_ENV === "production") {
      throw new UrableError(0, "Missing URABLE_API_BASE_URL or URABLE_ACCESS_TOKEN");
    }
    const payload = buildUrablePayload(lead);
    console.log(
      "[urable:dev-dry-run] URABLE creds not set; skipping live call.",
    );
    console.log("[urable:dev-dry-run] payload:", JSON.stringify(payload, null, 2));
    return { id: "dev-dry-run", raw: { success: true, data: { id: "dev-dry-run" } } };
  }

  // Endpoint + payload verified against Urable's API (May 2026). Production
  // base URL is https://app.urable.com/api; the request becomes
  // POST {base}/v1/customers with a person-type customer record. v1 creates
  // only — upsert (search by email/phone → update) can be added behind this
  // function later without changing the route handler.
  const url = `${base.replace(/\/$/, "")}/v1/customers`;

  const payload = buildUrablePayload(lead);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {
      /* ignore */
    }
    throw new UrableError(res.status, body);
  }

  let raw: unknown = null;
  try {
    raw = await res.json();
  } catch {
    /* response may not be JSON; tolerate */
  }

  // Verified Urable response shape: { success: true, data: { id: "..." } }.
  // We only dig out the id; the route handler doesn't depend on `success`
  // since HTTP non-2xx is already converted to a thrown UrableError above.
  let id: string | undefined;
  if (raw && typeof raw === "object" && "data" in raw) {
    const data = (raw as { data: unknown }).data;
    if (data && typeof data === "object" && "id" in data) {
      id = String((data as { id: unknown }).id);
    }
  }

  return { id, raw };
}
