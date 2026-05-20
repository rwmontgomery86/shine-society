"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { memberships, type Tier } from "@/components/content/site";
import { HeroRibbon } from "@/components/preview/banners/HeroRibbon";
import { MembershipBanner } from "@/components/sections/MembershipBanner";
import { OnboardingPanel } from "@/components/preview/banners/OnboardingPanel";

type VariantId = "A" | "B" | "C";
type VS = "sedan" | "suv";

type BannerProps = { tier: Tier; vehicleSize: VS };

const VARIANTS: Array<{
  id: VariantId;
  label: string;
  desc: string;
  Component: ComponentType<BannerProps>;
}> = [
  {
    id: "A",
    label: "A · Hero ribbon",
    desc: "Full-bleed accent. Punchy, minimum content.",
    Component: HeroRibbon,
  },
  {
    id: "B",
    label: "B · Receipt card",
    desc: "Structured. Tier + price + 3 perks. (Shipped — used in booking form.)",
    Component: MembershipBanner,
  },
  {
    id: "C",
    label: "C · Onboarding panel",
    desc: "Three-step what-happens-next walkthrough.",
    Component: OnboardingPanel,
  },
];

function MockForm({ children }: { children: ReactNode }) {
  return (
    <div className="ss-bv-mockform" aria-hidden="true">
      {children}
      <div className="ss-bv-mockform__row">
        <div className="ss-bv-mockform__field">
          <span className="ss-bv-mockform__label">Your name</span>
          <div className="ss-bv-mockform__input" />
        </div>
        <div className="ss-bv-mockform__field">
          <span className="ss-bv-mockform__label">Phone</span>
          <div className="ss-bv-mockform__input" />
        </div>
      </div>
      <div className="ss-bv-mockform__field">
        <span className="ss-bv-mockform__label">Email</span>
        <div className="ss-bv-mockform__input" />
      </div>
      <div className="ss-bv-mockform__btn">Request a slot →</div>
    </div>
  );
}

export default function MembershipBannerPreviewPage() {
  const [variantId, setVariantId] = useState<VariantId>("A");
  const [tierIdx, setTierIdx] = useState(1); // Premium default
  const [vs, setVs] = useState<VS>("sedan");
  const [compareAll, setCompareAll] = useState(false);

  const tier = memberships[tierIdx];
  const FocusedVariant = VARIANTS.find((v) => v.id === variantId)!.Component;

  return (
    <main className="ss-bv-page">
      <header className="ss-bv-header">
        <h1>Membership banner · variant preview</h1>
        <p>
          Three macro directions for the in-form selection notice. Pick a tier
          and vehicle size, then click through variants — or toggle{" "}
          <strong>Compare all</strong> to stack them.
        </p>
      </header>

      <div className="ss-bv-controls">
        <div className="ss-bv-ctrl">
          <span className="ss-bv-ctrl__label">Tier</span>
          <div className="ss-bv-seg">
            {memberships.map((m, i) => (
              <button
                type="button"
                key={m.id}
                className={i === tierIdx ? "is-on" : ""}
                onClick={() => setTierIdx(i)}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
        <div className="ss-bv-ctrl">
          <span className="ss-bv-ctrl__label">Vehicle</span>
          <div className="ss-bv-seg">
            <button
              type="button"
              className={vs === "sedan" ? "is-on" : ""}
              onClick={() => setVs("sedan")}
            >
              Sedan
            </button>
            <button
              type="button"
              className={vs === "suv" ? "is-on" : ""}
              onClick={() => setVs("suv")}
            >
              Truck / SUV
            </button>
          </div>
        </div>
        <div className="ss-bv-ctrl">
          <span className="ss-bv-ctrl__label">Mode</span>
          <div className="ss-bv-seg">
            <button
              type="button"
              className={!compareAll ? "is-on" : ""}
              onClick={() => setCompareAll(false)}
            >
              Focus
            </button>
            <button
              type="button"
              className={compareAll ? "is-on" : ""}
              onClick={() => setCompareAll(true)}
            >
              Compare all
            </button>
          </div>
        </div>
      </div>

      {!compareAll && (
        <>
          <div className="ss-bv-tabs" role="tablist" aria-label="Banner variant">
            {VARIANTS.map((v) => (
              <button
                type="button"
                key={v.id}
                role="tab"
                aria-selected={variantId === v.id}
                className={variantId === v.id ? "is-on" : ""}
                onClick={() => setVariantId(v.id)}
              >
                <span className="ss-bv-tabs__label">{v.label}</span>
                <span className="ss-bv-tabs__desc">{v.desc}</span>
              </button>
            ))}
          </div>
          <section className="ss-bv-stage" aria-label="Variant preview">
            <MockForm>
              <FocusedVariant tier={tier} vehicleSize={vs} />
            </MockForm>
          </section>
        </>
      )}

      {compareAll && (
        <section className="ss-bv-compare" aria-label="All variants stacked">
          {VARIANTS.map((v) => {
            const V = v.Component;
            return (
              <div key={v.id} className="ss-bv-compare__row">
                <header className="ss-bv-compare__head">
                  <h2>{v.label}</h2>
                  <p>{v.desc}</p>
                </header>
                <MockForm>
                  <V tier={tier} vehicleSize={vs} />
                </MockForm>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
