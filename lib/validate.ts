import {
  bookingErrorMessages,
  contactMethodOptions,
  dayOptions,
  serviceOptions,
  utmKeys,
  vehicleSizes,
} from "@/components/content/site";

export type Attribution = Partial<
  Record<(typeof utmKeys)[number] | "referrer" | "landing_page", string>
>;

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  vehicleSize: (typeof vehicleSizes)[number];
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  service: (typeof serviceOptions)[number];
  day: (typeof dayOptions)[number];
  contactMethod: (typeof contactMethodOptions)[number];
  notes?: string;
  tier?: "essential" | "premium" | "elite";
  attribution: Attribution;
  submittedAt: string;
};

export type ValidateResult =
  | { ok: true; data: Lead }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const YEAR_RE = /^(19|20)\d{2}$/;
const TIERS = ["essential", "premium", "elite"] as const;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function trimStr(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.length > max ? t.slice(0, max) : t;
}

function coerceAttribution(v: unknown): Attribution {
  if (!isRecord(v)) return {};
  const out: Attribution = {};
  for (const key of utmKeys) {
    const s = trimStr(v[key], 200);
    if (s) out[key] = s;
  }
  const ref = trimStr(v.referrer, 500);
  if (ref) out.referrer = ref;
  const lp = trimStr(v.landing_page, 500);
  if (lp) out.landing_page = lp;
  return out;
}

export function validateLead(input: unknown): ValidateResult {
  const errors: Record<string, string> = {};
  if (!isRecord(input)) {
    return { ok: false, errors: { _form: bookingErrorMessages.generic } };
  }

  const name = trimStr(input.name, 80);
  if (!name) errors.name = bookingErrorMessages.nameRequired;

  const rawPhone = typeof input.phone === "string" ? input.phone : "";
  const phoneDigits = rawPhone.replace(/\D/g, "");
  let phone: string | undefined;
  if (!rawPhone.trim()) {
    errors.phone = bookingErrorMessages.phoneRequired;
  } else if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
    errors.phone = bookingErrorMessages.phoneInvalid;
  } else {
    phone = phoneDigits;
  }

  const email = trimStr(input.email, 120);
  if (email && !EMAIL_RE.test(email)) {
    errors.email = bookingErrorMessages.emailInvalid;
  }

  const city = trimStr(input.city, 80);

  const vehicleSize = trimStr(input.vehicleSize, 40) as
    | (typeof vehicleSizes)[number]
    | undefined;
  if (!vehicleSize || !(vehicleSizes as readonly string[]).includes(vehicleSize)) {
    errors.vehicleSize = bookingErrorMessages.vehicleSizeRequired;
  }

  const vehicleYear = trimStr(input.vehicleYear, 4);
  if (vehicleYear && !YEAR_RE.test(vehicleYear)) {
    errors.vehicleYear = bookingErrorMessages.vehicleYearInvalid;
  }
  const vehicleMake = trimStr(input.vehicleMake, 40);
  const vehicleModel = trimStr(input.vehicleModel, 40);

  const service = trimStr(input.service, 40) as
    | (typeof serviceOptions)[number]
    | undefined;
  if (!service || !(serviceOptions as readonly string[]).includes(service)) {
    errors.service = bookingErrorMessages.serviceRequired;
  }

  const day = trimStr(input.day, 20) as (typeof dayOptions)[number] | undefined;
  if (!day || !(dayOptions as readonly string[]).includes(day)) {
    errors.day = bookingErrorMessages.dayRequired;
  }

  const contactMethod = trimStr(input.contactMethod, 10) as
    | (typeof contactMethodOptions)[number]
    | undefined;
  if (
    !contactMethod ||
    !(contactMethodOptions as readonly string[]).includes(contactMethod)
  ) {
    errors.contactMethod = bookingErrorMessages.contactMethodRequired;
  } else if (contactMethod === "Email" && !email) {
    errors.email = bookingErrorMessages.emailRequiredForContact;
  }

  const notes = trimStr(input.notes, 1000);

  const rawTier = trimStr(input.tier, 10);
  const tier =
    rawTier && (TIERS as readonly string[]).includes(rawTier)
      ? (rawTier as (typeof TIERS)[number])
      : undefined;

  const attribution = coerceAttribution(input.attribution);

  const submittedAtRaw = trimStr(input.submittedAt, 40);
  const submittedAt =
    submittedAtRaw && !Number.isNaN(Date.parse(submittedAtRaw))
      ? submittedAtRaw
      : new Date().toISOString();

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name: name!,
      phone: phone!,
      email,
      city,
      vehicleSize: vehicleSize!,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      service: service!,
      day: day!,
      contactMethod: contactMethod!,
      notes,
      tier,
      attribution,
      submittedAt,
    },
  };
}
