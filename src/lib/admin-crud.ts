import type { Vehicle, SiteMeta } from './seed';
import { getVehicles, upsertVehicle, deleteVehicle, getSiteMeta, seedSiteMeta } from './seed';

export async function listVehicles(): Promise<Vehicle[]> {
  return getVehicles();
}

export async function createOrUpdateVehicle(v: Vehicle) {
  return upsertVehicle(v);
}

export async function removeVehicle(id: string) {
  return deleteVehicle(id);
}

export async function getSiteMetadata(id: string = 'default'): Promise<SiteMeta | null> {
  return getSiteMeta(id);
}

export async function seedDefaultSiteMeta() {
  return seedSiteMeta(false);
}

const adminCrud = {
  listVehicles,
  createOrUpdateVehicle,
  removeVehicle,
  getSiteMetadata,
  seedDefaultSiteMeta,
};

export default adminCrud;
