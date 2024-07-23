// Import the functions you need from the SDKs you need
"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4mFXXhDs06e3lS3pmXRzhr9ILcoc8ELk",
  authDomain: "skxywtf-9a3f5.firebaseapp.com",
  projectId: "skxywtf-9a3f5",
  storageBucket: "skxywtf-9a3f5.appspot.com",
  messagingSenderId: "747476308640",
  appId: "1:747476308640:web:db7786d024aa9fa8a76fc5",
  measurementId: "G-L2TKXDC4JK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, analytics, app };
