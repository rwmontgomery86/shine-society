import { CheckIcon } from "@/components/ui/CheckIcon";
import { bookingOptions, bookingPickerCopy } from "@/components/content/site";

export function BookingPicker() {
  return (
    <div className="ss-pick" aria-label="Choose a service to book">
      {bookingOptions.map((opt) => (
        <article key={opt.id} className="ss-pick__card">
          <header className="ss-pick__head">
            <span className="ss-pick__num">{opt.n}</span>
            <div className="ss-pick__head-text">
              <h3 className="ss-pick__title">{opt.title}</h3>
              <span className="ss-pick__price">{opt.priceFrom}</span>
            </div>
          </header>
          <p className="ss-pick__blurb">{opt.blurb}</p>
          <ul className="ss-pick__list">
            {opt.included.map((line) => (
              <li key={line}>
                <CheckIcon />
                {line}
              </li>
            ))}
          </ul>
          <a
            className="ss-btn ss-btn--solid ss-btn--block"
            href={opt.urableUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {bookingPickerCopy.ctaLabel}
          </a>
        </article>
      ))}
    </div>
  );
}
