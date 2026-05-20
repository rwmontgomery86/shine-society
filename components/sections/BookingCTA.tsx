"use client";

import { useEffect, useRef, useState } from "react";
import {
  bookingCopy,
  bookingFieldLabels,
  contact,
  contactMethodOptions,
  dayOptions,
  memberships,
  serviceOptions,
  utmKeys,
  vehicleSizes,
} from "@/components/content/site";
import { trackLeadSubmitted } from "@/lib/analytics";
import type { Attribution } from "@/lib/validate";

type Tier = "essential" | "premium" | "elite";

type LeadForm = {
  name: string;
  phone: string;
  email: string;
  city: string;
  vehicleSize: (typeof vehicleSizes)[number];
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  service: (typeof serviceOptions)[number];
  day: (typeof dayOptions)[number];
  contactMethod: (typeof contactMethodOptions)[number];
  notes: string;
  companyWebsite: string; // honeypot
};

type Status = "idle" | "sending" | "success" | "error";

const INITIAL: LeadForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  vehicleSize: "Sedan",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  service: "Inside & Out",
  day: "This week",
  contactMethod: "Text",
  notes: "",
  companyWebsite: "",
};

const TIERS: ReadonlySet<Tier> = new Set(["essential", "premium", "elite"]);

function parseTierFromHash(hash: string): Tier | null {
  if (!hash) return null;
  const q = hash.indexOf("?");
  if (q < 0) return null;
  const params = new URLSearchParams(hash.slice(q + 1));
  const t = params.get("tier");
  return t && TIERS.has(t as Tier) ? (t as Tier) : null;
}

function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const search = new URLSearchParams(window.location.search);
  const out: Attribution = {};
  for (const key of utmKeys) {
    const v = search.get(key);
    if (v) out[key] = v;
  }
  if (document.referrer) out.referrer = document.referrer;
  out.landing_page = window.location.href;
  return out;
}

