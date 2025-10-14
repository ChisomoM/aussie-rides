# Firestore Security Rules for Aussie Rides

## Development Rules (Current - Use for Testing)

For development and testing, use these permissive rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read vehicles
    match /vehicles/{vehicleId} {
      allow read: if true;
      allow write: if true; // ⚠️ Change this for production!
    }
  }
}
```

## Production Rules (Recommended)

When you go to production, update to these more secure rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Vehicles collection
    match /vehicles/{vehicleId} {
      // Anyone can read vehicles
      allow read: if true;
      
      // Only authenticated users can create/update/delete
      allow create, update, delete: if request.auth != null;
    }
    
    // If you add admin-only access later:
    // allow write: if request.auth != null && 
    //                 request.auth.token.admin == true;
  }
}
```

## Super Secure Production Rules (With Admin Role)

If you implement admin authentication:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Vehicles collection
    match /vehicles/{vehicleId} {
      // Anyone can read vehicles
      allow read: if true;
      
      // Only admins can write
      allow create, update, delete: if isAdmin();
    }
    
    // Admins collection
    match /admins/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Set manually in Firebase Console
    }
  }
}
```

## How to Update Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **aussie-rides**
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab
5. Paste your rules
6. Click **Publish**

## Current Setup

Your current Firebase project:
- **Project ID**: aussie-rides
- **Collection**: vehicles

Start with the **Development Rules**, then upgrade to **Production Rules** when you deploy!

## Testing Rules

Test your rules in the Firebase Console:
1. Go to **Firestore Database** → **Rules** tab
2. Click **Rules Playground**
3. Select operation type (get, list, create, etc.)
4. Enter collection path: `/vehicles/test-id`
5. Test with/without authentication

## Important Notes

⚠️ **Never leave `allow write: if true` in production!**

This allows anyone to modify your database. Always require authentication or use admin checks for write operations.

✅ **Public read is OK** for vehicle listings since users need to browse inventory.

🔐 **Protect admin operations** by checking authentication and roles before allowing writes.
