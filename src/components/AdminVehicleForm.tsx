"use client";

import { useState } from 'react';
import { upsertVehicleAction } from '@/app/actions/seed';
import { auth } from '@/lib/firebase';
import type { Vehicle } from '@/lib/seed';

export default function AdminVehicleForm() {
  const [form, setForm] = useState<Vehicle>({
    id: '', make: '', model: '', year: 2024, price: 0, mileage: 0,
    fuel: 'Petrol', transmission: 'Automatic', images: ['/next.svg'],
    is_rental: false, is_sale: true, is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const update = <K extends keyof Vehicle>(k: K, v: Vehicle[K]) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await upsertVehicleAction(form, token);
      if (result.success) {
        setMessage('✅ Vehicle saved');
        setForm({ id: '', make: '', model: '', year: 2024, price: 0, mileage: 0, fuel: 'Petrol', transmission: 'Automatic', images: ['/next.svg'], is_rental: false, is_sale: true, is_featured: false });
      } else {
        setMessage('❌ ' + result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create / Edit Vehicle</h2>

      <label className="block text-sm">ID (unique)</label>
      <input value={form.id} onChange={(e) => update('id', e.target.value)} className="w-full rounded-md border p-2 mb-3" />

      <label className="block text-sm">Make</label>
      <input value={form.make} onChange={(e) => update('make', e.target.value)} className="w-full rounded-md border p-2 mb-3" />

      <label className="block text-sm">Model</label>
      <input value={form.model} onChange={(e) => update('model', e.target.value)} className="w-full rounded-md border p-2 mb-3" />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Year</label>
          <input type="number" value={form.year} onChange={(e) => update('year', Number(e.target.value))} className="w-full rounded-md border p-2 mb-3" />
        </div>
        <div>
          <label className="block text-sm">Price</label>
          <input type="number" value={form.price} onChange={(e) => update('price', Number(e.target.value))} className="w-full rounded-md border p-2 mb-3" />
        </div>
      </div>

      <label className="block text-sm">Mileage</label>
      <input type="number" value={form.mileage} onChange={(e) => update('mileage', Number(e.target.value))} className="w-full rounded-md border p-2 mb-3" />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Fuel</label>
          <input value={form.fuel} onChange={(e) => update('fuel', e.target.value)} className="w-full rounded-md border p-2 mb-3" />
        </div>
        <div>
          <label className="block text-sm">Transmission</label>
          <input value={form.transmission} onChange={(e) => update('transmission', e.target.value)} className="w-full rounded-md border p-2 mb-3" />
        </div>
      </div>

      <label className="block text-sm">Images (comma-separated paths)</label>
      <input value={form.images.join(',')} onChange={(e) => update('images', e.target.value.split(',').map(s => s.trim()))} className="w-full rounded-md border p-2 mb-3" />

      <div className="flex gap-2 mb-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_rental} onChange={(e) => update('is_rental', e.target.checked)} /> Is Rental</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_sale} onChange={(e) => update('is_sale', e.target.checked)} /> Is Sale</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_featured} onChange={(e) => update('is_featured', e.target.checked)} /> Featured</label>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-2 rounded-lg">{loading ? 'Saving...' : 'Save Vehicle'}</button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </form>
  )
}
