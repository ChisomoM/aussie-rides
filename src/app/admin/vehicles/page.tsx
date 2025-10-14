import { getVehicles } from '../../../lib/seed';
import AdminVehicleForm from '../../../../src/components/AdminVehicleForm';
import AdminVehicleList from '../../../../src/components/AdminVehicleList';
import AuthGate from '../../../../src/components/AuthGate';

export default async function AdminVehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <AuthGate>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Vehicle Admin</h1>
          <p className="text-sm text-gray-500">Create, edit or remove vehicles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AdminVehicleForm />
          </div>

          <div className="lg:col-span-2">
            <AdminVehicleList initialVehicles={vehicles} />
          </div>
        </div>
      </AuthGate>
    </div>
  );
}
