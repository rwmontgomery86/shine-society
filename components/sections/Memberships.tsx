"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { memberships, membershipRules } from "@/components/content/site";

type V = "sedan" | "suv";

function parseTierFromHash(hash: string): string | null {
  if (!hash) return null;
  const q = hash.indexOf("?");
  if (q < 0) return null;
  return new URLSearchParams(hash.slice(q + 1)).get("tier");
}

export function Memberships() {
  const [v, setV] = useState<V>("sedan");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setSelectedTier(parseTierFromHash(window.location.hash));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return (
    <section className="ss-section" id="memberships">
      <SectionHead num="03" kicker="Membership" title="Keep it shining. Monthly." />

      <div className="ss-mem__toolbar">
        <p>Designed for Senoia, GA customers. One visit per month, every month.</p>
        <div className="ss-toggle" role="tablist" aria-label="Vehicle size">
          <button
            type="button"
            role="tab"
            aria-selected={v === "sedan"}
            className={v === "sedan" ? "is-on" : ""}
            onClick={() => setV("sedan")}
          >
            Sedan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={v === "suv"}
            className={v === "suv" ? "is-on" : ""}
            onClick={() => setV("suv")}
          >
            Truck / SUV
          </button>
          <span className="ss-toggle__pill" data-pos={v} aria-hidden="true" />
        </div>
      </div>

      <div className="ss-mem">
        {memberships.map((t) => (
          <article
            key={t.id}
            className={
              "ss-tier" +
              (t.featured ? " is-featured" : "") +
              (selectedTier === t.id ? " is-selected" : "")
            }
            aria-current={selectedTier === t.id ? "true" : undefined}
          >
            {t.featured && <span className="ss-tier__ribbon">Best Seller</span>}
            <div className="ss-tier__head">
              <span className="ss-tier__kicker">{t.kicker}</span>
              <h3 className="ss-tier__name">{t.name}</h3>
            </div>
            <div className="ss-tier__price">
              <span className="ss-tier__amt">
                <span className="curr">$</span>
                <span className="num">{v === "sedan" ? t.sedan : t.suv}</span>
              </span>
              <span className="ss-tier__per">
                / month
                <br />
                <em>{v === "sedan" ? "Sedan" : "Truck / SUV"}</em>
              </span>
            </div>
            <ul className="ss-tier__list">
              {t.bullets.map((b, i) => (
                <li key={i}>
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href={`#book?tier=${t.id}`}
              className={
                "ss-btn " +
                (t.featured ? "ss-btn--solid" : "ss-btn--ghost") +
                " ss-btn--block"
              }
              onClick={(e) => {
                // Override the native fragment jump (the `book?tier=…` id
                // doesn't exist) with a controlled flow: update the URL via
                // pushState, dispatch hashchange so BookingCTA + tile state
                // both react, then smooth-scroll to the booking section.
                e.preventDefault();
                history.pushState(null, "", `#book?tier=${t.id}`);
                window.dispatchEvent(new Event("hashchange"));
                document.getElementById("book")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Start {t.name}
            </a>
          </article>
        ))}
      </div>

      <ul className="ss-mem__rules">
        {membershipRules.map((r) => (
          <li key={r.text}>
            <span aria-hidden="true">{r.sym}</span> {r.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
