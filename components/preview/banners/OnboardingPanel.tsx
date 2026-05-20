import type { Tier } from "@/components/content/site";

type Props = { tier: Tier; vehicleSize: "sedan" | "suv" };

const STEPS: { n: string; t: string; d: string }[] = [
  { n: "1", t: "We text", d: "to confirm" },
  { n: "2", t: "First", d: "detail" },
  { n: "3", t: "Card on file", d: "in Urable" },
];

/**
 * Variant C — Onboarding panel.
 *
 * Walks the customer through the lead-not-payment model via three numbered
 * step cards. Largest of the three banners; trades vertical space for
 * full clarity on what happens after submitting.
 */
export function OnboardingPanel({ tier }: Props) {
  return (
    <div className="ss-bv-onboard">
      <h3 className="ss-bv-onboard__title">
        <span className="ss-bv-onboard__mark" aria-hidden="true">
          ✦
        </span>
        You&rsquo;re starting {tier.name}
      </h3>
      <ol className="ss-bv-onboard__steps">
        {STEPS.map((s) => (
          <li key={s.n}>
            <span className="ss-bv-onboard__num">{s.n}</span>
            <span className="ss-bv-onboard__step-t">{s.t}</span>
            <span className="ss-bv-onboard__step-d">{s.d}</span>
          </li>
        ))}
      </ol>
      <p className="ss-bv-onboard__fine">
        No payment today. Auto-pay rolls from visit #2 onward.
      </p>
    </div>
  );
}
