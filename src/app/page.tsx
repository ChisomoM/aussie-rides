import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import UnmatchedExcellence from "@/components/UnmatchedExcellence";
import ComprehensiveSolutions from "@/components/ComprehensiveSolutions";
import Testimonials from "@/components/Testimonials";
import ConsultationBooking from "@/components/ConsultationBooking";
import ComingSoon from "./coming-soon/page";

export default function Home() {
  return (
    <div>
      <div id="home">
      <ComingSoon/>
      </div>
      {/* <div id="home">
        <Hero />
      </div>
      <Stats />
      <FeaturedVehicles />
      <div id="about">
        <UnmatchedExcellence />
        <ComprehensiveSolutions />
        <Testimonials />
      </div>
      <div id="contact">
        <ConsultationBooking />
      </div> */}
    </div>
  );
}
