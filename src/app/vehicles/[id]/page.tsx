import React from "react";

export default function VehicleDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Vehicle {params.id}</h1>
  <p className="mt-4">Detail page stub. We&apos;ll implement gallery, map, and enquiry form next.</p>
    </div>
  );
}
