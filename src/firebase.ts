// Import functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tera firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCZ1Ev_BXfp6w3gL3GblkVU1IJFJztvLhU",
  authDomain: "user-management-4e17b.firebaseapp.com",
  projectId: "user-management-4e17b",
  storageBucket: "user-management-4e17b.firebasestorage.app",
  messagingSenderId: "325724926346",
  appId: "1:325724926346:web:2df3295c092b09feb2d873",
  measurementId: "G-2KR6BRPGQZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export default app;
