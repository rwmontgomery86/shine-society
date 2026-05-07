import { SectionHead } from "@/components/ui/SectionHead";
import { aboutCopy } from "@/components/content/site";

export function About() {
  return (
    <section className="ss-section ss-about" id="about">
      <SectionHead num="05" kicker="About" title="Built on convenience and care." />
      <div className="ss-about__grid">
        <div className="ss-about__copy">
          {aboutCopy.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="ss-about__why">
          <span className="ss-about__kicker">— What sets us apart</span>
          <ul className="ss-about__diff">
            {aboutCopy.differentiators.map((d) => (
              <li key={d.t}>
                <h4>{d.t}</h4>
                <p>{d.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
