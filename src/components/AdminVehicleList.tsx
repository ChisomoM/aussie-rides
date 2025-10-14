"use client";

import { useState } from 'react';
import VehicleCard from './VehicleCard';
import { deleteVehicleAction } from '@/app/actions/seed';
import { auth } from '@/lib/firebase';
import type { Vehicle } from '@/lib/seed';

export default function AdminVehicleList({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vehicle?')) return;
    setLoadingId(id);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await deleteVehicleAction(id, token);
      if (res.success) setVehicles(prev => prev.filter(v => v.id !== id));
      else alert('Delete failed: ' + res.message);
    } finally { setLoadingId(null); }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="relative">
            <VehicleCard {...v} />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-white/90 px-3 py-1 rounded" onClick={() => navigator.clipboard.writeText(v.id)}>Copy ID</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(v.id)} disabled={loadingId === v.id}>{loadingId === v.id ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
