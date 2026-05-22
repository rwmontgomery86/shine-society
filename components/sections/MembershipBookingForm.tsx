"use client";

import { useEffect, useRef, useState } from "react";
import {
  bookingFieldLabels,
  membershipBookingCopy,
  membershipFormCopy,
  memberships,
  utmKeys,
  vehicleSizes,
} from "@/components/content/site";
import { MembershipBanner } from "@/components/sections/MembershipBanner";
import { trackLeadSubmitted } from "@/lib/analytics";
import type { Attribution, Tier } from "@/lib/validate";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  vehicleSize: (typeof vehicleSizes)[number];
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  notes: string;
  companyWebsite: string; // honeypot
};

type Status = "idle" | "sending" | "success" | "error";

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  vehicleSize: "Sedan",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  notes: "",
  companyWebsite: "",
};

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

export function MembershipBookingForm({
  tier,
  onSwitchToPicker,
}: {
  tier: Tier;
  onSwitchToPicker: () => void;
}) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const attributionRef = useRef<Attribution>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    attributionRef.current = captureAttribution();
  }, []);

  // When a different tier is picked (e.g. user clicks another membership tile
  // while the form is already mounted), focus the first field to nudge them
  // toward filling it out. Skip on touch devices and on the initial mount —
  // we use a ref to track whether this is the first run.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!nameInputRef.current) return;
    const isTouch =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: none)").matches;
    if (!isTouch) {
      nameInputRef.current.focus({ preventScroll: true });
    }
  }, [tier]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key as string];
        return next;
      });
    }
  };

  const tierObj = memberships.find((m) => m.id === tier) ?? null;
  const tierName = tierObj?.name ?? tier;
  // MembershipBanner shows two pricing tracks (sedan vs. larger vehicles).
  // The form's finer-grained sizes collapse down to its "suv" axis for any
  // non-Sedan choice.
  const bannerVehicleSize: "sedan" | "suv" =
    form.vehicleSize === "Sedan" ? "sedan" : "suv";

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
        service: "Membership",
        vehicleSize: form.vehicleSize,
        tier,
      });
    } catch {
      setStatus("error");
    }
  };

  const submitLabel =
    status === "sending"
      ? membershipFormCopy.submitSending
      : status === "success"
        ? membershipFormCopy.submitSent
        : membershipFormCopy.submitIdle;

  const successHeadline = membershipBookingCopy.successHeadline.replace(
    "{tier}",
    tierName,
  );
  const successBody = membershipBookingCopy.successBody.replace(
    "{tier}",
    tierName,
  );

  if (status === "success") {
    return (
      <div
        className="ss-book__form ss-book__form--done"
        role="status"
        aria-live="polite"
      >
        <h3 className="ss-book__success-title">{successHeadline}</h3>
        <p className="ss-book__success-body">{successBody}</p>
      </div>
    );
  }

  return (
    <form className="ss-book__form" onSubmit={onSubmit} noValidate>
      {tierObj && (
        <div className="ss-book__member-banner">
          <MembershipBanner
            tier={tierObj}
            vehicleSize={bannerVehicleSize}
            onRemove={onSwitchToPicker}
          />
        </div>
      )}

      <div className="ss-field">
        <label htmlFor="bk-name">{bookingFieldLabels.name.label}</label>
        <input
          id="bk-name"
          ref={nameInputRef}
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
          <label htmlFor="bk-year">{bookingFieldLabels.vehicleYear.label}</label>
          <input
            id="bk-year"
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder={bookingFieldLabels.vehicleYear.placeholder}
            value={form.vehicleYear}
            onChange={(e) => update("vehicleYear", e.target.value)}
            aria-invalid={Boolean(errors.vehicleYear)}
            aria-describedby={errors.vehicleYear ? "bk-year-err" : undefined}
          />
          {errors.vehicleYear && (
            <p className="ss-field__err" id="bk-year-err" aria-live="polite">
              {errors.vehicleYear}
            </p>
          )}
        </div>
        <div className="ss-field">
          <label htmlFor="bk-make">{bookingFieldLabels.vehicleMake.label}</label>
          <input
            id="bk-make"
            type="text"
            placeholder={bookingFieldLabels.vehicleMake.placeholder}
            value={form.vehicleMake}
            onChange={(e) => update("vehicleMake", e.target.value)}
          />
        </div>
        <div className="ss-field">
          <label htmlFor="bk-model">{bookingFieldLabels.vehicleModel.label}</label>
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
          <strong>{membershipFormCopy.errorHeadline}</strong>
          <p>{membershipFormCopy.errorBody}</p>
        </div>
      )}

      <button
        type="submit"
        className="ss-btn ss-btn--solid ss-btn--lg ss-btn--block"
        disabled={status === "sending"}
      >
        {submitLabel}
      </button>
      <p className="ss-book__fine">{membershipFormCopy.finePrint}</p>
      <button
        type="button"
        className="ss-book__back"
        onClick={onSwitchToPicker}
      >
        {membershipFormCopy.backLinkLabel}
      </button>
    </form>
  );
}
