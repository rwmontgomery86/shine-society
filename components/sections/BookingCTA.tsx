"use client";

import { useEffect, useState } from "react";
import {
  bookingPickerCopy,
  contact,
  membershipFormCopy,
} from "@/components/content/site";
import { BookingPicker } from "@/components/sections/BookingPicker";
import { MembershipBookingForm } from "@/components/sections/MembershipBookingForm";
import type { Tier } from "@/lib/validate";

const TIERS: ReadonlySet<Tier> = new Set(["essential", "premium", "elite"]);

function parseTierFromHash(hash: string): Tier | null {
  if (!hash) return null;
  const q = hash.indexOf("?");
  if (q < 0) return null;
  const params = new URLSearchParams(hash.slice(q + 1));
  const t = params.get("tier");
  return t && TIERS.has(t as Tier) ? (t as Tier) : null;
}

export function BookingCTA() {
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    const read = () => setTier(parseTierFromHash(window.location.hash));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const switchToPicker = () => {
    // Drop the ?tier=… from the URL and notify other listeners (e.g. the
    // Memberships section deselects its highlighted tile). The hashchange
    // handler above will set tier to null and re-render the picker.
    history.replaceState(null, "", "#book");
    window.dispatchEvent(new Event("hashchange"));
  };

  const inMembershipMode = tier !== null;
  const kicker = inMembershipMode
    ? membershipFormCopy.kicker
    : bookingPickerCopy.kicker;
  const leadParagraph = inMembershipMode
    ? membershipFormCopy.leadParagraph
    : bookingPickerCopy.leadParagraph;

  return (
    <section className="ss-book" id="book">
      <div className="ss-book__bg" aria-hidden="true">
        <div className="ss-book__halo" />
      </div>
      <div className="ss-book__inner">
        <div className="ss-book__copy">
          <span className="ss-book__kicker">{kicker}</span>
          <h2 className="ss-book__title">
            Park it. <em>We&rsquo;ll handle the rest.</em>
          </h2>
          <p>{leadParagraph}</p>
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
          {!inMembershipMode && (
            <p className="ss-book__picker-fine">{bookingPickerCopy.fine}</p>
          )}
        </div>

        {inMembershipMode ? (
          <MembershipBookingForm
            tier={tier}
            onSwitchToPicker={switchToPicker}
          />
        ) : (
          <BookingPicker />
        )}
      </div>
    </section>
  );
}
