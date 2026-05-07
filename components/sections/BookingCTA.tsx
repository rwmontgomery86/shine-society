"use client";

import { useState } from "react";
import {
  contact,
  vehicleSizes,
  serviceOptions,
  dayOptions,
} from "@/components/content/site";

type FormState = {
  vehicle: (typeof vehicleSizes)[number];
  service: (typeof serviceOptions)[number];
  day: (typeof dayOptions)[number];
};

export function BookingCTA() {
  const [form, setForm] = useState<FormState>({
    vehicle: "Sedan",
    service: "Inside & Out",
    day: "This week",
  });
  const [sent, setSent] = useState(false);

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
            Tell us a little about your ride. We&rsquo;ll text you back with a slot
            — usually within an hour during business hours. Lead time is {contact.leadTime.toLowerCase()}.
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

        <form
          className="ss-book__form"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire to CMS / serverless endpoint. For now just flip success state.
            setSent(true);
          }}
        >
          <div className="ss-field">
            <label htmlFor="bk-name">Your name</label>
            <input id="bk-name" type="text" placeholder="First & last" autoComplete="name" />
          </div>
          <div className="ss-field">
            <label htmlFor="bk-phone">Phone</label>
            <input id="bk-phone" type="tel" placeholder="(404) 555-0188" autoComplete="tel" />
          </div>
          <div className="ss-field ss-field--wide">
            <label>Vehicle size</label>
            <div className="ss-seg" role="radiogroup" aria-label="Vehicle size">
              {vehicleSizes.map((o) => (
                <button
                  type="button"
                  key={o}
                  role="radio"
                  aria-checked={form.vehicle === o}
                  className={form.vehicle === o ? "is-on" : ""}
                  onClick={() => setForm({ ...form, vehicle: o })}
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
                  onClick={() => setForm({ ...form, service: o })}
                >
                  {o}
                </button>
              ))}
            </div>
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
                  onClick={() => setForm({ ...form, day: o })}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div className="ss-field ss-field--wide">
            <label htmlFor="bk-notes">Anything else?</label>
            <textarea
              id="bk-notes"
              placeholder="Pets? Pet hair? Tar? Headlights cloudy? Tell us what we&rsquo;re walking into."
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="ss-btn ss-btn--solid ss-btn--lg ss-btn--block"
          >
            {sent ? "✓ Request received — we'll text you" : "Request a slot →"}
          </button>
          <p className="ss-book__fine">
            By submitting, you agree to receive a text reply at the number above.
            24-hour notice for reschedules; same-day cancellations may forfeit the
            10% deposit on ceramic / paint correction work.
          </p>
        </form>
      </div>
    </section>
  );
}
