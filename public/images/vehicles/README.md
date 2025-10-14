# Vehicle Images

This directory contains vehicle images used in the Aussie Rides application.

## Image Files Needed

Place the following images in this directory:

### BYD Models
- `byd-otto3.jpg` - BYD Otto 3
- `byd-shark6.jpg` - BYD Shark 6

### GWM Models
- `gwm-poer.jpg` - GWM Poer Series
- `gwm-haval.jpg` - GWM Haval

### Mazda Models
- `mazda-bt50.jpg` - Mazda BT-50
- `mazda-2.jpg` - Mazda 2
- `mazda-cx3.jpg` - Mazda CX-3
- `mazda-cx30.jpg` - Mazda CX-30
- `mazda-cx5.jpg` - Mazda CX-5

## Image Specifications

- **Format**: JPG, JPEG, PNG, or WebP
- **Recommended Size**: 1200x800px (3:2 aspect ratio)
- **Max File Size**: < 500KB for optimal performance
- **Quality**: High quality, professional photos

## Using Placeholder Images

If you don't have actual vehicle images yet, you can use placeholder images from:

1. **Unsplash** (free, high quality): https://unsplash.com/s/photos/car
2. **Pexels** (free): https://www.pexels.com/search/car/
3. **Placeholder services**: 
   - https://placehold.co/1200x800/png?text=Vehicle+Image
   - https://via.placeholder.com/1200x800

## Updating Image Paths

The seed data in `src/lib/seed.ts` references these images with paths like:
```typescript
images: ["/images/vehicles/mazda-cx5.jpg"]
```

If you change the filename, make sure to update the path in the seed data accordingly.

## Future: Firebase Storage

When you upgrade to Firebase Blaze plan, you can migrate these images to Firebase Storage for better scalability and CDN delivery.
