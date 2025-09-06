import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import UnmatchedExcellence from "@/components/UnmatchedExcellence";
import ComprehensiveSolutions from "@/components/ComprehensiveSolutions";
import Testimonials from "@/components/Testimonials";
import ConsultationBooking from "@/components/ConsultationBooking";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedVehicles />
      <UnmatchedExcellence />
      <ComprehensiveSolutions />
      <Testimonials />
      <ConsultationBooking />
    </div>
  );
}
