import React from "react";
import VehicleCard from "@/components/VehicleCard";
import { getVehicles } from "@/lib/seed";
// import Link from "next/link";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div className="grid gap-6 max-w-6xl items-center justify-center mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Vehicles</h1>
        {/* <Link
          href="/seed"
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
        >
          Manage Database
        </Link> */}
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No vehicles found.
          </p>
          {/* <Link
            href="/seed"
            className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
          >
            Go to Seed Page
          </Link> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} {...v} />
          ))}
        </div>
      )}
    </div>
  );
}
