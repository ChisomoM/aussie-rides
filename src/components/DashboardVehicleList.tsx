"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/lib/seed';
import { deleteVehicleAction } from '@/app/actions/seed';
import { auth } from '@/lib/firebase';

export default function DashboardVehicleList({ 
  vehicles, 
  onEdit, 
  onDelete 
}: { 
  vehicles: Vehicle[]; 
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent' | 'featured'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'year'>('name');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(v => 
        v.make.toLowerCase().includes(term) ||
        v.model.toLowerCase().includes(term) ||
        v.year.toString().includes(term)
      );
    }

    // Apply type filter
    if (filterType === 'sale') {
      filtered = filtered.filter(v => v.is_sale);
    } else if (filterType === 'rent') {
      filtered = filtered.filter(v => v.is_rental);
    } else if (filterType === 'featured') {
      filtered = filtered.filter(v => v.is_featured);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
      } else if (sortBy === 'price') {
        return b.price - a.price;
      } else if (sortBy === 'year') {
        return b.year - a.year;
      }
      return 0;
    });

    return filtered;
  }, [vehicles, searchTerm, filterType, sortBy]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) return;
    
    setLoadingId(id);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await deleteVehicleAction(id, token);
      if (res.success) {
        onDelete(id);
      } else {
        alert('Delete failed: ' + res.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete vehicle');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by make, model, or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'sale' | 'rent' | 'featured')}
              className="block pl-3 pr-10 py-2.5 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm rounded-xl transition-all duration-200 bg-white"
            >
              <option value="all">All Vehicles</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="featured">Featured</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'year')}
              className="block pl-3 pr-10 py-2.5 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm rounded-xl transition-all duration-200 bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="year">Sort by Year</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all duration-200 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                title="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 transition-all duration-200 ${viewMode === 'table' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                title="Table view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredVehicles.length} of {vehicles.length} vehicles</span>
        </div>
      </div>

      {/* Vehicle Display */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleGridCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={onEdit}
              onDelete={handleDelete}
              isDeleting={loadingId === vehicle.id}
            />
          ))}
        </div>
      ) : (
        <VehicleTable
          vehicles={filteredVehicles}
          onEdit={onEdit}
          onDelete={handleDelete}
          loadingId={loadingId}
        />
      )}
    </div>
  );
}

function VehicleGridCard({ 
  vehicle, 
  onEdit, 
  onDelete, 
  isDeleting 
}: { 
  vehicle: Vehicle; 
  onEdit: (v: Vehicle) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      {/* Image */}
      <div className="relative h-48 bg-gray-50">
        <Image
          src={vehicle.images[0] || '/next.svg'}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-1">
          {vehicle.is_featured && (
            <span className="bg-amber-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">Featured</span>
          )}
          {vehicle.is_sale && (
            <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">Sale</span>
          )}
          {vehicle.is_rental && (
            <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">Rent</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-gray-500 mb-4">Year: {vehicle.year}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-semibold text-emerald-600">${vehicle.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mileage:</span>
            <span className="font-medium text-gray-900">{vehicle.mileage === 0 ? 'New' : `${vehicle.mileage.toLocaleString()} km`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fuel:</span>
            <span className="font-medium text-gray-900">{vehicle.fuel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Transmission:</span>
            <span className="font-medium text-gray-900">{vehicle.transmission}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(vehicle)}
            className="flex-1 bg-emerald-600 text-white py-2.5 px-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(vehicle.id)}
            disabled={isDeleting}
            className="flex-1 bg-rose-600 text-white py-2.5 px-4 rounded-xl hover:bg-rose-700 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function VehicleTable({ 
  vehicles, 
  onEdit, 
  onDelete, 
  loadingId 
}: { 
  vehicles: Vehicle[]; 
  onEdit: (v: Vehicle) => void;
  onDelete: (id: string) => void;
  loadingId: string | null;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mileage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 relative">
                    <Image
                      src={vehicle.images[0] || '/next.svg'}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                    <div className="text-sm text-gray-500">{vehicle.fuel} • {vehicle.transmission}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.year}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">${vehicle.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.mileage === 0 ? 'New' : `${vehicle.mileage.toLocaleString()} km`}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-1">
                  {vehicle.is_featured && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Featured</span>}
                  {vehicle.is_sale && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Sale</span>}
                  {vehicle.is_rental && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Rent</span>}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(vehicle)}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(vehicle.id)}
                    disabled={loadingId === vehicle.id}
                    className="text-rose-600 hover:text-rose-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    {loadingId === vehicle.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
