import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAd_cEOo9g4P6nPIcrnFchNCO30ONjgr9o",
  authDomain: "aussie-rides.firebaseapp.com",
  projectId: "aussie-rides",
  storageBucket: "aussie-rides.firebasestorage.app",
  messagingSenderId: "155990206595",
  appId: "1:155990206595:web:9cdccb0e147033e72593b6",
  measurementId: "G-WL4Z52MJK0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;