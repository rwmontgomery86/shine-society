import { SectionHead } from "@/components/ui/SectionHead";
import { processSteps } from "@/components/content/site";

export function Process() {
  return (
    <section className="ss-section" id="process">
      <SectionHead num="04" kicker="How it works" title="Four steps. No driveway exits." />
      <div className="ss-process">
        {processSteps.map((s, i) => (
          <div key={s.n} className="ss-step">
            <span className="ss-step__num">{s.n}</span>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
            {i < processSteps.length - 1 && <span className="ss-step__line" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
