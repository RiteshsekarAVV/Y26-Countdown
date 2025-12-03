import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyAO29tmoRVcGL27lVv07Q9foy93jw26DZM",
    authDomain: "yugamlaunch.firebaseapp.com",
    projectId: "yugamlaunch",
    storageBucket: "yugamlaunch.firebasestorage.app",
    messagingSenderId: "276650266658",
    appId: "1:276650266658:web:bec3353709421f232f3a7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

