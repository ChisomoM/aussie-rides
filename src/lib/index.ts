// Export Vehicle type for use throughout the app
// Export types
export type { Vehicle, SiteMeta } from "./seed";

// Export seeding functions
export { seedVehicles, getVehicles, clearVehicles, seedSiteMeta, getSiteMeta, clearSiteMeta, upsertVehicle, deleteVehicle } from "./seed";
