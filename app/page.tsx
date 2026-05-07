import { ShineNav } from "@/components/nav/ShineNav";
import { FloatingCTA } from "@/components/nav/FloatingCTA";
import { Hero } from "@/components/sections/Hero";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Memberships } from "@/components/sections/Memberships";
import { FullBleedBreak } from "@/components/sections/FullBleedBreak";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <ShineNav />
      <main>
        <Hero />
        <ServiceMarquee />
        <div className="ss-tone ss-tone--cream">
          <Services />
        </div>
        <BeforeAfter />
        <Memberships />
        <FullBleedBreak />
        <div className="ss-tone ss-tone--cream">
          <Process />
        </div>
        <div className="ss-tone ss-tone--cream">
          <About />
        </div>
        <ServiceArea />
        <Testimonials />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
