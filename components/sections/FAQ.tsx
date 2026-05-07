import { SectionHead } from "@/components/ui/SectionHead";
import { faqs } from "@/components/content/site";

export function FAQ() {
  return (
    <section className="ss-section ss-faq" id="faq">
      <SectionHead num="08" kicker="FAQ" title="Good to know." />
      <div className="ss-faq__list">
        {faqs.map((f) => (
          <details key={f.q} className="ss-faq__row">
            <summary>
              <span className="ss-faq__q">{f.q}</span>
              <span className="ss-faq__plus" aria-hidden="true">+</span>
            </summary>
            <div className="ss-faq__a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
