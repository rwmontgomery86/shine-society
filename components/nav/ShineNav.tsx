"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { contact } from "@/components/content/site";

export function ShineNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"ss-nav " + (scrolled ? "is-scrolled" : "")}>
      <a className="ss-nav__brand" href="#top">
        <Image
          src="/shine-society-logo.png"
          alt="Shine Society Detailing"
          width={44}
          height={44}
          priority
        />
        <span className="ss-nav__wordmark">
          <em>Shine</em> Society Detailing
          <small>Mobile Detailing · Senoia, GA</small>
        </span>
      </a>
      <nav className="ss-nav__links" aria-label="Primary">
        <a href="#services">Services</a>
        <a href="#memberships">Memberships</a>
        <a href="#area">Service Area</a>
        <a href="#about">About</a>
      </nav>
      <a className="ss-btn ss-btn--ghost" href={contact.phoneTel} aria-label={`Call ${contact.phone}`}>
        <span className="dot" />
        {contact.phone}
      </a>
      <a className="ss-btn ss-btn--solid" href="#book">
        Book now →
      </a>
    </header>
  );
}
