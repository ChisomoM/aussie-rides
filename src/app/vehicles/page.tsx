import React from "react";
import VehicleCard from "@/components/VehicleCard";

const sample = [
  {
    id: "1",
    make: "Toyota",
    model: "Hilux",
    year: 2020,
    price: 35990,
    mileage: 42000,
    fuel: "Diesel",
    transmission: "Manual",
    images: ["/next.svg"],
  },
  {
    id: "2",
    make: "Ford",
    model: "Ranger",
    year: 2019,
    price: 32990,
    mileage: 56000,
    fuel: "Diesel",
    transmission: "Automatic",
    images: ["/next.svg"],
  },
];

export default function VehiclesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Vehicles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sample.map((v) => (
          <VehicleCard key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
}
