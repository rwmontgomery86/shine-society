import type { Tier } from "@/components/content/site";

type Props = { tier: Tier; vehicleSize: "sedan" | "suv" };

/**
 * Variant A — Hero ribbon.
 *
 * Full-bleed accent strip. Wins on scale + color; minimum content.
 * Two-column layout: tier display name + warm line on the left, price chip
 * and "Selected" pill on the right.
 */
export function HeroRibbon({ tier, vehicleSize }: Props) {
  const price = vehicleSize === "sedan" ? tier.sedan : tier.suv;
  const sizeLabel = vehicleSize === "sedan" ? "Sedan" : "Truck / SUV";
  return (
    <div className="ss-bv-hero">
      <div className="ss-bv-hero__left">
        <span className="ss-bv-hero__dot" aria-hidden="true" />
        <h3 className="ss-bv-hero__name">{tier.name.toUpperCase()}</h3>
        <p className="ss-bv-hero__sub">Welcome — let&rsquo;s set it up.</p>
      </div>
      <div className="ss-bv-hero__right">
        <span className="ss-bv-hero__price">
          ${price}/mo · {sizeLabel}
        </span>
        <span className="ss-bv-hero__pill">✓ Selected</span>
      </div>
    </div>
  );
}
