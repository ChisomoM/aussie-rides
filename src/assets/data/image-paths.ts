// src/assets/data/image-paths.ts
// Centralized image path constants for type safety and easier maintenance

export const IMAGE_PATHS = {
  // Vehicles
  VEHICLES: {
    PLACEHOLDERS: {
      CAR_DEFAULT: '/images/placeholders/car-placeholder.jpg',
      SUV_DEFAULT: '/images/placeholders/suv-placeholder.jpg',
      LUXURY_DEFAULT: '/images/placeholders/luxury-placeholder.jpg',
    },
    // Example: SEDAN_BMW_2024: '/images/vehicles/sedan-bmw-2024.jpg',
  },
  
  // Hero section
  HERO: {
    MAIN_BACKGROUND: '/images/hero/australian-landscape.jpg',
    CARS_SHOWCASE: '/images/hero/cars-showcase.jpg',
  },
  
  // Logos and branding
  LOGOS: {
    AUSSIE_RIDES: '/images/logos/aussie-rides-logo.png',
    AUSSIE_RIDES_WHITE: '/images/logos/aussie-rides-logo-white.png',
    PARTNERS: {
      // TOYOTA: '/images/logos/partners/toyota.png',
      // HOLDEN: '/images/logos/partners/holden.png',
    },
  },
  
  // Icons (for custom icons not available in Lucide)
  ICONS: {
    AUSTRALIAN_FLAG: '/images/icons/australian-flag.svg',
    LOCATION_MARKER: '/images/icons/location-marker.svg',
  },
  
  // Testimonials
  TESTIMONIALS: {
    // CUSTOMER_1: '/images/testimonials/customer-1.jpg',
    DEFAULT_AVATAR: '/images/testimonials/default-avatar.jpg',
  },
  
  // General gallery
  GALLERY: {
    ABOUT_US: '/images/gallery/about-us.jpg',
    TEAM_PHOTO: '/images/gallery/team-photo.jpg',
  },
} as const;

// Type for autocomplete
export type ImagePath = typeof IMAGE_PATHS;
