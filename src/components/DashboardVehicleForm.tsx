"use client";

import { useState, useEffect } from 'react';
import { Vehicle } from '@/lib/seed';
import { upsertVehicleAction } from '@/app/actions/seed';
import { auth } from '@/lib/firebase';

export default function DashboardVehicleForm({ 
  vehicle, 
  onSuccess, 
  onCancel 
}: { 
  vehicle?: Vehicle | null; 
  onSuccess: (vehicle: Vehicle) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<Vehicle>(
    vehicle || {
      id: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuel: 'Petrol',
      transmission: 'Automatic',
      images: [''],
      is_rental: false,
      is_sale: true,
      is_featured: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vehicle) {
      setForm(vehicle);
    }
  }, [vehicle]);

  const update = <K extends keyof Vehicle>(k: K, v: Vehicle[K]) => {
    setForm(prev => ({ ...prev, [k]: v }));
    // Clear error for this field
    if (errors[k]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[k];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.id.trim()) newErrors.id = 'ID is required';
    if (!form.make.trim()) newErrors.make = 'Make is required';
    if (!form.model.trim()) newErrors.model = 'Model is required';
    if (form.year < 1900 || form.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }
    if (form.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (form.mileage < 0) newErrors.mileage = 'Mileage cannot be negative';
    if (!form.fuel.trim()) newErrors.fuel = 'Fuel type is required';
    if (!form.transmission.trim()) newErrors.transmission = 'Transmission is required';
    if (!form.images.length || !form.images[0].trim()) {
      newErrors.images = 'At least one image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setMessage('');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await upsertVehicleAction(form, token);
      
      if (result.success) {
        setMessage('✅ Vehicle saved successfully');
        onSuccess(form);
        
        // Reset form if creating new vehicle
        if (!vehicle) {
          setForm({
            id: '',
            make: '',
            model: '',
            year: new Date().getFullYear(),
            price: 0,
            mileage: 0,
            fuel: 'Petrol',
            transmission: 'Automatic',
            images: [''],
            is_rental: false,
            is_sale: true,
            is_featured: false,
          });
        }
      } else {
        setMessage('❌ ' + result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h2>
        <p className="text-sm text-gray-500">
          Fill in the details below to {vehicle ? 'update' : 'add'} a vehicle to your inventory
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ID */}
        <div className="md:col-span-2">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle ID <span className="text-rose-500">*</span>
          </label>
          <input
            id="id"
            type="text"
            value={form.id}
            onChange={(e) => update('id', e.target.value)}
            disabled={!!vehicle}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.id ? 'border-rose-500' : 'border-gray-200'
            } ${vehicle ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="e.g., toyota-camry-2024"
          />
          {errors.id && <p className="mt-1 text-sm text-rose-600">{errors.id}</p>}
          {vehicle && <p className="mt-1 text-xs text-gray-500">Vehicle ID cannot be changed</p>}
        </div>

        {/* Make */}
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
            Make <span className="text-rose-500">*</span>
          </label>
          <input
            id="make"
            type="text"
            value={form.make}
            onChange={(e) => update('make', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.make ? 'border-rose-500' : 'border-gray-200'
            }`}
            placeholder="e.g., Toyota"
          />
          {errors.make && <p className="mt-1 text-sm text-rose-600">{errors.make}</p>}
        </div>

        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
            Model <span className="text-rose-500">*</span>
          </label>
          <input
            id="model"
            type="text"
            value={form.model}
            onChange={(e) => update('model', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.model ? 'border-rose-500' : 'border-gray-200'
            }`}
            placeholder="e.g., Camry"
          />
          {errors.model && <p className="mt-1 text-sm text-rose-600">{errors.model}</p>}
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Year <span className="text-rose-500">*</span>
          </label>
          <input
            id="year"
            type="number"
            value={form.year}
            onChange={(e) => update('year', Number(e.target.value))}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.year ? 'border-rose-500' : 'border-gray-200'
            }`}
            min="1900"
            max={new Date().getFullYear() + 1}
          />
          {errors.year && <p className="mt-1 text-sm text-rose-600">{errors.year}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) <span className="text-rose-500">*</span>
          </label>
          <input
            id="price"
            type="number"
            value={form.price}
            onChange={(e) => update('price', Number(e.target.value))}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.price ? 'border-rose-500' : 'border-gray-200'
            }`}
            min="0"
            step="100"
          />
          {errors.price && <p className="mt-1 text-sm text-rose-600">{errors.price}</p>}
        </div>

        {/* Mileage */}
        <div>
          <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
            Mileage (km)
          </label>
          <input
            id="mileage"
            type="number"
            value={form.mileage}
            onChange={(e) => update('mileage', Number(e.target.value))}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.mileage ? 'border-rose-500' : 'border-gray-200'
            }`}
            min="0"
            placeholder="0 for new vehicles"
          />
          {errors.mileage && <p className="mt-1 text-sm text-rose-600">{errors.mileage}</p>}
        </div>

        {/* Fuel */}
        <div>
          <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type <span className="text-rose-500">*</span>
          </label>
          <select
            id="fuel"
            value={form.fuel}
            onChange={(e) => update('fuel', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white ${
              errors.fuel ? 'border-rose-500' : 'border-gray-200'
            }`}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
          </select>
          {errors.fuel && <p className="mt-1 text-sm text-rose-600">{errors.fuel}</p>}
        </div>

        {/* Transmission */}
        <div>
          <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
            Transmission <span className="text-rose-500">*</span>
          </label>
          <select
            id="transmission"
            value={form.transmission}
            onChange={(e) => update('transmission', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white ${
              errors.transmission ? 'border-rose-500' : 'border-gray-200'
            }`}
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
          {errors.transmission && <p className="mt-1 text-sm text-rose-600">{errors.transmission}</p>}
        </div>

        {/* Images */}
        <div className="md:col-span-2">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
            Image URLs <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="images"
            value={form.images.join('\n')}
            onChange={(e) => update('images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
              errors.images ? 'border-rose-500' : 'border-gray-200'
            }`}
            rows={3}
            placeholder="Enter one image URL per line"
          />
          {errors.images && <p className="mt-1 text-sm text-rose-600">{errors.images}</p>}
          <p className="mt-1 text-xs text-gray-500">Enter one image URL per line</p>
        </div>

        {/* Status Checkboxes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Status Options</label>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_sale}
                onChange={(e) => update('is_sale', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Available for Sale</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_rental}
                onChange={(e) => update('is_rental', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Available for Rent</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => update('is_featured', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Featured Vehicle</span>
            </label>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mt-6 p-4 rounded-xl ${
          message.includes('✅') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Saving...
            </span>
          ) : vehicle ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
