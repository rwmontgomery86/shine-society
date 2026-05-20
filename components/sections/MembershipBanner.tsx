import type { Tier } from "@/components/content/site";

type Props = {
  tier: Tier;
  /**
   * Pricing axis used by the banner: "sedan" picks the sedan column, "suv"
   * picks the larger-vehicle column. Callers that have a fine-grained vehicle
   * size (Midsize SUV / Truck / 3-row) should map down to "suv".
   */
  vehicleSize: "sedan" | "suv";
  /**
   * Optional dismiss handler. When provided, a "Remove" control is rendered
   * in the header strip; clicking it should clear whatever state the caller
   * uses to drive `tier` (URL hash, form field, etc).
   */
  onRemove?: () => void;
};

/**
 * Membership selection banner shown at the top of the booking form when a
 * tier was preselected. Reads like an order confirmation: header strip,
 * two-column header (tier + size on the left; price + kicker on the right),
 * three perks pulled from the tier's bullets, and a fine-print disclaimer
 * about no-payment-today.
 *
 * The CSS classes live under the `ss-bv-receipt-*` namespace (originally
 * from the variant preview at `/preview/membership-banner`); they're kept
 * as-is so the preview page continues to work.
 */
export function MembershipBanner({ tier, vehicleSize, onRemove }: Props) {
  const price = vehicleSize === "sedan" ? tier.sedan : tier.suv;
  const sizeLabel = vehicleSize === "sedan" ? "Sedan" : "Truck / SUV";
  const perks = tier.bullets.slice(0, 3);
  return (
    <div className="ss-bv-receipt">
      <div className="ss-bv-receipt__strip">
        <span>Your selection</span>
        {onRemove && (
          <button
            type="button"
            className="ss-bv-receipt__remove"
            onClick={onRemove}
            aria-label={`Remove ${tier.name} membership selection`}
          >
            Remove
            <span aria-hidden="true" className="ss-bv-receipt__remove-x">
              ×
            </span>
          </button>
        )}
      </div>
      <div className="ss-bv-receipt__head">
        <div className="ss-bv-receipt__head-l">
          <h3 className="ss-bv-receipt__name">{tier.name} membership</h3>
          <p className="ss-bv-receipt__size">{sizeLabel}</p>
        </div>
        <div className="ss-bv-receipt__head-r">
          <span className="ss-bv-receipt__price">${price} / mo</span>
          <span className="ss-bv-receipt__kicker">{tier.kicker}</span>
        </div>
      </div>
      <ul className="ss-bv-receipt__perks">
        {perks.map((p) => (
          <li key={p}>
            <span aria-hidden="true">✓</span> {p}
          </li>
        ))}
      </ul>
      <div className="ss-bv-receipt__divider" aria-hidden="true" />
      <p className="ss-bv-receipt__fine">
        No payment today — card on file at your first detail.
      </p>
    </div>
  );
}
