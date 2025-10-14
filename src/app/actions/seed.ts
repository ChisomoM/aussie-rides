"use server";

import { seedVehicles, clearVehicles, getVehicles, seedSiteMeta, getSiteMeta, clearSiteMeta, upsertVehicle, deleteVehicle, Vehicle } from "@/lib/seed";
import { adminAuth } from "@/lib/firebaseAdmin";

async function verifyIdToken(idToken?: string) {
  if (!idToken) throw new Error('Missing ID token');
  const auth = adminAuth();
  try {
    const decoded = await auth.verifyIdToken(idToken);
    return decoded.uid;
  } catch (err) {
    console.error('[verifyIdToken] verification failed:', err);
    // rethrow so callers handle the error and return an appropriate response
    throw err;
  }
}

/**
 * Server action to seed the vehicles database
 * @param clearExisting - If true, clears all existing vehicles before seeding
 */
export async function seedVehiclesAction(clearExisting: boolean = false, idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const result = await seedVehicles(clearExisting);
    return result;
  } catch (error) {
    return {
      success: false,
      message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}`,
      count: 0,
    };
  }
}

/**
 * Server action to seed site metadata
 */
export async function seedSiteMetaAction(clearExisting: boolean = false, idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const result = await seedSiteMeta(clearExisting);
    return result;
  } catch (error) {
    return { success: false, message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export async function clearSiteMetaAction(idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const result = await clearSiteMeta();
    return result;
  } catch (error) {
    return { success: false, message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export async function getSiteMetaAction(id: string = "default") {
  try {
    const meta = await getSiteMeta(id);
    return { success: true, data: meta };
  } catch (error) {
    return { success: false, data: null, message: `Error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

/**
 * Seed everything: vehicles + site meta
 */
export async function seedAllAction(clearExisting: boolean = false, idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const v = await seedVehicles(clearExisting);
    const m = await seedSiteMeta(clearExisting);
    return { success: v.success && m.success, details: { vehicles: v, siteMeta: m } };
  } catch (error) {
    return { success: false, message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

/**
 * Server action to clear all vehicles from the database
 */
export async function clearVehiclesAction(idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const result = await clearVehicles();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Server action to get all vehicles from the database
 */
export async function getVehiclesAction() {
  try {
    const vehicles = await getVehicles();
    return {
      success: true,
      data: vehicles,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Upsert a vehicle (create/update) via server action
 */
export async function upsertVehicleAction(vehicle: Vehicle, idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const result = await upsertVehicle(vehicle);
    return result;
  } catch (error) {
    return { success: false, message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export async function deleteVehicleAction(id: string, idToken?: string) {
  try {
    await verifyIdToken(idToken);
    const result = await deleteVehicle(id);
    return result;
  } catch (error) {
    return { success: false, message: `Unauthorized or error: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
