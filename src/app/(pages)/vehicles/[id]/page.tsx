import React from "react";

type Props = {
  params?: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string> | undefined>;
};

export default async function VehicleDetail({ params }: Props) {
  const resolvedParams = params ? await params : undefined;
  const id = resolvedParams?.id ?? "";

  return (
    <div>
      <h1 className="text-2xl font-semibold">Vehicle {id}</h1>
      <p className="mt-4">Detail page stub. We&apos;ll implement gallery, map, and enquiry form next.</p>
    </div>
  );
}
