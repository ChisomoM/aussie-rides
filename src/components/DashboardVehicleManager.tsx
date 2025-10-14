"use client";

import { useState } from 'react';
import { Vehicle } from '@/lib/seed';
import DashboardVehicleList from '@/components/DashboardVehicleList';

import DashboardVehicleForm from '@/components/DashboardVehicleForm';

export default function DashboardVehicleManager({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles || []);
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleVehicleAdded = (vehicle: Vehicle) => {
    setVehicles(prev => {
      const exists = prev.findIndex(v => v.id === vehicle.id);
      if (exists >= 0) {
        // Update existing
        const newList = [...prev];
        newList[exists] = vehicle;
        return newList;
      }
      // Add new
      return [...prev, vehicle];
    });
    setActiveTab('list');
    setEditingVehicle(null);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setActiveTab('add');
  };

  const handleDelete = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingVehicle(null);
    setActiveTab('list');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-100 bg-gray-50">
        <nav className="flex -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
              activeTab === 'list'
                ? 'border-b-2 border-emerald-600 text-emerald-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Vehicle List ({vehicles.length})
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('add');
              setEditingVehicle(null);
            }}
            className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
              activeTab === 'add'
                ? 'border-b-2 border-emerald-600 text-emerald-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'list' && (
          <DashboardVehicleList 
            vehicles={vehicles} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {activeTab === 'add' && (
          <DashboardVehicleForm 
            vehicle={editingVehicle}
            onSuccess={handleVehicleAdded}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
}
