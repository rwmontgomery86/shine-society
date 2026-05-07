"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { services } from "@/components/content/site";

export function Services() {
  // Default to "Inside & Out" (index 2) so the featured service shows on first paint.
  const [active, setActive] = useState(2);
  const cur = services[active];

  return (
    <section className="ss-section" id="services">
      <SectionHead num="02" kicker="The Menu" title="Services that earn the shine." />

      <div className="ss-svc-ed">
        <ul className="ss-svc-ed__nav" role="tablist" aria-label="Service">
          {services.map((s, i) => (
            <li
              key={s.n}
              role="tab"
              tabIndex={0}
              aria-selected={i === active}
              className={i === active ? "is-on" : ""}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <span className="ss-svc-ed__num">{s.n}</span>
              <span className="ss-svc-ed__name">{s.title}</span>
              <span className="ss-svc-ed__price">{s.price}</span>
            </li>
          ))}
        </ul>

        <article className="ss-svc-ed__panel">
          <div className="ss-svc-ed__visual">
            <div className="ss-svc-ed__photo" data-svc={cur.n}>
              <Image
                key={cur.n}
                src={cur.image}
                alt={cur.title}
                fill
                sizes="(max-width: 720px) 100vw, 35vw"
                style={{ objectFit: "cover" }}
                priority={cur.featured}
              />
              <div className="ss-svc-ed__scrim" aria-hidden="true" />
            </div>
          </div>

          <div className="ss-svc-ed__body">
            {cur.featured && <span className="ss-svc-ed__tag">Most booked</span>}
            <h3 className="ss-svc-ed__title">{cur.title}</h3>
            <p className="ss-svc-ed__lead">{cur.lead}</p>

            <ul className="ss-svc-ed__list">
              {cur.bullets.map((b, i) => (
                <li key={i}>
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>

            {cur.note && (
              <p className="ss-row__note" role="note">
                {cur.note}
              </p>
            )}

            <footer className="ss-svc-ed__foot">
              <span className="ss-svc-ed__pricelg">{cur.price}</span>
              <a className="ss-btn ss-btn--solid" href="#book">
                Book {cur.title.toLowerCase()} →
              </a>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
