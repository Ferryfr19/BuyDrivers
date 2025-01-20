// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK1K0EWGnQxqyrkWtzVvcc5LVyrR-Z1K8",
  authDomain: "buydrivers-bbdd.firebaseapp.com",
  projectId: "buydrivers-bbdd",
  storageBucket: "buydrivers-bbdd.firebasestorage.app",
  messagingSenderId: "1087012244964",
  appId: "1:1087012244964:web:65903bb47e0fb04c100bf1",
  measurementId: "G-34ZC807YL1"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
export default appFirebase;