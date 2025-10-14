# Aussie Rides - Database Seeding Setup

## Overview

This setup provides a complete database seeding solution for the Aussie Rides vehicle inventory using Firebase Firestore.

## 🗂️ Files Created

### 1. `/src/lib/seed.ts`
Core seeding logic and database utilities.

**Key Features:**
- `seedVehicles(clearExisting)` - Seeds the database with vehicle data
- `getVehicles()` - Fetches all vehicles from Firestore
- `clearVehicles()` - Removes all vehicles from database
- Vehicle interface with all required fields including `is_rental`, `is_sale`, `is_featured`

### 2. `/src/app/actions/seed.ts`
Next.js Server Actions for client-side interaction.

**Actions:**
- `seedVehiclesAction()` - Server action to seed vehicles
- `clearVehiclesAction()` - Server action to clear vehicles
- `getVehiclesAction()` - Server action to fetch vehicles

### 3. `/src/components/SeedButton.tsx`
Client component with UI buttons for database management.

**Features:**
- Seed vehicles (without clearing existing)
- Clear & Reseed (removes all then seeds)
- Clear all vehicles
- Loading states and success/error messages

### 4. `/src/app/seed/page.tsx`
Admin page for database management.

**Access:** Navigate to `/seed` in your browser

### 5. Updated `/src/app/vehicles/page.tsx`
Now fetches vehicles from Firestore instead of hardcoded data.

**Features:**
- Server-side data fetching
- Empty state with link to seed page
- Link to database management page

## 📊 Vehicle Data

The seed includes 9 vehicles with the following makes/models:

### BYD (2 vehicles)
- Otto 3 - $10,000
- Shark 6 - $35,000

### GWM (2 vehicles)
- Poer Series - $23,000
- Haval - $16,000

### Mazda (5 vehicles)
- BT-50 - $29,000
- Mazda 2 - $5,000
- CX-3 - $9,000
- CX-30 - $12,000
- CX-5 - $11,000

## 🖼️ Image Storage Solution

Since you're on Firebase's free Spark plan (no Blaze/Storage), images are stored in the `/public/images/vehicles/` directory.

**Image Paths:**
- `/images/vehicles/byd-otto3.jpg`
- `/images/vehicles/byd-shark6.jpg`
- `/images/vehicles/gwm-poer.jpg`
- `/images/vehicles/gwm-haval.jpg`
- `/images/vehicles/mazda-bt50.jpg`
- `/images/vehicles/mazda-2.jpg`
- `/images/vehicles/mazda-cx3.jpg`
- `/images/vehicles/mazda-cx30.jpg`
- `/images/vehicles/mazda-cx5.jpg`

**To add images:**
1. Get vehicle photos (from Unsplash, Pexels, or your own)
2. Rename them to match the filenames above
3. Place them in `/public/images/vehicles/`
4. Recommended size: 1200x800px (3:2 aspect ratio)

## 🚀 Getting Started

### Step 1: Start Your Dev Server
```powershell
pnpm dev
```

### Step 2: Navigate to Seed Page
Open your browser and go to:
```
http://localhost:3000/seed
```

### Step 3: Seed the Database
Click the **"Seed Vehicles"** button to populate your Firestore database.

### Step 4: View Vehicles
Navigate to:
```
http://localhost:3000/vehicles
```

You should now see all 9 vehicles from the seed data!

## 🎯 Usage Examples

### Seeding from a Button
Already implemented in `/src/app/seed/page.tsx`. You can add the `<SeedButton />` component anywhere:

```tsx
import SeedButton from "@/components/SeedButton";

export default function AdminPage() {
  return <SeedButton />;
}
```

### Fetching Vehicles in a Component
```tsx
import { getVehicles } from "@/lib/seed";

export default async function MyComponent() {
  const vehicles = await getVehicles();
  
  return (
    <div>
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          <h3>{vehicle.make} {vehicle.model}</h3>
          <p>${vehicle.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using Server Actions
```tsx
"use client";

import { seedVehiclesAction } from "@/app/actions/seed";

export default function MyButton() {
  const handleClick = async () => {
    const result = await seedVehiclesAction(false);
    console.log(result.message);
  };

  return <button onClick={handleClick}>Seed</button>;
}
```

## 🔧 Vehicle Schema

```typescript
interface Vehicle {
  id: string;              // Unique identifier
  make: string;            // Manufacturer (e.g., "Mazda")
  model: string;           // Model name (e.g., "CX-5")
  year: number;            // Manufacturing year
  price: number;           // Price in dollars
  mileage: number;         // Kilometers driven
  fuel: string;            // Fuel type (Petrol, Diesel, Electric, Hybrid)
  transmission: string;    // Transmission type (Automatic, Manual)
  images: string[];        // Array of image paths
  is_rental: boolean;      // Available for rental
  is_sale: boolean;        // Available for sale
  is_featured: boolean;    // Featured on homepage
}
```

## 📱 VehicleCard Component

The `VehicleCard` component has been updated to display the new boolean fields:

- **Featured Badge** (green) - Shows when `is_featured` is true
- **Available for Rent Badge** (blue) - Shows when `is_rental` is true
- **For Sale Badge** (purple) - Shows when `is_sale` is true

## 🔒 Security Notes

### Firestore Rules
Make sure your Firestore rules allow read/write access. For development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /vehicles/{vehicleId} {
      allow read: if true;
      allow write: if true; // Change this for production!
    }
  }
}
```

### Production Considerations
- Add authentication to the `/seed` page
- Restrict write access in Firestore rules
- Consider making seed actions admin-only

## 🔄 Future Enhancements

### When you upgrade to Firebase Blaze plan:
1. Enable Firebase Storage
2. Create an image upload utility
3. Migrate images from `/public` to Firebase Storage
4. Update image URLs in the database

### Possible additions:
- Add more vehicle details (description, features array, condition)
- Implement filtering and search
- Add vehicle categories/tags
- Create admin dashboard for CRUD operations
- Add image upload functionality

## 🐛 Troubleshooting

### "No vehicles found"
- Make sure you've clicked the "Seed Vehicles" button
- Check browser console for errors
- Verify Firebase configuration in `/src/lib/firebase.ts`

### Images not showing
- Verify images exist in `/public/images/vehicles/`
- Check image filenames match exactly
- Clear Next.js cache: `rm -rf .next` and restart dev server

### Firestore permission errors
- Check Firestore rules in Firebase Console
- Ensure you're authenticated (if rules require auth)
- Verify Firebase project is active

## 📚 Additional Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Firebase Pricing](https://firebase.google.com/pricing)

## ✅ Checklist

- [x] Created seed.ts with vehicle data
- [x] Created server actions
- [x] Created SeedButton component
- [x] Created /seed admin page
- [x] Updated /vehicles page to fetch from Firestore
- [x] Updated VehicleCard to show new badges
- [x] Created images directory structure
- [x] Added comprehensive documentation

You're all set! 🎉
