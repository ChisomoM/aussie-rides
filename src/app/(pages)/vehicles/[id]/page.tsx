import React from "react";
import { getVehicle } from "@/lib/seed";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params?: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string> | undefined>;
};

export default async function VehicleDetail({ params }: Props) {
  const resolvedParams = params ? await params : undefined;
  const id = resolvedParams?.id ?? "";

  // Fetch vehicle from Firebase
  const vehicle = await getVehicle(id);

  // If vehicle not found, show 404
  if (!vehicle) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-xl text-emerald-600 font-semibold">
          {formatPrice(vehicle.price)}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={vehicle.images[0] || "/next.svg"}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          {vehicle.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {vehicle.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${vehicle.make} ${vehicle.model} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {vehicle.is_featured && (
              <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Featured
              </span>
            )}
            {vehicle.is_rental && (
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Available for Rent
              </span>
            )}
            {vehicle.is_sale && (
              <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                For Sale
              </span>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b border-gray-200 pb-2">
                <p className="text-sm text-gray-500">Year</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.year}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="text-lg font-semibold text-gray-900">
                  {vehicle.mileage === 0 ? 'New' : `${vehicle.mileage.toLocaleString()} km`}
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.fuel}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.transmission}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg">
              Book Test Drive
            </button>
            <button className="w-full border-2 border-emerald-600 text-emerald-600 py-4 px-6 rounded-lg hover:bg-emerald-50 transition-colors font-semibold text-lg">
              Contact Dealer
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
        <p className="text-gray-600 leading-relaxed">
          This {vehicle.year} {vehicle.make} {vehicle.model} is a premium vehicle featuring {vehicle.fuel} fuel type 
          with {vehicle.transmission} transmission. {vehicle.mileage === 0 ? 'Brand new condition.' : `With only ${vehicle.mileage.toLocaleString()} km on the odometer.`}
          {vehicle.is_rental && vehicle.is_sale && ' Available for both rent and purchase.'}
          {vehicle.is_rental && !vehicle.is_sale && ' Available for rent.'}
          {!vehicle.is_rental && vehicle.is_sale && ' Available for purchase.'}
        </p>
      </div>
    </div>
  );
}
