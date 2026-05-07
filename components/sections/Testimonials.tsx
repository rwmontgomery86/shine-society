import { SectionHead } from "@/components/ui/SectionHead";
import { testimonials } from "@/components/content/site";

export function Testimonials() {
  return (
    <section className="ss-section" id="testimonials">
      <SectionHead num="07" kicker="The Society" title="What clients are saying." />
      <div className="ss-quotes">
        {testimonials.map((qu, i) => (
          <figure key={i} className="ss-quote">
            <span className="ss-quote__mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{qu.q}</blockquote>
            <figcaption>
              <strong>{qu.n}</strong>
              <span>{qu.c}</span>
            </figcaption>
            <span className="ss-quote__stars" aria-label="Five stars">★★★★★</span>
          </figure>
        ))}
      </div>
    </section>
  );
}
