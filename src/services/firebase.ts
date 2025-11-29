import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Environment variables from .env file
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

let app: firebase.app.App | undefined;
let firestoreDB: firebase.firestore.Firestore | undefined;
let auth: firebase.auth.Auth | undefined;

// Check if config is loaded
if (!firebaseConfig.apiKey) {
  console.error("CRITICAL ERROR: Firebase API Key is missing. Ensure your .env file exists and VITE_ variables are set.");
} else {
  try {
    // Prevent multiple initializations
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.app();
    }
    
    firestoreDB = firebase.firestore();
    auth = firebase.auth();
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { firestoreDB, auth };