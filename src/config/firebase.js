// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKadDcCt-bYUKXN3BIqkegG6u4m20EcWI",
  authDomain: "she-safe-e0169.firebaseapp.com",
  projectId: "she-safe-e0169",
  storageBucket: "she-safe-e0169.firebasestorage.app",
  messagingSenderId: "723353749118",
  appId: "1:723353749118:web:4641ae060a9685a978fa2f",
  measurementId: "G-KPEZC1LDCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };