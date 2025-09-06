import VehicleCard from "@/components/VehicleCard";

const featured = [
  {
    id: "1",
    make: "GWM",
    model: "Tank 500",
    year: 2023,
    price: 45000,
    mileage: 0,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800"],
    featured: true,
    features: ["4WD", "Leather Interior", "Sunroof", "Premium Audio"]
  },
  {
    id: "2", 
    make: "BMW",
    model: "X5", 
    year: 2022,
    price: 52000,
    mileage: 15000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800"],
    featured: true,
    features: ["AWD", "Navigation", "Heated Seats", "Panoramic Roof"]
  },
  {
    id: "3",
    make: "Mercedes-Benz", 
    model: "C-Class",
    year: 2023,
    price: 38000,
    mileage: 8000,
    fuel: "Petrol",
    transmission: "Automatic", 
    images: ["https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800"],
    featured: true,
    features: ["AMG Package", "Premium Sound", "LED Lights", "Sport Mode"]
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
