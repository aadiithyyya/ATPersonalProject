// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// ...

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxOhRje7AudTZLap9DkNhi-ooD0-irH0o",
  authDomain: "lovebucketlist-97257.firebaseapp.com",
  projectId: "lovebucketlist-97257",
  storageBucket: "lovebucketlist-97257.appspot.com", // fixed `.app` to `.appspot.com`
  messagingSenderId: "952140607732",
  appId: "1:952140607732:web:1193b72fdaa4f6c5d52ea1",
  measurementId: "G-SHGHRSXT0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore instance
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };

