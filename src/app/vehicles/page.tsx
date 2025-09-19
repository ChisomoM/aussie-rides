import React from "react";
import VehicleCard from "@/components/VehicleCard";

const sample = [
  {
    id: "1",
    make: "GWM",
    model: "P-Series",
    year: 2024,
    price: 45990,
    mileage: 1200,
    fuel: "Diesel",
    transmission: "Automatic",
    images: ["/gwm-p-series-white-exterior-front.jpeg"],
  },
  {
    id: "2",
    make: "Mazda",
    model: "CX-5",
    year: 2022,
    price: 38990,
    mileage: 22000,
    fuel: "Petrol",
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
