import VehicleCard from "@/components/VehicleCard";
import { getVehicles } from "@/lib/seed";
import Link from "next/link";

export default async function FeaturedVehicles() {
  // Fetch vehicles from Firebase and filter for featured ones
  const allVehicles = await getVehicles();
  const featured = allVehicles.filter((vehicle) => vehicle.is_featured);
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium luxury vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/vehicles"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
}
