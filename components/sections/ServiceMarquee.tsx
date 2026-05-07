import { marqueeItems } from "@/components/content/site";

export function ServiceMarquee() {
  return (
    <div className="ss-marquee" aria-hidden="true">
      <div className="ss-marquee__track">
        {[...marqueeItems, ...marqueeItems].map((it, i) => (
          <span key={i} className="ss-marquee__item">
            <i className="ss-marquee__dot" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