export function BookingCTA() {
  const [form, setForm] = useState<LeadForm>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tier, setTier] = useState<Tier | null>(null);
  const attributionRef = useRef<Attribution>({});

  useEffect(() => {
    // One-time mount-side read of the URL: capture UTM/landing/referrer into a
    // ref, and if the membership tiles routed here with #book?tier=…, preselect
    // Membership + record the tier. The lint rule below is suppressed because
    // this is a legitimate "read browser-only state once on mount" pattern —
    // we deliberately don't render this server-side, and the two setState
    // calls run at most once (guarded by `if (t)` + the empty dep array).
    attributionRef.current = captureAttribution();
    const t = parseTierFromHash(window.location.hash);
    if (t) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTier(t);
      setForm((f) => ({ ...f, service: "Membership" }));
    }
  }, []);

  const update = <K extends keyof LeadForm>(key: K, value: LeadForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key as string];
        return next;
      });
    }
  };

  const tierName = tier
    ? (memberships.find((m) => m.id === tier)?.name ?? null)
    : null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "success") return;

    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tier,
          attribution: attributionRef.current,
          submittedAt: new Date().toISOString(),
        }),
      });

      let payload: { success?: boolean; errors?: Record<string, string> } = {};
      try {
        payload = await res.json();
      } catch {
        /* ignore non-JSON */
      }

      if (res.status === 422 && payload.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok || !payload.success) {
        setStatus("error");
        return;
      }

      setStatus("success");
      trackLeadSubmitted({
        service: form.service,
        vehicleSize: form.vehicleSize,
        tier,
      });
    } catch {
      setStatus("error");
    }
  };

  const submitLabel =
    status === "sending"
      ? bookingCopy.submitSending
      : status === "success"
        ? bookingCopy.submitSent
        : bookingCopy.submitIdle;

  return (
    <section className="ss-book" id="book">
      <div className="ss-book__bg" aria-hidden="true">
        <div className="ss-book__halo" />
      </div>
      <div className="ss-book__inner">
        <div className="ss-book__copy">
          <span className="ss-book__kicker">— Ready to book?</span>
          <h2 className="ss-book__title">
            Park it. <em>We&rsquo;ll handle the rest.</em>
          </h2>
          <p>
            {bookingCopy.leadParagraph} Lead time is{" "}
            {contact.leadTime.toLowerCase()}.
          </p>
          <div className="ss-book__contact">
            <a href={contact.phoneTel}>
              <span>Call or text</span>
              <strong>{contact.phone}</strong>
            </a>
            <span>
              <span>Service hours</span>
              <strong>{contact.hoursShort}</strong>
            </span>
          </div>
        </div>

        {status === "success" ? (
          <div
            className="ss-book__form ss-book__form--done"
            role="status"
            aria-live="polite"
          >
            <h3 className="ss-book__success-title">
              {bookingCopy.successHeadline}
            </h3>
            <p className="ss-book__success-body">{bookingCopy.successBody}</p>
          </div>
        ) : (
          <form className="ss-book__form" onSubmit={onSubmit} noValidate>
            <div className="ss-field">
              <label htmlFor="bk-name">{bookingFieldLabels.name.label}</label>
              <input
                id="bk-name"
                type="text"
                placeholder={bookingFieldLabels.name.placeholder}
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "bk-name-err" : undefined}
              />
              {errors.name && (
                <p className="ss-field__err" id="bk-name-err" aria-live="polite">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="ss-field">
              <label htmlFor="bk-phone">{bookingFieldLabels.phone.label}</label>
              <input
                id="bk-phone"
                type="tel"
                placeholder={bookingFieldLabels.phone.placeholder}
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "bk-phone-err" : undefined}
              />
              {errors.phone && (
                <p className="ss-field__err" id="bk-phone-err" aria-live="polite">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="ss-field ss-field--wide">
              <label htmlFor="bk-email">{bookingFieldLabels.email.label}</label>
              <input
                id="bk-email"
                type="email"
                placeholder={bookingFieldLabels.email.placeholder}
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "bk-email-err" : undefined}
              />
              {errors.email && (
                <p className="ss-field__err" id="bk-email-err" aria-live="polite">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="ss-field ss-field--wide">
              <label htmlFor="bk-city">{bookingFieldLabels.city.label}</label>
              <input
                id="bk-city"
                type="text"
                placeholder={bookingFieldLabels.city.placeholder}
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>

            <div className="ss-book__triple">
              <div className="ss-field">
                <label htmlFor="bk-year">
                  {bookingFieldLabels.vehicleYear.label}
                </label>
                <input
                  id="bk-year"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder={bookingFieldLabels.vehicleYear.placeholder}
                  value={form.vehicleYear}
                  onChange={(e) => update("vehicleYear", e.target.value)}
                  aria-invalid={Boolean(errors.vehicleYear)}
                  aria-describedby={
                    errors.vehicleYear ? "bk-year-err" : undefined
                  }
                />
                {errors.vehicleYear && (
                  <p className="ss-field__err" id="bk-year-err" aria-live="polite">
                    {errors.vehicleYear}
                  </p>
                )}
              </div>
              <div className="ss-field">
                <label htmlFor="bk-make">
                  {bookingFieldLabels.vehicleMake.label}
                </label>
                <input
                  id="bk-make"
                  type="text"
                  placeholder={bookingFieldLabels.vehicleMake.placeholder}
                  value={form.vehicleMake}
                  onChange={(e) => update("vehicleMake", e.target.value)}
                />
              </div>
              <div className="ss-field">
                <label htmlFor="bk-model">
                  {bookingFieldLabels.vehicleModel.label}
                </label>
                <input
                  id="bk-model"
                  type="text"
                  placeholder={bookingFieldLabels.vehicleModel.placeholder}
                  value={form.vehicleModel}
                  onChange={(e) => update("vehicleModel", e.target.value)}
                />
              </div>
            </div>

            <div className="ss-field ss-field--wide">
              <label>Vehicle size</label>
              <div className="ss-seg" role="radiogroup" aria-label="Vehicle size">
                {vehicleSizes.map((o) => (
                  <button
                    type="button"
                    key={o}
                    role="radio"
                    aria-checked={form.vehicleSize === o}
                    className={form.vehicleSize === o ? "is-on" : ""}
                    onClick={() => update("vehicleSize", o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="ss-field ss-field--wide">
              <label>Service</label>
              <div className="ss-seg" role="radiogroup" aria-label="Service">
                {serviceOptions.map((o) => (
                  <button
                    type="button"
                    key={o}
                    role="radio"
                    aria-checked={form.service === o}
                    className={form.service === o ? "is-on" : ""}
                    onClick={() => update("service", o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {tierName && (
                <span className="ss-book__tier-chip">
                  {bookingCopy.tierChipPrefix} {tierName}
                </span>
              )}
            </div>

            <div className="ss-field ss-field--wide">
              <label>When</label>
              <div className="ss-seg" role="radiogroup" aria-label="When">
                {dayOptions.map((o) => (
                  <button
                    type="button"
                    key={o}
                    role="radio"
                    aria-checked={form.day === o}
                    className={form.day === o ? "is-on" : ""}
                    onClick={() => update("day", o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="ss-field ss-field--wide">
              <label>Preferred contact</label>
              <div
                className="ss-seg"
                role="radiogroup"
                aria-label="Preferred contact"
              >
                {contactMethodOptions.map((o) => (
                  <button
                    type="button"
                    key={o}
                    role="radio"
                    aria-checked={form.contactMethod === o}
                    className={form.contactMethod === o ? "is-on" : ""}
                    onClick={() => update("contactMethod", o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="ss-field ss-field--wide">
              <label htmlFor="bk-notes">{bookingFieldLabels.notes.label}</label>
              <textarea
                id="bk-notes"
                placeholder={bookingFieldLabels.notes.placeholder}
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>

            {/* Honeypot — visually hidden, off-screen, not display:none so bots fill it. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor="bk-website">Company website</label>
              <input
                id="bk-website"
                type="text"
                name="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
                value={form.companyWebsite}
                onChange={(e) => update("companyWebsite", e.target.value)}
              />
            </div>

            {status === "error" && (
              <div className="ss-book__alert" role="alert" aria-live="assertive">
                <strong>{bookingCopy.errorHeadline}</strong>
                <p>{bookingCopy.errorBody}</p>
              </div>
            )}

            <button
              type="submit"
              className="ss-btn ss-btn--solid ss-btn--lg ss-btn--block"
              disabled={status === "sending"}
            >
              {submitLabel}
            </button>
            <p className="ss-book__fine">{bookingCopy.finePrint}</p>
          </form>
        )}
      </div>
    </section>
  );
}
