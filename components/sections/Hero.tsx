import { heroCopy } from "@/components/content/site";

export function Hero() {
  return (
    <section className="ss-hero ss-hero--type" id="top">
      <div className="ss-hero-type__bg" aria-hidden="true">
        <div className="ss-hero-type__logo" />
        <div className="ss-hero-type__halo" />
        <div className="ss-hero__grain" />
      </div>

      <div className="ss-hero-type__inner">
        <div className="ss-hero__eyebrow">
          <span className="pulse" aria-hidden="true" /> {heroCopy.eyebrow}
        </div>

        <h1 className="ss-hero-type__headline">
          <span className="line line-0">Detail</span>
          <span className="line line-1">like it&rsquo;s</span>
          <span className="line line-2">our own.</span>
        </h1>

        <div className="ss-hero-type__meta">
          <div className="ss-hero-type__sub">
            <p>
              Restored, protected, elevated — without leaving your driveway.
              Ceramic coating, paint correction, and full-service detailing
              across <em>Senoia, Newnan, Peachtree City, Griffin &amp; Fayetteville</em>.
            </p>
            <div className="ss-hero__cta">
              <a className="ss-btn ss-btn--solid ss-btn--lg" href="#book">
                Book a detail
                <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a className="ss-btn ss-btn--ghost ss-btn--lg" href="#area">
                See coverage
              </a>
            </div>
          </div>

          <div className="ss-hero-type__stats" aria-hidden="true">
            {heroCopy.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.strong}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ss-hero-type__corner" aria-hidden="true">
          <span className="num">01</span>
          <span className="lbl">Arrive</span>
        </div>
      </div>
    </section>
  );
}
