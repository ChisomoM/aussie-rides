import VehicleCard from "@/components/VehicleCard";

const featured = [
  // GWM entries (reusing the hero image path)
  {
    id: "1",
    make: "GWM",
    model: "P-Series",
    year: 2024,
    price: 45990,
    mileage: 1200,
    fuel: "Diesel",
    transmission: "Automatic",
    images: ["/images/hero/gwm-p-series-white-exterior-front.jpeg"],
    featured: true,
    features: ["4WD", "Tow Package", "Leather Interior", "Premium Audio"],
  },
  {
    id: "3",
    make: "GWM",
    model: "Tank 500",
    year: 2023,
    price: 52000,
    mileage: 8000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["/images/hero/gwm-p-series-white-exterior-front.jpeg"],
    featured: true,
    features: ["4WD", "Leather Interior", "Sunroof", "Premium Audio"],
  },
  {
    id: "4",
    make: "GWM",
    model: "Ute Pro",
    year: 2024,
    price: 47990,
    mileage: 500,
    fuel: "Diesel",
    transmission: "Automatic",
    images: ["/images/hero/gwm-p-series-white-exterior-front.jpeg"],
    featured: true,
    features: ["4WD", "Tow Package", "Alloy Wheels", "Reverse Camera"],
  },

  // Mazda CX-5 entries (use provided external image)
  {
    id: "2",
    make: "Mazda",
    model: "CX-5",
    year: 2022,
    price: 38990,
    mileage: 22000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["https://www.thelenmazda.com/blogs/1329/wp-content/uploads/2024/10/2025-MAZDA-CX-5-manufacturer.png"],
    featured: true,
    features: ["AWD", "Navigation", "Heated Seats", "Sunroof"],
  },
  {
    id: "5",
    make: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 40990,
    mileage: 15000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["https://www.thelenmazda.com/blogs/1329/wp-content/uploads/2024/10/2025-MAZDA-CX-5-manufacturer.png"],
    featured: true,
    features: ["AWD", "Bose Audio", "Lane Assist", "Adaptive Cruise"],
  },
  {
    id: "6",
    make: "Mazda",
    model: "CX-5",
    year: 2021,
    price: 34990,
    mileage: 30000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["https://www.thelenmazda.com/blogs/1329/wp-content/uploads/2024/10/2025-MAZDA-CX-5-manufacturer.png"],
    featured: true,
    features: ["AWD", "Rear Cross Traffic Alert", "Blind Spot Monitor", "Keyless Entry"],
  },
];

export default function FeaturedVehicles() {
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
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
            View All Vehicles
          </button>
        </div>
      </div>
    </section>
  );
}
