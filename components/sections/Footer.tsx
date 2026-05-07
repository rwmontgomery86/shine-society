import Image from "next/image";
import { contact } from "@/components/content/site";

export function Footer() {
  return (
    <footer className="ss-foot">
      <div className="ss-foot__top">
        <div className="ss-foot__brand">
          <Image
            src="/shine-society-logo.png"
            alt="Shine Society"
            width={64}
            height={64}
          />
          <p>
            Mobile detailing built on convenience, quality, and attention to detail.
            Based in Senoia, GA. Serving Central Georgia.
          </p>
        </div>
        <div className="ss-foot__cols">
          <div>
            <h5>Services</h5>
            <ul>
              <li><a href="#services">Exterior detail</a></li>
              <li><a href="#services">Interior detail</a></li>
              <li><a href="#services">Inside &amp; out</a></li>
              <li><a href="#services">Ceramic coating</a></li>
              <li><a href="#services">Paint correction</a></li>
            </ul>
          </div>
          <div>
            <h5>Memberships</h5>
            <ul>
              <li><a href="#memberships">Essential</a></li>
              <li><a href="#memberships">Premium</a></li>
              <li><a href="#memberships">Elite</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={contact.phoneTel}>{contact.phone}</a></li>
              <li><a href="#book">Book online</a></li>
              <li>{contact.city}</li>
              <li>Mon–Fri · 8a–7p</li>
              <li>Sat · 8a–4p</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ss-foot__bottom">
        <span>© 2026 Shine Society. All rights reserved.</span>
        <span>Mobile service — we come to you.</span>
      </div>
    </footer>
  );
}
