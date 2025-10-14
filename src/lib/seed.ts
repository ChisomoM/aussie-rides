import { collection, doc, getDocs, writeBatch, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  images: string[];
  is_rental: boolean;
  is_sale: boolean;
  is_featured: boolean;
}

const COLLECTION_NAME = "vehicles";

// Seed data based on your specifications
const vehiclesSeedData: Vehicle[] = [
  // BYD Models
  {
    id: "byd-otto3",
    make: "BYD",
    model: "Otto 3",
    year: 2024,
    price: 10000,
    mileage: 500,
    fuel: "Electric",
    transmission: "Automatic",
    images: ["/images/vehicles/byd-otto3.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: true,
  },
  {
    id: "byd-shark6",
    make: "BYD",
    model: "Shark 6",
    year: 2024,
    price: 35000,
    mileage: 1200,
    fuel: "Hybrid",
    transmission: "Automatic",
    images: ["/images/vehicles/byd-shark6.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: true,
  },
  // GWM Models
  {
    id: "gwm-poer-series",
    make: "GWM",
    model: "Poer Series",
    year: 2024,
    price: 23000,
    mileage: 800,
    fuel: "Diesel",
    transmission: "Automatic",
    images: ["/images/vehicles/gwm-poer.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: false,
  },
  {
    id: "gwm-haval",
    make: "GWM",
    model: "Haval",
    year: 2023,
    price: 16000,
    mileage: 15000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["/images/vehicles/gwm-haval.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: false,
  },
  // Mazda Models
  {
    id: "mazda-bt50",
    make: "Mazda",
    model: "BT-50",
    year: 2023,
    price: 29000,
    mileage: 18000,
    fuel: "Diesel",
    transmission: "Automatic",
    images: ["/images/vehicles/mazda-bt50.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: true,
  },
  {
    id: "mazda-2",
    make: "Mazda",
    model: "Mazda 2",
    year: 2020,
    price: 5000,
    mileage: 65000,
    fuel: "Petrol",
    transmission: "Manual",
    images: ["/images/vehicles/mazda-2.jpg"],
    is_rental: false,
    is_sale: true,
    is_featured: false,
  },
  {
    id: "mazda-cx3",
    make: "Mazda",
    model: "CX-3",
    year: 2021,
    price: 9000,
    mileage: 45000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["/images/vehicles/mazda-cx3.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: false,
  },
  {
    id: "mazda-cx30",
    make: "Mazda",
    model: "CX-30",
    year: 2022,
    price: 12000,
    mileage: 32000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["/images/vehicles/mazda-cx30.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: false,
  },
  {
    id: "mazda-cx5",
    make: "Mazda",
    model: "CX-5",
    year: 2021,
    price: 11000,
    mileage: 52000,
    fuel: "Petrol",
    transmission: "Automatic",
    images: ["/images/vehicles/mazda-cx5.jpg"],
    is_rental: true,
    is_sale: true,
    is_featured: false,
  },
];

/**
 * Seeds the vehicles collection in Firestore
 * @param clearExisting - If true, clears all existing vehicles before seeding
 * @returns Object containing success status and message
 */
export async function seedVehicles(
  clearExisting: boolean = false
): Promise<{ success: boolean; message: string; count: number }> {
  try {
    const vehiclesRef = collection(db, COLLECTION_NAME);

    // Clear existing data if requested
    if (clearExisting) {
      const snapshot = await getDocs(vehiclesRef);
      const batch = writeBatch(db);
      
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log("Cleared existing vehicles");
    }

    // Add seed data using batch write for better performance
    const batch = writeBatch(db);
    
    vehiclesSeedData.forEach((vehicle) => {
      const docRef = doc(db, COLLECTION_NAME, vehicle.id);
      batch.set(docRef, vehicle);
    });

    await batch.commit();

    return {
      success: true,
      message: `Successfully seeded ${vehiclesSeedData.length} vehicles`,
      count: vehiclesSeedData.length,
    };
  } catch (error) {
    console.error("Error seeding vehicles:", error);
    return {
      success: false,
      message: `Error seeding vehicles: ${error instanceof Error ? error.message : "Unknown error"}`,
      count: 0,
    };
  }
}

/**
 * Gets all vehicles from the Firestore collection
 * @returns Array of vehicles
 */
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const vehiclesRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(vehiclesRef);
    
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Vehicle[];
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

/**
 * Gets a single vehicle by ID from the Firestore collection
 * @param id - The vehicle ID
 * @returns Vehicle or null if not found
 */
export async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      ...snapshot.data(),
      id: snapshot.id,
    } as Vehicle;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }
}

/**
 * Clears all vehicles from the Firestore collection
 * @returns Object containing success status and message
 */
export async function clearVehicles(): Promise<{ success: boolean; message: string }> {
  try {
    const vehiclesRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(vehiclesRef);
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();

    return {
      success: true,
      message: `Successfully cleared ${snapshot.size} vehicles`,
    };
  } catch (error) {
    console.error("Error clearing vehicles:", error);
    return {
      success: false,
      message: `Error clearing vehicles: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ------------------- Site metadata seeding -------------------

export interface SiteMeta {
  id: string;
  hero: {
    title: string;
    subtitle?: string;
    image: string;
  };
  contact: {
    phone?: string;
    email?: string;
    address?: string;
  };
  social?: Record<string, string>;
  seeded_at?: string;
}

const SITE_META_COLLECTION = "site_meta";

const defaultSiteMeta: SiteMeta = {
  id: "default",
  hero: {
    title: "Aussie Rides - Drive Your Future",
    subtitle: "Quality vehicles for sale & rent",
    image: "/images/vehicles/hero-default.jpg",
  },
  contact: {
    phone: "+61 2 9000 0000",
    email: "info@aussierides.com.au",
    address: "Sydney, Australia",
  },
  social: {
    facebook: "https://facebook.com/aussierides",
    instagram: "https://instagram.com/aussierides",
  },
  seeded_at: new Date().toISOString(),
};

export async function seedSiteMeta(clearExisting: boolean = false): Promise<{ success: boolean; message: string }> {
  try {
    const metaRef = collection(db, SITE_META_COLLECTION);

    if (clearExisting) {
      const snapshot = await getDocs(metaRef);
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }

    // Use batch to set the document
    const batch = writeBatch(db);
    const docRef = doc(db, SITE_META_COLLECTION, defaultSiteMeta.id);
  batch.set(docRef, defaultSiteMeta as SiteMeta);
    await batch.commit();

    return { success: true, message: "Seeded site metadata" };
  } catch (error) {
    console.error("Error seeding site meta:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getSiteMeta(id: string = "default"): Promise<SiteMeta | null> {
  try {
    const docRef = doc(db, SITE_META_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { ...(snapshot.data() as SiteMeta), id: snapshot.id };
  } catch (error) {
    console.error("Error fetching site meta:", error);
    return null;
  }
}

export async function clearSiteMeta(): Promise<{ success: boolean; message: string }> {
  try {
    const snapshot = await getDocs(collection(db, SITE_META_COLLECTION));
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();

    return { success: true, message: `Cleared ${snapshot.size} site meta docs` };
  } catch (error) {
    console.error("Error clearing site meta:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Upsert (create or update) a vehicle document
 */
export async function upsertVehicle(vehicle: Vehicle): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, COLLECTION_NAME, vehicle.id);
    await setDoc(docRef, vehicle);
    return { success: true, message: `Upserted vehicle ${vehicle.id}` };
  } catch (error) {
    console.error("Error upserting vehicle:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Delete a vehicle by id
 */
export async function deleteVehicle(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const batch = writeBatch(db);
    batch.delete(docRef);
    await batch.commit();
    return { success: true, message: `Deleted vehicle ${id}` };
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}
