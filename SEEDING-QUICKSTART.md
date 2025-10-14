# Quick Start: Seeding Your Aussie Rides Database

## 🚀 What Was Created

1. **Seed File** (`src/lib/seed.ts`) - Contains 9 vehicles with your specified prices
2. **Server Actions** (`src/app/actions/seed.ts`) - Backend functions you can call from buttons
3. **Seed Button Component** (`src/components/SeedButton.tsx`) - Ready-to-use UI component
4. **Admin Page** (`src/app/seed/page.tsx`) - Visit `/seed` to manage your database
5. **Updated Vehicles Page** - Now pulls from Firestore instead of hardcoded data

## 🎯 How to Use (3 Steps)

### 1. Start Your App
```powershell
pnpm dev
```

### 2. Visit the Seed Page
Open: `http://localhost:3000/seed`

### 3. Click "Seed Vehicles"
This will add all 9 vehicles to your Firestore database!

You can also seed site metadata (hero, contact info) using the **Seed Site Meta** button, or use **Seed All** to populate both vehicles and site meta in one action.

## 🖼️ About Images

Since you don't have Firebase Blaze (paid plan), images are stored in `/public/images/vehicles/`.

**To add actual vehicle images:**
1. Place images in: `/public/images/vehicles/`
2. Name them exactly as:
   - `byd-otto3.jpg`, `byd-shark6.jpg`
   - `gwm-poer.jpg`, `gwm-haval.jpg`
   - `mazda-bt50.jpg`, `mazda-2.jpg`, `mazda-cx3.jpg`, `mazda-cx30.jpg`, `mazda-cx5.jpg`

**Don't have images yet?** No problem! The app will work without them, just won't show vehicle photos.

## 📋 Vehicle Details in Seed

All vehicles include these new fields:
- `is_rental` - Available for rental? (true/false)
- `is_sale` - Available for sale? (true/false)  
- `is_featured` - Featured vehicle? (true/false)

The VehicleCard component will show colored badges for these!

## 🔧 Buttons Explained

- **Seed Vehicles** - Adds vehicles without deleting existing ones
- **Clear & Reseed** - Deletes everything, then adds fresh data
- **Clear All Vehicles** - Removes all vehicles (careful!)

## ✅ You're All Set!

That's it! Your database seeding system is ready to use. Check the full `SEEDING-GUIDE.md` for advanced usage.
